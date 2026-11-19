using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Web.Script.Serialization;

namespace ReincarnationCultivationSaveEditor
{
    public sealed class SaveSafetyException : Exception
    {
        public SaveSafetyException(string message) : base(message) { }
    }

    public sealed class BackupEntry
    {
        public string Name;
        public long Mtime;
    }

    public sealed class SaveOperationResult
    {
        public bool Ok;
        public List<string> SavedFiles;
        public string BackupName;
        public List<BackupEntry> Backups;
    }

    public static class SaveStore
    {
        public const int MaxBackups = 20;
        public const string BackupDirName = ".lrs_backups";

        public static readonly string[] KnownSaveFiles = new string[]
        {
            "GameData.json",
            "NewPlayerInfo.json",
            "GameEventInfo.json",
            "PlayerBagDataInfo.json",
            "PlayerEquipDataInfo.json",
            "PlayerFaBaoDataInfo.json",
            "PlayerSkillDataInfo.json",
            "MDTalentData.json",
            "BSTalentData.json",
            "LingGenData.json",
            "EndingData.json",
            "AchievementData.json",
            "GameEventModelOutSideInfo.json",
            "DanYaoEffectInfo.json",
            "ReleaseQueueInfo.json",
            "BattlePlayerData.json",
            "SteamAchievementData.json"
        };

        private static readonly HashSet<string> ReservedNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "con", "prn", "aux", "nul",
            "com1", "com2", "com3", "com4", "com5", "com6", "com7", "com8", "com9",
            "lpt1", "lpt2", "lpt3", "lpt4", "lpt5", "lpt6", "lpt7", "lpt8", "lpt9"
        };

