// The line under the dashboard hero title (lib/heroCopy.ts): one of five per
// stage, the exam's own plus four shared, in every interface language.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');

const { heroLine, heroStage, HERO_VARIANTS } = require('../lib/heroCopy.ts');
const { LANGUAGES } = require('../i18n/index.ts');

const OWN = ['zero', 'early', 'mid', 'late', 'done'];
const langs = Array.isArray(LANGUAGES) ? LANGUAGES.map((l) => l.code ?? l) : Object.keys(LANGUAGES);

test('stages follow progress', () => {
  assert.equal(heroStage(0, 8), 'start');
  assert.equal(heroStage(1, 8), 'early');
  assert.equal(heroStage(4, 8), 'mid');
  assert.equal(heroStage(6, 8), 'late');
  assert.equal(heroStage(7, 8), 'last');
  assert.equal(heroStage(8, 8), 'done');
});

test('variant 0 is the exam own line for the stage', () => {
  assert.equal(heroLine(OWN, 0, 8, 0), 'zero');
  assert.equal(heroLine(OWN, 4, 8, 0), 'mid');
  assert.equal(heroLine(OWN, 7, 8, 0), 'late');
  assert.equal(heroLine(OWN, 8, 8, 0), 'done');
});

test('every language has four shared lines per stage with no placeholder left', () => {
  assert.ok(langs.length >= 17);
  for (const lang of langs) {
    for (const done of [0, 1, 4, 6, 7, 8]) {
      const seen = new Set();
      for (let v = 1; v < HERO_VARIANTS; v++) {
        const line = heroLine(OWN, done, 8, v, lang);
        assert.ok(line.length > 5, `${lang} ${done} ${v}`);
        assert.ok(!/[{}]/.test(line), `${lang} ${done} ${v}: ${line}`);
        seen.add(line);
      }
      assert.equal(seen.size, HERO_VARIANTS - 1, `${lang} ${done}`);
    }
  }
});

test('the middle of a dashboard never says halfway under a title that does', () => {
  for (let v = 1; v < HERO_VARIANTS; v++) assert.ok(!/halfway/i.test(heroLine(OWN, 4, 8, v)));
});
