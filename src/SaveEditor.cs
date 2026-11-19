using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace ReincarnationCultivationSaveEditor
{
    public sealed class EditorForm : Form
    {
        private readonly WebView2 _webView;
        private readonly bool _selfTestMode;
        private readonly string _selfTestOutDir;
        private readonly string _selfTestSeedPath;
        private string _currentTargetPath;
        private bool _selfTestDone;

        public EditorForm(bool selfTestMode, string selfTestOutDir, string selfTestSeedPath)
        {
            _selfTestMode = selfTestMode;
            _selfTestOutDir = selfTestOutDir;
            _selfTestSeedPath = selfTestSeedPath;

            string defaultDir = SaveStore.GetDefaultSaveDirectory();
            if (!selfTestMode && Directory.Exists(defaultDir))
            {
                _currentTargetPath = defaultDir;
            }

            Text = "윤회수선전 세이브 에디터 v1.0.0";
            Width = 1220;
            Height = 840;
            MinimumSize = new Size(880, 620);

            if (selfTestMode)
            {
                ShowInTaskbar = false;
                WindowState = FormWindowState.Minimized;
                StartPosition = FormStartPosition.Manual;
                Location = new Point(-32000, -32000);
                Opacity = 0;
            }
            else
            {
                StartPosition = FormStartPosition.CenterScreen;
            }

            _webView = new WebView2();
            _webView.Dock = DockStyle.Fill;
            Controls.Add(_webView);

            Load += OnFormLoad;
        }

        private async void OnFormLoad(object sender, EventArgs e)
        {
            try
            {
                await InitializeWebViewAsync();
            }
            catch (Exception ex)
            {
                if (_selfTestMode)
                {
                    WriteSelfTestFailure(ex.ToString());
                    Application.Exit();
                }
                else
                {
                    MessageBox.Show("WebView2 초기화에 실패했습니다:\n" + ex.Message, "오류", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private static string LoadEmbeddedHtml()
        {
            Assembly asm = Assembly.GetExecutingAssembly();
            using (Stream s = asm.GetManifestResourceStream("editor.html"))
            {
                if (s == null)
                {
                    throw new InvalidOperationException("내장 HTML 리소스(editor.html)를 찾을 수 없습니다.");
                }
                using (StreamReader reader = new StreamReader(s, Encoding.UTF8))
                {
                    return reader.ReadToEnd();
                }
            }
        }

        private static string BuildBridgeScript()
        {
            return
                "(function(){\n" +
                "  if(window.__LRS_EDITOR__){return;}\n" +
                "  var seq = 0, pending = {};\n" +
                "  window.__LRS_BRIDGE_RESOLVE__ = function(id, ok, payload){\n" +
                "    var h = pending[id];\n" +
                "    if(!h){return;}\n" +
                "    delete pending[id];\n" +
                "    if(ok){h.resolve(payload);}else{h.reject(new Error(payload || '네이티브 호출 실패'));}\n" +
                "  };\n" +
                "  function call(method, params){\n" +
                "    return new Promise(function(resolve, reject){\n" +
                "      var id = ++seq;\n" +
                "      pending[id] = { resolve: resolve, reject: reject };\n" +
                "      window.chrome.webview.postMessage(JSON.stringify({ id: id, method: method, params: params || {} }));\n" +
                "    });\n" +
                "  }\n" +
                "  window.__LRS_EDITOR__ = {\n" +
                "    getStatus: function(){ return call('getStatus'); },\n" +
                "    pickAndLoad: function(){ return call('pickAndLoad'); },\n" +
                "    saveBundle: function(files){ return call('saveBundle', { files: files }); },\n" +
                "    listBackups: function(){ return call('listBackups'); },\n" +
                "    createBackup: function(){ return call('createBackup'); },\n" +
                "    restoreBackup: function(name){ return call('restoreBackup', { name: name }); }\n" +
                "  };\n" +
                "  window.dispatchEvent(new Event('lrs-native-ready'));\n" +
                "}());";
        }

        private async Task InitializeWebViewAsync()
        {
            string userDataDir = _selfTestMode
                ? Path.Combine(_selfTestOutDir, "wv2-profile")
                : Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "ReincarnationCultivationSaveEditor", "runtime-1.0.0");

            Directory.CreateDirectory(userDataDir);
            CoreWebView2Environment env = await CoreWebView2Environment.CreateAsync(null, userDataDir, null);
            await _webView.EnsureCoreWebView2Async(env);

            CoreWebView2 core = _webView.CoreWebView2;
            CoreWebView2Settings settings = core.Settings;
            settings.AreDevToolsEnabled = false;
            settings.AreDefaultContextMenusEnabled = false;
            settings.AreHostObjectsAllowed = false;
            settings.IsStatusBarEnabled = false;
            settings.IsBuiltInErrorPageEnabled = false;

            core.NavigationStarting += delegate (object s, CoreWebView2NavigationStartingEventArgs navArgs)
            {
                string u = navArgs.Uri ?? string.Empty;
                if (!string.Equals(u, "about:blank", StringComparison.OrdinalIgnoreCase) &&
                    !u.StartsWith("data:text/html", StringComparison.OrdinalIgnoreCase))
                {
                    navArgs.Cancel = true;
                }
            };
            core.WebMessageReceived += OnWebMessageReceived;
            core.NavigationCompleted += OnNavigationCompleted;

            await core.AddScriptToExecuteOnDocumentCreatedAsync(BuildBridgeScript());
            string html = LoadEmbeddedHtml();
            core.NavigateToString(html);
        }

        private async void OnNavigationCompleted(object sender, CoreWebView2NavigationCompletedEventArgs e)
        {
            if (!_selfTestMode || _selfTestDone)
            {
                return;
            }
            _selfTestDone = true;
            try
            {
                await RunSelfTestAsync();
            }
            catch (Exception ex)
            {
                WriteSelfTestFailure(ex.ToString());
            }
            finally
            {
                Application.Exit();
            }
        }

        private async Task RunSelfTestAsync()
        {
            await Task.Delay(350);
            JavaScriptSerializer ser = SaveStore.CreateSerializer();

            string probeJs =
                "(function(){" +
                "  var badge = document.getElementById('runtime-badge');" +
                "  var tabs = document.querySelectorAll('[role=\"tab\"]').length;" +
                "  var idx = window.LrsCore.createCatalogIndex(window.LrsCatalogData);" +
                "  var demo = window.LrsCore.createDemoBundle(idx);" +
                "  var encoded = window.LrsCodec.encodeBundle(demo, 2);" +
                "  var val = window.LrsCore.validateBundle(demo, idx);" +
                "  return {" +
                "    badgeText: badge ? badge.textContent : ''," +
                "    badgeState: badge ? badge.getAttribute('data-state') : ''," +
                "    tabCount: tabs," +
                "    validDemo: val.valid," +
                "    itemCount: (window.LrsCatalogData.items || []).length," +
                "    skillCount: (window.LrsCatalogData.skills || []).length," +
                "    encoded: encoded" +
                "  };" +
                "})()";

            string rawProbe = await _webView.CoreWebView2.ExecuteScriptAsync(probeJs);
            Dictionary<string, object> probe = ser.Deserialize<Dictionary<string, object>>(rawProbe);

            string roundTripDir = Path.Combine(_selfTestOutDir, "roundtrip-save");
            Directory.CreateDirectory(roundTripDir);

            bool seedTested = false;
            if (!string.IsNullOrEmpty(_selfTestSeedPath) && (Directory.Exists(_selfTestSeedPath) || File.Exists(_selfTestSeedPath)))
            {
                seedTested = true;
                if (Directory.Exists(_selfTestSeedPath))
                {
                    string[] files = Directory.GetFiles(_selfTestSeedPath, "*.json");
                    for (int i = 0; i < files.Length; i++)
                    {
                        File.Copy(files[i], Path.Combine(roundTripDir, Path.GetFileName(files[i])), true);
                    }
                }
                else
                {
                    File.Copy(_selfTestSeedPath, Path.Combine(roundTripDir, Path.GetFileName(_selfTestSeedPath)), true);
                }
            }
            else
            {
                Dictionary<string, object> encObj = probe["encoded"] as Dictionary<string, object>;
                if (encObj != null)
                {
                    foreach (KeyValuePair<string, object> kv in encObj)
                    {
                        SaveStore.AtomicWriteBytes(Path.Combine(roundTripDir, kv.Key), Encoding.UTF8.GetBytes(Convert.ToString(kv.Value)));
                    }
                }
            }

            Dictionary<string, string> loaded = SaveStore.LoadTarget(roundTripDir);
            Dictionary<string, string> toSave = new Dictionary<string, string>(loaded, StringComparer.Ordinal);
            SaveOperationResult saveRes = SaveStore.SaveFilesMap(roundTripDir, toSave);
            Dictionary<string, string> restored = SaveStore.RestoreBackup(roundTripDir, saveRes.BackupName);

            CoreWebView2Settings s = _webView.CoreWebView2.Settings;
            Dictionary<string, object> receipt = new Dictionary<string, object>();
            receipt["ok"] = Convert.ToBoolean(probe["validDemo"]) && loaded.Count > 0 && restored.Count == loaded.Count;
            receipt["version"] = "1.0.0";
            receipt["webView2Version"] = _webView.CoreWebView2.Environment.BrowserVersionString;
            receipt["badgeText"] = probe["badgeText"];
            receipt["badgeState"] = probe["badgeState"];
            receipt["tabCount"] = probe["tabCount"];
            receipt["itemCount"] = probe["itemCount"];
            receipt["skillCount"] = probe["skillCount"];
            receipt["loadedFiles"] = loaded.Count;
            receipt["backupName"] = saveRes.BackupName;
            receipt["seedTested"] = seedTested;
            receipt["settingsVerified"] = new Dictionary<string, object>
            {
                { "AreDevToolsEnabled", s.AreDevToolsEnabled },
                { "AreDefaultContextMenusEnabled", s.AreDefaultContextMenusEnabled },
                { "AreHostObjectsAllowed", s.AreHostObjectsAllowed },
                { "IsStatusBarEnabled", s.IsStatusBarEnabled }
            };

            string receiptPath = Path.Combine(_selfTestOutDir, "receipt.json");
            SaveStore.AtomicWriteBytes(receiptPath, Encoding.UTF8.GetBytes(ser.Serialize(receipt) + "\n"));
        }

        private void WriteSelfTestFailure(string detail)
        {
            try
            {
                Directory.CreateDirectory(_selfTestOutDir);
                Dictionary<string, object> receipt = new Dictionary<string, object>();
                receipt["ok"] = false;
                receipt["error"] = detail;
                File.WriteAllText(Path.Combine(_selfTestOutDir, "receipt.json"), SaveStore.CreateSerializer().Serialize(receipt), Encoding.UTF8);
            }
            catch { }
        }

        private async void OnWebMessageReceived(object sender, CoreWebView2WebMessageReceivedEventArgs args)
        {
            JavaScriptSerializer ser = SaveStore.CreateSerializer();
            int id = 0;
            Task<string> resolveTask = null;
            try
            {
                string srcUri = (_webView.CoreWebView2 != null ? (_webView.CoreWebView2.Source ?? string.Empty) : string.Empty);
                if (!string.Equals(srcUri, "about:blank", StringComparison.OrdinalIgnoreCase) &&
                    !srcUri.StartsWith("data:text/html", StringComparison.OrdinalIgnoreCase))
                {
                    throw new SaveSafetyException("신뢰할 수 없는 문서 출처의 네이티브 요청입니다.");
                }
                string raw = args.TryGetWebMessageAsString();
                Dictionary<string, object> msg = ser.Deserialize<Dictionary<string, object>>(raw);
                id = Convert.ToInt32(msg["id"]);
                string method = Convert.ToString(msg["method"]);
                Dictionary<string, object> p = msg.ContainsKey("params") ? msg["params"] as Dictionary<string, object> : null;

                object result = HandleRpc(method, p ?? new Dictionary<string, object>());
                string js = "window.__LRS_BRIDGE_RESOLVE__(" + id + ", true, " + ser.Serialize(result) + ");";
                await _webView.CoreWebView2.ExecuteScriptAsync(js);
            }
            catch (Exception ex)
            {
                if (id > 0)
                {
                    string js = "window.__LRS_BRIDGE_RESOLVE__(" + id + ", false, " + ser.Serialize(ex.Message) + ");";
                    try { resolveTask = _webView.CoreWebView2.ExecuteScriptAsync(js); } catch { }
                }
            }
            if (resolveTask != null)
            {
                try { await resolveTask; } catch { }
            }
        }

        private object HandleRpc(string method, Dictionary<string, object> p)
        {
            if (method == "getStatus")
            {
                Dictionary<string, object> res = new Dictionary<string, object>();
                res["gameRunning"] = SaveStore.IsGameRunning();
                res["hasSaveDir"] = !string.IsNullOrEmpty(_currentTargetPath) && (Directory.Exists(_currentTargetPath) || File.Exists(_currentTargetPath));
                res["saveDir"] = _currentTargetPath ?? string.Empty;
                if ((bool)res["hasSaveDir"])
                {
                    res["files"] = SaveStore.LoadTarget(_currentTargetPath);
                    res["backups"] = ToBackupMaps(SaveStore.ListBackups(_currentTargetPath));
                }
                return res;
            }

            if (method == "pickAndLoad")
            {
                string picked = PickTargetPath();
                if (string.IsNullOrEmpty(picked))
                {
                    return new Dictionary<string, object> { { "cancelled", true } };
                }
                _currentTargetPath = picked;
                return new Dictionary<string, object>
                {
                    { "path", picked },
                    { "files", SaveStore.LoadTarget(picked) },
                    { "backups", ToBackupMaps(SaveStore.ListBackups(picked)) }
                };
            }

            if (method == "saveBundle")
            {
                if (string.IsNullOrEmpty(_currentTargetPath))
                {
                    string picked = PickTargetPath();
                    if (string.IsNullOrEmpty(picked))
                    {
                        throw new SaveSafetyException("저장할 대상 폴더 또는 파일을 선택하지 않았습니다.");
                    }
                    _currentTargetPath = picked;
                }
                Dictionary<string, object> rawFiles = p.ContainsKey("files") ? p["files"] as Dictionary<string, object> : null;
                if (rawFiles == null)
                {
                    throw new SaveSafetyException("저장할 파일 데이터가 전달되지 않았습니다.");
                }
                Dictionary<string, string> encoded = new Dictionary<string, string>(StringComparer.Ordinal);
                foreach (KeyValuePair<string, object> kv in rawFiles)
                {
                    encoded[kv.Key] = Convert.ToString(kv.Value);
                }
                SaveOperationResult op = SaveStore.SaveFilesMap(_currentTargetPath, encoded);
                return new Dictionary<string, object>
                {
                    { "ok", op.Ok },
                    { "savedFiles", op.SavedFiles },
                    { "backupName", op.BackupName },
                    { "backups", ToBackupMaps(op.Backups) }
                };
            }

            if (method == "listBackups")
            {
                if (string.IsNullOrEmpty(_currentTargetPath))
                {
                    return new List<object>();
                }
                return ToBackupMaps(SaveStore.ListBackups(_currentTargetPath));
            }

            if (method == "createBackup")
            {
                if (string.IsNullOrEmpty(_currentTargetPath))
                {
                    throw new SaveSafetyException("먼저 저장 폴더나 파일을 불러오세요.");
                }
                string bak = SaveStore.CreateBackup(_currentTargetPath);
                return new Dictionary<string, object>
                {
                    { "ok", true },
                    { "backupName", bak },
                    { "backups", ToBackupMaps(SaveStore.ListBackups(_currentTargetPath)) }
                };
            }

            if (method == "restoreBackup")
            {
                if (string.IsNullOrEmpty(_currentTargetPath))
                {
                    throw new SaveSafetyException("먼저 저장 폴더나 파일을 불러오세요.");
                }
                string name = p.ContainsKey("name") ? Convert.ToString(p["name"]) : string.Empty;
                Dictionary<string, string> files = SaveStore.RestoreBackup(_currentTargetPath, name);
                return new Dictionary<string, object>
                {
                    { "ok", true },
                    { "files", files },
                    { "backups", ToBackupMaps(SaveStore.ListBackups(_currentTargetPath)) }
                };
            }

            throw new InvalidOperationException("지원하지 않는 네이티브 호출입니다: " + method);
        }

        private string PickTargetPath()
        {
            string initial = SaveStore.GetDefaultSaveDirectory();
            using (FolderBrowserDialog fbd = new FolderBrowserDialog())
            {
                fbd.Description = "윤회수선전 GameData 저장 폴더를 선택하세요 (취소 시 단일 JSON 파일 선택).";
                if (!string.IsNullOrEmpty(_currentTargetPath) && Directory.Exists(_currentTargetPath))
                {
                    fbd.SelectedPath = _currentTargetPath;
                }
                else if (Directory.Exists(initial))
                {
                    fbd.SelectedPath = initial;
                }
                if (fbd.ShowDialog(this) == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    return fbd.SelectedPath;
                }
            }
            using (OpenFileDialog ofd = new OpenFileDialog())
            {
                ofd.Title = "윤회수선전 저장 JSON 파일 선택";
                ofd.Filter = "저장 JSON 파일 (*.json;*.bak)|*.json;*.bak|모든 파일 (*.*)|*.*";
                if (Directory.Exists(initial))
                {
                    ofd.InitialDirectory = initial;
                }
                if (ofd.ShowDialog(this) == DialogResult.OK && !string.IsNullOrWhiteSpace(ofd.FileName))
                {
                    return ofd.FileName;
                }
            }
            return null;
        }

        private static List<Dictionary<string, object>> ToBackupMaps(List<BackupEntry> entries)
        {
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            if (entries == null)
            {
                return list;
            }
            for (int i = 0; i < entries.Count; i++)
            {
                list.Add(new Dictionary<string, object>
                {
                    { "name", entries[i].Name },
                    { "mtime", entries[i].Mtime }
                });
            }
            return list;
        }
    }

    internal static class Program
    {
        [STAThread]
        private static int Main(string[] args)
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            bool selfTest = false;
            string outDir = null;
            string seedPath = null;

            for (int i = 0; i < args.Length; i++)
            {
                if (string.Equals(args[i], "--self-test", StringComparison.OrdinalIgnoreCase))
                {
                    selfTest = true;
                    if (i + 1 < args.Length) { outDir = args[++i]; }
                    if (i + 1 < args.Length) { seedPath = args[++i]; }
                }
            }

            if (selfTest && string.IsNullOrEmpty(outDir))
            {
                outDir = Path.Combine(Path.GetTempPath(), "lrs-editor-selftest");
            }

            Application.Run(new EditorForm(selfTest, outDir, seedPath));
            return 0;
        }
    }
}
