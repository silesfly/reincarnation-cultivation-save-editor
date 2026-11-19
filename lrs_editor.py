#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""윤회수선전(Re-xiuxian Legend) 세이브 에디터 CLI 및 로컬 웹 서버 (표준 라이브러리 전용)."""

from __future__ import annotations

import argparse
import hashlib
import http.server
import json
import os
import platform
import re
import secrets
import shutil
import stat as statmod
import subprocess
import sys
import tempfile
import threading
import time
import urllib.parse
import urllib.request
import webbrowser
from datetime import datetime
from pathlib import Path
from typing import Any

ROOT_DIR = Path(__file__).resolve().parent
HTML_DIST_PATH = ROOT_DIR / "dist" / "ReincarnationCultivationSaveEditor-v1.0.0.html"
CATALOG_JS_PATH = ROOT_DIR / "src" / "catalog-data.js"

KNOWN_SAVE_FILES = [
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
    "SteamAchievementData.json",
]

CANONICAL_FILES = KNOWN_SAVE_FILES[:12]
MAX_BACKUPS = 20
MAX_REQUEST_BYTES = 16 * 1024 * 1024
BACKUP_DIR_NAME = ".lrs_backups"

RESERVED_NAMES = {
    "con", "prn", "aux", "nul",
    *(f"com{i}" for i in range(1, 10)),
    *(f"lpt{i}" for i in range(1, 10)),
}

PROCESS_KEYWORDS = (
    "re-xiuxian legend",
    "轮回修仙录",
)

PRESET_DEFINITIONS = [
    ("starter_boost", "입문 자원 강화", "영석 +50,000, 환생석 +1,000, 수명 200+, 오행 영근 60+ 설정"),
    ("realm_peak", "최상위 경지 도달", "경지 6단계, 연단·연기 5단계, 능력치·오행 영근 100 설정"),
    ("heroine_max", "인연 호감도 최대", "임소엽·조명월·소유리 호감도 +10 및 기연 상향"),
    ("fabao_skill_master", "법보·법술·장비 일괄 정비", "상위 무기·의복·신발 장착 및 법보·법술 묶음 추가"),
]


class SaveSafetyError(RuntimeError):
    """저장 안전 및 검증 오류."""


# ---------------------------------------------------------------------------
# 카탈로그 로드
# ---------------------------------------------------------------------------

def load_catalog() -> dict[str, Any]:
    if not CATALOG_JS_PATH.is_file():
        return {}
    text = CATALOG_JS_PATH.read_text(encoding="utf-8")
    marker = "var LrsCatalogData = "
    end_marker = ";\n  return LrsCatalogData;"
    try:
        start = text.index(marker) + len(marker)
        end = text.index(end_marker, start)
        return json.loads(text[start:end])
    except (ValueError, json.JSONDecodeError):
        return {}


def catalog_map(catalog: dict[str, Any], key: str) -> dict[int, dict[str, Any]]:
    rows = catalog.get(key) or []
    out: dict[int, dict[str, Any]] = {}
    for row in rows:
        if isinstance(row, dict) and "id" in row:
            try:
                out[int(row["id"])] = row
            except (TypeError, ValueError):
                pass
    return out


# ---------------------------------------------------------------------------
# 안전·위생 검사
# ---------------------------------------------------------------------------

def is_game_running() -> bool:
    if os.environ.get("LRS_SIMULATE_GAME_RUNNING") == "1":
        return True
    system = platform.system().lower()
    try:
        if system == "windows":
            flags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
            res = subprocess.run(
                ["tasklist", "/FO", "CSV", "/NH"],
                capture_output=True,
                text=True,
                timeout=3,
                creationflags=flags,
            )
            hay = res.stdout.lower()
            return any(kw in hay for kw in PROCESS_KEYWORDS)
        if Path("/proc").is_dir():
            for p in Path("/proc").iterdir():
                if not p.name.isdigit():
                    continue
                comm = p / "comm"
                try:
                    name = comm.read_text(encoding="utf-8", errors="ignore").strip().lower()
                except OSError:
                    continue
                if any(kw in name for kw in PROCESS_KEYWORDS):
                    return True
    except OSError:
        return False
    return False


def ensure_game_not_running() -> None:
    if is_game_running():
        raise SaveSafetyError("윤회수선전 게임 프로세스가 실행 중입니다. 게임을 종료한 뒤 다시 시도하세요.")


def validate_safe_path(path: Path) -> Path:
    raw = str(path)
    if raw.startswith("\\\\") or raw.startswith("//"):
        raise SaveSafetyError(f"네트워크(UNC) 경로는 허용되지 않습니다: {raw}")

    parts = path.parts
    for idx, part in enumerate(parts):
        if idx == 0 and len(part) >= 2 and part[1] == ":":
            continue
        if ":" in part:
            raise SaveSafetyError(f"대체 데이터 스트림(ADS) 경로는 허용되지 않습니다: {part}")
        stem = part.split(".")[0].strip().lower()
        if stem in RESERVED_NAMES:
            raise SaveSafetyError(f"예약된 장치 이름은 사용할 수 없습니다: {part}")

    cur = Path(path.anchor) if path.anchor else Path(".")
    for part in parts:
        if part in ("", path.anchor):
            continue
        cur = cur / part
        if cur.exists() or os.path.lexists(cur):
            try:
                st = os.lstat(cur)
            except OSError as exc:
                raise SaveSafetyError(f"경로 상태를 확인할 수 없습니다: {cur}") from exc
            if statmod.S_ISLNK(st.st_mode):
                raise SaveSafetyError(f"심볼릭 링크 경로는 허용되지 않습니다: {cur}")
            if statmod.S_ISREG(st.st_mode) and st.st_nlink > 1:
                raise SaveSafetyError(f"다중 하드링크 파일은 허용되지 않습니다: {cur}")
            if hasattr(statmod, "FILE_ATTRIBUTE_REPARSE_POINT"):
                attrs = getattr(st, "st_file_attributes", 0)
                if attrs & statmod.FILE_ATTRIBUTE_REPARSE_POINT:
                    raise SaveSafetyError(f"재분석 지점(정션/심볼릭 링크) 경로는 허용되지 않습니다: {cur}")
    return path


