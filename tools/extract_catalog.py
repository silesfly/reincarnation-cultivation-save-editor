#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extract LRS catalog data from raw game JSON into src/catalog-data.js (UMD)."""

import argparse
import json
import os
import re
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DATA_DIR = Path(
    os.environ.get(
        "LRS_DATA_DIR",
        str(Path.home() / "workspace" / "무협위키" / ".local" / "graph" / "reincarnation-cultivation-data"),
    )
)
RAW_DIR = os.environ.get("LRS_RAW_DIR", str(DEFAULT_DATA_DIR / "json_raw"))
KO_DICT_PATH = os.environ.get("LRS_KO_DICT", str(DEFAULT_DATA_DIR / "lrs_ko_dict.json"))
OUT_PATH = str(ROOT_DIR / "src" / "catalog-data.js")

TAG_RE = re.compile(r"</?(?:color|material)(?:=[^>]*)?>")
BRACKET_RE = re.compile(r"\[[^\]]*\]")
HANZI_RE = re.compile(r"[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]")
KANA_RE = re.compile(r"[\u3040-\u30FF\uFF66-\uFF9F]")
WS_RE = re.compile(r"\s+")

ITEM_TYPES = {
    0: "영석",
    1: "단약",
    2: "지속형 법보",
    3: "발동형 법보",
    4: "무기",
    5: "의복",
    6: "신발",
    7: "비급",
    8: "기타",
    9: "기능",
    11: "영지",
    12: "부적",
}

ELEMENT_LABELS = {
    0: "",
    1: "목",
    2: "화",
    3: "토",
    4: "금",
    5: "수",
    6: "뇌",
    7: "풍",
    8: "빙",
    9: "독",
    10: "광",
    11: "암",
    12: "무",
}

EQUIP_ENUM_KEYS = {4: "Weapon", 5: "Clothes", 6: "Shoes"}


def sanitize(value):
    if value is None:
        return ""
    if not isinstance(value, str):
        value = str(value)
    value = TAG_RE.sub("", value)
    value = BRACKET_RE.sub("", value)
    value = HANZI_RE.sub("", value)
    value = KANA_RE.sub("", value)
    value = WS_RE.sub(" ", value)
    return value.strip()


def to_int(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def to_int_list(value):
    if not isinstance(value, list):
        return []
    result = []
    for item in value:
        try:
            result.append(int(item))
        except (TypeError, ValueError):
            result.append(0)
    return result


def load_raw(raw_dir, name):
    path = os.path.join(raw_dir, name)
    with open(path, "r", encoding="utf-8-sig") as fh:
        text = fh.read()
    return json.loads(text, strict=False)


def load_ko(ko_dict_path):
    with open(ko_dict_path, "r", encoding="utf-8-sig") as fh:
        text = fh.read()
    data = json.loads(text, strict=False)
    for key in (
        "items", "skills", "buffs", "enemies", "births", "talents",
        "attributes", "achievements", "endings", "names", "scenes",
        "realms", "alchemys", "refines", "shops",
    ):
        data.setdefault(key, {})
    return data


def ko_entry(ko, category, entry_id):
    table = ko.get(category) or {}
    entry = table.get(str(entry_id)) or {}
    return entry.get("name", ""), entry.get("desc", "")


def build_items(raw_dir, ko):
    raw = load_raw(raw_dir, "ItemInfo.json").get("ItemInfos", [])
    out = []
    for row in raw:
        eid = to_int(row.get("Id"))
        name, desc = ko_entry(ko, "items", eid)
        rname = sanitize(row.get("Name", ""))
        rdesc = sanitize(row.get("Desc", ""))
        rtype = to_int(row.get("Type"))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("항목 " + str(eid)),
            "desc": sanitize(desc) or rdesc,
            "icon": sanitize(row.get("Icon", "")),
            "type": rtype,
            "quality": to_int(row.get("Quality")),
            "stack": to_int(row.get("Stack")),
            "price": to_int(row.get("Price")),
            "time": to_int(row.get("Time")),
            "timeReduce": to_int(row.get("TimeReduce")),
            "condition": to_int(row.get("Condition")),
            "effect": to_int_list(row.get("Effect")),
            "value1": to_int_list(row.get("Value1")),
            "value2": to_int_list(row.get("Value2")),
            "value3": to_int_list(row.get("Value3")),
            "eat": to_int(row.get("Eat")),
            "typeLabel": ITEM_TYPES.get(rtype, ""),
        })
    return out


