// State landings of real estate and insurance (lib/stateLandings.ts): every
// state version has one indexable page under its family landing.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');

const { EXAM_VARIANTS } = require('../lib/exams.ts');
const { allStateLandings, stateVariantBySlug, stateExamFacts } = require('../lib/stateLandings.ts');

test('every state version has a unique landing that resolves back to it', () => {
  const pages = allStateLandings();
  assert.equal(pages.length, EXAM_VARIANTS.length);
  assert.equal(new Set(pages.map((p) => p.path)).size, pages.length);
  for (const { variant, path } of pages) {
    assert.match(path, /^\/[a-z-]+-practice-test\/[a-z-]+$/);
    assert.equal(stateVariantBySlug(variant.variantOf, path.split('/').pop()).id, variant.id);
  }
});

test('state facts are short rows keyed by a real state version', () => {
  const ids = new Set(EXAM_VARIANTS.map((e) => e.id));
  const facts = require('../lib/stateExamFacts.json');
  for (const [id, f] of Object.entries(facts)) {
    assert.ok(ids.has(id), id);
    assert.ok(f.rows.length > 0 && f.rows.every((r) => r.label && r.value.length <= 200), id);
  }
  assert.ok(stateExamFacts('realestate-tx').rows.length > 3);
});
