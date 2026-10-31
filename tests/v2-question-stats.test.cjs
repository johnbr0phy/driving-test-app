// Per-question v2 counts (stats page and Common Mistakes) and their merge.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { v2QuestionPerformance } = require('../lib/v2/questionStats.ts');
const { mergeV2, withoutExamV2 } = require('../lib/v2/merge.ts');

const empty = { sessions: {}, results: [], drills: {}, basics: {}, goals: {}, questionStats: {} };
const result = (examId, testNumber, items) => ({ key: `${examId}:${testNumber}`, examId, testNumber, completedAt: `2026-10-0${testNumber}T00:00:00Z`, sections: [], composite: 0, items });

test('test answers, drill tallies and legacy drill progress each count once', () => {
  const data = {
    results: [
      result('sat', 1, [
        { id: 'A', answer: [1], correct: false, section: 'rw', domain: 'x' },
        { id: 'B', answer: [0], correct: true, section: 'rw', domain: 'x' },
        { id: 'C', correct: false, section: 'rw', domain: 'x' }, // skipped: not counted
      ]),
      result('sat', 2, [{ id: 'A', answer: [2], correct: false, section: 'rw', domain: 'x' }]),
      result('act', 1, [{ id: 'A', answer: [0], correct: true, section: 'e', domain: 'x' }]),
    ],
    drills: { 'sat:math': { masteredIds: ['A', 'D'], wrongQueue: ['E'], seen: 9, correct: 5 } },
    questionStats: { sat: { A: { n: 3, w: 2 } } },
  };
  const perf = v2QuestionPerformance(data, 'sat');
  assert.deepEqual(perf.get('A'), { answered: 5, correct: 1, wrong: 4 }); // 2 test misses + tally; legacy skipped
  assert.deepEqual(perf.get('B'), { answered: 1, correct: 1, wrong: 0 });
  assert.equal(perf.has('C'), false);
  assert.deepEqual(perf.get('D'), { answered: 1, correct: 1, wrong: 0 });
  assert.deepEqual(perf.get('E'), { answered: 1, correct: 0, wrong: 1 });
  const noTest2 = v2QuestionPerformance(data, 'sat', { skipTests: [2] });
  assert.equal(noTest2.get('A').wrong, 3);
});

test('merge keeps the larger tally per question; deleting an exam drops its tallies', () => {
  const a = { ...empty, questionStats: { sat: { A: { n: 4, w: 1 }, B: { n: 1, w: 1 } } } };
  const b = { ...empty, questionStats: { sat: { A: { n: 2, w: 2 } }, act: { Z: { n: 1, w: 0 } } } };
  const m = mergeV2(a, b);
  assert.deepEqual(m.questionStats.sat, { A: { n: 4, w: 2 }, B: { n: 1, w: 1 } });
  assert.deepEqual(m.questionStats.act, { Z: { n: 1, w: 0 } });
  assert.deepEqual(withoutExamV2(m, 'sat').questionStats, { act: { Z: { n: 1, w: 0 } } });
  // Older copies without the field merge cleanly.
  const old = { sessions: {}, results: [], drills: {}, basics: {}, goals: {} };
  assert.deepEqual(mergeV2(old, old).questionStats, {});
});
