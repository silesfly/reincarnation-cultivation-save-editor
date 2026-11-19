#!/usr/bin/env python3
"""lrs_editor.py CLI 및 로컬 HTTP 서버 통합 테스트."""

import json
import os
import subprocess
import sys
import tempfile
import unittest
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import lrs_editor


def make_sample_bundle_dir(base: Path) -> Path:
    save_dir = base / "GameData"
    save_dir.mkdir(parents=True, exist_ok=True)
    (save_dir / "GameData.json").write_text(
        json.dumps({"reincarnationStone": 50, "reincarnationCount": 2, "clearanceCount": 1, "gameMode": 0}),
        encoding="utf-8",
    )
    (save_dir / "NewPlayerInfo.json").write_text(
        json.dumps({
            "roleInfo": {"maxHealth": 120, "currentHealth": 120, "maxMagic": 60, "currentMagic": 60, "maxCultivation": 100, "currentCultivation": 10},
            "basicPropertyInfo": {"lifeTime": 70, "physique": 10, "comprehension": 10, "attack": 15, "speed": 10},
            "alchemyInfo": {"alchemyLevel": 1, "alchemyExp": 0},
            "refineInfo": {"refineLevel": 1, "refineExp": 0},
            "miscInfo": {"playerName": "초기자", "realmLevel": 2, "lingShi": 1000, "likeability1": 0, "likeability2": 0, "likeability3": 0},
            "lingGenInfo": {"gold": 30, "wood": 30, "water": 30, "fire": 30, "earth": 30},
        }, ensure_ascii=False),
        encoding="utf-8",
    )
    (save_dir / "PlayerBagDataInfo.json").write_text(json.dumps({"Bags": []}), encoding="utf-8")
    (save_dir / "PlayerEquipDataInfo.json").write_text(json.dumps({"equipmentDic": {"Weapon": None, "Clothes": None, "Shoes": None}}), encoding="utf-8")
    (save_dir / "PlayerFaBaoDataInfo.json").write_text(json.dumps({"faBaoList": [], "currentAvailableSlotNum": 2}), encoding="utf-8")
    (save_dir / "PlayerSkillDataInfo.json").write_text(json.dumps({"skillList": [], "existedSkillIDs": []}), encoding="utf-8")
    return save_dir


