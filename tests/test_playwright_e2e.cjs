'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

function loadPlaywright() {
  const candidates = [
    process.env.PLAYWRIGHT_PATH,
    'playwright',
    path.join(os.homedir(), '.local', 'lib', 'node_modules', '@playwright', 'mcp', 'node_modules', 'playwright'),
  ].filter(Boolean);
  for (const mod of candidates) {
    try {
      return require(mod);
    } catch (_e) { /* next */ }
  }
  throw new Error('Playwright 패키지를 찾을 수 없습니다.');
}

function findBrowserExecutable() {
  const candidates = [
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/opt/google/chrome/chrome',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) { return p; }
  }
  return undefined;
}

async function runModeATest(browser, distHtml) {
  const page = await browser.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  const externalReqs = [];

  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') { consoleErrors.push(msg.text()); }
  });
  page.on('request', (req) => {
    const url = req.url();
    if (!url.startsWith('file://') && !url.startsWith('blob:') && !url.startsWith('data:')) {
      externalReqs.push(url);
    }
  });

  await page.goto(pathToFileURL(distHtml).href, { waitUntil: 'load' });
  await page.waitForSelector('#runtime-badge');
  assert.equal(await page.textContent('#runtime-badge'), '브라우저 모드');

  // Theme switch
  await page.click('#btn-theme');
  assert.equal(await page.getAttribute('html', 'data-theme'), 'light');
  await page.click('#btn-theme');
  assert.equal(await page.getAttribute('html', 'data-theme'), 'dark');
  await page.click('#btn-theme');
  assert.equal(await page.getAttribute('html', 'data-theme'), 'auto');

  // Keyboard tab switching
  await page.focus('#tab-0');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.getAttribute('#tab-1', 'aria-selected'), 'true');
  await page.keyboard.press('End');
  assert.equal(await page.getAttribute('#tab-5', 'aria-selected'), 'true');
  await page.keyboard.press('Home');
  assert.equal(await page.getAttribute('#tab-0', 'aria-selected'), 'true');

  // Load demo bundle
  await page.click('#btn-sample');
  await page.click('#tab-1');
  const loadedName = await page.inputValue('#f-player-name');
  assert.ok(loadedName.length > 0);
  await page.fill('#f-player-name', '웹시험자');
  await page.fill('#f-ling-shi', '42000');

  // Catalog search + add to bag
  await page.click('#tab-3');
  await page.click('#btn-inventory-add');
  await page.fill('#catalog-search', '단');
  await page.waitForFunction(() => document.querySelectorAll('#catalog-results li').length > 0);
  await page.click('#catalog-results li:first-child');
  await page.click('#btn-catalog-add');

  // Apply preset & validate
  await page.click('#tab-5');
  await page.selectOption('#preset-select', 'heroine_max');
  await page.click('#btn-preset-apply');
  await page.click('#btn-validate');
  const valText = await page.textContent('#validate-output');
  assert.ok(valText.includes('[통과]'), valText);

  // Mode A backup & restore snapshot
  await page.click('#btn-restore');
  await page.click('#btn-backup-create');
  await page.waitForFunction(() => document.querySelectorAll('#backup-list li').length === 1);
  await page.click('#backup-list li:first-child');
  await page.click('#btn-backup-restore');

  // Verify JSON download trigger works in Mode A
  const dlPromise = page.waitForEvent('download');
  await page.click('#btn-save');
  const dl = await dlPromise;
  assert.ok(dl.suggestedFilename().endsWith('.json'));

  assert.deepEqual(externalReqs, []);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(consoleErrors, []);
  await page.close();
}

async function runModeBTest(browser, rootDir) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lrs-e2e-'));
  const saveDir = path.join(tmpDir, 'GameData');
  fs.mkdirSync(saveDir);
  fs.writeFileSync(path.join(saveDir, 'GameData.json'), JSON.stringify({ reincarnationStone: 88, gameMode: 0 }));
  fs.writeFileSync(
    path.join(saveDir, 'NewPlayerInfo.json'),
    JSON.stringify({
      roleInfo: { maxHealth: 100, currentHealth: 100 },
      basicPropertyInfo: { lifeTime: 50 },
      alchemyInfo: { alchemyLevel: 1 },
      refineInfo: { refineLevel: 1 },
      miscInfo: { playerName: '서버시험', realmLevel: 2, lingShi: 2500, likeability1: 0, likeability2: 0, likeability3: 0 },
      lingGenInfo: { gold: 10, wood: 10, water: 10, fire: 10, earth: 10 },
    }),
  );

  const serverProc = spawn('python3', ['-u', path.join(rootDir, 'lrs_editor.py'), 'serve', saveDir, '--port', '0', '--no-browser'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  try {
    const url = await new Promise((resolve, reject) => {
      let buf = '';
      const timer = setTimeout(() => reject(new Error('서버 시작 시간 초과: ' + buf)), 8000);
      serverProc.stdout.on('data', (chunk) => {
        buf += chunk.toString('utf8');
        const m = buf.match(/http:\/\/127\.0\.0\.1:\d+\//);
        if (m) {
          clearTimeout(timer);
          resolve(m[0]);
        }
      });
      serverProc.stderr.on('data', (d) => { buf += d.toString('utf8'); });
    });

    const page = await browser.newPage();
    const pageErrors = [];
    const consoleErrors = [];
    page.on('pageerror', (e) => pageErrors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.getElementById('runtime-badge').textContent === '로컬 서버 연결됨');

    await page.click('#tab-1');
    await page.waitForFunction(() => document.getElementById('f-player-name').value === '서버시험');
    await page.fill('#f-ling-shi', '91000');
    await page.click('#btn-save');
    await page.waitForFunction(() => document.getElementById('notice-bar').textContent.includes('안전하게 저장했습니다'));

    const saved = JSON.parse(fs.readFileSync(path.join(saveDir, 'NewPlayerInfo.json'), 'utf8'));
    assert.equal(saved.miscInfo.lingShi, 91000);

    // Restore via UI backup dialog
    await page.click('#btn-restore');
    await page.waitForFunction(() => document.querySelectorAll('#backup-list li').length >= 1);
    await page.click('#backup-list li:first-child');
    await page.click('#btn-backup-restore');
    await page.waitForFunction(() => document.getElementById('f-ling-shi').value === '2500');

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);
    await page.close();
  } finally {
    serverProc.kill('SIGTERM');
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

async function main() {
  const { chromium } = loadPlaywright();
  const rootDir = path.resolve(__dirname, '..');
  const distHtml = path.join(rootDir, 'dist', 'ReincarnationCultivationSaveEditor-v1.0.0.html');
  assert.ok(fs.existsSync(distHtml), '빌드된 HTML이 없습니다: ' + distHtml);

  const browser = await chromium.launch({
    headless: true,
    executablePath: findBrowserExecutable(),
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    await runModeATest(browser, distHtml);
    await runModeBTest(browser, rootDir);
    console.log('test_playwright_e2e.cjs: Mode A + Mode B passed');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