def build_skills(raw_dir, ko):
    raw = load_raw(raw_dir, "SkillInfo.json").get("SkillInfos", [])
    out = []
    for row in raw:
        eid = to_int(row.get("Id"))
        name, desc = ko_entry(ko, "skills", eid)
        rname = sanitize(row.get("Name", ""))
        rdesc = sanitize(row.get("Desc", ""))
        element = to_int(row.get("Element"))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("법술 " + str(eid)),
            "desc": sanitize(desc) or rdesc,
            "icon": sanitize(row.get("Icon", "")),
            "sfx": sanitize(row.get("Sfx", "")),
            "element": element,
            "quality": to_int(row.get("Quality")),
            "condition": to_int_list(row.get("Condition")),
            "condValue": to_int_list(row.get("CondValue")),
            "target": to_int(row.get("Target")),
            "mana": to_int(row.get("Mana")),
            "segment": to_int(row.get("Segment")),
            "interval": to_int_list(row.get("Interval")),
            "attr": to_int(row.get("Attr")),
            "value": to_int(row.get("Value")),
            "buffTarget": to_int_list(row.get("BuffTarget")),
            "buff": to_int_list(row.get("Buff")),
            "layer": to_int_list(row.get("Layer")),
            "elementLabel": ELEMENT_LABELS.get(element, ""),
        })
    return out


def build_births(raw_dir, ko):
    raw = load_raw(raw_dir, "BirthInfo.json").get("BirthInfos", [])
    out = []
    for row in raw:
        eid = to_int(row.get("Id"))
        name, desc = ko_entry(ko, "births", eid)
        rname = sanitize(row.get("Name", ""))
        rdesc = sanitize(row.get("Desc", ""))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("선천 " + str(eid)),
            "desc": sanitize(desc) or rdesc,
            "level": to_int(row.get("Level")),
            "priority": to_int(row.get("Priority")),
            "weight": to_int(row.get("Weight")),
        })
    return out


def build_talents(raw_dir, ko):
    raw = load_raw(raw_dir, "TalentInfo.json").get("TalentInfos", [])
    out = []
    for row in raw:
        eid = to_int(row.get("Id"))
        name, desc = ko_entry(ko, "talents", eid)
        rname = sanitize(row.get("Name", ""))
        rdesc = sanitize(row.get("Desc", ""))
        cost = to_int_list(row.get("Cost"))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("특전 " + str(eid)),
            "desc": sanitize(desc) or rdesc,
            "icon": sanitize(row.get("Icon", "")),
            "value": to_int_list(row.get("Value")),
            "cost": cost,
            "maxLevel": len(cost),
        })
    return out


def build_realms(raw_dir, ko):
    raw = load_raw(raw_dir, "RealmInfo.json").get("RealmInfos", [])
    out = []
    for row in raw:
        eid = to_int(row.get("Id"))
        name, _desc = ko_entry(ko, "realms", eid)
        rname = sanitize(row.get("Name", ""))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("경지 " + str(eid)),
            "upgrade": to_int(row.get("Upgrade")),
            "physique": to_int(row.get("Physique")),
            "mana": to_int(row.get("Mana")),
            "life": to_int(row.get("Life")),
            "equip": to_int(row.get("Equip")),
        })
    return out


def build_alchemys(raw_dir, ko):
    raw = load_raw(raw_dir, "AlchemyInfo.json")
    rows = raw.get("AlchemyInfos") or raw.get("AlchemyInfo") or []
    out = []
    for row in rows:
        eid = to_int(row.get("Id"))
        name, _desc = ko_entry(ko, "alchemys", eid)
        rname = sanitize(row.get("Name", ""))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("연단 " + str(eid)),
            "cost": to_int(row.get("Cost")),
            "upgrade": to_int(row.get("Upgrade")),
        })
    return out