def _open_pinned_dir(dir_path: Path) -> int:
    flags = os.O_RDONLY
    if hasattr(os, "O_DIRECTORY"):
        flags |= os.O_DIRECTORY
    if hasattr(os, "O_NOFOLLOW"):
        flags |= os.O_NOFOLLOW
    return os.open(str(dir_path), flags)


def atomic_write_bytes(target: Path, data: bytes) -> None:
    validate_safe_path(target)
    parent = target.parent
    parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        st = os.lstat(target)
        if statmod.S_ISLNK(st.st_mode):
            raise SaveSafetyError(f"대상 파일이 심볼릭 링크입니다: {target}")
        if st.st_nlink > 1:
            raise SaveSafetyError(f"대상 파일에 다중 하드링크가 있습니다: {target}")

    dir_fd = None
    if hasattr(os, "O_NOFOLLOW") and os.name == "posix":
        dir_fd = _open_pinned_dir(parent)
    try:
        fd, tmp_name = tempfile.mkstemp(prefix=target.name + ".", suffix=".tmp", dir=str(parent))
        try:
            with os.fdopen(fd, "wb") as fh:
                fh.write(data)
                fh.flush()
                os.fsync(fh.fileno())
            if dir_fd is not None and hasattr(os, "replace"):
                tmp_base = os.path.basename(tmp_name)
                os.replace(tmp_base, target.name, src_dir_fd=dir_fd, dst_dir_fd=dir_fd)
                os.fsync(dir_fd)
            else:
                os.replace(tmp_name, target)
        except BaseException:
            try:
                if os.path.exists(tmp_name):
                    os.unlink(tmp_name)
            except OSError:
                pass
            raise
    finally:
        if dir_fd is not None:
            os.close(dir_fd)


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


# ---------------------------------------------------------------------------
# 번들 / 단일 파일 입출력 및 백업
# ---------------------------------------------------------------------------

def detect_kind(filename: str, obj: Any) -> str | None:
    base = Path(filename).name.lower()
    for canonical in KNOWN_SAVE_FILES:
        if canonical.lower() == base or canonical.lower().removesuffix(".json") == base.removesuffix(".json"):
            return canonical
    if not isinstance(obj, dict):
        return None
    if "miscInfo" in obj and "roleInfo" in obj and "basicPropertyInfo" in obj:
        return "NewPlayerInfo.json"
    if "reincarnationStone" in obj and "gameMode" in obj:
        return "GameData.json"
    if isinstance(obj.get("Bags"), list):
        return "PlayerBagDataInfo.json"
    if isinstance(obj.get("equipmentDic"), dict):
        return "PlayerEquipDataInfo.json"
    if isinstance(obj.get("faBaoList"), list):
        return "PlayerFaBaoDataInfo.json"
    if isinstance(obj.get("skillList"), list):
        return "PlayerSkillDataInfo.json"
    if isinstance(obj.get("talentDataList"), list):
        return "MDTalentData.json"
    if isinstance(obj.get("talentIDs"), list):
        return "BSTalentData.json"
    if "basicGold" in obj and "extraGold" in obj:
        return "LingGenData.json"
    if isinstance(obj.get("unLockedIDs"), list):
        return "EndingData.json"
    if isinstance(obj.get("achievementActiveDict"), dict):
        return "AchievementData.json"
    if "currentYear" in obj and "occurredGameEvents" in obj:
        return "GameEventInfo.json"
    return None


def read_json_file(path: Path) -> tuple[str, dict[str, Any]]:
    validate_safe_path(path)
    raw = path.read_bytes()
    text = raw.decode("utf-8-sig")
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError as exc:
        raise SaveSafetyError(f"JSON 해석에 실패했습니다: {path.name} ({exc})") from exc
    if not isinstance(parsed, dict):
        raise SaveSafetyError(f"저장 파일의 최상위 JSON은 객체여야 합니다: {path.name}")
    return text, parsed


def load_target(target: Path) -> tuple[bool, dict[str, dict[str, Any]], dict[str, str]]:
    """대상이 디렉토리인지 여부, 파일별 파싱 객체, 원본 문자열 맵을 반환한다."""
    validate_safe_path(target)
    if not target.exists():
        raise SaveSafetyError(f"대상 경로를 찾을 수 없습니다: {target}")

    files_obj: dict[str, dict[str, Any]] = {}
    files_text: dict[str, str] = {}

    if target.is_dir():
        known_lower = {k.lower(): k for k in KNOWN_SAVE_FILES}
        for entry in sorted(target.iterdir()):
            if entry.is_dir() or entry.name.startswith("."):
                continue
            if entry.suffix.lower() != ".json":
                continue
            text, parsed = read_json_file(entry)
            canonical = known_lower.get(entry.name.lower()) or detect_kind(entry.name, parsed)
            key = canonical or entry.name
            if key not in files_obj:
                files_obj[key] = parsed
                files_text[key] = text
        if not files_obj:
            raise SaveSafetyError(f"폴더에서 저장 JSON 파일을 찾지 못했습니다: {target}")
        return True, files_obj, files_text

    text, parsed = read_json_file(target)
    canonical = detect_kind(target.name, parsed) or target.name
    files_obj[canonical] = parsed
    files_text[canonical] = text
    return False, files_obj, files_text


def _prune_backups(backup_entries: list[Path]) -> None:
    if len(backup_entries) <= MAX_BACKUPS:
        return
    for old in backup_entries[MAX_BACKUPS:]:
        try:
            if old.is_dir():
                shutil.rmtree(old)
            elif old.is_file():
                old.unlink()
        except OSError:
            pass


