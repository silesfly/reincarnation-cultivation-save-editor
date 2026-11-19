using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using ReincarnationCultivationSaveEditor;

internal static class SaveStoreTests
{
    private static int Main()
    {
        string root = Path.Combine(Path.GetTempPath(), "lrs-cs-test-" + Guid.NewGuid().ToString("N").Substring(0, 8));
        Directory.CreateDirectory(root);
        try
        {
            TestBundleRoundTripAndBackup(root);
            TestSingleFileRoundTrip(root);
            TestSecurityPathRejections(root);
            TestGameRunningBlock();
            Console.WriteLine("SaveStoreTests passed all cases.");
            return 0;
        }
        finally
        {
            try { Directory.Delete(root, true); } catch { }
        }
    }

    private static void Assert(bool cond, string msg)
    {
        if (!cond) { throw new InvalidOperationException("ASSERT FAILED: " + msg); }
    }

    private static void TestBundleRoundTripAndBackup(string root)
    {
        string dir = Path.Combine(root, "GameData");
        Directory.CreateDirectory(dir);
        File.WriteAllText(Path.Combine(dir, "GameData.json"), "{\"reincarnationStone\":10,\"gameMode\":0}\n", Encoding.UTF8);
        File.WriteAllText(Path.Combine(dir, "NewPlayerInfo.json"), "{\"miscInfo\":{\"playerName\":\"시험자\",\"realmLevel\":2,\"lingShi\":500},\"roleInfo\":{},\"basicPropertyInfo\":{}}\n", Encoding.UTF8);

        Dictionary<string, string> loaded = SaveStore.LoadTarget(dir);
        Assert(loaded.Count == 2, "expected 2 loaded files");

        Dictionary<string, string> updated = new Dictionary<string, string>(loaded, StringComparer.Ordinal);
        updated["GameData.json"] = "{\"reincarnationStone\":999,\"gameMode\":0}\n";
        SaveOperationResult res = SaveStore.SaveFilesMap(dir, updated);
        Assert(res.Ok && !string.IsNullOrEmpty(res.BackupName), "expected save + backup");
        Assert(File.ReadAllText(Path.Combine(dir, "GameData.json"), Encoding.UTF8).Contains("999"), "expected updated value");

        Dictionary<string, string> restored = SaveStore.RestoreBackup(dir, res.BackupName);
        Assert(restored["GameData.json"].Contains("10"), "expected restored value 10");
    }

    private static void TestSingleFileRoundTrip(string root)
    {
        string single = Path.Combine(root, "NewPlayerInfo.json");
        File.WriteAllText(single, "{\"miscInfo\":{\"playerName\":\"단독\",\"realmLevel\":1,\"lingShi\":100},\"roleInfo\":{},\"basicPropertyInfo\":{}}\n", Encoding.UTF8);
        Dictionary<string, string> loaded = SaveStore.LoadTarget(single);
        Assert(loaded.Count == 1, "expected 1 file");
        SaveOperationResult res = SaveStore.SaveFilesMap(single, new Dictionary<string, string>
        {
            { "NewPlayerInfo.json", "{\"miscInfo\":{\"playerName\":\"변경\",\"realmLevel\":3,\"lingShi\":777},\"roleInfo\":{},\"basicPropertyInfo\":{}}\n" }
        });
        Assert(res.Ok, "expected single file save ok");
        Dictionary<string, string> restored = SaveStore.RestoreBackup(single, res.BackupName);
        Assert(restored["NewPlayerInfo.json"].Contains("100"), "expected single file restored");
    }

    private static void TestSecurityPathRejections(string root)
    {
        string[] badPaths = new string[]
        {
            "\\\\evil-server\\share\\GameData.json",
            Path.Combine(root, "NewPlayerInfo.json:hiddenStream"),
            Path.Combine(root, "con.json"),
            Path.Combine(root, "nul")
        };
        for (int i = 0; i < badPaths.Length; i++)
        {
            bool thrown = false;
            try { SaveStore.ValidateSafePath(badPaths[i]); }
            catch (SaveSafetyException) { thrown = true; }
            Assert(thrown, "expected rejection for path: " + badPaths[i]);
        }

        string realFile = Path.Combine(root, "real.json");
        File.WriteAllText(realFile, "{\"gameMode\":0,\"reincarnationStone\":1}\n", Encoding.UTF8);
        string linkDir = Path.Combine(root, "junction-dir");
        Process p = Process.Start(new ProcessStartInfo("cmd.exe", "/c mklink /J \"" + linkDir + "\" \"" + root + "\"")
        {
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true
        });
        p.WaitForExit(5000);
        if (Directory.Exists(linkDir))
        {
            bool thrown = false;
            try { SaveStore.ValidateSafePath(Path.Combine(linkDir, "real.json")); }
            catch (SaveSafetyException) { thrown = true; }
            Assert(thrown, "expected rejection for junction path");
        }
    }

    private static void TestGameRunningBlock()
    {
        Environment.SetEnvironmentVariable("LRS_SIMULATE_GAME_RUNNING", "1");
        bool thrown = false;
        try { SaveStore.EnsureGameNotRunning(); }
        catch (SaveSafetyException) { thrown = true; }
        finally { Environment.SetEnvironmentVariable("LRS_SIMULATE_GAME_RUNNING", null); }
        Assert(thrown, "expected game running block");
    }
}