class LrsEditorCliAndServerTests(unittest.TestCase):
    def test_cli_inspect_validate_edit_and_backup_restore(self):
        with tempfile.TemporaryDirectory() as tmp:
            save_dir = make_sample_bundle_dir(Path(tmp))

            proc = subprocess.run(
                [sys.executable, str(ROOT / "lrs_editor.py"), "inspect", str(save_dir), "--json"],
                capture_output=True, text=True, check=True,
            )
            info = json.loads(proc.stdout)
            self.assertEqual(info["playerName"], "초기자")
            self.assertEqual(info["lingShi"], 1000)

            subprocess.run(
                [sys.executable, str(ROOT / "lrs_editor.py"), "validate", str(save_dir)],
                capture_output=True, text=True, check=True,
            )

            # Dry run must not mutate disk
            subprocess.run(
                [sys.executable, str(ROOT / "lrs_editor.py"), "edit", str(save_dir), "--ling-shi", "88888", "--dry-run"],
                capture_output=True, text=True, check=True,
            )
            after_dry = json.loads((save_dir / "NewPlayerInfo.json").read_text(encoding="utf-8"))
            self.assertEqual(after_dry["miscInfo"]["lingShi"], 1000)

            # Real edit creates backup and updates values
            subprocess.run(
                [sys.executable, str(ROOT / "lrs_editor.py"), "edit", str(save_dir), "--preset", "starter_boost", "--ling-shi", "77777"],
                capture_output=True, text=True, check=True,
            )
            after_edit = json.loads((save_dir / "NewPlayerInfo.json").read_text(encoding="utf-8"))
            self.assertEqual(after_edit["miscInfo"]["lingShi"], 77777)

            backups = lrs_editor.list_backups(save_dir)
            self.assertEqual(len(backups), 1)

            # Restore rolls back lingShi to 1000
            lrs_editor.restore_backup(save_dir, backups[0]["name"])
            restored = json.loads((save_dir / "NewPlayerInfo.json").read_text(encoding="utf-8"))
            self.assertEqual(restored["miscInfo"]["lingShi"], 1000)

    def test_safety_rejections_and_backup_pruning(self):
        with tempfile.TemporaryDirectory() as tmp:
            base = Path(tmp)
            save_dir = make_sample_bundle_dir(base)

            with self.assertRaises(lrs_editor.SaveSafetyError):
                lrs_editor.validate_safe_path(Path("\\\\evil-host\\share\\GameData.json"))
            with self.assertRaises(lrs_editor.SaveSafetyError):
                lrs_editor.validate_safe_path(base / "NewPlayerInfo.json:ads")
            with self.assertRaises(lrs_editor.SaveSafetyError):
                lrs_editor.validate_safe_path(base / "con.json")

            link_path = base / "symlink-dir"
            os.symlink(save_dir, link_path)
            with self.assertRaises(lrs_editor.SaveSafetyError):
                lrs_editor.validate_safe_path(link_path / "GameData.json")

            old = os.environ.get("LRS_SIMULATE_GAME_RUNNING")
            try:
                os.environ["LRS_SIMULATE_GAME_RUNNING"] = "1"
                with self.assertRaises(lrs_editor.SaveSafetyError):
                    lrs_editor.ensure_game_not_running()
            finally:
                if old is None:
                    os.environ.pop("LRS_SIMULATE_GAME_RUNNING", None)
                else:
                    os.environ["LRS_SIMULATE_GAME_RUNNING"] = old

            # Pruning max 20 backups
            for _ in range(23):
                lrs_editor.create_backup(save_dir)
            self.assertLessEqual(len(lrs_editor.list_backups(save_dir)), 20)

    def test_http_server_security_and_roundtrip(self):
        with tempfile.TemporaryDirectory() as tmp:
            save_dir = make_sample_bundle_dir(Path(tmp))
            server, token, _th = lrs_editor.start_server(save_dir, port=0)
            try:
                base = f"http://127.0.0.1:{server.server_port}"

                # Root HTML exposes token meta & connects to self
                with urllib.request.urlopen(f"{base}/", timeout=5) as resp:
                    html = resp.read().decode("utf-8")
                    self.assertIn(f'<meta name="lrs-token" content="{token}">', html)
                    self.assertIn("connect-src 'self'", html)

                # Bad Host blocked
                req_bad_host = urllib.request.Request(f"{base}/api/status", headers={"Host": "evil.example:9999", "X-Lrs-Token": token})
                with self.assertRaises(urllib.error.HTTPError) as ctx:
                    urllib.request.urlopen(req_bad_host, timeout=5)
                self.assertEqual(ctx.exception.code, 403)
                ctx.exception.close()

                # Missing token blocked
                with self.assertRaises(urllib.error.HTTPError) as ctx2:
                    urllib.request.urlopen(f"{base}/api/bundle", timeout=5)
                self.assertEqual(ctx2.exception.code, 403)
                ctx2.exception.close()

                # Bad Origin CSRF POST blocked
                bad_post = urllib.request.Request(
                    f"{base}/api/backup",
                    data=b"{}",
                    method="POST",
                    headers={"X-Lrs-Token": token, "Origin": "https://evil.example", "Content-Type": "application/json"},
                )
                with self.assertRaises(urllib.error.HTTPError) as ctx3:
                    urllib.request.urlopen(bad_post, timeout=5)
                self.assertEqual(ctx3.exception.code, 403)
                ctx3.exception.close()

                # Load bundle & save via POST /api/save
                req_bundle = urllib.request.Request(f"{base}/api/bundle", headers={"X-Lrs-Token": token})
                with urllib.request.urlopen(req_bundle, timeout=5) as resp:
                    files = json.loads(resp.read().decode("utf-8"))["files"]

                np = json.loads(files["NewPlayerInfo.json"])
                np["miscInfo"]["lingShi"] = 55555
                files["NewPlayerInfo.json"] = json.dumps(np, ensure_ascii=False, indent=2) + "\n"

                save_req = urllib.request.Request(
                    f"{base}/api/save",
                    data=json.dumps({"files": files}).encode("utf-8"),
                    method="POST",
                    headers={
                        "X-Lrs-Token": token,
                        "Origin": base,
                        "Sec-Fetch-Site": "same-origin",
                        "Content-Type": "application/json",
                    },
                )
                with urllib.request.urlopen(save_req, timeout=5) as resp:
                    res = json.loads(resp.read().decode("utf-8"))
                    self.assertTrue(res["ok"])
                    bak_name = res["backupName"]

                saved_np = json.loads((save_dir / "NewPlayerInfo.json").read_text(encoding="utf-8"))
                self.assertEqual(saved_np["miscInfo"]["lingShi"], 55555)

                # Restore via POST /api/restore
                res_req = urllib.request.Request(
                    f"{base}/api/restore",
                    data=json.dumps({"name": bak_name}).encode("utf-8"),
                    method="POST",
                    headers={"X-Lrs-Token": token, "Origin": base, "Content-Type": "application/json"},
                )
                with urllib.request.urlopen(res_req, timeout=5) as resp:
                    r_res = json.loads(resp.read().decode("utf-8"))
                    self.assertTrue(r_res["ok"])

                restored_np = json.loads((save_dir / "NewPlayerInfo.json").read_text(encoding="utf-8"))
                self.assertEqual(restored_np["miscInfo"]["lingShi"], 1000)
            finally:
                server.shutdown()
                server.server_close()


if __name__ == "__main__":
    unittest.main()