def create_backup(target: Path) -> str:
    validate_safe_path(target)
    ts = datetime.now().strftime("%Y%m%d-%H%M%S-%f")[:18]

    if target.is_dir():
        backup_root = target / BACKUP_DIR_NAME
        validate_safe_path(backup_root)
        backup_root.mkdir(parents=True, exist_ok=True)
        hashes: dict[str, str] = {}
        blobs: dict[str, bytes] = {}
        h_all = hashlib.sha256()
        for name in KNOWN_SAVE_FILES:
            p = target / name
            if p.is_file():
                validate_safe_path(p)
                data = p.read_bytes()
                blobs[name] = data
                digest = sha256_bytes(data)
                hashes[name] = digest
                h_all.update(name.encode("utf-8"))
                h_all.update(digest.encode("ascii"))
        if not blobs:
            raise SaveSafetyError("백업할 저장 파일이 폴더에 없습니다.")
        snap_name = f"backup-{ts}-{h_all.hexdigest()[:8]}"
        snap_dir = backup_root / snap_name
        snap_dir.mkdir(parents=True, exist_ok=True)
        for fname, blob in blobs.items():
            atomic_write_bytes(snap_dir / fname, blob)
        manifest = json.dumps({"createdAt": ts, "files": hashes}, ensure_ascii=False, indent=2).encode("utf-8")
        atomic_write_bytes(snap_dir / "manifest.json", manifest)

        existing = sorted([d for d in backup_root.iterdir() if d.is_dir() and d.name.startswith("backup-")], key=lambda x: x.stat().st_mtime, reverse=True)
        _prune_backups(existing)
        return snap_name

    if not target.is_file():
        raise SaveSafetyError(f"백업 대상 파일을 찾을 수 없습니다: {target}")
    data = target.read_bytes()
    digest = sha256_bytes(data)
    bak_name = f"{target.name}.backup-{ts}-{digest[:8]}.bak"
    bak_path = target.parent / bak_name
    atomic_write_bytes(bak_path, data)

    existing_files = sorted(
        [p for p in target.parent.iterdir() if p.is_file() and p.name.startswith(target.name + ".backup-") and p.name.endswith(".bak")],
        key=lambda x: x.stat().st_mtime,
        reverse=True,
    )
    _prune_backups(existing_files)
    return bak_name


def list_backups(target: Path) -> list[dict[str, Any]]:
    validate_safe_path(target)
    if target.is_dir():
        backup_root = target / BACKUP_DIR_NAME
        if not backup_root.is_dir():
            return []
        snaps = sorted([d for d in backup_root.iterdir() if d.is_dir() and d.name.startswith("backup-")], key=lambda x: x.stat().st_mtime, reverse=True)
        return [{"name": d.name, "mtime": int(d.stat().st_mtime)} for d in snaps]

    parent = target.parent
    if not parent.is_dir():
        return []
    prefix = target.name + ".backup-"
    baks = sorted(
        [p for p in parent.iterdir() if p.is_file() and p.name.startswith(prefix) and p.name.endswith(".bak")],
        key=lambda x: x.stat().st_mtime,
        reverse=True,
    )
    return [{"name": p.name, "mtime": int(p.stat().st_mtime)} for p in baks]


def restore_backup(target: Path, backup_name: str) -> list[str]:
    ensure_game_not_running()
    validate_safe_path(target)
    if not backup_name or "/" in backup_name or "\\" in backup_name or ".." in backup_name:
        raise SaveSafetyError(f"올바르지 않은 백업 이름입니다: {backup_name}")

    if target.is_dir():
        snap_dir = target / BACKUP_DIR_NAME / backup_name
        validate_safe_path(snap_dir)
        manifest_path = snap_dir / "manifest.json"
        if not manifest_path.is_file():
            raise SaveSafetyError(f"백업 매니페스트가 없습니다: {backup_name}")
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        hashes = manifest.get("files") or {}
        restored: list[str] = []
        blobs: dict[str, bytes] = {}
        for fname, expected_sha in hashes.items():
            if fname not in KNOWN_SAVE_FILES:
                raise SaveSafetyError(f"허용되지 않는 파일 이름이 백업에 포함되어 있습니다: {fname}")
            fp = snap_dir / fname
            validate_safe_path(fp)
            blob = fp.read_bytes()
            if sha256_bytes(blob) != expected_sha:
                raise SaveSafetyError(f"백업 무결성 검증(SHA-256)에 실패했습니다: {fname}")
            blobs[fname] = blob
        for fname, blob in blobs.items():
            atomic_write_bytes(target / fname, blob)
            restored.append(fname)
        return restored

    bak_path = target.parent / backup_name
    validate_safe_path(bak_path)
    if not bak_path.is_file() or not backup_name.startswith(target.name + ".backup-"):
        raise SaveSafetyError(f"백업 파일을 찾을 수 없습니다: {backup_name}")
    blob = bak_path.read_bytes()
    m = re.search(r"-([0-9a-f]{8})\.bak$", backup_name)
    if m and not sha256_bytes(blob).startswith(m.group(1)):
        raise SaveSafetyError("백업 파일의 SHA-256 접두사가 일치하지 않습니다.")
    atomic_write_bytes(target, blob)
    return [target.name]


# ---------------------------------------------------------------------------
# 요약 / 검증 / 편집 로직
# ---------------------------------------------------------------------------

def _to_int(val: Any, default: int = 0) -> int:
    try:
        return int(val)
    except (TypeError, ValueError):
        return default


def _entry_id(obj: Any) -> int:
    if not isinstance(obj, dict):
        return 0
    return _to_int(obj.get("Id") if "Id" in obj else obj.get("id"), 0)