        public static JavaScriptSerializer CreateSerializer()
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            ser.MaxJsonLength = 64 * 1024 * 1024;
            ser.RecursionLimit = 128;
            return ser;
        }

        public static string GetDefaultSaveDirectory()
        {
            string localLow = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                "AppData", "LocalLow", "Collider Studio", "Re-xiuxian Legend", "GameData");
            return localLow;
        }

        [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
        private static extern bool GetFileInformationByHandle(IntPtr hFile, out BY_HANDLE_FILE_INFORMATION lpFileInformation);

        [StructLayout(LayoutKind.Sequential)]
        private struct FILETIME
        {
            public uint dwLowDateTime;
            public uint dwHighDateTime;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct BY_HANDLE_FILE_INFORMATION
        {
            public uint FileAttributes;
            public FILETIME CreationTime;
            public FILETIME LastAccessTime;
            public FILETIME LastWriteTime;
            public uint VolumeSerialNumber;
            public uint FileSizeHigh;
            public uint FileSizeLow;
            public uint NumberOfLinks;
            public uint FileIndexHigh;
            public uint FileIndexLow;
        }

        public static bool IsGameRunning()
        {
            if (Environment.GetEnvironmentVariable("LRS_SIMULATE_GAME_RUNNING") == "1")
            {
                return true;
            }
            try
            {
                Process[] procs = Process.GetProcesses();
                for (int i = 0; i < procs.Length; i++)
                {
                    try
                    {
                        string name = (procs[i].ProcessName ?? string.Empty).ToLowerInvariant();
                        if (name.Contains("re-xiuxian legend") || name.Contains("\u8f6e\u56de\u4fee\u4ed9\u5f55"))
                        {
                            return true;
                        }
                    }
                    catch { }
                    finally
                    {
                        try { procs[i].Dispose(); } catch { }
                    }
                }
            }
            catch { }
            return false;
        }

        public static void EnsureGameNotRunning()
        {
            if (IsGameRunning())
            {
                throw new SaveSafetyException("윤회수선전 게임 프로세스가 실행 중입니다. 게임을 종료한 뒤 다시 시도하세요.");
            }
        }

        public static void ValidateSafePath(string rawPath)
        {
            if (string.IsNullOrWhiteSpace(rawPath))
            {
                throw new SaveSafetyException("경로가 비어 있습니다.");
            }
            if (rawPath.StartsWith("\\\\", StringComparison.Ordinal) || rawPath.StartsWith("//", StringComparison.Ordinal))
            {
                throw new SaveSafetyException("네트워크(UNC) 경로는 허용되지 않습니다: " + rawPath);
            }

            string normalized = rawPath.Replace('/', '\\');
            string[] segments = normalized.Split(new char[] { '\\' }, StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < segments.Length; i++)
            {
                string seg = segments[i];
                if (i == 0 && seg.Length == 2 && seg[1] == ':')
                {
                    continue;
                }
                if (seg.IndexOf(':') >= 0)
                {
                    throw new SaveSafetyException("대체 데이터 스트림(ADS) 경로는 허용되지 않습니다: " + seg);
                }
                int dot = seg.IndexOf('.');
                string stem = (dot >= 0 ? seg.Substring(0, dot) : seg).Trim();
                if (ReservedNames.Contains(stem))
                {
                    throw new SaveSafetyException("예약된 장치 이름은 사용할 수 없습니다: " + seg);
                }
            }

            string full = Path.GetFullPath(rawPath);
            string root = Path.GetPathRoot(full);
            string cur = root;
            string tail = full.Substring(root.Length);
            string[] parts = tail.Split(new char[] { Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar }, StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < parts.Length; i++)
            {
                cur = Path.Combine(cur, parts[i]);
                if (File.Exists(cur) || Directory.Exists(cur))
                {
                    FileAttributes attr = File.GetAttributes(cur);
                    if ((attr & FileAttributes.ReparsePoint) != 0)
                    {
                        throw new SaveSafetyException("심볼릭 링크 또는 정션 경로는 허용되지 않습니다: " + cur);
                    }
                    if (File.Exists(cur))
                    {
                        CheckSingleLink(cur);
                    }
                }
            }
        }

        private static void CheckSingleLink(string filePath)
        {
            try
            {
                using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    BY_HANDLE_FILE_INFORMATION info;
                    if (GetFileInformationByHandle(fs.SafeFileHandle.DangerousGetHandle(), out info))
                    {
                        if (info.NumberOfLinks > 1)
                        {
                            throw new SaveSafetyException("다중 하드링크 파일은 허용되지 않습니다: " + filePath);
                        }
                    }
                }
            }
            catch (SaveSafetyException)
            {
                throw;
            }
            catch (UnauthorizedAccessException)
            {
                throw;
            }
            catch { }
        }

        public static string Sha256Hex(byte[] data)
        {
            using (SHA256 sha = SHA256.Create())
            {
                byte[] hash = sha.ComputeHash(data);
                StringBuilder sb = new StringBuilder(hash.Length * 2);
                for (int i = 0; i < hash.Length; i++)
                {
                    sb.Append(hash[i].ToString("x2"));
                }
                return sb.ToString();
            }
        }

        public static void AtomicWriteBytes(string targetPath, byte[] data)
        {
            ValidateSafePath(targetPath);
            string parent = Path.GetDirectoryName(targetPath);
            if (!string.IsNullOrEmpty(parent) && !Directory.Exists(parent))
            {
                Directory.CreateDirectory(parent);
            }
            string tmpPath = Path.Combine(parent ?? ".", Path.GetFileName(targetPath) + "." + Guid.NewGuid().ToString("N").Substring(0, 8) + ".tmp");
            try
            {
                using (FileStream fs = new FileStream(tmpPath, FileMode.CreateNew, FileAccess.Write, FileShare.None, 65536, FileOptions.WriteThrough))
                {
                    fs.Write(data, 0, data.Length);
                    fs.Flush(true);
                }
                if (File.Exists(targetPath))
                {
                    File.Replace(tmpPath, targetPath, null, true);
                }
                else
                {
                    File.Move(tmpPath, targetPath);
                }
            }
            finally
            {
                if (File.Exists(tmpPath))
                {
                    try { File.Delete(tmpPath); } catch { }
                }
            }
        }

        public static string DetectKind(string fileName, Dictionary<string, object> parsed)
        {
            string baseName = Path.GetFileName(fileName ?? string.Empty);
            for (int i = 0; i < KnownSaveFiles.Length; i++)
            {
                string canonical = KnownSaveFiles[i];
                if (string.Equals(canonical, baseName, StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(Path.GetFileNameWithoutExtension(canonical), Path.GetFileNameWithoutExtension(baseName), StringComparison.OrdinalIgnoreCase))
                {
                    return canonical;
                }
            }
            if (parsed == null)
            {
                return null;
            }
            if (parsed.ContainsKey("miscInfo") && parsed.ContainsKey("roleInfo") && parsed.ContainsKey("basicPropertyInfo"))
            {
                return "NewPlayerInfo.json";
            }
            if (parsed.ContainsKey("reincarnationStone") && parsed.ContainsKey("gameMode"))
            {
                return "GameData.json";
            }
            if (parsed.ContainsKey("Bags"))
            {
                return "PlayerBagDataInfo.json";
            }
            if (parsed.ContainsKey("equipmentDic"))
            {
                return "PlayerEquipDataInfo.json";
            }
            if (parsed.ContainsKey("faBaoList"))
            {
                return "PlayerFaBaoDataInfo.json";
            }
            if (parsed.ContainsKey("skillList"))
            {
                return "PlayerSkillDataInfo.json";
            }
            if (parsed.ContainsKey("talentDataList"))
            {
                return "MDTalentData.json";
            }
            if (parsed.ContainsKey("talentIDs"))
            {
                return "BSTalentData.json";
            }
            if (parsed.ContainsKey("basicGold") && parsed.ContainsKey("extraGold"))
            {
                return "LingGenData.json";
            }
            if (parsed.ContainsKey("unLockedIDs"))
            {
                return "EndingData.json";
            }
            if (parsed.ContainsKey("achievementActiveDict"))
            {
                return "AchievementData.json";
            }
            if (parsed.ContainsKey("currentYear") && parsed.ContainsKey("occurredGameEvents"))
            {
                return "GameEventInfo.json";
            }
            return null;
        }

        public static Dictionary<string, string> LoadTarget(string targetPath)
        {
            ValidateSafePath(targetPath);
            JavaScriptSerializer ser = CreateSerializer();
            Dictionary<string, string> files = new Dictionary<string, string>(StringComparer.Ordinal);

            if (Directory.Exists(targetPath))
            {
                string[] jsonFiles = Directory.GetFiles(targetPath, "*.json", SearchOption.TopDirectoryOnly);
                Array.Sort(jsonFiles, StringComparer.OrdinalIgnoreCase);
                for (int i = 0; i < jsonFiles.Length; i++)
                {
                    string fp = jsonFiles[i];
                    string name = Path.GetFileName(fp);
                    if (name.StartsWith(".", StringComparison.Ordinal))
                    {
                        continue;
                    }
                    ValidateSafePath(fp);
                    string text = ReadUtf8NoBom(fp);
                    Dictionary<string, object> obj = ser.Deserialize<Dictionary<string, object>>(text);
                    if (obj == null)
                    {
                        throw new SaveSafetyException("JSON 루트가 객체가 아닙니다: " + name);
                    }
                    string key = DetectKind(name, obj) ?? name;
                    if (!files.ContainsKey(key))
                    {
                        files[key] = text;
                    }
                }
                if (files.Count == 0)
                {
                    throw new SaveSafetyException("폴더에서 JSON 저장 파일을 찾지 못했습니다: " + targetPath);
                }
                return files;
            }

            if (File.Exists(targetPath))
            {
                string text = ReadUtf8NoBom(targetPath);
                Dictionary<string, object> obj = ser.Deserialize<Dictionary<string, object>>(text);
                if (obj == null)
                {
                    throw new SaveSafetyException("JSON 루트가 객체가 아닙니다: " + Path.GetFileName(targetPath));
                }
                string key = DetectKind(Path.GetFileName(targetPath), obj) ?? Path.GetFileName(targetPath);
                files[key] = text;
                return files;
            }

            throw new SaveSafetyException("저장 경로나 파일을 찾을 수 없습니다: " + targetPath);
        }

        private static string ReadUtf8NoBom(string filePath)
        {
            byte[] raw = File.ReadAllBytes(filePath);
            int offset = 0;
            if (raw.Length >= 3 && raw[0] == 0xEF && raw[1] == 0xBB && raw[2] == 0xBF)
            {
                offset = 3;
            }
            return Encoding.UTF8.GetString(raw, offset, raw.Length - offset);
        }

        public static List<BackupEntry> ListBackups(string targetPath)
        {
            ValidateSafePath(targetPath);
            List<BackupEntry> entries = new List<BackupEntry>();

            if (Directory.Exists(targetPath))
            {
                string bakRoot = Path.Combine(targetPath, BackupDirName);
                if (!Directory.Exists(bakRoot))
                {
                    return entries;
                }
                string[] dirs = Directory.GetDirectories(bakRoot, "backup-*");
                Array.Sort(dirs, delegate (string a, string b)
                {
                    return Directory.GetLastWriteTimeUtc(b).CompareTo(Directory.GetLastWriteTimeUtc(a));
                });
                for (int i = 0; i < dirs.Length; i++)
                {
                    DateTime dt = Directory.GetLastWriteTimeUtc(dirs[i]);
                    long unix = (long)(dt - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds;
                    entries.Add(new BackupEntry { Name = Path.GetFileName(dirs[i]), Mtime = unix });
                }
                return entries;
            }

            string parent = Path.GetDirectoryName(targetPath);
            string baseName = Path.GetFileName(targetPath);
            if (string.IsNullOrEmpty(parent) || !Directory.Exists(parent))
            {
                return entries;
            }
            string[] files = Directory.GetFiles(parent, baseName + ".backup-*.bak");
            Array.Sort(files, delegate (string a, string b)
            {
                return File.GetLastWriteTimeUtc(b).CompareTo(File.GetLastWriteTimeUtc(a));
            });
            for (int i = 0; i < files.Length; i++)
            {
                DateTime dt = File.GetLastWriteTimeUtc(files[i]);
                long unix = (long)(dt - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds;
                entries.Add(new BackupEntry { Name = Path.GetFileName(files[i]), Mtime = unix });
            }
            return entries;
        }

        public static string CreateBackup(string targetPath)
        {
            ValidateSafePath(targetPath);
            string ts = DateTime.Now.ToString("yyyyMMdd-HHmmss-fff");

            if (Directory.Exists(targetPath))
            {
                string bakRoot = Path.Combine(targetPath, BackupDirName);
                ValidateSafePath(bakRoot);
                if (!Directory.Exists(bakRoot))
                {
                    Directory.CreateDirectory(bakRoot);
                }
                Dictionary<string, string> hashes = new Dictionary<string, string>(StringComparer.Ordinal);
                Dictionary<string, byte[]> blobs = new Dictionary<string, byte[]>(StringComparer.Ordinal);
                StringBuilder combined = new StringBuilder();

                for (int i = 0; i < KnownSaveFiles.Length; i++)
                {
                    string name = KnownSaveFiles[i];
                    string fp = Path.Combine(targetPath, name);
                    if (File.Exists(fp))
                    {
                        ValidateSafePath(fp);
                        byte[] bytes = File.ReadAllBytes(fp);
                        string hex = Sha256Hex(bytes);
                        blobs[name] = bytes;
                        hashes[name] = hex;
                        combined.Append(name).Append(hex);
                    }
                }
                if (blobs.Count == 0)
                {
                    throw new SaveSafetyException("백업할 저장 파일이 폴더에 없습니다.");
                }
                string snapHex = Sha256Hex(Encoding.UTF8.GetBytes(combined.ToString()));
                string snapName = "backup-" + ts + "-" + snapHex.Substring(0, 8);
                string snapDir = Path.Combine(bakRoot, snapName);
                Directory.CreateDirectory(snapDir);

                foreach (KeyValuePair<string, byte[]> kv in blobs)
                {
                    AtomicWriteBytes(Path.Combine(snapDir, kv.Key), kv.Value);
                }
                Dictionary<string, object> manifest = new Dictionary<string, object>();
                manifest["createdAt"] = ts;
                manifest["files"] = hashes;
                string manifestJson = CreateSerializer().Serialize(manifest);
                AtomicWriteBytes(Path.Combine(snapDir, "manifest.json"), Encoding.UTF8.GetBytes(manifestJson));

                List<BackupEntry> current = ListBackups(targetPath);
                for (int i = MaxBackups; i < current.Count; i++)
                {
                    try { Directory.Delete(Path.Combine(bakRoot, current[i].Name), true); } catch { }
                }
                return snapName;
            }

            if (!File.Exists(targetPath))
            {
                throw new SaveSafetyException("백업 대상 파일을 찾을 수 없습니다: " + targetPath);
            }
            byte[] raw = File.ReadAllBytes(targetPath);
            string digest = Sha256Hex(raw);
            string bakName = Path.GetFileName(targetPath) + ".backup-" + ts + "-" + digest.Substring(0, 8) + ".bak";
            string bakPath = Path.Combine(Path.GetDirectoryName(targetPath) ?? ".", bakName);
            AtomicWriteBytes(bakPath, raw);

            List<BackupEntry> list = ListBackups(targetPath);
            for (int i = MaxBackups; i < list.Count; i++)
            {
                try { File.Delete(Path.Combine(Path.GetDirectoryName(targetPath) ?? ".", list[i].Name)); } catch { }
            }
            return bakName;
        }

        public static Dictionary<string, string> RestoreBackup(string targetPath, string backupName)
        {
            EnsureGameNotRunning();
            ValidateSafePath(targetPath);
            if (string.IsNullOrWhiteSpace(backupName) || backupName.IndexOf('/') >= 0 || backupName.IndexOf('\\') >= 0 || backupName.Contains(".."))
            {
                throw new SaveSafetyException("올바르지 않은 백업 이름입니다: " + backupName);
            }

            if (Directory.Exists(targetPath))
            {
                string snapDir = Path.Combine(targetPath, BackupDirName, backupName);
                ValidateSafePath(snapDir);
                string manifestPath = Path.Combine(snapDir, "manifest.json");
                if (!File.Exists(manifestPath))
                {
                    throw new SaveSafetyException("백업 매니페스트가 없습니다: " + backupName);
                }
                Dictionary<string, object> manifest = CreateSerializer().Deserialize<Dictionary<string, object>>(ReadUtf8NoBom(manifestPath));
                Dictionary<string, object> hashes = manifest["files"] as Dictionary<string, object>;
                if (hashes == null)
                {
                    throw new SaveSafetyException("백업 매니페스트 형식이 올바르지 않습니다.");
                }
                Dictionary<string, byte[]> verified = new Dictionary<string, byte[]>(StringComparer.Ordinal);
                foreach (KeyValuePair<string, object> kv in hashes)
                {
                    string fname = kv.Key;
                    if (Array.IndexOf(KnownSaveFiles, fname) < 0)
                    {
                        throw new SaveSafetyException("허용되지 않은 파일 이름이 백업에 포함되어 있습니다: " + fname);
                    }
                    string fp = Path.Combine(snapDir, fname);
                    ValidateSafePath(fp);
                    byte[] blob = File.ReadAllBytes(fp);
                    string actual = Sha256Hex(blob);
                    string expected = Convert.ToString(kv.Value);
                    if (!string.Equals(actual, expected, StringComparison.OrdinalIgnoreCase))
                    {
                        throw new SaveSafetyException("백업 무결성(SHA-256) 검증에 실패했습니다: " + fname);
                    }
                    verified[fname] = blob;
                }
                foreach (KeyValuePair<string, byte[]> kv in verified)
                {
                    AtomicWriteBytes(Path.Combine(targetPath, kv.Key), kv.Value);
                }
                return LoadTarget(targetPath);
            }

            string parent = Path.GetDirectoryName(targetPath) ?? ".";
            string bakPath = Path.Combine(parent, backupName);
            ValidateSafePath(bakPath);
            if (!File.Exists(bakPath) || !backupName.StartsWith(Path.GetFileName(targetPath) + ".backup-", StringComparison.Ordinal))
            {
                throw new SaveSafetyException("백업 파일을 찾을 수 없습니다: " + backupName);
            }
            byte[] data = File.ReadAllBytes(bakPath);
            AtomicWriteBytes(targetPath, data);
            return LoadTarget(targetPath);
        }

        public static SaveOperationResult SaveFilesMap(string targetPath, Dictionary<string, string> encodedFiles)
        {
            EnsureGameNotRunning();
            ValidateSafePath(targetPath);
            if (encodedFiles == null || encodedFiles.Count == 0)
            {
                throw new SaveSafetyException("저장할 파일 데이터가 없습니다.");
            }

            JavaScriptSerializer ser = CreateSerializer();
            foreach (KeyValuePair<string, string> kv in encodedFiles)
            {
                if (string.IsNullOrWhiteSpace(kv.Key) || Path.GetFileName(kv.Key) != kv.Key || kv.Key.StartsWith(".", StringComparison.Ordinal))
                {
                    throw new SaveSafetyException("올바르지 않은 파일 이름입니다: " + kv.Key);
                }
                object parsed = ser.DeserializeObject(kv.Value);
                if (!(parsed is Dictionary<string, object>))
                {
                    throw new SaveSafetyException("저장할 JSON 형식이 올바르지 않습니다: " + kv.Key);
                }
            }

            string bakName = CreateBackup(targetPath);
            List<string> saved = new List<string>();

            if (Directory.Exists(targetPath))
            {
                foreach (KeyValuePair<string, string> kv in encodedFiles)
                {
                    string outPath = Path.Combine(targetPath, kv.Key);
                    AtomicWriteBytes(outPath, Encoding.UTF8.GetBytes(kv.Value));
                    saved.Add(kv.Key);
                }
            }
            else
            {
                string content = null;
                string canonical = DetectKind(Path.GetFileName(targetPath), null);
                if (canonical != null && encodedFiles.ContainsKey(canonical))
                {
                    content = encodedFiles[canonical];
                }
                else
                {
                    foreach (string val in encodedFiles.Values)
                    {
                        content = val;
                        break;
                    }
                }
                AtomicWriteBytes(targetPath, Encoding.UTF8.GetBytes(content ?? "{}\n"));
                saved.Add(Path.GetFileName(targetPath));
            }

            return new SaveOperationResult
            {
                Ok = true,
                SavedFiles = saved,
                BackupName = bakName,
                Backups = ListBackups(targetPath)
            };
        }
    }
}
