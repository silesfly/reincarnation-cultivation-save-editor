/*
 * lrs-codec.js
 * 윤회수선전(Re-xiuxian Legend) 저장 파일 코덱 (UMD)
 *
 * - 외부 의존성 없음
 * - eval / Function 생성자 사용 없음
 * - DOM 직접 접근 없음
 * - 외부 URL 접근 없음
 * - 모든 오류 메시지는 한국어
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module !== null && module.exports) {
    module.exports = factory();
  } else {
    root.LrsCodec = factory();
  }
}(
  typeof globalThis !== 'undefined' ? globalThis
    : typeof self !== 'undefined' ? self
      : typeof window !== 'undefined' ? window
        : typeof global !== 'undefined' ? global
          : this,
  function () {
    'use strict';

    var BUNDLE_FORMAT = 'lrs-bundle-v1';

    var KNOWN_SAVE_FILES = [
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
      'AchievementData.json',
      'GameEventModelOutSideInfo.json',
      'DanYaoEffectInfo.json',
      'ReleaseQueueInfo.json',
      'BattlePlayerData.json',
      'SteamAchievementData.json'
    ];

    // 파일 이름(확장자 제외) -> 정식 파일 이름
    var FILE_KEYS = (function () {
      var map = {};
      var i;
      for (i = 0; i < KNOWN_SAVE_FILES.length; i += 1) {
        map[KNOWN_SAVE_FILES[i].replace(/\.json$/i, '')] = KNOWN_SAVE_FILES[i];
      }
      return map;
    }());

    // 소문자 색인 (확장자 포함 / 확장자 제외)
    var LOWER_INDEX = (function () {
      var map = {};
      var i;
      var canonical;
      var lower;
      for (i = 0; i < KNOWN_SAVE_FILES.length; i += 1) {
        canonical = KNOWN_SAVE_FILES[i];
        lower = canonical.toLowerCase();
        map[lower] = canonical;
        map[lower.replace(/\.json$/, '')] = canonical;
      }
      return map;
    }());

    // ---------------------------------------------------------------- 도우미

    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }

    function basenameOf(fileName) {
      if (typeof fileName !== 'string') {
        return '';
      }
      var s = fileName.replace(/\\/g, '/');
      var idx = s.lastIndexOf('/');
      if (idx >= 0) {
        s = s.slice(idx + 1);
      }
      return s;
    }

    function isPlainObjectLike(val) {
      return val !== null && typeof val === 'object' && !Array.isArray(val);
    }

    // ---------------------------------------------------------------- stripBom

    /**
     * 문자열 앞쪽의 UTF-8 BOM(\uFEFF)을 제거한다.
     * @param {string} str
     * @returns {string}
     */
    function stripBom(str) {
      if (typeof str !== 'string') {
        throw new Error('BOM을 제거할 대상이 문자열이 아닙니다.');
      }
      var out = str;
      while (out.length > 0 && out.charCodeAt(0) === 0xFEFF) {
        out = out.slice(1);
      }
      return out;
    }

    // ---------------------------------------------------------------- cloneJson

    /**
     * JSON 기준의 깊은 복제.
     * @param {*} val
     * @returns {*}
     */
    function cloneJson(val) {
      if (val === undefined) {
        return undefined;
      }
      if (val === null || typeof val !== 'object') {
        return val;
      }
      var text;
      try {
        text = JSON.stringify(val);
      } catch (err) {
        throw new Error('값을 JSON으로 변환할 수 없어 복제하지 못했습니다.');
      }
      if (typeof text !== 'string') {
        throw new Error('값을 JSON으로 변환할 수 없어 복제하지 못했습니다.');
      }
      try {
        return JSON.parse(text);
      } catch (err2) {
        throw new Error('복제한 JSON을 다시 해석하지 못했습니다.');
      }
    }

    // ---------------------------------------------------------------- detectFileKind

    /**
     * 파일 이름과(또는) 해석된 객체 구조를 보고 정식 파일 종류를 판별한다.
     * @param {string} fileName
     * @param {*} parsedObj
     * @returns {string|null} 정식 파일 이름 또는 null
     */
    function detectFileKind(fileName, parsedObj) {
      var base = basenameOf(fileName);
      var lower = base ? base.trim().toLowerCase() : '';

      if (lower) {
        if (hasOwn(LOWER_INDEX, lower)) {
          return LOWER_INDEX[lower];
        }
        var withoutExt = lower.replace(/\.json$/, '');
        if (hasOwn(LOWER_INDEX, withoutExt)) {
          return LOWER_INDEX[withoutExt];
        }
      }

      var obj = parsedObj;
      if (!isPlainObjectLike(obj)) {
        return null;
      }

      if (obj.miscInfo && obj.roleInfo && obj.basicPropertyInfo) {
        return 'NewPlayerInfo.json';
      }
      if (obj.reincarnationStone !== undefined && obj.gameMode !== undefined) {
        return 'GameData.json';
      }
      if (obj.Bags && Array.isArray(obj.Bags)) {
        return 'PlayerBagDataInfo.json';
      }
      if (obj.equipmentDic && typeof obj.equipmentDic === 'object') {
        return 'PlayerEquipDataInfo.json';
      }
      if (obj.faBaoList && Array.isArray(obj.faBaoList)) {
        return 'PlayerFaBaoDataInfo.json';
      }
      if (obj.skillList && Array.isArray(obj.skillList)) {
        return 'PlayerSkillDataInfo.json';
      }
      if (obj.talentDataList && Array.isArray(obj.talentDataList)) {
        return 'MDTalentData.json';
      }
      if (obj.talentIDs && Array.isArray(obj.talentIDs)) {
        return 'BSTalentData.json';
      }
      if (obj.basicGold !== undefined && obj.extraGold !== undefined) {
        return 'LingGenData.json';
      }
      if (obj.unLockedIDs && Array.isArray(obj.unLockedIDs)) {
        return 'EndingData.json';
      }
      if (obj.achievementActiveDict && typeof obj.achievementActiveDict === 'object') {
        return 'AchievementData.json';
      }
      if (obj.currentYear !== undefined && obj.occurredGameEvents !== undefined) {
        return 'GameEventInfo.json';
      }

      return null;
    }

    // ---------------------------------------------------------------- parseSingleFile

    /**
     * 단일 파일 문자열을 해석한다.
     * @param {string} fileName
     * @param {string} text
     * @returns {{fileName: string, kind: (string|null), data: Object, rawText: string}}
     */
    function parseSingleFile(fileName, text) {
      if (typeof fileName !== 'string') {
        throw new Error('파일 이름이 문자열이 아닙니다.');
      }
      var base = basenameOf(fileName).trim();
      if (!base) {
        throw new Error('파일 이름이 비어 있습니다.');
      }
      if (typeof text !== 'string') {
        throw new Error('파일 내용이 문자열이 아닙니다: ' + base);
      }

      var raw = stripBom(text);
      var data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        var detail = (err && typeof err.message === 'string') ? err.message : '알 수 없는 원인';
        throw new Error('JSON 해석에 실패했습니다: ' + base + ' (' + detail + ')');
      }

      if (!isPlainObjectLike(data)) {
        throw new Error('저장 데이터의 최상위 구조가 객체가 아닙니다: ' + base);
      }

      return {
        fileName: base,
        kind: detectFileKind(base, data),
        data: data,
        rawText: raw
      };
    }

    // ---------------------------------------------------------------- parseBundle

    /**
     * 여러 파일 문자열을 하나의 묶음으로 해석한다.
     * @param {Object<string, string>} filesMap
     * @returns {{format: string, files: Object, extras: Object, fileOrder: string[], warnings: string[]}}
     */
    function parseBundle(filesMap) {
      if (!filesMap || typeof filesMap !== 'object' || Array.isArray(filesMap)) {
        throw new Error('묶음 입력은 파일 이름과 내용을 담은 객체여야 합니다.');
      }

      var files = {};
      var extras = {};
      var warnings = [];
      var extraOrder = [];
      var names = Object.keys(filesMap);
      var i;
      var name;
      var value;
      var parsed;
      var canonical;

      for (i = 0; i < names.length; i += 1) {
        name = names[i];
        value = filesMap[name];

        if (typeof value !== 'string') {
          warnings.push('내용이 문자열이 아니어서 건너뛰었습니다: ' + name);
          continue;
        }

        try {
          parsed = parseSingleFile(name, value);
        } catch (err) {
          extras[name] = stripBom(value);
          extraOrder.push(name);
          warnings.push('해석에 실패하여 원본 그대로 보관했습니다: ' + name);
          continue;
        }

        canonical = parsed.kind;

        if (!canonical) {
          extras[name] = parsed.data;
          extraOrder.push(name);
          warnings.push('알 수 없는 파일 종류라 추가 항목으로 보관했습니다: ' + name);
          continue;
        }

        if (hasOwn(files, canonical)) {
          extras[name] = parsed.data;
          extraOrder.push(name);
          warnings.push('같은 종류의 파일이 중복되어 먼저 읽은 파일을 기준으로 삼았습니다: ' + canonical + ' (중복: ' + name + ')');
          continue;
        }

        files[canonical] = parsed.data;
      }

      var fileOrder = [];
      for (i = 0; i < KNOWN_SAVE_FILES.length; i += 1) {
        if (hasOwn(files, KNOWN_SAVE_FILES[i])) {
          fileOrder.push(KNOWN_SAVE_FILES[i]);
        }
      }
      for (i = 0; i < extraOrder.length; i += 1) {
        if (hasOwn(extras, extraOrder[i])) {
          fileOrder.push(extraOrder[i]);
        }
      }

      return {
        format: BUNDLE_FORMAT,
        files: files,
        extras: extras,
        fileOrder: fileOrder,
        warnings: warnings
      };
    }

    // ---------------------------------------------------------------- encodeFile

    /**
     * 객체를 저장 파일 문자열로 변환한다. (들여쓰기 기본값 2, 끝에 줄바꿈 추가)
     * @param {*} obj
     * @param {(number|string|null|undefined)} indent
     * @returns {string}
     */
    function encodeFile(obj, indent) {
      var useIndent = (indent === undefined || indent === null) ? 2 : indent;
      var text;
      try {
        text = JSON.stringify(obj, null, useIndent);
      } catch (err) {
        throw new Error('JSON 문자열 변환에 실패했습니다.');
      }
      if (typeof text !== 'string') {
        throw new Error('JSON 문자열로 만들 수 없는 값입니다.');
      }
      return text + '\n';
    }

    // ---------------------------------------------------------------- encodeBundle

    /**
     * 묶음을 파일 이름 -> 저장 문자열 형태로 변환한다. (입력은 변경하지 않음)
     * @param {Object} bundle
     * @param {(number|string|null|undefined)} indent
     * @returns {Object<string, string>}
     */
    function encodeBundle(bundle, indent) {
      if (!bundle || typeof bundle !== 'object' || Array.isArray(bundle)) {
        throw new Error('묶음 데이터가 객체가 아닙니다.');
      }

      var out = {};
      var files = isPlainObjectLike(bundle.files) ? bundle.files : {};
      var extras = isPlainObjectLike(bundle.extras) ? bundle.extras : {};
      var key;

      for (key in files) {
        if (hasOwn(files, key)) {
          out[key] = encodeFile(cloneJson(files[key]), indent);
        }
      }

      for (key in extras) {
        if (!hasOwn(extras, key)) {
          continue;
        }
        var value = extras[key];
        if (typeof value === 'string') {
          // 이미 저장 문자열 형태로 보관된 원본
          var raw = stripBom(value);
          if (raw.length > 0 && raw.charAt(raw.length - 1) !== '\n') {
            raw += '\n';
          }
          out[key] = raw;
        } else {
          out[key] = encodeFile(cloneJson(value), indent);
        }
      }

      return out;
    }

    // ---------------------------------------------------------------- 내보내기

    return {
      BUNDLE_FORMAT: BUNDLE_FORMAT,
      KNOWN_SAVE_FILES: KNOWN_SAVE_FILES.slice(),
      FILE_KEYS: FILE_KEYS,
      stripBom: stripBom,
      detectFileKind: detectFileKind,
      parseSingleFile: parseSingleFile,
      parseBundle: parseBundle,
      encodeFile: encodeFile,
      encodeBundle: encodeBundle,
      cloneJson: cloneJson
    };
  }
));
