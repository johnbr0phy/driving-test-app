// The teacher pages' copy (components/teach/teachCopy.ts and copy/<lang>.ts):
// every interface language has a full set, the sample questions point at a
// real option, and every phrase function renders without gaps.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');

const { teachEn, teachEnGB, pickTeachCopy } = require('../components/teach/teachCopy.ts');
const { TRANSLATED_TEACH_COPY } = require('../components/teach/copy/index.ts');
const { LANGUAGES } = require('../i18n/index.ts');

const all = { en: teachEn, 'en-GB': teachEnGB, ...TRANSLATED_TEACH_COPY };

// Sample arguments for each phrase function, by how many it takes.
function render(fn) {
  const samples = [[3], [3, 'Maya'], [3, 'Maya', 7], [5, 9, 2, 'Class', 7, 16], [5, 9, 2, 'Class', 7, 16]];
  if (fn.length === 1) return [fn(1), fn(3), fn(22), fn('Maya')];
  if (fn.length === 2) return [fn(3, 'Maya'), fn('Maya', 0), fn('Maya', 1), fn(4, 12)];
  if (fn.length === 3) return [fn(40, 'Maya', 0), fn(40, 'Maya', 12), fn(12, 80, 1), fn(12, null, 0), fn(3, 92, 2)];
  return [fn(...samples[3]), fn('Maya', 1, 1, 'Class', 1, 1)];
}

test('every interface language has teacher copy', () => {
  for (const { code } of LANGUAGES) {
    if (code === 'en') continue;
    assert.ok(TRANSLATED_TEACH_COPY[code], `no teacher copy for ${code}`);
  }
});

test('a language without its own copy reads English, and en-GB gets British spelling', () => {
  assert.equal(pickTeachCopy('en', 'en-US', TRANSLATED_TEACH_COPY), teachEn);
  assert.equal(pickTeachCopy('en', 'en-GB', TRANSLATED_TEACH_COPY), teachEnGB);
  assert.equal(pickTeachCopy('de', 'en-US', {}), teachEn);
  assert.match(teachEnGB.heroSub, /practise/);
});

for (const [lang, c] of Object.entries(all)) {
  test(`${lang}: complete and well formed`, () => {
    assert.equal(c.steps.length, 4, 'four how-it-works steps (one per icon)');
    assert.equal(c.seeBullets.length, 3, 'three bullets (one per icon)');
    assert.equal(c.faq.length, 6);
    assert.equal(c.sampleQuestions.length, 3, 'three sample questions (one per class count)');
    for (const q of c.sampleQuestions) {
      assert.equal(q.options.length, 4);
      assert.ok(q.answer >= 0 && q.answer < 4 && q.options[q.answer], `answer index ${q.answer}`);
      assert.equal(new Set(q.options).size, 4, 'options differ');
    }
    for (const [key, value] of Object.entries(c)) {
      if (typeof value === 'string') {
        if (key === 'sharedWithAfter') continue;
        assert.ok(value.trim(), `${key} is empty`);
        assert.ok(!value.includes('—'), `${key} has an em dash`);
      } else if (typeof value === 'function') {
        for (const out of render(value)) {
          assert.equal(typeof out, 'string', key);
          assert.ok(!/undefined|NaN|\[object/.test(out), `${key} renders "${out}"`);
          assert.ok(!out.includes('—'), `${key} has an em dash`);
        }
      }
    }
  });
}