def build_refines(raw_dir, ko):
    raw = load_raw(raw_dir, "RefineInfo.json")
    rows = raw.get("RefineInfos") or raw.get("RefineInfo") or []
    out = []
    for row in rows:
        eid = to_int(row.get("Id"))
        name, _desc = ko_entry(ko, "refines", eid)
        rname = sanitize(row.get("Name", ""))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("연기 " + str(eid)),
            "cost": to_int(row.get("Cost")),
            "upgrade": to_int(row.get("Upgrade")),
        })
    return out


def build_scenes(raw_dir, ko):
    raw = load_raw(raw_dir, "SceneInfo.json")
    rows = raw.get("SceneInfos") or raw.get("SceneInfo") or []
    out = []
    for row in rows:
        eid = to_int(row.get("Id"))
        name, _desc = ko_entry(ko, "scenes", eid)
        rname = sanitize(row.get("Name", ""))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("지역 " + str(eid)),
            "background": sanitize(row.get("Background", "")),
        })
    return out


def build_endings(raw_dir, ko):
    raw = load_raw(raw_dir, "EndingInfo.json")
    rows = raw.get("EndingInfos") or raw.get("EndingInfo") or []
    out = []
    for row in rows:
        eid = to_int(row.get("Id"))
        name, desc = ko_entry(ko, "endings", eid)
        rname = sanitize(row.get("Name", ""))
        rdesc = sanitize(row.get("Desc", ""))
        out.append({
            "id": eid,
            "type": to_int(row.get("Type")),
            "name": sanitize(name) or rname or ("엔딩 " + str(eid)),
            "desc": sanitize(desc) or rdesc,
            "luckPoint": to_int(row.get("LuckPoint")),
            "image": sanitize(row.get("Image", "")),
        })
    return out


def build_achievements(raw_dir, ko):
    raw = load_raw(raw_dir, "AchievementInfo.json")
    rows = raw.get("AchievementInfos") or raw.get("AchievementInfo") or []
    out = []
    for row in rows:
        eid = to_int(row.get("Id"))
        name, desc = ko_entry(ko, "achievements", eid)
        rname = sanitize(row.get("Name", ""))
        rdesc = sanitize(row.get("Desc", ""))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("업적 " + str(eid)),
            "desc": sanitize(desc) or rdesc,
            "cond": to_int(row.get("Cond")),
            "value": to_int_list(row.get("Value")),
        })
    return out


def build_names(raw_dir, ko):
    raw = load_raw(raw_dir, "NameInfo.json")
    rows = raw.get("NameInfos") or raw.get("NameInfo") or []
    out = []
    for row in rows:
        eid = to_int(row.get("Id"))
        name, _desc = ko_entry(ko, "names", eid)
        rname = sanitize(row.get("Name", ""))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("도호 " + str(eid)),
            "talent": to_int_list(row.get("Talent")),
        })
    return out


def build_buffs(raw_dir, ko):
    raw = load_raw(raw_dir, "BuffBaseInfo.json")
    rows = raw.get("BuffBaseInfos") or raw.get("BuffBaseInfo") or []
    out = []
    for row in rows:
        eid = to_int(row.get("Id"))
        name, desc = ko_entry(ko, "buffs", eid)
        rname = sanitize(row.get("Name", ""))
        rdesc = sanitize(row.get("Desc", ""))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("상태 " + str(eid)),
            "desc": sanitize(desc) or rdesc,
        })
    return out


def build_attributes(raw_dir, ko):
    raw = load_raw(raw_dir, "AttributeInfo.json")
    rows = raw.get("AttributeInfos") or raw.get("AttributeInfo") or []
    out = []
    for row in rows:
        eid = to_int(row.get("Id"))
        name, _desc = ko_entry(ko, "attributes", eid)
        rname = sanitize(row.get("Name", ""))
        out.append({
            "id": eid,
            "name": sanitize(name) or rname or ("속성 " + str(eid)),
            "type": to_int(row.get("Type")),
            "init": to_int(row.get("Init")),
            "max": to_int(row.get("Max")),
            "min": to_int(row.get("Min")),
        })
    return out


