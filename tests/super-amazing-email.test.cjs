require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { ALL_EXAMS } = require('../lib/exams.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { voiceFor } = require('../lib/email-voice.ts');
const { EMAIL_TEMPLATES } = require('../lib/email-templates.ts');
const { recentSuperAmazingUnlock, SUPER_AMAZING_MAX_AGE_MS } = require('../lib/super-amazing-email.ts');

const now = Date.parse('2026-11-08T17:00:00Z');
const hour = 60 * 60 * 1000;
const at = (age = hour) => new Date(now - age).toISOString();
const earned = (key, age = hour) => ({ superAmazingUnlocks: { [key]: at(age) } });

test('every supported DMV, v1, state variant and v2 dashboard can qualify', () => {
  const dashboards = [
    ['dmv', 'dmv'],
    ...ALL_EXAMS.map((exam) => [exam.id, exam.id]),
    ...EXAMS_V2.map((exam) => [`v2:${exam.id}`, exam.id]),
  ];
  for (const [key, examId] of dashboards) {
    const unlock = recentSuperAmazingUnlock(earned(key), now);
    assert.equal(unlock?.examId, examId, key);
    assert.equal(unlock?.dashboardKey, key, key);
    assert.equal(unlock?.unlockedAt.toISOString(), at(), key);
  }
});

test('the first earned dashboard wins over the current exam or a later achievement', () => {
  const unlock = recentSuperAmazingUnlock({
    primaryExam: 'dmv',
    superAmazingUnlocks: { dmv: at(hour), ccma: at(2 * hour) },
  }, now);
  assert.equal(unlock.examId, 'ccma');
  assert.equal(voiceFor(unlock.examId).dashboardPath, '/ccma/dashboard');
  const variant = recentSuperAmazingUnlock(earned('realestate-ca'), now);
  assert.equal(voiceFor(variant.examId).dashboardPath, '/real-estate/ca/dashboard');
});

test('seven-day freshness is inclusive and rejects stale or future achievements', () => {
  assert.ok(recentSuperAmazingUnlock(earned('ccma', SUPER_AMAZING_MAX_AGE_MS), now));
  assert.equal(recentSuperAmazingUnlock(earned('ccma', SUPER_AMAZING_MAX_AGE_MS + 1), now), null);
  assert.equal(recentSuperAmazingUnlock(earned('v2:sat', -1), now), null);
  assert.equal(recentSuperAmazingUnlock({ ...earned('ccma', -1), superAmazingUnlockedAt: at() }, now), null);
});

test('later latch backfills or a second dashboard cannot revive an old account unlock', () => {
  const stale = at(SUPER_AMAZING_MAX_AGE_MS + 1);
  assert.equal(recentSuperAmazingUnlock({ ...earned('ccma'), superAmazingUnlockedAt: stale }, now), null);
  assert.equal(recentSuperAmazingUnlock({ ...earned('v2:sat'), superAmazing: { firstEnabledAt: stale } }, now), null);
  assert.equal(recentSuperAmazingUnlock({ superAmazingUnlocks: { dmv: stale, ccma: at() } }, now), null);
  // Match the existing sender's dedicated-latch precedence. A toggle from an
  // older client is not an earlier achievement when the dedicated latch exists.
  assert.ok(recentSuperAmazingUnlock({
    ...earned('ccma'), superAmazingUnlockedAt: at(), superAmazing: { firstEnabledAt: stale },
  }, now));
});

test('legacy-only, missing, invalid and unknown achievements never fall back to DMV', () => {
  for (const raw of [
    {}, { superAmazingUnlockedAt: at() }, { superAmazing: { firstEnabledAt: at() } },
    { superAmazingUnlocks: null }, { superAmazingUnlocks: [] },
    { superAmazingUnlocks: { ccma: 'not-a-date' } },
    earned('not-an-exam'), earned('v2:not-an-exam'), earned('v2:ccma'),
    { superAmazingUnlocks: { unknown: at(2 * hour), ccma: at() } },
  ]) assert.equal(recentSuperAmazingUnlock(raw, now), null, JSON.stringify(raw));
});

test('Firestore Timestamp and Date latches work; invalid timestamp objects do not', () => {
  for (const value of [new Date(at()), { toDate: () => new Date(at()) }]) {
    assert.equal(recentSuperAmazingUnlock({ superAmazingUnlocks: { ccma: value } }, now)?.examId, 'ccma');
  }
  for (const value of [{ toDate: () => new Date('bad') }, { toDate: () => { throw new Error('bad'); } }]) {
    assert.equal(recentSuperAmazingUnlock({ superAmazingUnlocks: { ccma: value } }, now), null);
  }
});

test('celebration copy and links match every supported exam without false fixed counts', () => {
  for (const id of ['dmv', ...ALL_EXAMS.map((exam) => exam.id), ...EXAMS_V2.map((exam) => exam.id)]) {
    const voice = voiceFor(id);
    const html = EMAIL_TEMPLATES.superAmazingUnlocked(voice);
    assert.ok(html.includes(`your ${voice.shortName} dashboard`), id);
    assert.ok(html.includes(`https://www.tigertest.io${voice.dashboardPath}?utm_source=tigertest&amp;`) ||
      html.includes(`https://www.tigertest.io${voice.dashboardPath}?utm_source=tigertest&`), id);
    assert.match(html, /utm_campaign=super_amazing/);
    assert.doesNotMatch(html, /8 steps|questionCount|Almost nobody|wing it at the DMV|more ready than|every page, forever/);
    if (id !== 'dmv') assert.doesNotMatch(html, /DMV/);
    assert.match(html, /\{\{unsubscribeToken\}\}/);
  }
});