def inspect_files(files_obj: dict[str, dict[str, Any]], catalog: dict[str, Any]) -> dict[str, Any]:
    realms = catalog_map(catalog, "realms")
    np = files_obj.get("NewPlayerInfo.json") or {}
    misc = np.get("miscInfo") if isinstance(np.get("miscInfo"), dict) else {}
    game = files_obj.get("GameData.json") or {}
    bag = files_obj.get("PlayerBagDataInfo.json") or {}
    fab = files_obj.get("PlayerFaBaoDataInfo.json") or {}
    sk = files_obj.get("PlayerSkillDataInfo.json") or {}
    md = files_obj.get("MDTalentData.json") or {}
    bs = files_obj.get("BSTalentData.json") or {}
    end = files_obj.get("EndingData.json") or {}
    ach = files_obj.get("AchievementData.json") or {}

    realm_lv = _to_int(misc.get("realmLevel"), 0)
    realm_row = realms.get(realm_lv)
    realm_name = realm_row.get("name", "") if realm_row else (f"경지 {realm_lv}" if realm_lv > 0 else "")
    ach_dict = ach.get("achievementActiveDict") if isinstance(ach.get("achievementActiveDict"), dict) else {}

    return {
        "playerName": str(misc.get("playerName") or bs.get("playerName") or ""),
        "realmLevel": realm_lv,
        "realmName": realm_name,
        "lingShi": _to_int(misc.get("lingShi"), 0),
        "reincarnationStone": _to_int(game.get("reincarnationStone"), 0),
        "reincarnationCount": _to_int(game.get("reincarnationCount"), 0),
        "clearanceCount": _to_int(game.get("clearanceCount"), 0),
        "bagCount": len(bag.get("Bags") or []) if isinstance(bag.get("Bags"), list) else 0,
        "faBaoCount": len(fab.get("faBaoList") or []) if isinstance(fab.get("faBaoList"), list) else 0,
        "skillCount": len(sk.get("skillList") or []) if isinstance(sk.get("skillList"), list) else 0,
        "mdTalentCount": len(md.get("talentDataList") or []) if isinstance(md.get("talentDataList"), list) else 0,
        "bsTalentCount": len(bs.get("talentIDs") or []) if isinstance(bs.get("talentIDs"), list) else 0,
        "endingCount": len(end.get("unLockedIDs") or []) if isinstance(end.get("unLockedIDs"), list) else 0,
        "achievementUnlockedCount": sum(1 for v in ach_dict.values() if v),
        "fileCount": len(files_obj),
        "files": sorted(files_obj.keys()),
    }


def validate_files(files_obj: dict[str, dict[str, Any]], catalog: dict[str, Any]) -> dict[str, Any]:
    errors: list[str] = []
    warnings: list[str] = []
    items_map = catalog_map(catalog, "items")
    skills_map = catalog_map(catalog, "skills")
    talents_map = catalog_map(catalog, "talents")

    if not files_obj:
        errors.append("검증할 저장 파일이 없습니다.")
        return {"valid": False, "errors": errors, "warnings": warnings}

    for fn in CANONICAL_FILES:
        if fn not in files_obj:
            warnings.append(f"동반 파일이 현재 묶음에 없습니다: {fn}")

    game = files_obj.get("GameData.json")
    if isinstance(game, dict):
        for k, label in (
            ("reincarnationStone", "환생석"),
            ("reincarnationCount", "전생 횟수"),
            ("clearanceCount", "클리어 횟수"),
        ):
            if k in game and _to_int(game[k], 0) < 0:
                errors.append(f"{label}은(는) 0 이상이어야 합니다.")

    np = files_obj.get("NewPlayerInfo.json")
    if isinstance(np, dict):
        misc = np.get("miscInfo")
        if isinstance(misc, dict):
            if "realmLevel" in misc and not (1 <= _to_int(misc["realmLevel"], 0) <= 6):
                errors.append(f"경지(realmLevel)는 1~6 범위여야 합니다: {misc['realmLevel']}")
            if "lingShi" in misc and _to_int(misc["lingShi"], 0) < 0:
                errors.append("영석(lingShi)은 0 이상이어야 합니다.")
            for li in ("likeability1", "likeability2", "likeability3"):
                if li in misc and not (-10 <= _to_int(misc[li], 0) <= 10):
                    errors.append(f"호감도({li})는 -10~10 범위여야 합니다: {misc[li]}")
        al = np.get("alchemyInfo")
        if isinstance(al, dict) and "alchemyLevel" in al and not (1 <= _to_int(al["alchemyLevel"], 0) <= 5):
            errors.append("연단 등급(alchemyLevel)은 1~5 범위여야 합니다.")
        rf = np.get("refineInfo")
        if isinstance(rf, dict) and "refineLevel" in rf and not (1 <= _to_int(rf["refineLevel"], 0) <= 5):
            errors.append("연기 등급(refineLevel)은 1~5 범위여야 합니다.")
        lgi = np.get("lingGenInfo")
        if isinstance(lgi, dict):
            for k in ("gold", "wood", "water", "fire", "earth"):
                if k in lgi and not (0 <= _to_int(lgi[k], 0) <= 100):
                    errors.append(f"영근({k}) 수치는 0~100 범위여야 합니다: {lgi[k]}")

    bag = files_obj.get("PlayerBagDataInfo.json")
    if isinstance(bag, dict):
        bags = bag.get("Bags")
        if not isinstance(bags, list):
            errors.append("가방(Bags)은 배열이어야 합니다.")
        else:
            for idx, entry in enumerate(bags, 1):
                if not isinstance(entry, dict) or not isinstance(entry.get("item"), dict):
                    errors.append(f"가방 {idx}번 슬롯에 아이템 정보가 없습니다.")
                    continue
                iid = _entry_id(entry["item"])
                if iid <= 0:
                    errors.append(f"가방 {idx}번 아이템 ID가 올바르지 않습니다.")
                elif items_map and iid not in items_map:
                    warnings.append(f"가방 {idx}번 아이템 ID {iid}는 카탈로그에 없습니다.")
                if "num" in entry and _to_int(entry["num"], 0) < 1:
                    errors.append(f"가방 {idx}번 아이템 수량은 1 이상이어야 합니다.")

    sk = files_obj.get("PlayerSkillDataInfo.json")
    if isinstance(sk, dict):
        slist = sk.get("skillList")
        if not isinstance(slist, list):
            errors.append("법술 목록(skillList)은 배열이어야 합니다.")
        else:
            for idx, row in enumerate(slist, 1):
                sid = _entry_id(row)
                if sid <= 0:
                    errors.append(f"법술 {idx}번 ID가 올바르지 않습니다.")
                elif skills_map and sid not in skills_map:
                    warnings.append(f"법술 ID {sid}는 카탈로그에 없습니다.")

    md = files_obj.get("MDTalentData.json")
    if isinstance(md, dict) and isinstance(md.get("talentDataList"), list):
        for row in md["talentDataList"]:
            if not isinstance(row, dict):
                errors.append("윤회 특전 항목이 객체가 아닙니다.")
                continue
            tid = _to_int(row.get("id"), 0)
            lv = _to_int(row.get("level"), 0)
            if lv < 0:
                errors.append(f"특전 ID {tid}의 레벨은 0 이상이어야 합니다.")
            tcat = talents_map.get(tid)
            if tcat and _to_int(tcat.get("maxLevel"), 0) > 0 and lv > _to_int(tcat["maxLevel"], 0):
                errors.append(f"특전 ID {tid}의 레벨이 최대치를 초과했습니다.")

    return {"valid": len(errors) == 0, "errors": errors, "warnings": warnings}