CATEGORY_BUILDERS = [
    ("items", build_items),
    ("skills", build_skills),
    ("births", build_births),
    ("talents", build_talents),
    ("realms", build_realms),
    ("alchemys", build_alchemys),
    ("refines", build_refines),
    ("scenes", build_scenes),
    ("endings", build_endings),
    ("achievements", build_achievements),
    ("names", build_names),
    ("buffs", build_buffs),
    ("attributes", build_attributes),
]


def build_catalog(raw_dir, ko_dict_path):
    ko = load_ko(ko_dict_path)
    catalog = {}
    for key, builder in CATEGORY_BUILDERS:
        catalog[key] = builder(raw_dir, ko)
    catalog["itemTypes"] = {str(k): v for k, v in ITEM_TYPES.items()}
    catalog["equipEnumKeys"] = {str(k): v for k, v in EQUIP_ENUM_KEYS.items()}
    return catalog


def check_string(value):
    if not isinstance(value, str):
        return True
    if HANZI_RE.search(value):
        return False
    if KANA_RE.search(value):
        return False
    if TAG_RE.search(value):
        return False
    if BRACKET_RE.search(value):
        return False
    return True


def walk_strings(obj, path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from walk_strings(v, path + "." + str(k))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from walk_strings(v, path + "[" + str(i) + "]")
    elif isinstance(obj, str):
        yield path, obj


def write_output(catalog, out_path):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    payload = json.dumps(catalog, ensure_ascii=False, indent=2, sort_keys=False)
    script = (
        "(function (root, factory) {\n"
        "  if (typeof define === 'function' && define.amd) {\n"
        "    define([], factory);\n"
        "  } else if (typeof module === 'object' && module.exports) {\n"
        "    module.exports = factory();\n"
        "  } else {\n"
        "    root.LrsCatalogData = factory();\n"
        "  }\n"
        "}(typeof self !== 'undefined' ? self : this, function () {\n"
        "  'use strict';\n"
        "  var LrsCatalogData = " + payload + ";\n"
        "  return LrsCatalogData;\n"
        "}));\n"
    )
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(script)


def check_only(out_path):
    ok = True
    if not os.path.exists(out_path):
        print("MISSING: " + out_path, file=sys.stderr)
        return 1
    with open(out_path, "r", encoding="utf-8") as fh:
        text = fh.read()
    if "LrsCatalogData" not in text:
        print("UMD identifier missing", file=sys.stderr)
        ok = False
    try:
        start = text.index("var LrsCatalogData = ")
        start += len("var LrsCatalogData = ")
        end = text.index(";\n  return LrsCatalogData;", start)
        payload = text[start:end]
        catalog = json.loads(payload)
    except Exception as exc:
        print("UMD parse failed: " + str(exc), file=sys.stderr)
        return 1
    for key, _builder in CATEGORY_BUILDERS:
        entries = catalog.get(key)
        if not isinstance(entries, list) or not entries:
            print("Empty category: " + key, file=sys.stderr)
            ok = False
    for path, value in walk_strings(catalog):
        if not check_string(value):
            print("Unsanitized string at " + path + ": " + repr(value), file=sys.stderr)
            ok = False
    if ok:
        print("OK: " + out_path + " verified")
        return 0
    return 1


def main():
    parser = argparse.ArgumentParser(description="Extract LRS catalog data.")
    parser.add_argument("--check-only", action="store_true",
                        help="Verify existing src/catalog-data.js without regenerating.")
    parser.add_argument("--raw-dir", default=RAW_DIR)
    parser.add_argument("--ko-dict", default=KO_DICT_PATH)
    parser.add_argument("--out", default=OUT_PATH)
    args = parser.parse_args()
    if args.check_only:
        return check_only(args.out)
    catalog = build_catalog(args.raw_dir, args.ko_dict)
    write_output(catalog, args.out)
    print("Wrote " + args.out + " (" + ", ".join(
        k + "=" + str(len(catalog[k])) for k, _ in CATEGORY_BUILDERS) + ")")
    return 0


if __name__ == "__main__":
    sys.exit(main())
