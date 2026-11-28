// Public copy states how many questions are free (lib/examFreeCounts.ts)
// instead of a share. These keep the numbers and the site-wide claims true.
const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
require('tsx/cjs');

const { EXAMS } = require('../lib/exams.ts');
const { PREMIUM_V2_IDS } = require('../lib/v2/registry.ts');
const { examFreeCounts, freeCountsSentence, DMV_FREE_COUNTS } = require('../lib/examFreeCounts.ts');

const paid = EXAMS.filter((e) => !e.variantOf).map((e) => ({ id: e.id, c: examFreeCounts(e.id) })).filter((x) => x.c);

test('every v1 exam with Premium steps has free questions and a free practice test', () => {
  assert.ok(paid.length > 300, `expected the v1 catalog, got ${paid.length}`);
  for (const { id, c } of paid) {
    assert.ok(c.freeQuestions > 0 && c.freeQuestions <= c.questions, `${id}: ${c.freeQuestions} of ${c.questions}`);
    assert.ok(c.freeTests >= 1 && c.freeTests <= c.tests, `${id}: ${c.freeTests} of ${c.tests} tests free`);
  }
});

test('"most exams have 100 or more free questions" holds across every paid exam', () => {
  // Counted against every exam that sells Premium, v2 ones included, assuming
  // none of the v2 exams reaches 100, so the claim never depends on them.
  const atLeast100 = paid.filter(({ c }) => c.freeQuestions >= 100).length + (DMV_FREE_COUNTS.freeQuestions >= 100 ? 1 : 0);
  const all = paid.length + PREMIUM_V2_IDS.length + 1;
  assert.ok(atLeast100 * 2 > all, `${atLeast100} of ${all} paid exams have 100+ free questions`);
});

test('the homepage and /about make that claim, and no longer give a share', () => {
  const home = readFileSync('components/home/homeCopy.ts', 'utf8');
  const about = readFileSync('app/about/page.tsx', 'utf8');
  assert.match(home, /most exams have 100 or more free questions/);
  assert.match(about, /100 or more questions on most/);
  for (const [name, src] of [['homeCopy', home], ['about', about]]) {
    assert.doesNotMatch(src, /about a quarter|second half of the training/, name);
  }
});

test('the facts sentence says what is free and what Premium adds', () => {
  assert.equal(
    freeCountsSentence({ questions: 200, freeQuestions: 112, tests: 4, freeTests: 2 }),
    '112 questions and 2 practice tests are free with no account; Premium adds the other 88 questions and 2 more practice tests.',
  );
  assert.equal(
    freeCountsSentence({ questions: 100, freeQuestions: 50, tests: 1, freeTests: 1 }),
    '50 questions and 1 practice test are free with no account; Premium adds the other 50 questions.',
  );
});
