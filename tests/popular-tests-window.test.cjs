// Run: node --test tests/popular-tests-window.test.cjs
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { rollingWeekWeights } = require('../lib/server/popularTests.ts');

// Steady traffic of `perDay`, with today only partly done at `now`.
function weekTotal(now, perDay) {
  const today = (now.getTime() % 86_400_000) / 86_400_000;
  return rollingWeekWeights(now).reduce((s, [, w], i) => s + w * (i === 0 ? perDay * today : perDay), 0);
}

test('the oldest day counts only for its part inside the last 168 hours', () => {
  const w = rollingWeekWeights(new Date('2026-11-17T06:00:00Z'));
  assert.equal(w.length, 8);
  assert.deepEqual(w[0], ['2026-11-17', 1]);
  assert.deepEqual(w[6], ['2026-11-11', 1]);
  assert.deepEqual(w[7], ['2026-11-10', 0.75]);
});

test('steady traffic reads as 7 days at any time, with no drop at UTC midnight', () => {
  for (const t of ['2026-11-16T23:59:00Z', '2026-11-17T00:01:00Z', '2026-11-17T15:30:00Z']) {
    assert.ok(Math.abs(weekTotal(new Date(t), 24_000) - 7 * 24_000) < 1, t);
  }
});
