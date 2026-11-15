// "Free" on a landing page must be true. An exam with Premium steps (every v1
// exam, and a v2 exam with `premium`) says "free to start" right under its
// "Free ... Practice Test" headline, in the page's own language, and never
// that everything is free. Only the free v2 exams may say that.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');

const { EXAMS_V2 } = require('../lib/v2/registry.ts');

const root = path.join(__dirname, '..');
const freeV2 = new Set(EXAMS_V2.filter((e) => !e.premium).map((e) => e.id));

const FREE_TO_START = [
  /free to start/i, /empieza gratis/i, /começa grátis/i, /gratuit pour commencer/i, /kostenlos starten/i,
  /gratis starten/i, /inizia gratis/i, /börja gratis/i, /start gratis/i, /aloita ilmaiseksi/i,
  /ingyen kezdhetsz/i, /începe gratuit/i, /ξεκίνα δωρεάν/i, /bắt đầu miễn phí/i, /무료로 시작/,
];
const ALL_FREE = /everything is free|all free|both are free|completely free|100% free|all of it is free/i;

function pages(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) pages(full, out);
    else if (entry.name === 'page.tsx') out.push(full);
  }
  return out;
}

test('a paid exam landing says "free to start" under its headline', () => {
  let checked = 0;
  for (const file of pages(path.join(root, 'app'))) {
    const source = fs.readFileSync(file, 'utf8');
    const subtitle = source.match(/subtitle="([^"]*)"/);
    if (!subtitle || !source.includes('ExamLandingHero')) continue;
    const id = source.match(/(?:examOffers\(|examId=)\{?"([a-zA-Z0-9-]+)"/);
    assert.ok(id, `${file}: no exam id found`);
    if (freeV2.has(id[1])) continue;
    const where = path.relative(root, file);
    assert.ok(FREE_TO_START.some((re) => re.test(subtitle[1])), `${where}: the hero subtitle must say "Free to start"`);
    assert.ok(!ALL_FREE.test(subtitle[1]), `${where}: a paid exam must not say everything is free`);
    checked++;
  }
  assert.ok(checked > 200, `only ${checked} paid landings found`);
});

test('a paid exam landing in another language says it too', () => {
  const dir = path.join(root, 'lib/landings');
  for (const name of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    if (freeV2.has(name.split('.')[0])) continue;
    const { subtitle } = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
    assert.ok(FREE_TO_START.some((re) => re.test(subtitle)), `lib/landings/${name}: the subtitle must say "free to start" in its language`);
  }
});

test('the facts of a paid exam never say all of it is free', () => {
  const lines = fs.readFileSync(path.join(root, 'lib/examFacts.ts'), 'utf8').split('\n');
  let id = '';
  for (const line of lines) {
    const key = line.match(/^  "?([a-zA-Z0-9-]+)"?: \{/);
    if (key) id = key[1];
    if (freeV2.has(id)) continue;
    assert.ok(!/all free with no account|all of it is free/i.test(line), `lib/examFacts.ts (${id}): a paid exam must not say all of it is free`);
  }
});

// Every English exam landing's headline starts with "Free" and its page title says "Free"
// (CLAUDE.md copy rule: titles keep "Free ... Practice Test"). Six landings shipped without
// it in Nov 2026 because their <h1> is written by hand in each page.
test('an English exam landing headline starts with "Free" and its title says Free', () => {
  let checked = 0;
  for (const file of pages(path.join(root, 'app'))) {
    const source = fs.readFileSync(file, 'utf8');
    if (!source.includes('ExamLandingHero')) continue;
    const h1 = source.match(/<h1[^>]*>\s*([^<{]+?)\s*<\/h1>/);
    if (!h1) continue;
    const where = path.relative(root, file);
    if (/^app\/(es|pt|de|fr|nl|it|pl|sv|da|fi|hu|ro|el|vi|ko|zh)\//.test(where)) continue;
    assert.ok(h1[1].startsWith('Free '), `${where}: the headline must start with "Free" (it reads "${h1[1]}")`);
    const title = source.match(/const title = "([^"]*)"/);
    if (title) assert.ok(/\bfree\b/i.test(title[1]), `${where}: the page title must say Free`);
    checked++;
  }
  assert.ok(checked > 200, `only ${checked} landings checked`);
});