def _make_item_info(cat_row: dict[str, Any]) -> dict[str, Any]:
    return {
        "Id": int(cat_row["id"]),
        "Name": str(cat_row.get("name", "")),
        "Desc": str(cat_row.get("desc", "")),
        "Icon": str(cat_row.get("icon", "")),
        "Type": int(cat_row.get("type", 0)),
        "Quality": int(cat_row.get("quality", 0)),
        "Stack": int(cat_row.get("stack", 0)),
        "Price": int(cat_row.get("price", 0)),
        "Time": int(cat_row.get("time", 0)),
        "TimeReduce": int(cat_row.get("timeReduce", 0)),
        "Condition": int(cat_row.get("condition", 0)),
        "Effect": list(cat_row.get("effect") or []),
        "Value1": list(cat_row.get("value1") or []),
        "Value2": list(cat_row.get("value2") or []),
        "Value3": list(cat_row.get("value3") or []),
        "Eat": int(cat_row.get("eat", 0)),
    }


def _make_skill_info(cat_row: dict[str, Any]) -> dict[str, Any]:
    return {
        "Id": int(cat_row["id"]),
        "Name": str(cat_row.get("name", "")),
        "Desc": str(cat_row.get("desc", "")),
        "Icon": str(cat_row.get("icon", "")),
        "Sfx": str(cat_row.get("sfx", "")),
        "Element": int(cat_row.get("element", 0)),
        "Quality": int(cat_row.get("quality", 0)),
        "Condition": list(cat_row.get("condition") or []),
        "CondValue": list(cat_row.get("condValue") or []),
        "Target": int(cat_row.get("target", 0)),
        "Mana": int(cat_row.get("mana", 0)),
        "Segment": int(cat_row.get("segment", 0)),
        "Interval": list(cat_row.get("interval") or []),
        "Attr": int(cat_row.get("attr", 0)),
        "Value": int(cat_row.get("value", 0)),
        "BuffTarget": list(cat_row.get("buffTarget") or []),
        "Buff": list(cat_row.get("buff") or []),
        "Layer": list(cat_row.get("layer") or []),
    }


def apply_preset(files_obj: dict[str, dict[str, Any]], preset_id: str, catalog: dict[str, Any]) -> None:
    np = files_obj.get("NewPlayerInfo.json")
    game = files_obj.get("GameData.json")

    if preset_id == "starter_boost":
        if isinstance(game, dict):
            game["reincarnationStone"] = _to_int(game.get("reincarnationStone"), 0) + 1000
        if isinstance(np, dict):
            misc = np.setdefault("miscInfo", {})
            misc["lingShi"] = _to_int(misc.get("lingShi"), 0) + 50000
            bp = np.setdefault("basicPropertyInfo", {})
            bp["lifeTime"] = max(200, _to_int(bp.get("lifeTime"), 0))
            lg = np.setdefault("lingGenInfo", {})
            for el in ("gold", "wood", "water", "fire", "earth"):
                lg[el] = max(60, _to_int(lg.get(el), 0))
        return

    if preset_id == "realm_peak":
        if isinstance(np, dict):
            np.setdefault("miscInfo", {})["realmLevel"] = 6
            role = np.setdefault("roleInfo", {})
            role.update({"maxHealth": 9999, "currentHealth": 9999, "maxMagic": 9999, "currentMagic": 9999, "maxCultivation": 99999, "currentCultivation": 99999})
            bp = np.setdefault("basicPropertyInfo", {})
            bp.update({"lifeTime": 999, "physique": 100, "comprehension": 100, "attack": 999, "speed": 300})
            np.setdefault("alchemyInfo", {})["alchemyLevel"] = 5
            np.setdefault("refineInfo", {})["refineLevel"] = 5
            lg = np.setdefault("lingGenInfo", {})
            for el in ("gold", "wood", "water", "fire", "earth"):
                lg[el] = 100
        return

    if preset_id == "heroine_max":
        if isinstance(np, dict):
            misc = np.setdefault("miscInfo", {})
            misc["likeability1"] = 10
            misc["likeability2"] = 10
            misc["likeability3"] = 10
            misc["fate"] = max(100, _to_int(misc.get("fate"), 0))
            misc["extraFate"] = max(100, _to_int(misc.get("extraFate"), 0))
        return

    if preset_id == "fabao_skill_master":
        items = catalog.get("items") or []
        skills = catalog.get("skills") or []
        if "PlayerEquipDataInfo.json" in files_obj:
            dic = files_obj["PlayerEquipDataInfo.json"].setdefault("equipmentDic", {})
            for slot, itype in (("Weapon", 4), ("Clothes", 5), ("Shoes", 6)):
                cands = sorted([x for x in items if _to_int(x.get("type"), -1) == itype], key=lambda x: (-_to_int(x.get("quality")), -_to_int(x.get("id"))))
                if cands:
                    dic[slot] = {"item": _make_item_info(cands[0]), "num": 1, "isInStore": False}
        if "PlayerFaBaoDataInfo.json" in files_obj:
            fab = files_obj["PlayerFaBaoDataInfo.json"]
            fab["currentAvailableSlotNum"] = max(6, _to_int(fab.get("currentAvailableSlotNum"), 0))
            flist = fab.setdefault("faBaoList", [])
            f_cands = sorted([x for x in items if _to_int(x.get("type"), -1) in (2, 3)], key=lambda x: (-_to_int(x.get("quality")), -_to_int(x.get("id"))))
            for fc in f_cands[:6]:
                flist.append({"item": _make_item_info(fc), "num": 1, "isInStore": False})
        if "PlayerSkillDataInfo.json" in files_obj:
            sk = files_obj["PlayerSkillDataInfo.json"]
            slist = sk.setdefault("skillList", [])
            ex = sk.setdefault("existedSkillIDs", [])
            s_cands = sorted(skills, key=lambda x: (-_to_int(x.get("quality")), -_to_int(x.get("id"))))
            for sc in s_cands[:6]:
                sid = int(sc["id"])
                if sid not in ex:
                    slist.append(_make_skill_info(sc))
                    ex.append(sid)
        return

    raise SaveSafetyError(f"알 수 없는 프리셋입니다: {preset_id}")


