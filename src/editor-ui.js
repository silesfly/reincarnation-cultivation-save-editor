/* src/editor-ui.js — 윤회수선전 세이브 에디터 화면 제어 스크립트 */
(function () {
  'use strict';

  var Codec = window.LrsCodec;
  var Core = window.LrsCore;
  var CatalogRaw = window.LrsCatalogData || {};
  var idx = Core.createCatalogIndex(CatalogRaw);

  var THEME_MODES = ['auto', 'light', 'dark'];
  var THEME_LABELS = { auto: '테마: 자동', light: '테마: 밝게', dark: '테마: 어둡게' };

  var state = {
    mode: 'browser',
    apiToken: '',
    bundle: null,
    noticeTimer: null,
    catalogTarget: 'bag',
    catalogItems: [],
    catalogSelectedId: null,
    selectedIndices: { bs: [], md: [], fabao: [], bag: [], skill: [], ending: [], achievement: [] },
    localBackups: [],
    backups: [],
    selectedBackupName: null
  };

  function $(id) {
    return document.getElementById(id);
  }

  function showNotice(msg, isError) {
    var bar = $('notice-bar');
    if (!bar) { return; }
    if (state.noticeTimer) {
      clearTimeout(state.noticeTimer);
      state.noticeTimer = null;
    }
    bar.textContent = msg;
    bar.classList.add('show');
    if (isError) {
      bar.classList.add('error');
    } else {
      bar.classList.remove('error');
    }
    state.noticeTimer = setTimeout(function () {
      bar.classList.remove('show');
    }, isError ? 6500 : 4000);
  }

  function setBadge(label, stateKind) {
    var badge = $('runtime-badge');
    if (!badge) { return; }
    badge.textContent = label;
    badge.setAttribute('data-state', stateKind);
  }

  function initTheme() {
    var saved = 'auto';
    try {
      var v = localStorage.getItem('lrs-editor-theme');
      if (THEME_MODES.indexOf(v) !== -1) { saved = v; }
    } catch (e) { /* 무시 */ }
    applyTheme(saved);
    var btn = $('btn-theme');
    if (btn) {
      btn.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme') || 'auto';
        var next = THEME_MODES[(THEME_MODES.indexOf(cur) + 1) % THEME_MODES.length];
        applyTheme(next);
        try { localStorage.setItem('lrs-editor-theme', next); } catch (e) { /* 무시 */ }
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = $('btn-theme');
    if (btn) {
      btn.textContent = THEME_LABELS[theme] || THEME_LABELS.auto;
    }
  }

  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    function activate(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.setAttribute('tabindex', selected ? '0' : '-1');
        var panelId = t.getAttribute('aria-controls');
        var panel = panelId ? $(panelId) : null;
        if (panel) {
          panel.hidden = !selected;
        }
      });
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (ev) {
        var targetIdx = -1;
        if (ev.key === 'ArrowRight') { targetIdx = (index + 1) % tabs.length; }
        else if (ev.key === 'ArrowLeft') { targetIdx = (index - 1 + tabs.length) % tabs.length; }
        else if (ev.key === 'Home') { targetIdx = 0; }
        else if (ev.key === 'End') { targetIdx = tabs.length - 1; }
        if (targetIdx >= 0) {
          ev.preventDefault();
          activate(tabs[targetIdx]);
          tabs[targetIdx].focus();
        }
      });
    });
  }

  function populateStaticCatalogOptions() {
    var sceneSel = $('f-current-scene');
    if (sceneSel) {
      var opts = [];
      var scenes = idx.lists.scenes || [];
      if (scenes.length === 0) {
        var o0 = document.createElement('option');
        o0.value = '1';
        o0.textContent = '기본 지역 (1)';
        opts.push(o0);
      } else {
        scenes.forEach(function (s) {
          var o = document.createElement('option');
          o.value = String(s.id);
          o.textContent = (s.name || '지역') + ' (' + s.id + ')';
          opts.push(o);
        });
      }
      sceneSel.replaceChildren.apply(sceneSel, opts);
    }

    var realmSel = $('f-realm-level');
    if (realmSel && idx.lists.realms && idx.lists.realms.length > 0) {
      var ropts = [];
      idx.lists.realms.forEach(function (r) {
        var o = document.createElement('option');
        o.value = String(r.id);
        o.textContent = r.id + '단계 - ' + (r.name || '경지');
        ropts.push(o);
      });
      realmSel.replaceChildren.apply(realmSel, ropts);
    }

    var presetSel = $('preset-select');
    if (presetSel) {
      var popts = Core.PRESETS.map(function (p) {
        var o = document.createElement('option');
        o.value = p.id;
        o.textContent = p.name;
        return o;
      });
      presetSel.replaceChildren.apply(presetSel, popts);
      updatePresetDescription();
    }
  }

  function updatePresetDescription() {
    var sel = $('preset-select');
    var st = $('preset-status');
    if (!sel || !st) { return; }
    var chosen = Core.PRESETS.filter(function (p) { return p.id === sel.value; })[0];
    st.textContent = chosen ? chosen.description : '적용할 프리셋을 고르세요.';
  }

  function ensureActiveBundle() {
    if (!state.bundle) {
      state.bundle = Core.createDemoBundle(idx);
    }
    return state.bundle;
  }

  function readIntInput(id, fallback) {
    var el = $(id);
    if (!el) { return fallback; }
    var n = parseInt(el.value, 10);
    return isFinite(n) ? n : fallback;
  }

  function setInputVal(id, val) {
    var el = $(id);
    if (!el) { return; }
    if (el.type === 'checkbox') {
      el.checked = !!val;
    } else if (val !== undefined && val !== null) {
      el.value = String(val);
    }
  }

  function ensureOptionValue(selectId, value) {
    var sel = $(selectId);
    if (!sel || value === undefined || value === null) { return; }
    var s = String(value);
    var exists = Array.prototype.some.call(sel.options, function (o) { return o.value === s; });
    if (!exists) {
      var extra = document.createElement('option');
      extra.value = s;
      extra.textContent = '번호 ' + s;
      sel.appendChild(extra);
    }
    sel.value = s;
  }

  function flushScalarInputs() {
    if (!state.bundle || !state.bundle.files) { return; }
    var files = state.bundle.files;
    var patch = {};

    if (files['GameData.json']) {
      patch.gameData = {
        reincarnationStone: Math.max(0, readIntInput('f-reincarnation-stone', 0)),
        reincarnationCount: Math.max(0, readIntInput('f-reincarnation-count', 0)),
        clearanceCount: Math.max(0, readIntInput('f-clearance-count', 0)),
        failureCount: Math.max(0, readIntInput('f-failure-count', 0)),
        gameMode: readIntInput('f-game-mode', 0),
        isUnLockedHardMode: !!($('f-hard-unlocked') && $('f-hard-unlocked').checked),
        canSkipBattle: !!($('f-skip-battle') && $('f-skip-battle').checked),
        canSkipEvent: !!($('f-skip-event') && $('f-skip-event').checked)
      };
    }

    if (files['GameEventInfo.json']) {
      patch.gameEventInfo = {
        currentYear: Math.max(0, readIntInput('f-current-year', 16)),
        currentScene: readIntInput('f-current-scene', 1),
        cultivationCount: Math.max(0, readIntInput('f-cultivation-count', 0)),
        alchemyCount: Math.max(0, readIntInput('f-alchemy-count', 0)),
        refineCount: Math.max(0, readIntInput('f-refine-count', 0)),
        temperingCount: Math.max(0, readIntInput('f-tempering-count', 0))
      };
    }

    if (files['NewPlayerInfo.json']) {
      patch.miscInfo = {
        playerName: ($('f-player-name') ? $('f-player-name').value : ''),
        avatarName: ($('f-avatar-name') ? $('f-avatar-name').value : ''),
        realmLevel: Math.min(6, Math.max(1, readIntInput('f-realm-level', 1))),
        lingShi: Math.max(0, readIntInput('f-ling-shi', 0)),
        fate: readIntInput('f-fate', 0),
        extraFate: readIntInput('f-extra-fate', 0),
        likeability1: Math.min(10, Math.max(-10, readIntInput('f-likeability-1', 0))),
        likeability2: Math.min(10, Math.max(-10, readIntInput('f-likeability-2', 0))),
        likeability3: Math.min(10, Math.max(-10, readIntInput('f-likeability-3', 0)))
      };
      patch.roleInfo = {
        currentHealth: Math.max(0, readIntInput('f-cur-health', 100)),
        maxHealth: Math.max(1, readIntInput('f-max-health', 100)),
        currentMagic: Math.max(0, readIntInput('f-cur-magic', 50)),
        maxMagic: Math.max(0, readIntInput('f-max-magic', 50)),
        currentCultivation: Math.max(0, readIntInput('f-cur-cultivation', 0)),
        maxCultivation: Math.max(1, readIntInput('f-max-cultivation', 100))
      };
      patch.basicPropertyInfo = {
        lifeTime: Math.max(0, readIntInput('f-life-time', 80)),
        physique: readIntInput('f-physique', 10),
        comprehension: readIntInput('f-comprehension', 10),
        attack: readIntInput('f-attack', 15),
        speed: readIntInput('f-speed', 10),
        critical: readIntInput('f-critical', 5),
        criticalDamage: readIntInput('f-critical-damage', 150)
      };
      patch.alchemyInfo = {
        alchemyLevel: Math.min(5, Math.max(1, readIntInput('f-alchemy-level', 1))),
        alchemyExp: Math.max(0, readIntInput('f-alchemy-exp', 0))
      };
      patch.refineInfo = {
        refineLevel: Math.min(5, Math.max(1, readIntInput('f-refine-level', 1))),
        refineExp: Math.max(0, readIntInput('f-refine-exp', 0))
      };
      patch.lingGenInfo = {
        gold: Math.min(100, Math.max(0, readIntInput('f-lg-gold', 0))),
        wood: Math.min(100, Math.max(0, readIntInput('f-lg-wood', 0))),
        water: Math.min(100, Math.max(0, readIntInput('f-lg-water', 0))),
        fire: Math.min(100, Math.max(0, readIntInput('f-lg-fire', 0))),
        earth: Math.min(100, Math.max(0, readIntInput('f-lg-earth', 0)))
      };
    }

    if (files['LingGenData.json']) {
      patch.lingGenData = {
        basicGold: Math.max(0, readIntInput('f-lg-basic-gold', 0)),
        basicWood: Math.max(0, readIntInput('f-lg-basic-wood', 0)),
        basicWater: Math.max(0, readIntInput('f-lg-basic-water', 0)),
        basicFire: Math.max(0, readIntInput('f-lg-basic-fire', 0)),
        basicEarth: Math.max(0, readIntInput('f-lg-basic-earth', 0)),
        extraGold: Math.max(0, readIntInput('f-lg-extra-gold', 0)),
        extraWood: Math.max(0, readIntInput('f-lg-extra-wood', 0)),
        extraWater: Math.max(0, readIntInput('f-lg-extra-water', 0)),
        extraFire: Math.max(0, readIntInput('f-lg-extra-fire', 0)),
        extraEarth: Math.max(0, readIntInput('f-lg-extra-earth', 0))
      };
    }

    if (files['PlayerFaBaoDataInfo.json']) {
      patch.faBaoSlotNum = Math.max(0, readIntInput('f-fabao-slots', 1));
    }
    state.bundle = Core.applyScalarFields(state.bundle, patch);
  }

  function renderSelectableList(listId, statusId, items, selKey, emptyText) {
    var ul = $(listId);
    var st = $(statusId);
    if (!ul) { return; }
    var selected = state.selectedIndices[selKey] || [];
    selected = selected.filter(function (i) { return i >= 0 && i < items.length; });
    state.selectedIndices[selKey] = selected;

    if (!items.length) {
      ul.replaceChildren();
      if (st) { st.textContent = emptyText; }
      return;
    }

    var nodes = items.map(function (row, i) {
      var li = document.createElement('li');
      li.className = 'list-item';
      li.setAttribute('data-index', String(i));
      li.setAttribute('data-selected', selected.indexOf(i) !== -1 ? 'true' : 'false');
      li.tabIndex = 0;

      var title = document.createElement('span');
      title.textContent = row.label;

      var meta = document.createElement('span');
      meta.className = 'meta';
      meta.textContent = row.meta || '';

      li.appendChild(title);
      li.appendChild(meta);

      function toggleSel() {
        var cur = state.selectedIndices[selKey] || [];
        var pos = cur.indexOf(i);
        if (pos === -1) { cur.push(i); } else { cur.splice(pos, 1); }
        state.selectedIndices[selKey] = cur;
        li.setAttribute('data-selected', pos === -1 ? 'true' : 'false');
        if (st) {
          st.textContent = '총 ' + items.length + '개 (선택 ' + cur.length + '개)';
        }
      }

      li.addEventListener('click', toggleSel);
      li.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          toggleSel();
        }
      });
      return li;
    });

    ul.replaceChildren.apply(ul, nodes);
    if (st) {
      st.textContent = '총 ' + items.length + '개 (선택 ' + selected.length + '개)';
    }
  }

  function renderBundle() {
    var b = state.bundle;
    if (!b) { return; }
    var s = Core.getScalarFields(b);

    setInputVal('f-reincarnation-stone', s.gameData.reincarnationStone);
    setInputVal('f-reincarnation-count', s.gameData.reincarnationCount);
    setInputVal('f-clearance-count', s.gameData.clearanceCount);
    setInputVal('f-failure-count', s.gameData.failureCount);
    ensureOptionValue('f-game-mode', s.gameData.gameMode);
    setInputVal('f-hard-unlocked', s.gameData.isUnLockedHardMode);
    setInputVal('f-skip-battle', s.gameData.canSkipBattle);
    setInputVal('f-skip-event', s.gameData.canSkipEvent);

    setInputVal('f-current-year', s.gameEventInfo.currentYear);
    ensureOptionValue('f-current-scene', s.gameEventInfo.currentScene);
    setInputVal('f-cultivation-count', s.gameEventInfo.cultivationCount);
    setInputVal('f-alchemy-count', s.gameEventInfo.alchemyCount);
    setInputVal('f-refine-count', s.gameEventInfo.refineCount);
    setInputVal('f-tempering-count', s.gameEventInfo.temperingCount);

    setInputVal('f-player-name', s.miscInfo.playerName);
    setInputVal('f-avatar-name', s.miscInfo.avatarName);
    ensureOptionValue('f-realm-level', s.miscInfo.realmLevel);
    setInputVal('f-ling-shi', s.miscInfo.lingShi);
    setInputVal('f-fate', s.miscInfo.fate);
    setInputVal('f-extra-fate', s.miscInfo.extraFate);
    setInputVal('f-likeability-1', s.miscInfo.likeability1);
    setInputVal('f-likeability-2', s.miscInfo.likeability2);
    setInputVal('f-likeability-3', s.miscInfo.likeability3);

    setInputVal('f-cur-health', s.roleInfo.currentHealth);
    setInputVal('f-max-health', s.roleInfo.maxHealth);
    setInputVal('f-cur-magic', s.roleInfo.currentMagic);
    setInputVal('f-max-magic', s.roleInfo.maxMagic);
    setInputVal('f-cur-cultivation', s.roleInfo.currentCultivation);
    setInputVal('f-max-cultivation', s.roleInfo.maxCultivation);
    setInputVal('f-life-time', s.basicPropertyInfo.lifeTime);
    setInputVal('f-physique', s.basicPropertyInfo.physique);
    setInputVal('f-comprehension', s.basicPropertyInfo.comprehension);
    setInputVal('f-attack', s.basicPropertyInfo.attack);
    setInputVal('f-speed', s.basicPropertyInfo.speed);
    setInputVal('f-critical', s.basicPropertyInfo.critical);
    setInputVal('f-critical-damage', s.basicPropertyInfo.criticalDamage);
    setInputVal('f-alchemy-level', s.alchemyInfo.alchemyLevel);
    setInputVal('f-alchemy-exp', s.alchemyInfo.alchemyExp);
    setInputVal('f-refine-level', s.refineInfo.refineLevel);
    setInputVal('f-refine-exp', s.refineInfo.refineExp);

    setInputVal('f-lg-gold', s.lingGenInfo.gold);
    setInputVal('f-lg-wood', s.lingGenInfo.wood);
    setInputVal('f-lg-water', s.lingGenInfo.water);
    setInputVal('f-lg-fire', s.lingGenInfo.fire);
    setInputVal('f-lg-earth', s.lingGenInfo.earth);

    setInputVal('f-lg-basic-gold', s.lingGenData.basicGold);
    setInputVal('f-lg-basic-wood', s.lingGenData.basicWood);
    setInputVal('f-lg-basic-water', s.lingGenData.basicWater);
    setInputVal('f-lg-basic-fire', s.lingGenData.basicFire);
    setInputVal('f-lg-basic-earth', s.lingGenData.basicEarth);
    setInputVal('f-lg-extra-gold', s.lingGenData.extraGold);
    setInputVal('f-lg-extra-wood', s.lingGenData.extraWood);
    setInputVal('f-lg-extra-water', s.lingGenData.extraWater);
    setInputVal('f-lg-extra-fire', s.lingGenData.extraFire);
    setInputVal('f-lg-extra-earth', s.lingGenData.extraEarth);

    var bs = (b.files && b.files['BSTalentData.json']) || {};
    var bsRows = (Array.isArray(bs.talentIDs) ? bs.talentIDs : []).map(function (id) {
      var cat = idx.getBirth(id);
      return { id: id, label: cat ? cat.name : ('선천 ' + id), meta: '번호 ' + id };
    });
    renderSelectableList('bs-talent-list', 'bs-talent-status', bsRows, 'bs', '등록된 선천 자질이 없습니다.');

    var md = (b.files && b.files['MDTalentData.json']) || {};
    var mdRows = (Array.isArray(md.talentDataList) ? md.talentDataList : []).map(function (row) {
      var cat = idx.getTalent(row.id);
      var maxLv = cat ? (cat.maxLevel || 1) : '?';
      return { id: row.id, level: row.level, label: cat ? cat.name : ('특전 ' + row.id), meta: '단계 ' + row.level + ' / ' + maxLv };
    });
    renderSelectableList('md-talent-list', 'md-talent-status', mdRows, 'md', '등록된 특전이 없습니다.');

    var eq = (b.files && b.files['PlayerEquipDataInfo.json'] && b.files['PlayerEquipDataInfo.json'].equipmentDic) || {};
    function equipText(slotKey) {
      var entry = eq[slotKey] || eq[slotKey === 'Weapon' ? '4' : (slotKey === 'Clothes' ? '5' : '6')];
      if (!entry || !entry.item) { return '없음'; }
      var id = entry.item.Id !== undefined ? entry.item.Id : entry.item.id;
      var cat = idx.getItem(id);
      var nm = (cat && cat.name) || entry.item.Name || entry.item.name || ('아이템 ' + id);
      return nm + ' (번호 ' + id + ')';
    }
    setInputVal('f-equip-weapon', equipText('Weapon'));
    setInputVal('f-equip-clothes', equipText('Clothes'));
    setInputVal('f-equip-shoes', equipText('Shoes'));

    setInputVal('f-fabao-slots', s.faBaoSlotNum);
    var fab = (b.files && b.files['PlayerFaBaoDataInfo.json']) || {};
    var fabRows = (Array.isArray(fab.faBaoList) ? fab.faBaoList : []).map(function (row) {
      var it = row && row.item ? row.item : {};
      var id = it.Id !== undefined ? it.Id : it.id;
      var cat = idx.getItem(id);
      return { label: (cat && cat.name) || it.Name || it.name || ('법보 ' + id), meta: (cat && cat.typeLabel) || ('번호 ' + id) };
    });
    renderSelectableList('fabao-list', 'fabao-status', fabRows, 'fabao', '장착된 법보가 없습니다.');

    var bag = (b.files && b.files['PlayerBagDataInfo.json']) || {};
    var bagRows = (Array.isArray(bag.Bags) ? bag.Bags : []).map(function (row) {
      var it = row && row.item ? row.item : {};
      var id = it.Id !== undefined ? it.Id : it.id;
      var cat = idx.getItem(id);
      return { label: (cat && cat.name) || it.Name || it.name || ('아이템 ' + id), meta: '수량 ' + (row.num || 1) };
    });
    renderSelectableList('inventory-list', 'inventory-status', bagRows, 'bag', '가방이 비어 있습니다.');

    var sk = (b.files && b.files['PlayerSkillDataInfo.json']) || {};
    var skRows = (Array.isArray(sk.skillList) ? sk.skillList : []).map(function (row) {
      var id = row.Id !== undefined ? row.Id : row.id;
      var cat = idx.getSkill(id);
      return { label: (cat && cat.name) || row.Name || row.name || ('법술 ' + id), meta: (cat && cat.elementLabel) || ('번호 ' + id) };
    });
    renderSelectableList('skill-list', 'skill-status', skRows, 'skill', '보유한 법술이 없습니다.');

    var end = (b.files && b.files['EndingData.json']) || {};
    var endRows = (Array.isArray(end.unLockedIDs) ? end.unLockedIDs : []).map(function (id) {
      var cat = idx.getEnding(id);
      return { id: id, label: cat ? cat.name : ('엔딩 ' + id), meta: '번호 ' + id };
    });
    renderSelectableList('ending-list', 'ending-status', endRows, 'ending', '해금된 엔딩이 없습니다.');

    var ach = (b.files && b.files['AchievementData.json'] && b.files['AchievementData.json'].achievementActiveDict) || {};
    var achRows = Object.keys(ach).filter(function (k) { return !!ach[k]; }).map(function (k) {
      var id = parseInt(k, 10);
      var cat = idx.getAchievement(id);
      return { id: id, label: cat ? cat.name : ('업적 ' + k), meta: '해금됨' };
    });
    renderSelectableList('achievement-list', 'achievement-status', achRows, 'achievement', '활성화된 업적이 없습니다.');
  }

  /* ---- 카탈로그 다이얼로그 ---- */

  function openCatalog(filter, target) {
    state.catalogTarget = target || 'bag';
    state.catalogSelectedId = null;
    var sel = $('catalog-filter');
    var search = $('catalog-search');
    if (sel) { sel.value = filter || 'all'; }
    if (search) { search.value = ''; }
    refreshCatalogResults();
    var dlg = $('catalog-dialog');
    if (dlg && typeof dlg.showModal === 'function') {
      dlg.showModal();
    }
  }

  function refreshCatalogResults() {
    var sel = $('catalog-filter');
    var search = $('catalog-search');
    var filter = sel ? sel.value : 'all';
    var q = search ? search.value : '';
    var results = idx.search(filter, q);

    if (state.catalogTarget === 'equip:Weapon') {
      results = results.filter(function (r) { return r.itemType === 4; });
    } else if (state.catalogTarget === 'equip:Clothes') {
      results = results.filter(function (r) { return r.itemType === 5; });
    } else if (state.catalogTarget === 'equip:Shoes') {
      results = results.filter(function (r) { return r.itemType === 6; });
    }

    state.catalogItems = results;
    var ul = $('catalog-results');
    var st = $('catalog-status');
    if (!ul) { return; }

    var nodes = results.map(function (item) {
      var li = document.createElement('li');
      li.className = 'list-item';
      li.setAttribute('data-selected', state.catalogSelectedId === item.id ? 'true' : 'false');
      li.tabIndex = 0;

      var title = document.createElement('span');
      title.textContent = item.name + ' (' + item.id + ')';

      var meta = document.createElement('span');
      meta.className = 'meta';
      meta.textContent = [item.typeLabel, item.subLabel].filter(Boolean).join(' · ');

      li.appendChild(title);
      li.appendChild(meta);

      function selectItem() {
        state.catalogSelectedId = item.id;
        Array.prototype.forEach.call(ul.children, function (c) {
          c.setAttribute('data-selected', c === li ? 'true' : 'false');
        });
        if (st) {
          st.textContent = item.desc ? (item.name + ': ' + item.desc) : (item.name + ' 선택됨');
        }
      }
      li.addEventListener('click', selectItem);
      li.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') {
          ev.preventDefault();
          selectItem();
          applyCatalogSelection();
        }
      });
      return li;
    });

    ul.replaceChildren.apply(ul, nodes);
    if (st) {
      st.textContent = results.length ? ('검색 결과 ' + results.length + '건') : '검색 결과가 없습니다.';
    }
  }

  function applyCatalogSelection() {
    if (!state.catalogSelectedId) {
      showNotice('추가할 항목을 먼저 선택하세요.', true);
      return;
    }
    flushScalarInputs();
    var b = ensureActiveBundle();
    var id = state.catalogSelectedId;
    var target = state.catalogTarget;
    try {
      if (target === 'bag') {
        b = Core.addBagItem(b, id, 1, idx);
      } else if (target === 'fabao') {
        b = Core.addFaBao(b, id, idx);
      } else if (target === 'skill') {
        b = Core.addSkill(b, id, idx);
      } else if (target === 'bs') {
        b = Core.addBsTalent(b, id, idx);
      } else if (target === 'md') {
        b = Core.setMdTalentLevel(b, id, 1, idx);
      } else if (target === 'ending') {
        b = Core.toggleEnding(b, id, true, idx);
      } else if (target === 'achievement') {
        b = Core.toggleAchievement(b, id, true, idx);
      } else if (target.indexOf('equip:') === 0) {
        b = Core.setEquipSlot(b, target.slice(6), id, idx);
      }
      state.bundle = b;
      renderBundle();
      var dlg = $('catalog-dialog');
      if (dlg && dlg.open) { dlg.close(); }
      showNotice('항목을 반영했습니다.', false);
    } catch (err) {
      showNotice(err && err.message ? err.message : '항목을 추가하지 못했습니다.', true);
    }
  }

  /* ---- 파일 / 서버 / 네이티브 입출력 ---- */

  function apiFetch(url, options) {
    var opts = options || {};
    var headers = opts.headers || {};
    if (state.apiToken) {
      headers['X-Lrs-Token'] = state.apiToken;
    }
    if (opts.body && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    opts.headers = headers;
    opts.credentials = 'same-origin';
    return fetch(url, opts).then(function (resp) {
      return resp.json().then(function (data) {
        if (!resp.ok || data.error) {
          throw new Error(data.error || ('서버 요청 실패: ' + resp.status));
        }
        return data;
      });
    });
  }

  function loadFilesMapIntoState(filesMap, label) {
    var bundle = Codec.parseBundle(filesMap);
    state.bundle = bundle;
    state.selectedIndices = { bs: [], md: [], fabao: [], bag: [], skill: [], ending: [], achievement: [] };
    renderBundle();
    runValidation(false);
    showNotice((label || '세이브') + ' 불러오기를 마쳤습니다. (' + Object.keys(bundle.files).length + '개 파일)', false);
  }

  function handleSaveAction() {
    if (!state.bundle) {
      showNotice('먼저 세이브 파일이나 예제를 불러오세요.', true);
      return;
    }
    flushScalarInputs();
    var validation = Core.validateBundle(state.bundle, idx);
    renderValidationResult(validation);
    if (!validation.valid) {
      showNotice('검증 오류가 있어 저장할 수 없습니다. 프리셋·검증 탭을 확인하세요.', true);
      return;
    }
    var encoded = Codec.encodeBundle(state.bundle, 2);

    if (state.mode === 'native' && window.__LRS_EDITOR__) {
      Promise.resolve(window.__LRS_EDITOR__.saveBundle(encoded)).then(function (res) {
        if (res && Array.isArray(res.backups)) { state.backups = res.backups; }
        showNotice('저장 폴더에 안전하게 저장하고 백업을 만들었습니다.', false);
      }).catch(function (err) {
        showNotice(err && err.message ? err.message : '네이티브 저장에 실패했습니다.', true);
      });
      return;
    }

    if (state.mode === 'server') {
      apiFetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ files: encoded })
      }).then(function (res) {
        if (Array.isArray(res.backups)) { state.backups = res.backups; }
        showNotice('로컬 서버를 통해 안전하게 저장했습니다.', false);
      }).catch(function (err) {
        showNotice(err && err.message ? err.message : '서버 저장에 실패했습니다.', true);
      });
      return;
    }

    var names = Object.keys(encoded);
    names.forEach(function (name, i) {
      setTimeout(function () {
        var blob = new Blob([encoded[name]], { type: 'application/json;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      }, i * 60);
    });
    showNotice('수정된 JSON 파일 ' + names.length + '개를 내려받았습니다.', false);
  }

  function openBackupDialog() {
    var dlg = $('backup-dialog');
    if (state.mode === 'native' && window.__LRS_EDITOR__) {
      Promise.resolve(window.__LRS_EDITOR__.listBackups()).then(function (list) {
        state.backups = Array.isArray(list) ? list : [];
        renderBackupList();
        if (dlg) { dlg.showModal(); }
      }).catch(function (err) {
        showNotice(err && err.message ? err.message : '백업 목록을 불러오지 못했습니다.', true);
      });
      return;
    }
    if (state.mode === 'server') {
      apiFetch('/api/backups').then(function (res) {
        state.backups = Array.isArray(res.backups) ? res.backups : [];
        renderBackupList();
        if (dlg) { dlg.showModal(); }
      }).catch(function (err) {
        showNotice(err && err.message ? err.message : '백업 목록을 불러오지 못했습니다.', true);
      });
      return;
    }
    state.backups = state.localBackups.map(function (b) {
      return { name: b.name, label: b.name };
    });
    renderBackupList();
    if (dlg) { dlg.showModal(); }
  }

  function renderBackupList() {
    var ul = $('backup-list');
    var st = $('backup-status');
    if (!ul) { return; }
    state.selectedBackupName = null;
    if (!state.backups.length) {
      ul.replaceChildren();
      if (st) { st.textContent = '표시할 백업이 없습니다.'; }
      return;
    }
    var nodes = state.backups.map(function (entry) {
      var name = typeof entry === 'string' ? entry : entry.name;
      var li = document.createElement('li');
      li.className = 'list-item';
      li.setAttribute('data-selected', 'false');
      li.tabIndex = 0;

      var span = document.createElement('span');
      span.textContent = name;
      li.appendChild(span);

      li.addEventListener('click', function () {
        state.selectedBackupName = name;
        Array.prototype.forEach.call(ul.children, function (c) {
          c.setAttribute('data-selected', c === li ? 'true' : 'false');
        });
        if (st) { st.textContent = '선택된 백업: ' + name; }
      });
      return li;
    });
    ul.replaceChildren.apply(ul, nodes);
    if (st) { st.textContent = '총 ' + state.backups.length + '개의 백업이 있습니다.'; }
  }

  function createBackupAction() {
    flushScalarInputs();
    if (state.mode === 'native' && window.__LRS_EDITOR__) {
      Promise.resolve(window.__LRS_EDITOR__.createBackup()).then(function (res) {
        if (res && Array.isArray(res.backups)) { state.backups = res.backups; }
        renderBackupList();
        showNotice('새 백업을 생성했습니다.', false);
      }).catch(function (err) {
        showNotice(err && err.message ? err.message : '백업을 만들지 못했습니다.', true);
      });
      return;
    }
    if (state.mode === 'server') {
      apiFetch('/api/backup', { method: 'POST', body: '{}' }).then(function (res) {
        state.backups = Array.isArray(res.backups) ? res.backups : [];
        renderBackupList();
        showNotice('새 백업을 생성했습니다.', false);
      }).catch(function (err) {
        showNotice(err && err.message ? err.message : '백업을 만들지 못했습니다.', true);
      });
      return;
    }
    if (!state.bundle) {
      showNotice('백업할 세이브 데이터가 없습니다.', true);
      return;
    }
    var snapName = '임시백업-' + new Date().toTimeString().slice(0, 8);
    state.localBackups.unshift({ name: snapName, bundle: Codec.cloneJson(state.bundle) });
    if (state.localBackups.length > 20) { state.localBackups.length = 20; }
    state.backups = state.localBackups.map(function (b) { return { name: b.name }; });
    renderBackupList();
    showNotice('브라우저 임시 백업을 저장했습니다.', false);
  }

  function restoreBackupAction() {
    if (!state.selectedBackupName) {
      showNotice('복원할 백업을 선택하세요.', true);
      return;
    }
    var name = state.selectedBackupName;
    if (state.mode === 'native' && window.__LRS_EDITOR__) {
      Promise.resolve(window.__LRS_EDITOR__.restoreBackup(name)).then(function (res) {
        if (res && res.files) { loadFilesMapIntoState(res.files, '백업 복원'); }
        var dlg = $('backup-dialog');
        if (dlg && dlg.open) { dlg.close(); }
      }).catch(function (err) {
        showNotice(err && err.message ? err.message : '백업 복원에 실패했습니다.', true);
      });
      return;
    }
    if (state.mode === 'server') {
      apiFetch('/api/restore', { method: 'POST', body: JSON.stringify({ name: name }) }).then(function (res) {
        if (res && res.files) { loadFilesMapIntoState(res.files, '백업 복원'); }
        var dlg = $('backup-dialog');
        if (dlg && dlg.open) { dlg.close(); }
      }).catch(function (err) {
        showNotice(err && err.message ? err.message : '백업 복원에 실패했습니다.', true);
      });
      return;
    }
    var found = state.localBackups.filter(function (b) { return b.name === name; })[0];
    if (found) {
      state.bundle = Codec.cloneJson(found.bundle);
      renderBundle();
      var dlg = $('backup-dialog');
      if (dlg && dlg.open) { dlg.close(); }
      showNotice('임시 백업을 복원했습니다.', false);
    }
  }

  function renderValidationResult(v) {
    var out = $('validate-output');
    if (!out) { return; }
    var lines = [];
    lines.push(v.valid ? '[통과] 저장 데이터 검증을 통과했습니다.' : '[오류] 저장 데이터에 문제가 있습니다.');
    if (state.bundle) {
      var info = Core.inspectBundle(state.bundle, idx);
      lines.push('이름: ' + (info.playerName || '-') + ' | 경지: ' + (info.realmName || info.realmLevel) +
        ' | 영석: ' + info.lingShi + ' | 환생석: ' + info.reincarnationStone +
        ' | 가방: ' + info.bagCount + ' | 법보: ' + info.faBaoCount + ' | 법술: ' + info.skillCount);
    }
    if (v.errors.length) {
      lines.push('');
      lines.push('오류:');
      v.errors.forEach(function (e) { lines.push('- ' + e); });
    }
    if (v.warnings.length) {
      lines.push('');
      lines.push('주의:');
      v.warnings.forEach(function (w) { lines.push('- ' + w); });
    }
    out.textContent = lines.join('\n');
  }

  function runValidation(notifyUser) {
    if (!state.bundle) {
      var out = $('validate-output');
      if (out) { out.textContent = '검증할 세이브 데이터가 없습니다.'; }
      if (notifyUser) { showNotice('먼저 세이브 파일이나 예제를 불러오세요.', true); }
      return;
    }
    flushScalarInputs();
    var res = Core.validateBundle(state.bundle, idx);
    renderValidationResult(res);
    if (notifyUser) {
      showNotice(res.valid ? '검증을 통과했습니다.' : '검증에서 오류가 발견되었습니다.', !res.valid);
    }
  }

  function wireActions() {
    $('btn-sample').addEventListener('click', function () {
      state.bundle = Core.createDemoBundle(idx);
      state.selectedIndices = { bs: [], md: [], fabao: [], bag: [], skill: [], ending: [], achievement: [] };
      renderBundle();
      runValidation(false);
      showNotice('예제 세이브 번들을 불러왔습니다.', false);
    });

    var fileInput = $('file-input');
    $('btn-load-file').addEventListener('click', function () {
      if (state.mode === 'native' && window.__LRS_EDITOR__ && window.__LRS_EDITOR__.pickAndLoad) {
        Promise.resolve(window.__LRS_EDITOR__.pickAndLoad()).then(function (res) {
          if (res && res.files) { loadFilesMapIntoState(res.files, '저장 폴더'); }
        }).catch(function (err) {
          showNotice(err && err.message ? err.message : '파일을 열지 못했습니다.', true);
        });
        return;
      }
      fileInput.value = '';
      fileInput.click();
    });

    fileInput.addEventListener('change', function () {
      var files = Array.prototype.slice.call(fileInput.files || []);
      if (!files.length) { return; }
      var filesMap = {};
      Promise.all(files.map(function (f) {
        return f.text().then(function (txt) { filesMap[f.name] = txt; });
      })).then(function () {
        loadFilesMapIntoState(filesMap, '선택 파일');
      }).catch(function (err) {
        showNotice(err && err.message ? err.message : '파일을 읽지 못했습니다.', true);
      });
    });

    $('btn-load-slot').addEventListener('click', function () {
      if (state.mode === 'native' && window.__LRS_EDITOR__) {
        Promise.resolve(window.__LRS_EDITOR__.pickAndLoad()).then(function (res) {
          if (res && res.files) { loadFilesMapIntoState(res.files, '저장 폴더'); }
        }).catch(function (err) {
          showNotice(err && err.message ? err.message : '저장 폴더를 불러오지 못했습니다.', true);
        });
        return;
      }
      if (state.mode === 'server') {
        apiFetch('/api/bundle').then(function (res) {
          if (res && res.files) { loadFilesMapIntoState(res.files, '저장 폴더'); }
        }).catch(function (err) {
          showNotice(err && err.message ? err.message : '저장 폴더를 불러오지 못했습니다.', true);
        });
        return;
      }
      showNotice('브라우저 모드에서는 파일/폴더 열기를 사용하세요.', false);
      fileInput.click();
    });

    $('btn-save').addEventListener('click', handleSaveAction);
    $('btn-restore').addEventListener('click', openBackupDialog);
    $('btn-backup-close').addEventListener('click', function () { $('backup-dialog').close(); });
    $('btn-backup-create').addEventListener('click', createBackupAction);
    $('btn-backup-restore').addEventListener('click', restoreBackupAction);

    Array.prototype.forEach.call(document.querySelectorAll('.catalog-open'), function (btn) {
      btn.addEventListener('click', function () {
        openCatalog(btn.getAttribute('data-catalog-filter'), btn.getAttribute('data-catalog-target'));
      });
    });
    $('btn-catalog-close').addEventListener('click', function () { $('catalog-dialog').close(); });
    $('catalog-search').addEventListener('input', refreshCatalogResults);
    $('catalog-filter').addEventListener('change', refreshCatalogResults);
    $('btn-catalog-add').addEventListener('click', applyCatalogSelection);

    $('btn-clear-weapon').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.setEquipSlot(ensureActiveBundle(), 'Weapon', 0, idx);
      renderBundle();
    });
    $('btn-clear-clothes').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.setEquipSlot(ensureActiveBundle(), 'Clothes', 0, idx);
      renderBundle();
    });
    $('btn-clear-shoes').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.setEquipSlot(ensureActiveBundle(), 'Shoes', 0, idx);
      renderBundle();
    });

    $('btn-inventory-inc').addEventListener('click', function () {
      flushScalarInputs();
      var sel = state.selectedIndices.bag;
      if (!sel.length) { showNotice('수량을 바꿀 아이템을 선택하세요.', true); return; }
      var b = ensureActiveBundle();
      var bag = (b.files['PlayerBagDataInfo.json'] && b.files['PlayerBagDataInfo.json'].Bags) || [];
      sel.forEach(function (i) {
        if (bag[i]) { b = Core.updateBagQty(b, i, (bag[i].num || 1) + 1); }
      });
      state.bundle = b;
      renderBundle();
    });
    $('btn-inventory-dec').addEventListener('click', function () {
      flushScalarInputs();
      var sel = state.selectedIndices.bag;
      if (!sel.length) { showNotice('수량을 바꿀 아이템을 선택하세요.', true); return; }
      var b = ensureActiveBundle();
      var bag = (b.files['PlayerBagDataInfo.json'] && b.files['PlayerBagDataInfo.json'].Bags) || [];
      sel.forEach(function (i) {
        if (bag[i]) { b = Core.updateBagQty(b, i, Math.max(1, (bag[i].num || 1) - 1)); }
      });
      state.bundle = b;
      renderBundle();
    });
    $('btn-inventory-remove').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.removeBagItems(ensureActiveBundle(), state.selectedIndices.bag);
      state.selectedIndices.bag = [];
      renderBundle();
    });
    $('btn-inventory-sort').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.sortBag(ensureActiveBundle());
      state.selectedIndices.bag = [];
      renderBundle();
    });
    $('btn-inventory-clear').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.clearBag(ensureActiveBundle());
      state.selectedIndices.bag = [];
      renderBundle();
    });

    $('btn-fabao-remove').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.removeFaBao(ensureActiveBundle(), state.selectedIndices.fabao);
      state.selectedIndices.fabao = [];
      renderBundle();
    });
    $('btn-fabao-clear').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.clearFaBao(ensureActiveBundle());
      state.selectedIndices.fabao = [];
      renderBundle();
    });

    $('btn-bs-remove').addEventListener('click', function () {
      flushScalarInputs();
      var b = ensureActiveBundle();
      var ids = ((b.files['BSTalentData.json'] && b.files['BSTalentData.json'].talentIDs) || []);
      var dropIds = state.selectedIndices.bs.map(function (i) { return ids[i]; });
      state.bundle = Core.removeBsTalents(b, dropIds);
      state.selectedIndices.bs = [];
      renderBundle();
    });
    $('btn-bs-clear').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.clearBsTalents(ensureActiveBundle());
      state.selectedIndices.bs = [];
      renderBundle();
    });

    $('btn-md-level-up').addEventListener('click', function () {
      flushScalarInputs();
      var b = ensureActiveBundle();
      var list = (b.files['MDTalentData.json'] && b.files['MDTalentData.json'].talentDataList) || [];
      state.selectedIndices.md.forEach(function (i) {
        if (list[i]) { b = Core.setMdTalentLevel(b, list[i].id, (list[i].level || 0) + 1, idx); }
      });
      state.bundle = b;
      renderBundle();
    });
    $('btn-md-level-down').addEventListener('click', function () {
      flushScalarInputs();
      var b = ensureActiveBundle();
      var list = (b.files['MDTalentData.json'] && b.files['MDTalentData.json'].talentDataList) || [];
      state.selectedIndices.md.forEach(function (i) {
        if (list[i]) { b = Core.setMdTalentLevel(b, list[i].id, Math.max(0, (list[i].level || 0) - 1), idx); }
      });
      state.bundle = b;
      renderBundle();
    });
    $('btn-md-remove').addEventListener('click', function () {
      flushScalarInputs();
      var b = ensureActiveBundle();
      var list = (b.files['MDTalentData.json'] && b.files['MDTalentData.json'].talentDataList) || [];
      var dropIds = state.selectedIndices.md.map(function (i) { return list[i] ? list[i].id : -1; });
      state.bundle = Core.removeMdTalents(b, dropIds);
      state.selectedIndices.md = [];
      renderBundle();
    });
    $('btn-md-clear').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.clearMdTalents(ensureActiveBundle());
      state.selectedIndices.md = [];
      renderBundle();
    });

    $('btn-skill-remove').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.removeSkills(ensureActiveBundle(), state.selectedIndices.skill);
      state.selectedIndices.skill = [];
      renderBundle();
    });
    $('btn-skill-clear').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.clearSkills(ensureActiveBundle());
      state.selectedIndices.skill = [];
      renderBundle();
    });

    $('btn-ending-unlock-all').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.unlockAllEndings(ensureActiveBundle(), idx);
      renderBundle();
    });
    $('btn-ending-remove').addEventListener('click', function () {
      flushScalarInputs();
      var b = ensureActiveBundle();
      var list = (b.files['EndingData.json'] && b.files['EndingData.json'].unLockedIDs) || [];
      state.selectedIndices.ending.forEach(function (i) {
        if (list[i] !== undefined) { b = Core.toggleEnding(b, list[i], false, idx); }
      });
      state.bundle = b;
      state.selectedIndices.ending = [];
      renderBundle();
    });
    $('btn-ending-clear').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.clearEndings(ensureActiveBundle());
      state.selectedIndices.ending = [];
      renderBundle();
    });

    $('btn-achievement-unlock-all').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.unlockAllAchievements(ensureActiveBundle(), idx);
      renderBundle();
    });
    $('btn-achievement-remove').addEventListener('click', function () {
      flushScalarInputs();
      var b = ensureActiveBundle();
      var dict = (b.files['AchievementData.json'] && b.files['AchievementData.json'].achievementActiveDict) || {};
      var keys = Object.keys(dict).filter(function (k) { return !!dict[k]; });
      state.selectedIndices.achievement.forEach(function (i) {
        if (keys[i] !== undefined) { b = Core.toggleAchievement(b, parseInt(keys[i], 10), false, idx); }
      });
      state.bundle = b;
      state.selectedIndices.achievement = [];
      renderBundle();
    });
    $('btn-achievement-clear').addEventListener('click', function () {
      flushScalarInputs();
      state.bundle = Core.clearAchievements(ensureActiveBundle());
      state.selectedIndices.achievement = [];
      renderBundle();
    });

    $('preset-select').addEventListener('change', updatePresetDescription);
    $('btn-preset-apply').addEventListener('click', function () {
      flushScalarInputs();
      var presetId = $('preset-select').value;
      try {
        state.bundle = Core.applyPreset(ensureActiveBundle(), presetId, idx);
        renderBundle();
        runValidation(false);
        showNotice('프리셋을 적용했습니다.', false);
      } catch (err) {
        showNotice(err && err.message ? err.message : '프리셋을 적용하지 못했습니다.', true);
      }
    });

    $('btn-validate').addEventListener('click', function () { runValidation(true); });
    $('btn-validate-clear').addEventListener('click', function () {
      $('validate-output').textContent = '검증 결과가 여기에 표시됩니다.';
    });
    $('btn-export-json').addEventListener('click', function () {
      if (!state.bundle) {
        showNotice('내보낼 세이브 데이터가 없습니다.', true);
        return;
      }
      flushScalarInputs();
      var enc = Codec.encodeBundle(state.bundle, 2);
      var preview = JSON.stringify(enc, null, 2);
      $('validate-output').textContent = preview.slice(0, 8000);
    });
  }

  function detectRuntime() {
    if (window.__LRS_EDITOR__) {
      state.mode = 'native';
      setBadge('네이티브 연결됨', 'connected');
      Promise.resolve(window.__LRS_EDITOR__.getStatus()).then(function (st) {
        if (st && st.files) { loadFilesMapIntoState(st.files, '저장 폴더'); }
      }).catch(function () { /* 대기 */ });
      return;
    }
    var meta = document.querySelector('meta[name="lrs-token"]');
    if (meta && meta.getAttribute('content')) {
      state.mode = 'server';
      state.apiToken = meta.getAttribute('content');
      setBadge('로컬 서버 연결됨', 'connected');
      apiFetch('/api/status').then(function (st) {
        if (st && st.hasFiles) {
          return apiFetch('/api/bundle').then(function (res) {
            if (res && res.files) { loadFilesMapIntoState(res.files, '저장 폴더'); }
          });
        }
      }).catch(function (err) {
        setBadge('서버 오류', 'error');
        showNotice(err && err.message ? err.message : '서버 상태를 확인하지 못했습니다.', true);
      });
      return;
    }
    state.mode = 'browser';
    setBadge('브라우저 모드', 'browser');
  }

  function boot() {
    initTheme();
    initTabs();
    populateStaticCatalogOptions();
    wireActions();
    detectRuntime();
    window.addEventListener('lrs-native-ready', detectRuntime);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
