// Training sets ask fresh questions mixed (lib/trainingOrder.ts), not in ID
// order, so a run of one subtopic (ten roundabout questions in a row) is
// spread through the set. Only the order changes, never the set's contents.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');

const { mixTrainingOrder, strideOrder } = require('../lib/trainingOrder.ts');
require('../lib/banks/aerta.ts');
const { getExamById } = require('../lib/exams.ts');
const { getExamTrainingSetQuestions, examTrainingAskOrder } = require('../lib/examTestGenerator.ts');

test('stride order visits every position once', () => {
  for (let n = 0; n <= 120; n++) {
    assert.deepEqual([...strideOrder(n)].sort((a, b) => a - b), Array.from({ length: n }, (_, i) => i));
  }
});

test('IDs next to each other are never asked next to each other', () => {
  const items = Array.from({ length: 34 }, (_, i) => ({ id: `Q-${String(i).padStart(3, '0')}`, c: 'a' }));
  const order = mixTrainingOrder(items, (t) => t.id, (t) => t.c).map((t) => Number(t.id.slice(2)));
  for (let k = 1; k < order.length; k++) assert.ok(Math.abs(order[k] - order[k - 1]) > 3);
});

test('two categories alternate instead of one finishing first', () => {
  const items = [
    ...Array.from({ length: 10 }, (_, i) => ({ id: `A-${i}`, c: 'a' })),
    ...Array.from({ length: 10 }, (_, i) => ({ id: `B-${i}`, c: 'b' })),
  ];
  const cats = mixTrainingOrder(items, (t) => t.id, (t) => t.c).map((t) => t.c).join('');
  assert.equal(cats, 'ab'.repeat(10));
});

test('UAE roundabouts set: same questions, roundabouts spread out', () => {
  const exam = getExamById('aerta');
  const set = getExamTrainingSetQuestions(exam, 3);
  const asked = examTrainingAskOrder(set);
  assert.deepEqual(asked.map((q) => q.questionId).sort(), set.map((q) => q.questionId).sort());
  const isRb = asked.map((q) => /roundabout/i.test(q.question));
  let run = 0;
  for (const r of isRb) { run = r ? run + 1 : 0; assert.ok(run <= 2, 'no more than 2 roundabout questions in a row'); }
});
