'use strict';

const assert = require('node:assert/strict');
const Codec = require('../src/lrs-codec.js');
const Core = require('../src/editor-core.js');
const CatalogData = require('../src/catalog-data.js');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    console.error('FAIL:', name, err);
    process.exitCode = 1;
  }
}

const idx = Core.createCatalogIndex(CatalogData);

test('codec stripBom & detectFileKind', () => {
  assert.equal(Codec.stripBom('\uFEFF{"a":1}'), '{"a":1}');
  assert.equal(Codec.detectFileKind('newplayerinfo.json', null), 'NewPlayerInfo.json');
  assert.equal(Codec.detectFileKind('custom.json', { Bags: [] }), 'PlayerBagDataInfo.json');
  assert.equal(Codec.detectFileKind('custom.json', { reincarnationStone: 1, gameMode: 0 }), 'GameData.json');
});

test('codec parseSingleFile invalid throws & parseBundle/encodeBundle roundtrip preserves extras', () => {
  assert.throws(() => Codec.parseSingleFile('x.json', '{bad'));
  assert.throws(() => Codec.parseSingleFile('x.json', '[]'));
  const bundle = Codec.parseBundle({
    'GameData.json': '\uFEFF{"reincarnationStone":42,"gameMode":0,"customKeep":true}\n',
    'ReleaseQueueInfo.json': '{"queue":[1,2]}\n',
    'UnknownCustom.json': '{"foo":"bar"}\n'
  });
  assert.equal(bundle.files['GameData.json'].reincarnationStone, 42);
  assert.equal(bundle.files['ReleaseQueueInfo.json'].queue.length, 2);
  assert.deepEqual(bundle.extras['UnknownCustom.json'], { foo: 'bar' });

  const encoded = Codec.encodeBundle(bundle, 2);
  assert.equal(JSON.parse(encoded['GameData.json']).customKeep, true);
  assert.equal(JSON.parse(encoded['UnknownCustom.json']).foo, 'bar');
});

test('catalog index search across all categories', () => {
  for (const cat of ['item', 'equip', 'fabao', 'skill', 'birth', 'talent', 'ending', 'achievement']) {
    const res = idx.search(cat, '');
    assert.ok(res.length > 0, `expected entries for category ${cat}`);
  }
});

test('demo bundle inspect and validation rules', () => {
  const demo = Core.createDemoBundle(idx);
  const val = Core.validateBundle(demo, idx);
  assert.equal(val.valid, true, JSON.stringify(val.errors));
  assert.equal(val.errors.length, 0);

  const info = Core.inspectBundle(demo, idx);
  assert.equal(info.fileCount, 12);
  assert.ok(info.bagCount >= 1 && info.skillCount >= 1 && info.faBaoCount >= 1);

  const partial = Codec.parseBundle({
    'NewPlayerInfo.json': JSON.stringify({
      miscInfo: { playerName: '단독시험', realmLevel: 2, lingShi: 500, likeability1: 0 },
      roleInfo: { maxHealth: 100, currentHealth: 100 },
      basicPropertyInfo: { lifeTime: 50 }
    })
  });
  const pv = Core.validateBundle(partial, idx);
  assert.equal(pv.valid, true);
  assert.ok(pv.warnings.length > 0);

  const zeroDefaults = Codec.cloneJson(demo);
  zeroDefaults.files['NewPlayerInfo.json'].miscInfo.realmLevel = 0;
  zeroDefaults.files['NewPlayerInfo.json'].alchemyInfo.alchemyLevel = 0;
  zeroDefaults.files['NewPlayerInfo.json'].refineInfo.refineLevel = 0;
  zeroDefaults.files['NewPlayerInfo.json'].miscInfo.likeability1 = 99;
  zeroDefaults.files['NewPlayerInfo.json'].lingGenInfo.gold = 120;
  zeroDefaults.files['PlayerBagDataInfo.json'].Bags.push({ item: null, num: 0 });
  const zv = Core.validateBundle(zeroDefaults, idx);
  assert.equal(zv.valid, true, JSON.stringify(zv.errors));
  assert.ok(zv.warnings.length >= 5);

  const negRealm = Codec.cloneJson(demo);
  negRealm.files['NewPlayerInfo.json'].miscInfo.realmLevel = -1;
  assert.equal(Core.validateBundle(negRealm, idx).valid, false);

  const badLingShi = Codec.cloneJson(demo);
  badLingShi.files['NewPlayerInfo.json'].miscInfo.lingShi = -1;
  assert.equal(Core.validateBundle(badLingShi, idx).valid, false);
});