def save_files_map(target: Path, encoded_texts: dict[str, str], *, backup: bool = True) -> dict[str, Any]:
    ensure_game_not_running()
    validate_safe_path(target)

    backup_name = None
    if backup:
        backup_name = create_backup(target)

    saved: list[str] = []
    if target.is_dir():
        for name, text in encoded_texts.items():
            if Path(name).name != name or name.startswith("."):
                raise SaveSafetyError(f"허용되지 않는 저장 파일 이름입니다: {name}")
            out_path = target / name
            atomic_write_bytes(out_path, text.encode("utf-8"))
            saved.append(name)
    else:
        if len(encoded_texts) == 1:
            only_text = next(iter(encoded_texts.values()))
        else:
            canonical = detect_kind(target.name, None)
            if canonical and canonical in encoded_texts:
                only_text = encoded_texts[canonical]
            else:
                only_text = next(iter(encoded_texts.values()))
        atomic_write_bytes(target, only_text.encode("utf-8"))
        saved.append(target.name)

    return {"ok": True, "savedFiles": saved, "backupName": backup_name, "backups": list_backups(target)}


# ---------------------------------------------------------------------------
# 로컬 HTTP 서버 (Mode B)
# ---------------------------------------------------------------------------

class ServerState:
    def __init__(self, target: Path, token: str, catalog: dict[str, Any]) -> None:
        self.target = target
        self.token = token
        self.catalog = catalog
        self.lock = threading.Lock()


def make_handler(srv_state: ServerState):
    class LrsHandler(http.server.BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"

        def log_message(self, format: str, *args: Any) -> None:
            return

        def _allowed_host(self) -> bool:
            host = (self.headers.get("Host") or "").strip().lower()
            port = self.server.server_port
            return host in (f"127.0.0.1:{port}", f"localhost:{port}")

        def _check_csrf(self) -> bool:
            port = self.server.server_port
            origin = (self.headers.get("Origin") or "").strip().lower()
            if origin and origin not in (f"http://127.0.0.1:{port}", f"http://localhost:{port}"):
                return False
            sec_site = (self.headers.get("Sec-Fetch-Site") or "").strip().lower()
            if sec_site and sec_site not in ("same-origin", "same-site", "none"):
                return False
            tok = self.headers.get("X-Lrs-Token") or ""
            return secrets.compare_digest(tok, srv_state.token)

        def _send_json(self, code: int, obj: Any) -> None:
            body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
            self.send_response(code)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("Cross-Origin-Resource-Policy", "same-origin")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(body)

        def _send_html(self, html_text: str) -> None:
            body = html_text.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("Cross-Origin-Resource-Policy", "same-origin")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(body)

        def _read_json_body(self) -> dict[str, Any]:
            try:
                length = int(self.headers.get("Content-Length") or "0")
            except ValueError as exc:
                raise SaveSafetyError("Content-Length 헤더가 올바르지 않습니다.") from exc
            if length < 0 or length > MAX_REQUEST_BYTES:
                raise SaveSafetyError("요청 본문 크기가 허용 범위를 초과했습니다.")
            raw = self.rfile.read(length)
            try:
                data = json.loads(raw.decode("utf-8"))
            except (UnicodeDecodeError, json.JSONDecodeError) as exc:
                raise SaveSafetyError("요청 JSON을 해석하지 못했습니다.") from exc
            if not isinstance(data, dict):
                raise SaveSafetyError("요청 JSON은 객체여야 합니다.")
            return data

        def do_GET(self) -> None:
            if not self._allowed_host():
                self._send_json(403, {"error": "허용되지 않은 Host 헤더입니다."})
                return
            path = urllib.parse.urlparse(self.path).path
            if path == "/":
                if not HTML_DIST_PATH.is_file():
                    self._send_html("<!doctype html><meta charset='utf-8'><title>윤회수선전 세이브 에디터</title><p>빌드된 HTML 파일이 없습니다.</p>")
                    return
                html = HTML_DIST_PATH.read_text(encoding="utf-8")
                html = html.replace("connect-src 'none'", "connect-src 'self'", 1)
                meta_tag = f'<meta name="lrs-token" content="{srv_state.token}">'
                html = html.replace("<head>", "<head>\n" + meta_tag, 1)
                self._send_html(html)
                return

            if not secrets.compare_digest(self.headers.get("X-Lrs-Token") or "", srv_state.token):
                self._send_json(403, {"error": "유효한 접근 토큰이 없습니다."})
                return

            with srv_state.lock:
                try:
                    if path == "/api/status":
                        has_files = srv_state.target.exists()
                        self._send_json(200, {
                            "connected": True,
                            "gameRunning": is_game_running(),
                            "hasFiles": has_files,
                            "backups": list_backups(srv_state.target) if has_files else [],
                        })
                        return
                    if path == "/api/bundle":
                        _is_dir, _objs, texts = load_target(srv_state.target)
                        self._send_json(200, {"files": texts})
                        return
                    if path == "/api/backups":
                        self._send_json(200, {"backups": list_backups(srv_state.target)})
                        return
                except SaveSafetyError as exc:
                    self._send_json(400, {"error": str(exc)})
                    return
            self._send_json(404, {"error": "알 수 없는 경로입니다."})

        def do_POST(self) -> None:
            if not self._allowed_host() or not self._check_csrf():
                self._send_json(403, {"error": "보안 검증(Host/Origin/CSRF 토큰)에 실패했습니다."})
                return
            path = urllib.parse.urlparse(self.path).path
            with srv_state.lock:
                try:
                    body = self._read_json_body()
                    if path == "/api/save":
                        files = body.get("files")
                        if not isinstance(files, dict) or not files:
                            raise SaveSafetyError("저장할 files 맵이 비어 있습니다.")
                        parsed_map: dict[str, dict[str, Any]] = {}
                        encoded_map: dict[str, str] = {}
                        for fn, content in files.items():
                            if not isinstance(fn, str) or not isinstance(content, str):
                                raise SaveSafetyError("파일 이름과 내용은 문자열이어야 합니다.")
                            parsed_map[fn] = json.loads(content)
                            encoded_map[fn] = content if content.endswith("\n") else content + "\n"
                        val = validate_files(parsed_map, srv_state.catalog)
                        if not val["valid"]:
                            raise SaveSafetyError("검증 오류: " + "; ".join(val["errors"]))
                        res = save_files_map(srv_state.target, encoded_map, backup=True)
                        self._send_json(200, res)
                        return
                    if path == "/api/backup":
                        bak = create_backup(srv_state.target)
                        self._send_json(200, {"ok": True, "backupName": bak, "backups": list_backups(srv_state.target)})
                        return
                    if path == "/api/restore":
                        name = str(body.get("name") or "")
                        restored = restore_backup(srv_state.target, name)
                        _is_dir, _objs, texts = load_target(srv_state.target)
                        self._send_json(200, {"ok": True, "restored": restored, "files": texts, "backups": list_backups(srv_state.target)})
                        return
                except (SaveSafetyError, json.JSONDecodeError) as exc:
                    self._send_json(400, {"error": str(exc)})
                    return
            self._send_json(404, {"error": "알 수 없는 경로입니다."})

    return LrsHandler


def start_server(target: Path, port: int = 0) -> tuple[http.server.ThreadingHTTPServer, str, threading.Thread]:
    catalog = load_catalog()
    token = secrets.token_urlsafe(24)
    state = ServerState(target, token, catalog)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), make_handler(state))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, token, thread


