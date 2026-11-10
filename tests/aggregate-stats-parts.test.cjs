// Run: node --test tests/aggregate-stats-parts.test.cjs
// The stats cron scans the uid space in parts and adds them up: the parts must
// add up to exactly what one scan of every account gives.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { createExitTally } = require('../lib/exitQuestions.ts');

const now = Date.parse('2026-11-09T03:00:00Z');
const day = 86_400_000;
const iso = (t) => new Date(t).toISOString();
const opts = { now, examOf: (id) => (id.startsWith('U-') ? 'dmv' : id.startsWith('CDL-') ? 'cdl' : undefined), passPctOf: () => 80 };

// Quiet accounts that left mid-practice, a bounce, a pass and an active one.
const account = (seed) => {
  const t0 = now - (20 + seed) * day;
  const history = Array.from({ length: 4 + (seed % 5) }, (_, i) => ({
    questionId: `${seed % 2 ? 'U' : 'CDL'}-${(seed + i) % 7}`,
    isCorrect: (seed + i) % 3 !== 0,
    answeredAt: iso(t0 + i * 60_000),
  }));
  if (seed % 6 === 0) history.push({ questionId: 'U-1', isCorrect: true, answeredAt: iso(now - day) });
  if (seed % 7 === 0) history.length = 2;
  const completedTests = seed % 5 === 0
    ? [{ state: 'NY', score: 18, totalQuestions: 20, answers: [{ questionId: 'U-2', userAnswer: 'A', isCorrect: true, answeredAt: iso(t0 - day) }] }]
    : [];
  return { trainingAnswerHistory: history, completedTests };
};
const accounts = Array.from({ length: 60 }, (_, i) => account(i));

test('exit tallies built in parts merge to the one-scan doc', () => {
  const whole = createExitTally(opts);
  accounts.forEach((a) => whole.add(a));

  const parts = [0, 1, 2].map((k) => {
    const t = createExitTally(opts);
    accounts.filter((_, i) => i % 3 === k).forEach((a) => t.add(a));
    return JSON.parse(JSON.stringify(t.state())); // as sent over HTTP
  });
  const merged = createExitTally(opts);
  parts.forEach((p) => merged.merge(p));

  const strip = (doc) => {
    for (const e of Object.values(doc.exams)) e.questions.sort((a, b) => a.questionId.localeCompare(b.questionId));
    return doc;
  };
  const expected = strip(whole.build());
  assert.ok(Object.values(expected.exams).some((e) => e.questions.length > 0), 'fixture has question exits');
  assert.deepEqual(strip(merged.build()), expected);
});

test('mergePartials adds counts, grids and per-account totals', () => {
  const { mergePartials } = require('../lib/server/aggregateStats.ts');
  const grid = (n) => Array.from({ length: 7 }, (_, d) => Array.from({ length: 24 }, (_, h) => (d === 1 && h === 20 ? n : 0)));
  const part = (n) => ({
    sampledUsers: n,
    counts: { 'U-1': { correct: n, wrong: 1 } },
    studyGrid: grid(n),
    studyAnswers: n,
    studyUsers: n,
    examCounts: { cdl: { 'CDL-1': { correct: 1, wrong: n } } },
    examUsers: { cdl: n },
    exits: {},
  });
  const m = mergePartials([part(2), part(3)], now);
  assert.equal(m.sampledUsers, 5);
  assert.deepEqual(m.counts['U-1'], { correct: 5, wrong: 2 });
  assert.equal(m.studyGrid[1][20], 5);
  assert.equal(m.studyUsers, 5);
  assert.deepEqual(m.examCounts.cdl['CDL-1'], { correct: 2, wrong: 5 });
  assert.equal(m.examUsers.cdl, 5);
});
