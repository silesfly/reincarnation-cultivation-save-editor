/* src/editor-core.js — 윤회수선전(Re-xiuxian Legend) 세이브 편집기 핵심 로직 (UMD: LrsCore) */
(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) {
    var codec = root.LrsCodec || null;
    var catalog = root.LrsCatalogData || null;
    if (!codec) {
      try { codec = require('./lrs-codec.js'); } catch (e) { codec = null; }
    }
    if (!catalog) {
      try { catalog = require('./catalog-data.js'); } catch (e) { catalog = null; }
    }
    module.exports = factory(codec, catalog);
  } else {
    root.LrsCore = factory(root.LrsCodec, root.LrsCatalogData);
  }
}(typeof globalThis !== 'undefined' ? globalThis : (typeof self !== 'undefined' ? self : this), function (LrsCodec, LrsCatalogData) {
  'use strict';

  var FORMAT = 'lrs-bundle-v1';

  var CANONICAL_FILES = [
    'GameData.json',
    'NewPlayerInfo.json',
    'GameEventInfo.json',
    'PlayerBagDataInfo.json',
    'PlayerEquipDataInfo.json',
    'PlayerFaBaoDataInfo.json',
    'PlayerSkillDataInfo.json',
    'MDTalentData.json',
    'BSTalentData.json',
    'LingGenData.json',
    'EndingData.json',
    'AchievementData.json'
  ];

  var SLOT_KEYS = ['Weapon', 'Clothes', 'Shoes'];
  var SLOT_TYPE_MAP = { Weapon: 4, Clothes: 5, Shoes: 6 };
  var LEGACY_SLOT_MAP = { '4': 'Weapon', '5': 'Clothes', '6': 'Shoes' };
  var SLOT_NAME_KR = { Weapon: '무기', Clothes: '의복', Shoes: '신발' };

  var ITEM_TYPE_LABELS = {
    0: '영석',
    1: '단약',
    2: '지속형 법보',
    3: '발동형 법보',
    4: '무기',
    5: '의복',
    6: '신발',
    7: '비급',
    8: '기타',
    9: '기능',
    11: '영지',
    12: '부적'
  };

  var CATEGORY_LABELS = {
    all: '전체',
    item: '아이템',
    equip: '장비',
    fabao: '법보',
    skill: '법술',
    birth: '선천',
    talent: '특전',
    ending: '엔딩',
    achievement: '업적'
  };

  var QUALITY_LABELS = {
    1: '일반',
    2: '우수',
    3: '희귀',
    4: '영웅',
    5: '전설',
    6: '신화'
  };

  function hasOwn(o, k) {
    return Object.prototype.hasOwnProperty.call(o, k);
  }
  function isObj(v) {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
  }
  function isArr(v) {
    return Array.isArray(v);
  }
  function isNum(v) {
    return typeof v === 'number' && isFinite(v);
  }
  function toInt(v, def) {
    var n = typeof v === 'string' ? parseInt(v, 10) : Number(v);
    if (!isNum(n)) {
      return isNum(def) ? def : 0;
    }
    return Math.trunc(n);
  }
  function toIntArr(v) {
    if (!isArr(v)) {
      return [];
    }
    var out = [];
    for (var i = 0; i < v.length; i++) {
      out.push(toInt(v[i], 0));
    }
    return out;
  }
  function clamp(v, lo, hi) {
    if (v < lo) { return lo; }
    if (v > hi) { return hi; }
    return v;
  }
  function safeStr(v, def) {
    return typeof v === 'string' ? v : (def || '');
  }
  function clone(v) {
    if (LrsCodec && typeof LrsCodec.cloneJson === 'function') {
      return LrsCodec.cloneJson(v);
    }
    return JSON.parse(JSON.stringify(v));
  }
  function pickProp(obj, a, b, def) {
    if (!isObj(obj)) { return def; }
    if (hasOwn(obj, a) && obj[a] !== undefined) { return obj[a]; }
    if (b && hasOwn(obj, b) && obj[b] !== undefined) { return obj[b]; }
    return def;
  }
  function readEntryId(obj) {
    return toInt(pickProp(obj, 'Id', 'id', 0), 0);
  }
  function readEntryName(obj) {
    return safeStr(pickProp(obj, 'Name', 'name', ''), '');
  }
  function readEntryType(obj) {
    return toInt(pickProp(obj, 'Type', 'type', -1), -1);
  }
  function readEntryQuality(obj) {
    return toInt(pickProp(obj, 'Quality', 'quality', 0), 0);
  }
  function fileOf(bundle, name) {
    if (!isObj(bundle) || !isObj(bundle.files)) { return null; }
    var f = bundle.files[name];
    return isObj(f) ? f : null;
  }
  function ensureFile(bundle, name) {
    if (!isObj(bundle.files)) { bundle.files = {}; }
    if (!isObj(bundle.files[name])) { bundle.files[name] = {}; }
    return bundle.files[name];
  }

  /* ------------------------------------------------------------------ *
   * 1. 카탈로그 색인
   * ------------------------------------------------------------------ */

  function indexById(list) {
    var map = Object.create(null);
    if (!isArr(list)) { return map; }
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (!isObj(e)) { continue; }
      var id = readEntryId(e);
      if (id > 0 || hasOwn(e, 'id') || hasOwn(e, 'Id')) {
        map[id] = e;
      }
    }
    return map;
  }

  function catalogList(catalog, name) {
    if (!isObj(catalog)) { return []; }
    var v = catalog[name];
    if (isArr(v)) { return v; }
    return [];
  }

  function itemTypeLabel(type) {
    var t = toInt(type, -1);
    return hasOwn(ITEM_TYPE_LABELS, t) ? ITEM_TYPE_LABELS[t] : ('분류 ' + t);
  }

  function qualityLabel(q) {
    var v = toInt(q, 0);
    return hasOwn(QUALITY_LABELS, v) ? QUALITY_LABELS[v] : ('등급 ' + v);
  }

  function createCatalogIndex(catalogData) {
    var cat = catalogData || LrsCatalogData || {};
    var items = catalogList(cat, 'items');
    var skills = catalogList(cat, 'skills');
    var births = catalogList(cat, 'births');
    var talents = catalogList(cat, 'talents');
    var endings = catalogList(cat, 'endings');
    var achievements = catalogList(cat, 'achievements');
    var realms = catalogList(cat, 'realms');
    var scenes = catalogList(cat, 'scenes');
    var alchemys = catalogList(cat, 'alchemys');
    var refines = catalogList(cat, 'refines');

    var idx = {
      raw: cat,
      itemsById: indexById(items),
      skillsById: indexById(skills),
      birthsById: indexById(births),
      talentsById: indexById(talents),
      endingsById: indexById(endings),
      achievementsById: indexById(achievements),
      realmsById: indexById(realms),
      scenesById: indexById(scenes),
      alchemysById: indexById(alchemys),
      refinesById: indexById(refines),
      lists: {
        items: items,
        skills: skills,
        births: births,
        talents: talents,
        endings: endings,
        achievements: achievements,
        realms: realms,
        scenes: scenes,
        alchemys: alchemys,
        refines: refines
      }
    };

    idx.getItem = function (id) { return idx.itemsById[toInt(id, -1)] || null; };
    idx.getSkill = function (id) { return idx.skillsById[toInt(id, -1)] || null; };
    idx.getBirth = function (id) { return idx.birthsById[toInt(id, -1)] || null; };
    idx.getTalent = function (id) { return idx.talentsById[toInt(id, -1)] || null; };
    idx.getEnding = function (id) { return idx.endingsById[toInt(id, -1)] || null; };
    idx.getAchievement = function (id) { return idx.achievementsById[toInt(id, -1)] || null; };
    idx.getRealm = function (id) { return idx.realmsById[toInt(id, -1)] || null; };
    idx.getScene = function (id) { return idx.scenesById[toInt(id, -1)] || null; };
    idx.getAlchemy = function (id) { return idx.alchemysById[toInt(id, -1)] || null; };
    idx.getRefine = function (id) { return idx.refinesById[toInt(id, -1)] || null; };
    idx.search = makeSearch(idx);
    return idx;
  }

  function makeSearch(idx) {
    var cache = null;

    function flatten() {
      if (cache) { return cache; }
      var out = [];
      var lists = idx.lists;
      var i, e;

      for (i = 0; i < lists.items.length; i++) {
        e = lists.items[i];
        if (!isObj(e)) { continue; }
        var t = readEntryType(e);
        var cat = (t === 4 || t === 5 || t === 6) ? 'equip' : (t === 2 || t === 3 ? 'fabao' : 'item');
        out.push({
          category: cat,
          itemType: t,
          id: readEntryId(e),
          name: readEntryName(e),
          desc: safeStr(pickProp(e, 'Desc', 'desc', '')),
          typeLabel: safeStr(pickProp(e, 'typeLabel', 'TypeLabel', '')) || itemTypeLabel(t),
          subLabel: qualityLabel(readEntryQuality(e))
        });
      }
      for (i = 0; i < lists.skills.length; i++) {
        e = lists.skills[i];
        if (!isObj(e)) { continue; }
        out.push({
          category: 'skill',
          id: readEntryId(e),
          name: readEntryName(e),
          desc: safeStr(pickProp(e, 'Desc', 'desc', '')),
          typeLabel: safeStr(pickProp(e, 'elementLabel', 'ElementLabel', '')) || '법술',
          subLabel: qualityLabel(readEntryQuality(e))
        });
      }
      for (i = 0; i < lists.births.length; i++) {
        e = lists.births[i];
        if (!isObj(e)) { continue; }
        out.push({
          category: 'birth',
          id: readEntryId(e),
          name: readEntryName(e),
          desc: safeStr(pickProp(e, 'Desc', 'desc', '')),
          typeLabel: '선천',
          subLabel: '등급 ' + toInt(pickProp(e, 'Level', 'level', 0), 0)
        });
      }
      for (i = 0; i < lists.talents.length; i++) {
        e = lists.talents[i];
        if (!isObj(e)) { continue; }
        var cost = pickProp(e, 'Cost', 'cost', []);
        var maxLv = toInt(pickProp(e, 'MaxLevel', 'maxLevel', isArr(cost) ? cost.length : 1), 1);
        out.push({
          category: 'talent',
          id: readEntryId(e),
          name: readEntryName(e),
          desc: safeStr(pickProp(e, 'Desc', 'desc', '')),
          typeLabel: '특전',
          subLabel: '최대 ' + maxLv + '단계'
        });
      }
      for (i = 0; i < lists.endings.length; i++) {
        e = lists.endings[i];
        if (!isObj(e)) { continue; }
        out.push({
          category: 'ending',
          id: readEntryId(e),
          name: readEntryName(e),
          desc: safeStr(pickProp(e, 'Desc', 'desc', '')),
          typeLabel: '엔딩',
          subLabel: '번호 ' + readEntryId(e)
        });
      }
      for (i = 0; i < lists.achievements.length; i++) {
        e = lists.achievements[i];
        if (!isObj(e)) { continue; }
        out.push({
          category: 'achievement',
          id: readEntryId(e),
          name: readEntryName(e),
          desc: safeStr(pickProp(e, 'Desc', 'desc', '')),
          typeLabel: '업적',
          subLabel: '번호 ' + readEntryId(e)
        });
      }
      cache = out;
      return out;
    }

    return function search(categoryFilter, query) {
      var cat = safeStr(categoryFilter, 'all') || 'all';
      if (!hasOwn(CATEGORY_LABELS, cat)) { cat = 'all'; }
      var q = safeStr(query).trim().toLowerCase();
      var all = flatten();
      var res = [];
      for (var i = 0; i < all.length; i++) {
        var it = all[i];
        if (cat !== 'all' && it.category !== cat) { continue; }
        if (q) {
          var hay = (it.name + ' ' + it.desc + ' ' + it.typeLabel + ' ' + it.subLabel + ' ' + it.id).toLowerCase();
          if (hay.indexOf(q) === -1) { continue; }
        }
        res.push(it);
        if (res.length >= 200) { break; }
      }
      return res;
    };
  }

  /* ------------------------------------------------------------------ *
   * 2. ItemInfo / SkillInfo 변환
   * ------------------------------------------------------------------ */

  function makeItemInfo(src) {
    var s = isObj(src) ? src : {};
    return {
      Id: toInt(pickProp(s, 'Id', 'id', 0), 0),
      Name: safeStr(pickProp(s, 'Name', 'name', '')),
      Desc: safeStr(pickProp(s, 'Desc', 'desc', '')),
      Icon: safeStr(pickProp(s, 'Icon', 'icon', '')),
      Type: toInt(pickProp(s, 'Type', 'type', 0), 0),
      Quality: toInt(pickProp(s, 'Quality', 'quality', 0), 0),
      Stack: toInt(pickProp(s, 'Stack', 'stack', 0), 0),
      Price: toInt(pickProp(s, 'Price', 'price', 0), 0),
      Time: toInt(pickProp(s, 'Time', 'time', 0), 0),
      TimeReduce: toInt(pickProp(s, 'TimeReduce', 'timeReduce', 0), 0),
      Condition: toInt(pickProp(s, 'Condition', 'condition', 0), 0),
      Effect: toIntArr(pickProp(s, 'Effect', 'effect', [])),
      Value1: toIntArr(pickProp(s, 'Value1', 'value1', [])),
      Value2: toIntArr(pickProp(s, 'Value2', 'value2', [])),
      Value3: toIntArr(pickProp(s, 'Value3', 'value3', [])),
      Eat: toInt(pickProp(s, 'Eat', 'eat', 0), 0)
    };
  }

  function makeSkillInfo(src) {
    var s = isObj(src) ? src : {};
    return {
      Id: toInt(pickProp(s, 'Id', 'id', 0), 0),
      Name: safeStr(pickProp(s, 'Name', 'name', '')),
      Desc: safeStr(pickProp(s, 'Desc', 'desc', '')),
      Icon: safeStr(pickProp(s, 'Icon', 'icon', '')),
      Sfx: safeStr(pickProp(s, 'Sfx', 'sfx', '')),
      Element: toInt(pickProp(s, 'Element', 'element', 0), 0),
      Quality: toInt(pickProp(s, 'Quality', 'quality', 0), 0),
      Condition: toIntArr(pickProp(s, 'Condition', 'condition', [])),
      CondValue: toIntArr(pickProp(s, 'CondValue', 'condValue', [])),
      Target: toInt(pickProp(s, 'Target', 'target', 0), 0),
      Mana: toInt(pickProp(s, 'Mana', 'mana', 0), 0),
      Segment: toInt(pickProp(s, 'Segment', 'segment', 0), 0),
      Interval: toIntArr(pickProp(s, 'Interval', 'interval', [])),
      Attr: toInt(pickProp(s, 'Attr', 'attr', 0), 0),
      Value: toInt(pickProp(s, 'Value', 'value', 0), 0),
      BuffTarget: toIntArr(pickProp(s, 'BuffTarget', 'buffTarget', [])),
      Buff: toIntArr(pickProp(s, 'Buff', 'buff', [])),
      Layer: toIntArr(pickProp(s, 'Layer', 'layer', [])),
    };
  }

  function makeSlotItem(item, num) {
    var qty = toInt(num, 1);
    return { item: makeItemInfo(item), num: qty >= 1 ? qty : 1, isInStore: false };
  }

  /* ------------------------------------------------------------------ *
   * 3. 기본 번들 및 데모 세이브
   * ------------------------------------------------------------------ */

  function emptyBundle() {
    return { format: FORMAT, files: {}, extras: {}, fileOrder: [], warnings: [] };
  }

  function defaultGameData() {
    return {
      egg: 0, isInit: true, isNewGame: false, isEnterGame: true, isEndGame: false,
      isUnLockedHardMode: false, hardModeTipStatus: 0, gameMode: 0,
      reincarnationStone: 0, reincarnationCount: 0, clearanceCount: 0, failureCount: 0,
      musicVolume: 0.5, effectVolume: 0.5, screenWidth: 1920, screenHeight: 1080,
      isFullScreen: false, resolutionMode: 0, screenFullMode: 0, frameRateMode: 60,
      canSkipBattle: false, canSkipEvent: false, canPopTip: true
    };
  }

  function defaultNewPlayerInfo() {
    return {
      egg: 0,
      roleInfo: {
        maxHealth: 100, maxMagic: 50, maxCultivation: 100,
        currentHealth: 100, currentMagic: 50, currentCultivation: 0
      },
      basicPropertyInfo: {
        lifeTime: 80, physique: 10, comprehension: 10, attack: 15, speed: 10,
        critical: 5, criticalDamage: 150, increasedDamage: 0, reduceDamage: 0,
        hitRate: 95, dodgeRate: 5
      },
      alchemyInfo: { alchemyMaxExp: 100, alchemyLevel: 1, alchemyExp: 0 },
      refineInfo: { refineMaxExp: 100, refineLevel: 1, refineExp: 0 },
      miscInfo: {
        playerName: '청운도인', realmLevel: 1, avatarName: '', lingShi: 0,
        fate: 0, extraFate: 0, likeability1: 0, likeability2: 0, likeability3: 0,
        baseLingGenCount: 0, plantingCount: 0
      },
      lingGenInfo: { gold: 0, wood: 0, water: 0, fire: 0, earth: 0 },
      lingGenBonusInfo: { goldBonus: 0, woodBonus: 0, waterBonus: 0, fireBonus: 0, earthBonus: 0 },
      roleBonusInfo: { healthBonus: 0, magicBonus: 0, attackBonus: 0, speedBonus: 0, manaCostBonus: 0 },
      mdTalentEffectInfo: {
        highExerciseEventPercent: 0, highAlchemyEventPercent: 0, highRefineEventPercent: 0,
        extraEndingReincarnationStone: 0, canForceSelectOption: false, canReturnBattle: false,
        canAdvanceTriggerEvent: false, canUnLockPlantEvent: false, canUnLockRuneEvent: false
      }
    };
  }

  function defaultGameEventInfo() {
    return {
      currentYear: 16, currentScene: 1, constantScene: 0, currentSect: 0, currentHead: 0,
      currentAvator: 0, occurredGameEvents: [], excludedGameEvents: [],
      currentYearOccurredGameEvents: [], isInitGameEvent: true, hasShownYear16Tip: false,
      cultivationCount: 0, alchemyCount: 0, refineCount: 0, temperingCount: 0,
      alchemyLevelYears: 0, refineLevelYears: 0, realmLevelYears: 0,
      deathYear: 0, deathEnemyName: ''
    };
  }

  function defaultBag() { return { Bags: [] }; }
  function defaultEquip() { return { equipmentDic: { Weapon: null, Clothes: null, Shoes: null } }; }
  function defaultFaBao() { return { faBaoList: [], currentAvailableSlotNum: 1 }; }
  function defaultSkills() { return { skillList: [], existedSkillIDs: [] }; }
  function defaultMdTalent() { return { talentDataList: [] }; }
  function defaultBsTalent() { return { talentIDs: [], playerName: '' }; }
  function defaultLingGen() {
    return {
      basicGold: 0, basicWood: 0, basicWater: 0, basicFire: 0, basicEarth: 0,
      extraGold: 0, extraWood: 0, extraWater: 0, extraFire: 0, extraEarth: 0,
      random: []
    };
  }
  function defaultEnding() { return { unLockedIDs: [] }; }
  function defaultAchievement() { return { isInit: true, achievementActiveDict: {} }; }

  function pickFirst(list, count) {
    var out = [];
    if (!isArr(list)) { return out; }
    for (var i = 0; i < list.length && out.length < count; i++) {
      if (isObj(list[i]) && readEntryId(list[i]) > 0) {
        out.push(list[i]);
      }
    }
    return out;
  }

  function createDemoBundle(catalogIndex) {
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    var bundle = emptyBundle();

    var game = defaultGameData();
    game.reincarnationStone = 320;
    game.reincarnationCount = 5;
    game.clearanceCount = 1;
    game.failureCount = 2;
    game.isUnLockedHardMode = true;
    game.canSkipBattle = true;
    game.canSkipEvent = true;

    var np = defaultNewPlayerInfo();
    np.roleInfo.maxHealth = 260;
    np.roleInfo.currentHealth = 260;
    np.roleInfo.maxMagic = 140;
    np.roleInfo.currentMagic = 140;
    np.roleInfo.maxCultivation = 300;
    np.roleInfo.currentCultivation = 120;
    np.basicPropertyInfo.lifeTime = 120;
    np.basicPropertyInfo.physique = 18;
    np.basicPropertyInfo.comprehension = 15;
    np.basicPropertyInfo.attack = 38;
    np.basicPropertyInfo.speed = 24;
    np.alchemyInfo.alchemyLevel = 2;
    np.alchemyInfo.alchemyExp = 45;
    np.refineInfo.refineLevel = 2;
    np.refineInfo.refineExp = 30;
    np.miscInfo.playerName = '청운검객';
    np.miscInfo.realmLevel = 3;
    np.miscInfo.avatarName = '청운';
    np.miscInfo.lingShi = 12500;
    np.miscInfo.fate = 14;
    np.miscInfo.extraFate = 5;
    np.miscInfo.likeability1 = 4;
    np.miscInfo.likeability2 = -1;
    np.miscInfo.likeability3 = 6;
    np.lingGenInfo.gold = 60;
    np.lingGenInfo.wood = 45;
    np.lingGenInfo.water = 55;
    np.lingGenInfo.fire = 30;
    np.lingGenInfo.earth = 40;

    var ev = defaultGameEventInfo();
    ev.currentYear = 28;
    var scenes = idx.lists.scenes || [];
    ev.currentScene = scenes.length ? readEntryId(scenes[0]) : 1;
    ev.cultivationCount = 12;
    ev.alchemyCount = 4;
    ev.refineCount = 3;
    ev.temperingCount = 2;

    var bag = defaultBag();
    var items = idx.lists.items || [];
    var bagCandidates = [];
    var equipped = { Weapon: null, Clothes: null, Shoes: null };
    var fabaos = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (!isObj(it)) { continue; }
      var tp = readEntryType(it);
      if (tp === 4 && !equipped.Weapon) { equipped.Weapon = it; }
      else if (tp === 5 && !equipped.Clothes) { equipped.Clothes = it; }
      else if (tp === 6 && !equipped.Shoes) { equipped.Shoes = it; }
      else if ((tp === 2 || tp === 3) && fabaos.length < 2) { fabaos.push(it); }
      else if ((tp === 1 || tp === 7 || tp === 11 || tp === 12) && bagCandidates.length < 4) {
        bagCandidates.push(it);
      }
    }
    for (var bi = 0; bi < bagCandidates.length; bi++) {
      bag.Bags.push(makeSlotItem(bagCandidates[bi], 2 + bi));
    }

    var equip = defaultEquip();
    SLOT_KEYS.forEach(function (slot) {
      if (equipped[slot]) {
        equip.equipmentDic[slot] = makeSlotItem(equipped[slot], 1);
      }
    });

    var fab = defaultFaBao();
    for (var fi = 0; fi < fabaos.length; fi++) {
      fab.faBaoList.push(makeSlotItem(fabaos[fi], 1));
    }
    fab.currentAvailableSlotNum = 3;

    var sk = defaultSkills();
    var skillRows = pickFirst(idx.lists.skills, 3);
    for (var si = 0; si < skillRows.length; si++) {
      var madeSkill = makeSkillInfo(skillRows[si]);
      sk.skillList.push(madeSkill);
      sk.existedSkillIDs.push(madeSkill.Id);
    }

    var md = defaultMdTalent();
    var talentRows = pickFirst(idx.lists.talents, 2);
    for (var ti = 0; ti < talentRows.length; ti++) {
      var cost = pickProp(talentRows[ti], 'Cost', 'cost', []);
      var maxLv = toInt(pickProp(talentRows[ti], 'MaxLevel', 'maxLevel', isArr(cost) ? cost.length : 1), 1);
      md.talentDataList.push({ id: readEntryId(talentRows[ti]), level: clamp(1, 0, Math.max(1, maxLv)) });
    }

    var bs = defaultBsTalent();
    var birthRows = pickFirst(idx.lists.births, 2);
    for (var bsi = 0; bsi < birthRows.length; bsi++) {
      bs.talentIDs.push(readEntryId(birthRows[bsi]));
    }
    bs.playerName = np.miscInfo.playerName;

    var lg = defaultLingGen();
    lg.basicGold = 25;
    lg.basicWood = 15;
    lg.basicWater = 20;
    lg.basicFire = 10;
    lg.basicEarth = 18;
    lg.extraGold = 10;
    lg.extraWater = 5;

    var end = defaultEnding();
    var endingRows = pickFirst(idx.lists.endings, 1);
    if (endingRows.length) {
      end.unLockedIDs.push(readEntryId(endingRows[0]));
    }

    var ach = defaultAchievement();
    var achRows = pickFirst(idx.lists.achievements, 4);
    for (var ai = 0; ai < achRows.length; ai++) {
      ach.achievementActiveDict[String(readEntryId(achRows[ai]))] = ai < 2;
    }

    bundle.files['GameData.json'] = game;
    bundle.files['NewPlayerInfo.json'] = np;
    bundle.files['GameEventInfo.json'] = ev;
    bundle.files['PlayerBagDataInfo.json'] = bag;
    bundle.files['PlayerEquipDataInfo.json'] = equip;
    bundle.files['PlayerFaBaoDataInfo.json'] = fab;
    bundle.files['PlayerSkillDataInfo.json'] = sk;
    bundle.files['MDTalentData.json'] = md;
    bundle.files['BSTalentData.json'] = bs;
    bundle.files['LingGenData.json'] = lg;
    bundle.files['EndingData.json'] = end;
    bundle.files['AchievementData.json'] = ach;
    bundle.fileOrder = CANONICAL_FILES.slice();
    return bundle;
  }

  /* ------------------------------------------------------------------ *
   * 4. 요약 / 검증
   * ------------------------------------------------------------------ */

  function inspectBundle(bundle, catalogIndex) {
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    var np = fileOf(bundle, 'NewPlayerInfo.json') || {};
    var misc = isObj(np.miscInfo) ? np.miscInfo : {};
    var game = fileOf(bundle, 'GameData.json') || {};
    var bag = fileOf(bundle, 'PlayerBagDataInfo.json') || {};
    var fab = fileOf(bundle, 'PlayerFaBaoDataInfo.json') || {};
    var sk = fileOf(bundle, 'PlayerSkillDataInfo.json') || {};
    var md = fileOf(bundle, 'MDTalentData.json') || {};
    var bs = fileOf(bundle, 'BSTalentData.json') || {};
    var end = fileOf(bundle, 'EndingData.json') || {};
    var ach = fileOf(bundle, 'AchievementData.json') || {};

    var realmLevel = toInt(misc.realmLevel, 0);
    var realm = idx.getRealm(realmLevel);
    var realmName = realm ? (readEntryName(realm) || ('경지 ' + realmLevel)) : (realmLevel > 0 ? ('경지 ' + realmLevel) : '');

    var achDict = isObj(ach.achievementActiveDict) ? ach.achievementActiveDict : {};
    var achUnlocked = 0;
    for (var k in achDict) {
      if (hasOwn(achDict, k) && achDict[k]) { achUnlocked++; }
    }

    var fileCount = isObj(bundle) && isObj(bundle.files) ? Object.keys(bundle.files).length : 0;

    return {
      playerName: safeStr(misc.playerName, safeStr(bs.playerName, '')),
      realmLevel: realmLevel,
      realmName: realmName,
      lingShi: toInt(misc.lingShi, 0),
      reincarnationStone: toInt(game.reincarnationStone, 0),
      reincarnationCount: toInt(game.reincarnationCount, 0),
      clearanceCount: toInt(game.clearanceCount, 0),
      bagCount: isArr(bag.Bags) ? bag.Bags.length : 0,
      faBaoCount: isArr(fab.faBaoList) ? fab.faBaoList.length : 0,
      skillCount: isArr(sk.skillList) ? sk.skillList.length : 0,
      mdTalentCount: isArr(md.talentDataList) ? md.talentDataList.length : 0,
      bsTalentCount: isArr(bs.talentIDs) ? bs.talentIDs.length : 0,
      endingCount: isArr(end.unLockedIDs) ? end.unLockedIDs.length : 0,
      achievementUnlockedCount: achUnlocked,
      fileCount: fileCount
    };
  }

  function validateBundle(bundle, catalogIndex) {
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    var errors = [];
    var warnings = [];

    if (!isObj(bundle)) {
      return { valid: false, errors: ['세이브 번들이 올바른 객체가 아닙니다.'], warnings: [] };
    }
    if (!isObj(bundle.files)) {
      return { valid: false, errors: ['세이브 번들에 파일 목록(files)이 없습니다.'], warnings: [] };
    }
    if (bundle.format && bundle.format !== FORMAT) {
      warnings.push('예상과 다른 번들 형식입니다: ' + safeStr(bundle.format));
    }

    var canonicalPresent = 0;
    var ci;
    for (ci = 0; ci < CANONICAL_FILES.length; ci++) {
      if (isObj(bundle.files[CANONICAL_FILES[ci]])) {
        canonicalPresent++;
      } else {
        warnings.push('동반 파일이 현재 번들에 없습니다: ' + CANONICAL_FILES[ci]);
      }
    }
    if (canonicalPresent === 0) {
      var anyKnown = Object.keys(bundle.files).length;
      if (anyKnown === 0) {
        return { valid: false, errors: ['인식 가능한 윤회수선전 저장 파일이 없습니다.'], warnings: warnings };
      }
    }

    var game = fileOf(bundle, 'GameData.json');
    if (game) {
      if (hasOwn(game, 'reincarnationStone') && toInt(game.reincarnationStone, 0) < 0) {
        errors.push('환생석(reincarnationStone)은 0 이상이어야 합니다.');
      }
      if (hasOwn(game, 'reincarnationCount') && toInt(game.reincarnationCount, 0) < 0) {
        errors.push('전생 횟수(reincarnationCount)는 0 이상이어야 합니다.');
      }
      if (hasOwn(game, 'clearanceCount') && toInt(game.clearanceCount, 0) < 0) {
        errors.push('클리어 횟수(clearanceCount)는 0 이상이어야 합니다.');
      }
      if (hasOwn(game, 'failureCount') && toInt(game.failureCount, 0) < 0) {
        errors.push('실패 횟수(failureCount)는 0 이상이어야 합니다.');
      }
    }

    var ev = fileOf(bundle, 'GameEventInfo.json');
    if (ev && hasOwn(ev, 'currentYear') && toInt(ev.currentYear, 0) < 0) {
      errors.push('현재 연도(currentYear)는 0 이상이어야 합니다.');
    }

    var np = fileOf(bundle, 'NewPlayerInfo.json');
    if (np) {
      var misc = isObj(np.miscInfo) ? np.miscInfo : null;
      if (misc) {
        if (hasOwn(misc, 'realmLevel')) {
          var rl = toInt(misc.realmLevel, 0);
          if (rl < 1 || rl > 6) {
            errors.push('경지(realmLevel)는 1~6 범위여야 합니다: ' + rl);
          }
        }
        if (hasOwn(misc, 'lingShi') && toInt(misc.lingShi, 0) < 0) {
          errors.push('영석(lingShi)은 0 이상이어야 합니다.');
        }
        for (var li = 1; li <= 3; li++) {
          var lk = 'likeability' + li;
          if (hasOwn(misc, lk)) {
            var lv = toInt(misc[lk], 0);
            if (lv < -10 || lv > 10) {
              errors.push('호감도(' + lk + ')는 -10~10 범위여야 합니다: ' + lv);
            }
          }
        }
      }
      var al = isObj(np.alchemyInfo) ? np.alchemyInfo : null;
      if (al && hasOwn(al, 'alchemyLevel')) {
        var alv = toInt(al.alchemyLevel, 0);
        if (alv < 1 || alv > 5) {
          errors.push('연단 등급(alchemyLevel)은 1~5 범위여야 합니다: ' + alv);
        }
      }
      var rf = isObj(np.refineInfo) ? np.refineInfo : null;
      if (rf && hasOwn(rf, 'refineLevel')) {
        var rfv = toInt(rf.refineLevel, 0);
        if (rfv < 1 || rfv > 5) {
          errors.push('연기 등급(refineLevel)은 1~5 범위여야 합니다: ' + rfv);
        }
      }
      var lgInfo = isObj(np.lingGenInfo) ? np.lingGenInfo : null;
      if (lgInfo) {
        var elKeys = ['gold', 'wood', 'water', 'fire', 'earth'];
        for (var lgi = 0; lgi < elKeys.length; lgi++) {
          var key = elKeys[lgi];
          if (hasOwn(lgInfo, key)) {
            var val = toInt(lgInfo[key], 0);
            if (val < 0 || val > 100) {
              errors.push('영근(' + key + ') 수치는 0~100 범위여야 합니다: ' + val);
            }
          }
        }
      }
    }

    var bag = fileOf(bundle, 'PlayerBagDataInfo.json');
    if (bag) {
      if (!isArr(bag.Bags)) {
        errors.push('가방(Bags)은 배열이어야 합니다.');
      } else {
        for (var bi = 0; bi < bag.Bags.length; bi++) {
          var be = bag.Bags[bi];
          if (!isObj(be) || !isObj(be.item)) {
            errors.push('가방 ' + (bi + 1) + '번 슬롯에 아이템 객체가 없습니다.');
            continue;
          }
          var bid = readEntryId(be.item);
          if (bid <= 0) {
            errors.push('가방 ' + (bi + 1) + '번 아이템 ID가 올바르지 않습니다.');
          } else if (idx && !idx.getItem(bid)) {
            warnings.push('가방 ' + (bi + 1) + '번 아이템 ID ' + bid + '는 카탈로그에 없습니다.');
          }
          if (hasOwn(be, 'num') && toInt(be.num, 0) < 1) {
            errors.push('가방 ' + (bi + 1) + '번 아이템 수량은 1 이상이어야 합니다.');
          }
        }
      }
    }

    var equip = fileOf(bundle, 'PlayerEquipDataInfo.json');
    if (equip) {
      var dic = isObj(equip.equipmentDic) ? equip.equipmentDic : null;
      if (!dic) {
        errors.push('장비 사전(equipmentDic)이 객체가 아닙니다.');
      } else {
        SLOT_KEYS.forEach(function (slot) {
          var sv = hasOwn(dic, slot) ? dic[slot] : (hasOwn(dic, String(SLOT_TYPE_MAP[slot])) ? dic[String(SLOT_TYPE_MAP[slot])] : null);
          if (sv === null || sv === undefined) { return; }
          if (!isObj(sv) || !isObj(sv.item)) {
            errors.push(SLOT_NAME_KR[slot] + ' 장비 슬롯 구조가 올바르지 않습니다.');
            return;
          }
          var tp = readEntryType(sv.item);
          if (tp !== SLOT_TYPE_MAP[slot]) {
            warnings.push(SLOT_NAME_KR[slot] + ' 슬롯에 다른 종류의 아이템(' + tp + ')이 장착되어 있습니다.');
          }
        });
      }
    }

    var fab = fileOf(bundle, 'PlayerFaBaoDataInfo.json');
    if (fab) {
      if (!isArr(fab.faBaoList)) {
        errors.push('법보 목록(faBaoList)은 배열이어야 합니다.');
      } else {
        for (var fi = 0; fi < fab.faBaoList.length; fi++) {
          var fe = fab.faBaoList[fi];
          if (!isObj(fe) || !isObj(fe.item)) {
            errors.push('법보 ' + (fi + 1) + '번 항목에 아이템 객체가 없습니다.');
            continue;
          }
          var fid = readEntryId(fe.item);
          if (fid <= 0) {
            errors.push('법보 ' + (fi + 1) + '번 아이템 ID가 올바르지 않습니다.');
          } else if (idx && !idx.getItem(fid)) {
            warnings.push('법보 ' + (fi + 1) + '번 아이템 ID ' + fid + '는 카탈로그에 없습니다.');
          }
          var ft = readEntryType(fe.item);
          if (ft !== 2 && ft !== 3) {
            warnings.push('법보 ' + (fi + 1) + '번 항목이 법보 타입(2/3)이 아닙니다: ' + ft);
          }
        }
      }
      if (hasOwn(fab, 'currentAvailableSlotNum') && toInt(fab.currentAvailableSlotNum, 0) < 0) {
        errors.push('법보 슬롯 수(currentAvailableSlotNum)는 0 이상이어야 합니다.');
      }
    }

    var sk = fileOf(bundle, 'PlayerSkillDataInfo.json');
    if (sk) {
      if (!isArr(sk.skillList)) {
        errors.push('법술 목록(skillList)은 배열이어야 합니다.');
      } else {
        var ids = [];
        for (var ski = 0; ski < sk.skillList.length; ski++) {
          var se = sk.skillList[ski];
          if (!isObj(se)) {
            errors.push('법술 ' + (ski + 1) + '번 항목이 객체가 아닙니다.');
            continue;
          }
          var sid = readEntryId(se);
          if (sid <= 0) {
            errors.push('법술 ' + (ski + 1) + '번 ID가 올바르지 않습니다.');
          } else if (idx && !idx.getSkill(sid)) {
            warnings.push('법술 ID ' + sid + '는 카탈로그에 없습니다.');
          }
          ids.push(sid);
        }
        if (isArr(sk.existedSkillIDs)) {
          var ex = sk.existedSkillIDs.map(function (v) { return toInt(v, 0); });
          var a = ids.slice().sort(function (x, y) { return x - y; });
          var b = ex.slice().sort(function (x, y) { return x - y; });
          var match = a.length === b.length;
          if (match) {
            for (var k = 0; k < a.length; k++) {
              if (a[k] !== b[k]) { match = false; break; }
            }
          }
          if (!match) {
            warnings.push('existedSkillIDs 목록이 skillList와 일치하지 않습니다.');
          }
        } else {
          warnings.push('existedSkillIDs 배열이 없습니다.');
        }
      }
    }

    var md = fileOf(bundle, 'MDTalentData.json');
    if (md) {
      if (!isArr(md.talentDataList)) {
        errors.push('윤회 특전 목록(talentDataList)은 배열이어야 합니다.');
      } else {
        for (var mi = 0; mi < md.talentDataList.length; mi++) {
          var me = md.talentDataList[mi];
          if (!isObj(me)) {
            errors.push('특전 ' + (mi + 1) + '번 항목이 객체가 아닙니다.');
            continue;
          }
          var tid = toInt(pickProp(me, 'id', 'Id', 0), 0);
          var tlv = toInt(pickProp(me, 'level', 'Level', 0), 0);
          if (tlv < 0) {
            errors.push('특전 ID ' + tid + '의 레벨은 0 이상이어야 합니다.');
          }
          var tcat = idx ? idx.getTalent(tid) : null;
          if (tcat) {
            var cost = pickProp(tcat, 'Cost', 'cost', []);
            var maxLv = toInt(pickProp(tcat, 'MaxLevel', 'maxLevel', isArr(cost) ? cost.length : 0), 0);
            if (maxLv > 0 && tlv > maxLv) {
              errors.push('특전 ID ' + tid + '의 레벨(' + tlv + ')이 최대 레벨(' + maxLv + ')을 초과했습니다.');
            }
          } else if (idx) {
            warnings.push('특전 ID ' + tid + '는 카탈로그에 없습니다.');
          }
        }
      }
    }

    var bs = fileOf(bundle, 'BSTalentData.json');
    if (bs) {
      if (!isArr(bs.talentIDs)) {
        errors.push('선천 자질 목록(talentIDs)은 배열이어야 합니다.');
      } else if (idx) {
        for (var bsi = 0; bsi < bs.talentIDs.length; bsi++) {
          var bid2 = toInt(bs.talentIDs[bsi], 0);
          if (!idx.getBirth(bid2)) {
            warnings.push('선천 ID ' + bid2 + '는 카탈로그에 없습니다.');
          }
        }
      }
    }

    var end = fileOf(bundle, 'EndingData.json');
    if (end) {
      if (!isArr(end.unLockedIDs)) {
        errors.push('엔딩 해금 목록(unLockedIDs)은 배열이어야 합니다.');
      } else if (idx) {
        for (var ei = 0; ei < end.unLockedIDs.length; ei++) {
          var eid = toInt(end.unLockedIDs[ei], 0);
          if (!idx.getEnding(eid)) {
            warnings.push('엔딩 ID ' + eid + '는 카탈로그에 없습니다.');
          }
        }
      }
    }

    var ach = fileOf(bundle, 'AchievementData.json');
    if (ach && !isObj(ach.achievementActiveDict)) {
      errors.push('업적 사전(achievementActiveDict)이 객체가 아닙니다.');
    }

    return { valid: errors.length === 0, errors: errors, warnings: warnings };
  }

  /* ------------------------------------------------------------------ *
   * 5. 스칼라 필드 조회 / 적용
   * ------------------------------------------------------------------ */

  var GAME_SCALARS = [
    'egg', 'isInit', 'isNewGame', 'isEnterGame', 'isEndGame', 'isUnLockedHardMode',
    'hardModeTipStatus', 'gameMode', 'reincarnationStone', 'reincarnationCount',
    'clearanceCount', 'failureCount', 'canSkipBattle', 'canSkipEvent', 'canPopTip'
  ];
  var EVENT_SCALARS = [
    'currentYear', 'currentScene', 'constantScene', 'currentSect', 'currentHead',
    'currentAvator', 'cultivationCount', 'alchemyCount', 'refineCount', 'temperingCount',
    'alchemyLevelYears', 'refineLevelYears', 'realmLevelYears', 'deathYear', 'deathEnemyName'
  ];
  var ROLE_SCALARS = ['maxHealth', 'maxMagic', 'maxCultivation', 'currentHealth', 'currentMagic', 'currentCultivation'];
  var BASIC_SCALARS = [
    'lifeTime', 'physique', 'comprehension', 'attack', 'speed', 'critical',
    'criticalDamage', 'increasedDamage', 'reduceDamage', 'hitRate', 'dodgeRate'
  ];
  var ALCHEMY_SCALARS = ['alchemyMaxExp', 'alchemyLevel', 'alchemyExp'];
  var REFINE_SCALARS = ['refineMaxExp', 'refineLevel', 'refineExp'];
  var MISC_SCALARS = [
    'playerName', 'realmLevel', 'avatarName', 'lingShi', 'fate', 'extraFate',
    'likeability1', 'likeability2', 'likeability3', 'baseLingGenCount', 'plantingCount'
  ];
  var LINGGEN_INFO_SCALARS = ['gold', 'wood', 'water', 'fire', 'earth'];
  var LINGGEN_DATA_SCALARS = [
    'basicGold', 'basicWood', 'basicWater', 'basicFire', 'basicEarth',
    'extraGold', 'extraWood', 'extraWater', 'extraFire', 'extraEarth'
  ];

  function pickFields(src, keys) {
    var out = {};
    if (!isObj(src)) { return out; }
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (hasOwn(src, k)) { out[k] = src[k]; }
    }
    return out;
  }

  function applyScalarGroup(target, patch, keys) {
    if (!isObj(target) || !isObj(patch)) { return; }
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (hasOwn(patch, k) && patch[k] !== undefined) {
        target[k] = patch[k];
      }
    }
  }

  function getScalarFields(bundle) {
    var game = fileOf(bundle, 'GameData.json') || {};
    var ev = fileOf(bundle, 'GameEventInfo.json') || {};
    var np = fileOf(bundle, 'NewPlayerInfo.json') || {};
    var lg = fileOf(bundle, 'LingGenData.json') || {};
    var fab = fileOf(bundle, 'PlayerFaBaoDataInfo.json') || {};

    return {
      gameData: pickFields(game, GAME_SCALARS),
      gameEventInfo: pickFields(ev, EVENT_SCALARS),
      roleInfo: pickFields(np.roleInfo, ROLE_SCALARS),
      basicPropertyInfo: pickFields(np.basicPropertyInfo, BASIC_SCALARS),
      alchemyInfo: pickFields(np.alchemyInfo, ALCHEMY_SCALARS),
      refineInfo: pickFields(np.refineInfo, REFINE_SCALARS),
      miscInfo: pickFields(np.miscInfo, MISC_SCALARS),
      lingGenInfo: pickFields(np.lingGenInfo, LINGGEN_INFO_SCALARS),
      lingGenData: pickFields(lg, LINGGEN_DATA_SCALARS),
      faBaoSlotNum: hasOwn(fab, 'currentAvailableSlotNum') ? toInt(fab.currentAvailableSlotNum, 0) : 0
    };
  }

  function applyScalarFields(bundle, patch) {
    var b = clone(bundle);
    var p = isObj(patch) ? patch : {};

    if (isObj(p.gameData)) {
      applyScalarGroup(ensureFile(b, 'GameData.json'), p.gameData, GAME_SCALARS);
    }
    if (isObj(p.gameEventInfo)) {
      applyScalarGroup(ensureFile(b, 'GameEventInfo.json'), p.gameEventInfo, EVENT_SCALARS);
    }
    if (isObj(p.lingGenData)) {
      applyScalarGroup(ensureFile(b, 'LingGenData.json'), p.lingGenData, LINGGEN_DATA_SCALARS);
    }
    if (hasOwn(p, 'faBaoSlotNum') && p.faBaoSlotNum !== undefined) {
      var fab = ensureFile(b, 'PlayerFaBaoDataInfo.json');
      if (!isArr(fab.faBaoList)) { fab.faBaoList = []; }
      fab.currentAvailableSlotNum = Math.max(0, toInt(p.faBaoSlotNum, 0));
    }

    var needNP = isObj(p.roleInfo) || isObj(p.basicPropertyInfo) || isObj(p.alchemyInfo) ||
      isObj(p.refineInfo) || isObj(p.miscInfo) || isObj(p.lingGenInfo);

    if (needNP) {
      var np = ensureFile(b, 'NewPlayerInfo.json');
      var def = defaultNewPlayerInfo();
      if (!isObj(np.roleInfo)) { np.roleInfo = def.roleInfo; }
      if (!isObj(np.basicPropertyInfo)) { np.basicPropertyInfo = def.basicPropertyInfo; }
      if (!isObj(np.alchemyInfo)) { np.alchemyInfo = def.alchemyInfo; }
      if (!isObj(np.refineInfo)) { np.refineInfo = def.refineInfo; }
      if (!isObj(np.miscInfo)) { np.miscInfo = def.miscInfo; }
      if (!isObj(np.lingGenInfo)) { np.lingGenInfo = def.lingGenInfo; }

      applyScalarGroup(np.roleInfo, p.roleInfo, ROLE_SCALARS);
      applyScalarGroup(np.basicPropertyInfo, p.basicPropertyInfo, BASIC_SCALARS);
      applyScalarGroup(np.alchemyInfo, p.alchemyInfo, ALCHEMY_SCALARS);
      applyScalarGroup(np.refineInfo, p.refineInfo, REFINE_SCALARS);
      applyScalarGroup(np.miscInfo, p.miscInfo, MISC_SCALARS);
      applyScalarGroup(np.lingGenInfo, p.lingGenInfo, LINGGEN_INFO_SCALARS);

      if (np.miscInfo && hasOwn(np.miscInfo, 'playerName')) {
        var bs = fileOf(b, 'BSTalentData.json');
        if (bs) { bs.playerName = safeStr(np.miscInfo.playerName, ''); }
      }
    }
    return b;
  }

  /* ------------------------------------------------------------------ *
   * 6. 가방 / 장비 / 법보 / 법술 / 특전 / 선천 / 엔딩 / 업적 조작
   * ------------------------------------------------------------------ */

  function ensureBag(bundle) {
    var bag = ensureFile(bundle, 'PlayerBagDataInfo.json');
    if (!isArr(bag.Bags)) { bag.Bags = []; }
    return bag;
  }

  function lookupItem(catalogIndex, itemId) {
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    return idx.getItem(itemId);
  }

  function addBagItem(bundle, itemId, qty, catalogIndex) {
    var b = clone(bundle);
    var id = toInt(itemId, 0);
    var n = Math.max(1, toInt(qty, 1));
    if (id <= 0) { throw new Error('아이템 ID가 유효하지 않습니다.'); }
    var cat = lookupItem(catalogIndex, id);
    if (!cat) { throw new Error('카탈로그에서 아이템을 찾을 수 없습니다: ' + id); }
    var bag = ensureBag(b);
    for (var i = 0; i < bag.Bags.length; i++) {
      var e = bag.Bags[i];
      if (isObj(e) && isObj(e.item) && readEntryId(e.item) === id) {
        e.num = toInt(e.num, 0) + n;
        return b;
      }
    }
    bag.Bags.push(makeSlotItem(cat, n));
    return b;
  }

  function updateBagQty(bundle, index, qty) {
    var b = clone(bundle);
    var bag = ensureBag(b);
    var i = toInt(index, -1);
    if (i < 0 || i >= bag.Bags.length) {
      throw new Error('가방 항목 번호가 범위를 벗어났습니다: ' + index);
    }
    bag.Bags[i].num = Math.max(1, toInt(qty, 1));
    return b;
  }

  function removeByIndices(arr, indices) {
    var drop = Object.create(null);
    if (isArr(indices)) {
      for (var i = 0; i < indices.length; i++) {
        var idx = toInt(indices[i], -1);
        if (idx >= 0) { drop[idx] = true; }
      }
    } else {
      var single = toInt(indices, -1);
      if (single >= 0) { drop[single] = true; }
    }
    var out = [];
    for (var j = 0; j < arr.length; j++) {
      if (!drop[j]) { out.push(arr[j]); }
    }
    return out;
  }

  function removeBagItems(bundle, indices) {
    var b = clone(bundle);
    var bag = ensureBag(b);
    bag.Bags = removeByIndices(bag.Bags, indices);
    return b;
  }

  function sortBag(bundle) {
    var b = clone(bundle);
    var bag = ensureBag(b);
    bag.Bags.sort(function (x, y) {
      var xi = isObj(x) && isObj(x.item) ? x.item : {};
      var yi = isObj(y) && isObj(y.item) ? y.item : {};
      var xt = readEntryType(xi);
      var yt = readEntryType(yi);
      if (xt !== yt) { return xt - yt; }
      var xq = readEntryQuality(xi);
      var yq = readEntryQuality(yi);
      if (xq !== yq) { return yq - xq; }
      return readEntryId(xi) - readEntryId(yi);
    });
    return b;
  }

  function clearBag(bundle) {
    var b = clone(bundle);
    ensureBag(b).Bags = [];
    return b;
  }

  function normalizeEquipDic(bundle) {
    var eq = ensureFile(bundle, 'PlayerEquipDataInfo.json');
    if (!isObj(eq.equipmentDic)) { eq.equipmentDic = {}; }
    var dic = eq.equipmentDic;
    for (var legacy in LEGACY_SLOT_MAP) {
      if (hasOwn(dic, legacy)) {
        var mapped = LEGACY_SLOT_MAP[legacy];
        if (!hasOwn(dic, mapped)) { dic[mapped] = dic[legacy]; }
        delete dic[legacy];
      }
    }
    SLOT_KEYS.forEach(function (slot) {
      if (!hasOwn(dic, slot)) { dic[slot] = null; }
    });
    return dic;
  }

  function setEquipSlot(bundle, slotKey, itemId, catalogIndex) {
    if (SLOT_KEYS.indexOf(slotKey) === -1) {
      throw new Error('알 수 없는 장비 슬롯입니다: ' + slotKey);
    }
    var b = clone(bundle);
    var dic = normalizeEquipDic(b);
    var id = toInt(itemId, 0);
    if (!itemId || id <= 0) {
      dic[slotKey] = null;
      return b;
    }
    var cat = lookupItem(catalogIndex, id);
    if (!cat) { throw new Error('카탈로그에서 장비를 찾을 수 없습니다: ' + id); }
    var tp = readEntryType(cat);
    if (tp !== SLOT_TYPE_MAP[slotKey]) {
      throw new Error(SLOT_NAME_KR[slotKey] + ' 슬롯에는 해당 종류의 아이템을 장착할 수 없습니다.');
    }
    dic[slotKey] = makeSlotItem(cat, 1);
    return b;
  }

  function ensureFaBao(bundle) {
    var fab = ensureFile(bundle, 'PlayerFaBaoDataInfo.json');
    if (!isArr(fab.faBaoList)) { fab.faBaoList = []; }
    if (!hasOwn(fab, 'currentAvailableSlotNum')) { fab.currentAvailableSlotNum = 1; }
    return fab;
  }

  function addFaBao(bundle, itemId, catalogIndex) {
    var b = clone(bundle);
    var id = toInt(itemId, 0);
    if (id <= 0) { throw new Error('법보 아이템 ID가 유효하지 않습니다.'); }
    var cat = lookupItem(catalogIndex, id);
    if (!cat) { throw new Error('카탈로그에서 법보를 찾을 수 없습니다: ' + id); }
    var tp = readEntryType(cat);
    if (tp !== 2 && tp !== 3) {
      throw new Error('법보 슬롯에는 지속형/발동형 법보(종류 2 또는 3)만 추가할 수 있습니다.');
    }
    var fab = ensureFaBao(b);
    fab.faBaoList.push(makeSlotItem(cat, 1));
    return b;
  }

  function removeFaBao(bundle, indices) {
    var b = clone(bundle);
    var fab = ensureFaBao(b);
    fab.faBaoList = removeByIndices(fab.faBaoList, indices);
    return b;
  }

  function clearFaBao(bundle) {
    var b = clone(bundle);
    ensureFaBao(b).faBaoList = [];
    return b;
  }

  function syncExistedSkills(sk) {
    var seen = Object.create(null);
    var ids = [];
    for (var i = 0; i < sk.skillList.length; i++) {
      var sid = readEntryId(sk.skillList[i]);
      if (sid > 0 && !seen[sid]) {
        seen[sid] = true;
        ids.push(sid);
      }
    }
    sk.existedSkillIDs = ids;
  }

  function ensureSkills(bundle) {
    var sk = ensureFile(bundle, 'PlayerSkillDataInfo.json');
    if (!isArr(sk.skillList)) { sk.skillList = []; }
    if (!isArr(sk.existedSkillIDs)) { sk.existedSkillIDs = []; }
    return sk;
  }

  function addSkill(bundle, skillId, catalogIndex) {
    var b = clone(bundle);
    var id = toInt(skillId, 0);
    if (id <= 0) { throw new Error('법술 ID가 유효하지 않습니다.'); }
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    var cat = idx.getSkill(id);
    if (!cat) { throw new Error('카탈로그에서 법술을 찾을 수 없습니다: ' + id); }
    var sk = ensureSkills(b);
    for (var i = 0; i < sk.skillList.length; i++) {
      if (readEntryId(sk.skillList[i]) === id) {
        syncExistedSkills(sk);
        return b;
      }
    }
    sk.skillList.push(makeSkillInfo(cat));
    syncExistedSkills(sk);
    return b;
  }

  function removeSkills(bundle, indices) {
    var b = clone(bundle);
    var sk = ensureSkills(b);
    sk.skillList = removeByIndices(sk.skillList, indices);
    syncExistedSkills(sk);
    return b;
  }

  function clearSkills(bundle) {
    var b = clone(bundle);
    var sk = ensureSkills(b);
    sk.skillList = [];
    sk.existedSkillIDs = [];
    return b;
  }

  function ensureMdTalent(bundle) {
    var md = ensureFile(bundle, 'MDTalentData.json');
    if (!isArr(md.talentDataList)) { md.talentDataList = []; }
    return md;
  }

  function setMdTalentLevel(bundle, talentId, level, catalogIndex) {
    var b = clone(bundle);
    var id = toInt(talentId, 0);
    if (id <= 0) { throw new Error('특전 ID가 유효하지 않습니다.'); }
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    var tcat = idx.getTalent(id);
    if (!tcat) { throw new Error('카탈로그에서 특전을 찾을 수 없습니다: ' + id); }
    var cost = pickProp(tcat, 'Cost', 'cost', []);
    var maxLv = Math.max(1, toInt(pickProp(tcat, 'MaxLevel', 'maxLevel', isArr(cost) ? cost.length : 1), 1));
    var lv = clamp(toInt(level, 1), 0, maxLv);
    var md = ensureMdTalent(b);
    for (var i = 0; i < md.talentDataList.length; i++) {
      if (toInt(md.talentDataList[i].id, 0) === id) {
        md.talentDataList[i].level = lv;
        return b;
      }
    }
    md.talentDataList.push({ id: id, level: lv });
    return b;
  }

  function removeMdTalents(bundle, ids) {
    var b = clone(bundle);
    var md = ensureMdTalent(b);
    var drop = Object.create(null);
    var list = isArr(ids) ? ids : [ids];
    for (var i = 0; i < list.length; i++) { drop[toInt(list[i], -1)] = true; }
    md.talentDataList = md.talentDataList.filter(function (e) { return !drop[toInt(e.id, -1)]; });
    return b;
  }

  function clearMdTalents(bundle) {
    var b = clone(bundle);
    ensureMdTalent(b).talentDataList = [];
    return b;
  }

  function ensureBsTalent(bundle) {
    var bs = ensureFile(bundle, 'BSTalentData.json');
    if (!isArr(bs.talentIDs)) { bs.talentIDs = []; }
    if (!hasOwn(bs, 'playerName')) {
      var np = fileOf(bundle, 'NewPlayerInfo.json');
      bs.playerName = (np && isObj(np.miscInfo)) ? safeStr(np.miscInfo.playerName, '') : '';
    }
    return bs;
  }

  function addBsTalent(bundle, birthId, catalogIndex) {
    var b = clone(bundle);
    var id = toInt(birthId, 0);
    if (id <= 0) { throw new Error('선천 ID가 유효하지 않습니다.'); }
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    if (!idx.getBirth(id)) { throw new Error('카탈로그에서 선천을 찾을 수 없습니다: ' + id); }
    var bs = ensureBsTalent(b);
    if (bs.talentIDs.indexOf(id) === -1) {
      bs.talentIDs.push(id);
    }
    return b;
  }

  function removeBsTalents(bundle, ids) {
    var b = clone(bundle);
    var bs = ensureBsTalent(b);
    var drop = Object.create(null);
    var list = isArr(ids) ? ids : [ids];
    for (var i = 0; i < list.length; i++) { drop[toInt(list[i], -1)] = true; }
    bs.talentIDs = bs.talentIDs.filter(function (v) { return !drop[toInt(v, -1)]; });
    return b;
  }

  function clearBsTalents(bundle) {
    var b = clone(bundle);
    ensureBsTalent(b).talentIDs = [];
    return b;
  }

  function ensureEnding(bundle) {
    var end = ensureFile(bundle, 'EndingData.json');
    if (!isArr(end.unLockedIDs)) { end.unLockedIDs = []; }
    return end;
  }

  function toggleEnding(bundle, endingId, unlocked, catalogIndex) {
    var b = clone(bundle);
    var id = toInt(endingId, 0);
    if (id <= 0) { throw new Error('엔딩 ID가 유효하지 않습니다.'); }
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    if (unlocked && !idx.getEnding(id)) {
      throw new Error('카탈로그에서 엔딩을 찾을 수 없습니다: ' + id);
    }
    var end = ensureEnding(b);
    var pos = end.unLockedIDs.indexOf(id);
    if (unlocked && pos === -1) {
      end.unLockedIDs.push(id);
    } else if (!unlocked && pos !== -1) {
      end.unLockedIDs.splice(pos, 1);
    }
    return b;
  }

  function unlockAllEndings(bundle, catalogIndex) {
    var b = clone(bundle);
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    var end = ensureEnding(b);
    var seen = Object.create(null);
    var out = [];
    for (var i = 0; i < end.unLockedIDs.length; i++) {
      var oid = toInt(end.unLockedIDs[i], 0);
      if (oid > 0 && !seen[oid]) { seen[oid] = true; out.push(oid); }
    }
    var list = idx.lists.endings || [];
    for (var j = 0; j < list.length; j++) {
      var id = readEntryId(list[j]);
      if (id > 0 && !seen[id]) { seen[id] = true; out.push(id); }
    }
    end.unLockedIDs = out;
    return b;
  }

  function clearEndings(bundle) {
    var b = clone(bundle);
    ensureEnding(b).unLockedIDs = [];
    return b;
  }

  function ensureAchievement(bundle) {
    var ach = ensureFile(bundle, 'AchievementData.json');
    if (!hasOwn(ach, 'isInit')) { ach.isInit = true; }
    if (!isObj(ach.achievementActiveDict)) { ach.achievementActiveDict = {}; }
    return ach;
  }

  function toggleAchievement(bundle, achId, unlocked, catalogIndex) {
    var b = clone(bundle);
    var id = toInt(achId, 0);
    if (id <= 0) { throw new Error('업적 ID가 유효하지 않습니다.'); }
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    if (unlocked && !idx.getAchievement(id)) {
      throw new Error('카탈로그에서 업적을 찾을 수 없습니다: ' + id);
    }
    var ach = ensureAchievement(b);
    if (unlocked) {
      ach.achievementActiveDict[String(id)] = true;
    } else {
      delete ach.achievementActiveDict[String(id)];
    }
    return b;
  }

  function unlockAllAchievements(bundle, catalogIndex) {
    var b = clone(bundle);
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    var ach = ensureAchievement(b);
    var list = idx.lists.achievements || [];
    for (var i = 0; i < list.length; i++) {
      var id = readEntryId(list[i]);
      if (id > 0) { ach.achievementActiveDict[String(id)] = true; }
    }
    return b;
  }

  function clearAchievements(bundle) {
    var b = clone(bundle);
    ensureAchievement(b).achievementActiveDict = {};
    return b;
  }

  /* ------------------------------------------------------------------ *
   * 7. 프리셋
   * ------------------------------------------------------------------ */

  var PRESETS = [
    {
      id: 'starter_boost',
      name: '입문 자원 강화',
      description: '영석 50,000, 환생석 +1,000, 기본 수명 200 및 오행 영근 최소 60을 부여합니다.'
    },
    {
      id: 'realm_peak',
      name: '최상위 경지 도달',
      description: '경지 6단계(최상위), 연단·연기 5단계, 핵심 능력치와 오행 영근 100을 설정합니다.'
    },
    {
      id: 'heroine_max',
      name: '인연 호감도 최대',
      description: '임소엽·조명월·소유리 호감도를 최대치(+10)로 맞추고 운명과 추가 운명을 높입니다.'
    },
    {
      id: 'fabao_skill_master',
      name: '법보·법술·장비 일괄 정비',
      description: '상위 무기·의복·신발 장착, 법보 슬롯 확장 및 법보·법술 묶음을 추가합니다.'
    }
  ];

  function topQualityItems(items, predicate, count) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      if (isObj(items[i]) && predicate(items[i])) {
        filtered.push(items[i]);
      }
    }
    filtered.sort(function (a, b) {
      var qa = readEntryQuality(a);
      var qb = readEntryQuality(b);
      if (qb !== qa) { return qb - qa; }
      return readEntryId(b) - readEntryId(a);
    });
    return filtered.slice(0, count);
  }

  function applyPreset(bundle, presetId, catalogIndex) {
    var idx = catalogIndex || createCatalogIndex(LrsCatalogData || {});
    var b = clone(bundle);
    var scalars = getScalarFields(b);

    if (presetId === 'starter_boost') {
      var stone = toInt(scalars.gameData.reincarnationStone, 0) + 1000;
      var curLingShi = toInt(scalars.miscInfo.lingShi, 0) + 50000;
      var curLife = Math.max(200, toInt(scalars.basicPropertyInfo.lifeTime, 0));
      var curLg = scalars.lingGenInfo;
      b = applyScalarFields(b, {
        gameData: { reincarnationStone: stone },
        basicPropertyInfo: { lifeTime: curLife },
        miscInfo: { lingShi: curLingShi },
        lingGenInfo: {
          gold: Math.max(60, toInt(curLg.gold, 0)),
          wood: Math.max(60, toInt(curLg.wood, 0)),
          water: Math.max(60, toInt(curLg.water, 0)),
          fire: Math.max(60, toInt(curLg.fire, 0)),
          earth: Math.max(60, toInt(curLg.earth, 0))
        }
      });
      return b;
    }

    if (presetId === 'realm_peak') {
      b = applyScalarFields(b, {
        roleInfo: {
          maxHealth: 9999, currentHealth: 9999,
          maxMagic: 9999, currentMagic: 9999,
          maxCultivation: 99999, currentCultivation: 99999
        },
        basicPropertyInfo: {
          lifeTime: 999, physique: 100, comprehension: 100, attack: 999, speed: 300,
          critical: 50, criticalDamage: 250
        },
        alchemyInfo: { alchemyLevel: 5, alchemyExp: 0 },
        refineInfo: { refineLevel: 5, refineExp: 0 },
        miscInfo: { realmLevel: 6 },
        lingGenInfo: { gold: 100, wood: 100, water: 100, fire: 100, earth: 100 }
      });
      return b;
    }

    if (presetId === 'heroine_max') {
      b = applyScalarFields(b, {
        miscInfo: {
          likeability1: 10,
          likeability2: 10,
          likeability3: 10,
          fate: Math.max(100, toInt(scalars.miscInfo.fate, 0)),
          extraFate: Math.max(100, toInt(scalars.miscInfo.extraFate, 0))
        }
      });
      return b;
    }

    if (presetId === 'fabao_skill_master') {
      var items = idx.lists.items || [];
      var topWeapons = topQualityItems(items, function (it) { return readEntryType(it) === 4; }, 1);
      var topClothes = topQualityItems(items, function (it) { return readEntryType(it) === 5; }, 1);
      var topShoes = topQualityItems(items, function (it) { return readEntryType(it) === 6; }, 1);
      if (topWeapons.length) { b = setEquipSlot(b, 'Weapon', readEntryId(topWeapons[0]), idx); }
      if (topClothes.length) { b = setEquipSlot(b, 'Clothes', readEntryId(topClothes[0]), idx); }
      if (topShoes.length) { b = setEquipSlot(b, 'Shoes', readEntryId(topShoes[0]), idx); }

      var topFabaos = topQualityItems(items, function (it) {
        var t = readEntryType(it);
        return t === 2 || t === 3;
      }, 6);
      var fab = ensureFaBao(b);
      fab.currentAvailableSlotNum = Math.max(6, toInt(fab.currentAvailableSlotNum, 0));
      for (var fi = 0; fi < topFabaos.length; fi++) {
        b = addFaBao(b, readEntryId(topFabaos[fi]), idx);
      }

      var topSkills = topQualityItems(idx.lists.skills || [], function () { return true; }, 6);
      for (var si = 0; si < topSkills.length; si++) {
        b = addSkill(b, readEntryId(topSkills[si]), idx);
      }
      return b;
    }

    throw new Error('알 수 없는 프리셋입니다: ' + presetId);
  }

  return {
    FORMAT: FORMAT,
    CANONICAL_FILES: CANONICAL_FILES.slice(),
    SLOT_KEYS: SLOT_KEYS.slice(),
    ITEM_TYPE_LABELS: clone(ITEM_TYPE_LABELS),
    CATEGORY_LABELS: clone(CATEGORY_LABELS),
    PRESETS: clone(PRESETS),
    createCatalogIndex: createCatalogIndex,
    makeItemInfo: makeItemInfo,
    makeSkillInfo: makeSkillInfo,
    createDemoBundle: createDemoBundle,
    inspectBundle: inspectBundle,
    validateBundle: validateBundle,
    getScalarFields: getScalarFields,
    applyScalarFields: applyScalarFields,
    addBagItem: addBagItem,
    updateBagQty: updateBagQty,
    removeBagItems: removeBagItems,
    sortBag: sortBag,
    clearBag: clearBag,
    setEquipSlot: setEquipSlot,
    addFaBao: addFaBao,
    removeFaBao: removeFaBao,
    clearFaBao: clearFaBao,
    addSkill: addSkill,
    removeSkills: removeSkills,
    clearSkills: clearSkills,
    setMdTalentLevel: setMdTalentLevel,
    removeMdTalents: removeMdTalents,
    clearMdTalents: clearMdTalents,
    addBsTalent: addBsTalent,
    removeBsTalents: removeBsTalents,
    clearBsTalents: clearBsTalents,
    toggleEnding: toggleEnding,
    unlockAllEndings: unlockAllEndings,
    clearEndings: clearEndings,
    toggleAchievement: toggleAchievement,
    unlockAllAchievements: unlockAllAchievements,
    clearAchievements: clearAchievements,
    applyPreset: applyPreset
  };
}));