# ---------------------------------------------------------------------------
# CLI 명령 및 자체 테스트
# ---------------------------------------------------------------------------

def cmd_inspect(args: argparse.Namespace) -> int:
    catalog = load_catalog()
    _is_dir, objs, _texts = load_target(Path(args.path))
    info = inspect_files(objs, catalog)
    if args.json:
        print(json.dumps(info, ensure_ascii=False, indent=2))
    else:
        print(f"이름: {info['playerName'] or '-'} | 경지: {info['realmName'] or info['realmLevel']} | 영석: {info['lingShi']} | 환생석: {info['reincarnationStone']}")
        print(f"파일 {info['fileCount']}개 | 가방 {info['bagCount']} | 법보 {info['faBaoCount']} | 법술 {info['skillCount']} | 특전 {info['mdTalentCount']} | 선천 {info['bsTalentCount']} | 엔딩 {info['endingCount']} | 업적 {info['achievementUnlockedCount']}")
    return 0


def cmd_validate(args: argparse.Namespace) -> int:
    catalog = load_catalog()
    _is_dir, objs, _texts = load_target(Path(args.path))
    res = validate_files(objs, catalog)
    if args.json:
        print(json.dumps(res, ensure_ascii=False, indent=2))
    else:
        print("검증 통과" if res["valid"] else "검증 실패")
        for err in res["errors"]:
            print(f"[오류] {err}")
        for warn in res["warnings"]:
            print(f"[주의] {warn}")
    return 0 if res["valid"] else 1


def cmd_presets(_args: argparse.Namespace) -> int:
    for pid, name, desc in PRESET_DEFINITIONS:
        print(f"{pid}\t{name}\t{desc}")
    return 0


def cmd_edit(args: argparse.Namespace) -> int:
    target = Path(args.path)
    catalog = load_catalog()
    items_map = catalog_map(catalog, "items")
    skills_map = catalog_map(catalog, "skills")

    _is_dir, objs, _texts = load_target(target)
    if args.preset:
        apply_preset(objs, args.preset, catalog)

    np = objs.get("NewPlayerInfo.json")
    game = objs.get("GameData.json")
    if isinstance(np, dict):
        misc = np.setdefault("miscInfo", {})
        if args.ling_shi is not None:
            misc["lingShi"] = args.ling_shi
        if args.realm is not None:
            misc["realmLevel"] = args.realm
        if args.player_name is not None:
            misc["playerName"] = args.player_name
        if args.alchemy_level is not None:
            np.setdefault("alchemyInfo", {})["alchemyLevel"] = args.alchemy_level
        if args.refine_level is not None:
            np.setdefault("refineInfo", {})["refineLevel"] = args.refine_level

    if isinstance(game, dict) and args.reincarnation_stone is not None:
        game["reincarnationStone"] = args.reincarnation_stone

    for spec in args.add_item or []:
        parts = spec.split(":", 1)
        iid = int(parts[0])
        qty = int(parts[1]) if len(parts) > 1 else 1
        row = items_map.get(iid)
        if not row:
            raise SaveSafetyError(f"카탈로그에서 아이템을 찾을 수 없습니다: {iid}")
        bag = objs.setdefault("PlayerBagDataInfo.json", {"Bags": []})
        bag.setdefault("Bags", []).append({"item": _make_item_info(row), "num": max(1, qty), "isInStore": False})

    for sid in args.add_skill or []:
        row = skills_map.get(sid)
        if not row:
            raise SaveSafetyError(f"카탈로그에서 법술을 찾을 수 없습니다: {sid}")
        sk = objs.setdefault("PlayerSkillDataInfo.json", {"skillList": [], "existedSkillIDs": []})
        if sid not in sk.setdefault("existedSkillIDs", []):
            sk.setdefault("skillList", []).append(_make_skill_info(row))
            sk["existedSkillIDs"].append(sid)

    if args.unlock_all_endings and "EndingData.json" in objs:
        endings = catalog.get("endings") or []
        objs["EndingData.json"]["unLockedIDs"] = [int(e["id"]) for e in endings if "id" in e]

    if args.unlock_all_achievements and "AchievementData.json" in objs:
        achs = catalog.get("achievements") or []
        d = objs["AchievementData.json"].setdefault("achievementActiveDict", {})
        for a in achs:
            if "id" in a:
                d[str(int(a["id"]))] = True

    val = validate_files(objs, catalog)
    if not val["valid"]:
        raise SaveSafetyError("검증 실패: " + "; ".join(val["errors"]))

    if args.dry_run:
        print("모의 실행 완료 (저장하지 않음)")
        return 0

    encoded = {k: json.dumps(v, ensure_ascii=False, indent=2) + "\n" for k, v in objs.items()}
    res = save_files_map(target, encoded, backup=not args.no_backup)
    print(f"저장 완료 ({len(res['savedFiles'])}개 파일, 백업: {res['backupName'] or '없음'})")
    return 0