test('mutators bag/equip/fabao/skill/talents/endings/achievements', () => {
  let b = Core.createDemoBundle(idx);
  b = Core.applyScalarFields(b, { miscInfo: { playerName: '수정자', lingShi: 9999 } });
  assert.equal(b.files['NewPlayerInfo.json'].miscInfo.playerName, '수정자');

  const firstItem = CatalogData.items.find((x) => x.type === 1);
  b = Core.clearBag(b);
  b = Core.addBagItem(b, firstItem.id, 3, idx);
  b = Core.updateBagQty(b, 0, 7);
  assert.equal(b.files['PlayerBagDataInfo.json'].Bags[0].num, 7);
  b = Core.removeBagItems(b, [0]);
  assert.equal(b.files['PlayerBagDataInfo.json'].Bags.length, 0);

  const weapon = CatalogData.items.find((x) => x.type === 4);
  const clothes = CatalogData.items.find((x) => x.type === 5);
  b = Core.setEquipSlot(b, 'Weapon', weapon.id, idx);
  assert.equal(b.files['PlayerEquipDataInfo.json'].equipmentDic.Weapon.item.Id, weapon.id);
  assert.throws(() => Core.setEquipSlot(b, 'Weapon', clothes.id, idx));
  b = Core.setEquipSlot(b, 'Weapon', 0, idx);
  assert.equal(b.files['PlayerEquipDataInfo.json'].equipmentDic.Weapon, null);

  const fabao = CatalogData.items.find((x) => x.type === 2 || x.type === 3);
  b = Core.clearFaBao(b);
  b = Core.addFaBao(b, fabao.id, idx);
  assert.equal(b.files['PlayerFaBaoDataInfo.json'].faBaoList.length, 1);
  assert.throws(() => Core.addFaBao(b, weapon.id, idx));

  const skill = CatalogData.skills[0];
  b = Core.clearSkills(b);
  b = Core.addSkill(b, skill.id, idx);
  assert.deepEqual(b.files['PlayerSkillDataInfo.json'].existedSkillIDs, [skill.id]);
  b = Core.removeSkills(b, [0]);
  assert.deepEqual(b.files['PlayerSkillDataInfo.json'].existedSkillIDs, []);

  const talent = CatalogData.talents[0];
  b = Core.setMdTalentLevel(b, talent.id, 999, idx);
  const mdRow = b.files['MDTalentData.json'].talentDataList.find((x) => x.id === talent.id);
  assert.ok(mdRow.level <= talent.maxLevel);

  const birth = CatalogData.births[0];
  b = Core.clearBsTalents(b);
  b = Core.addBsTalent(b, birth.id, idx);
  assert.deepEqual(b.files['BSTalentData.json'].talentIDs, [birth.id]);
  b = Core.removeBsTalents(b, [birth.id]);
  assert.deepEqual(b.files['BSTalentData.json'].talentIDs, []);

  b = Core.clearEndings(b);
  b = Core.unlockAllEndings(b, idx);
  assert.equal(b.files['EndingData.json'].unLockedIDs.length, CatalogData.endings.length);

  b = Core.clearAchievements(b);
  b = Core.unlockAllAchievements(b, idx);
  assert.equal(Object.keys(b.files['AchievementData.json'].achievementActiveDict).length, CatalogData.achievements.length);
});

test('all 4 presets succeed and validate', () => {
  for (const preset of Core.PRESETS) {
    const b = Core.applyPreset(Core.createDemoBundle(idx), preset.id, idx);
    const v = Core.validateBundle(b, idx);
    assert.equal(v.valid, true, `${preset.id}: ${v.errors.join(', ')}`);
  }
});

console.log(`test_editor.cjs: ${passed} passed`);
