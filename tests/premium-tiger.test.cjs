// Premium upsells show the crowned Premium tiger (expression 1) of the test
// being upsold, not the site mascot or a test's everyday face (Nov 25 2026).
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');

test('the paywall shows the upsold test\'s crowned tiger', () => {
  const src = read('components/PaywallModal.tsx');
  assert.match(src, /src=\{getTigerAsset\(examId, 1\)\}/);
  assert.match(src, /examId = "dmv",/);
  assert.doesNotMatch(src, /tiger_face_01\.png/);
  // Every exam's paywall names its test.
  for (const [f, v] of [
    ['components/exam/ExamLockScreen.tsx', 'exam.id'],
    ['components/exam/ExamStatsPage.tsx', 'exam.id'],
    ['components/v2/V2Paywall.tsx', 'exam.id'],
    ['components/v2/StatsV2.tsx', 'exam.id'],
    ['components/results/ResultsDebriefBody.tsx', 'routes.id'],
    ['components/MissDrill.tsx', 'routes.id'],
  ]) {
    assert.match(read(f), new RegExp(`<PaywallModal\\s+examId=\\{${v.replace('.', '\\.')}\\}`), f);
  }
});

test('locked-step screens show the crowned tiger', () => {
  for (const f of ['components/exam/ExamLockScreen.tsx', 'components/v2/DrillLockScreen.tsx', 'components/v2/V2TestGate.tsx']) {
    const src = read(f);
    assert.match(src, /getTigerAsset\(exam\.id, 1\)/, f);
    assert.doesNotMatch(src, /getTigerAsset\(exam\.id, 3\)/, f);
  }
});

test('expression 1 is each test\'s own crowned face', () => {
  const T = require('../lib/tigerAssets.ts');
  // The DMV wears the shared driving tiger.
  assert.equal(T.getTigerAsset('dmv', 1), '/tigers/driving/tiger_face_01.png');
  const id = T.TIGER_EXAM_IDS[0];
  assert.equal(T.getTigerAsset(id, 1), `/tigers/${id}/tiger_face_01.png`);
});