def cmd_serve(args: argparse.Namespace) -> int:
    target = Path(args.path)
    server, _token, _th = start_server(target, port=args.port)
    url = f"http://127.0.0.1:{server.server_port}/"
    print(f"서버 실행 중: {url}", flush=True)
    if not args.no_browser:
        webbrowser.open(url)
    try:
        while True:
            time.sleep(0.5)
    except KeyboardInterrupt:
        pass
    finally:
        server.shutdown()
        server.server_close()
    return 0


def run_self_test() -> int:
    catalog = load_catalog()
    with tempfile.TemporaryDirectory(prefix="lrs-selftest-") as tmp:
        save_dir = Path(tmp) / "GameData"
        save_dir.mkdir()
        (save_dir / "GameData.json").write_text(json.dumps({"reincarnationStone": 10, "reincarnationCount": 1, "clearanceCount": 0, "gameMode": 0}), encoding="utf-8")
        (save_dir / "NewPlayerInfo.json").write_text(json.dumps({
            "roleInfo": {"maxHealth": 100, "currentHealth": 100, "maxMagic": 50, "currentMagic": 50, "maxCultivation": 100, "currentCultivation": 0},
            "basicPropertyInfo": {"lifeTime": 60},
            "alchemyInfo": {"alchemyLevel": 1},
            "refineInfo": {"refineLevel": 1},
            "miscInfo": {"playerName": "시험자", "realmLevel": 2, "lingShi": 500, "likeability1": 0, "likeability2": 0, "likeability3": 0},
            "lingGenInfo": {"gold": 20, "wood": 20, "water": 20, "fire": 20, "earth": 20},
        }, ensure_ascii=False), encoding="utf-8")
        (save_dir / "PlayerBagDataInfo.json").write_text(json.dumps({"Bags": []}), encoding="utf-8")

        _is_dir, objs, _texts = load_target(save_dir)
        info = inspect_files(objs, catalog)
        assert info["playerName"] == "시험자" and info["lingShi"] == 500
        val = validate_files(objs, catalog)
        assert val["valid"], val["errors"]

        bak = create_backup(save_dir)
        objs["NewPlayerInfo.json"]["miscInfo"]["lingShi"] = 9999
        save_files_map(save_dir, {k: json.dumps(v, ensure_ascii=False) + "\n" for k, v in objs.items()}, backup=False)
        assert json.loads((save_dir / "NewPlayerInfo.json").read_text(encoding="utf-8"))["miscInfo"]["lingShi"] == 9999
        restore_backup(save_dir, bak)
        assert json.loads((save_dir / "NewPlayerInfo.json").read_text(encoding="utf-8"))["miscInfo"]["lingShi"] == 500

        server, token, _th = start_server(save_dir, port=0)
        try:
            base = f"http://127.0.0.1:{server.server_port}"
            req = urllib.request.Request(f"{base}/api/status")
            try:
                urllib.request.urlopen(req, timeout=3)
                raise AssertionError("토큰 없는 요청이 차단되지 않았습니다.")
            except urllib.error.HTTPError as exc:
                assert exc.code == 403
                exc.close()

            req_ok = urllib.request.Request(f"{base}/api/status", headers={"X-Lrs-Token": token})
            with urllib.request.urlopen(req_ok, timeout=3) as resp:
                st = json.loads(resp.read().decode("utf-8"))
                assert st["connected"] is True and st["hasFiles"] is True
        finally:
            server.shutdown()
            server.server_close()

    print("자체 점검 완료: 모든 항목 통과")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="윤회수선전 세이브 에디터 CLI")
    parser.add_argument("--self-test", action="store_true", help="내장 자체 점검을 실행합니다.")
    sub = parser.add_subparsers(dest="command")

    p_ins = sub.add_parser("inspect", help="세이브 요약 정보를 출력합니다.")
    p_ins.add_argument("path")
    p_ins.add_argument("--json", action="store_true")

    p_val = sub.add_parser("validate", help="세이브 무결성을 검증합니다.")
    p_val.add_argument("path")
    p_val.add_argument("--json", action="store_true")

    sub.add_parser("presets", help="사용 가능한 프리셋 목록을 출력합니다.")

    p_edit = sub.add_parser("edit", help="세이브 값을 수정합니다.")
    p_edit.add_argument("path")
    p_edit.add_argument("--preset")
    p_edit.add_argument("--ling-shi", type=int)
    p_edit.add_argument("--reincarnation-stone", type=int)
    p_edit.add_argument("--realm", type=int)
    p_edit.add_argument("--player-name")
    p_edit.add_argument("--alchemy-level", type=int)
    p_edit.add_argument("--refine-level", type=int)
    p_edit.add_argument("--add-item", action="append")
    p_edit.add_argument("--add-skill", action="append", type=int)
    p_edit.add_argument("--unlock-all-endings", action="store_true")
    p_edit.add_argument("--unlock-all-achievements", action="store_true")
    p_edit.add_argument("--dry-run", action="store_true")
    p_edit.add_argument("--no-backup", action="store_true")

    p_srv = sub.add_parser("serve", help="로컬 웹 서버 모드로 실행합니다.")
    p_srv.add_argument("path", nargs="?", default=str(ROOT_DIR))
    p_srv.add_argument("--port", type=int, default=0)
    p_srv.add_argument("--no-browser", action="store_true")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        if args.self_test:
            return run_self_test()
        if args.command == "inspect":
            return cmd_inspect(args)
        if args.command == "validate":
            return cmd_validate(args)
        if args.command == "presets":
            return cmd_presets(args)
        if args.command == "edit":
            return cmd_edit(args)
        if args.command == "serve":
            return cmd_serve(args)
        parser.print_help()
        return 0
    except SaveSafetyError as exc:
        print(f"오류: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
