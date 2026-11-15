// The Premium locks on v1 exams (lib/examLocks.ts): the last quarter of the
// dashboard's steps, with a state version's single test left free.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');

const { EXAMS, EXAM_VARIANTS, getExamById, examTrainingParts, examTestIds } = require('../lib/exams.ts');
const { examSteps, lockedStepCount, lockedTestIds, lockedTrainingParts } = require('../lib/examLocks.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');

const samePart = (a, b) => a.set.id === b.set.id && a.part === b.part;
/** 1-based dashboard step numbers of the locked steps. */
const lockedStepNumbers = (exam) => {
  const parts = lockedTrainingParts(exam);
  const tests = lockedTestIds(exam);
  return examSteps(exam)
    .map((s, i) => ((s.kind === 'part' ? parts.some((p) => samePart(p, s.part)) : tests.includes(s.testId)) ? i + 1 : 0))
    .filter(Boolean);
};

test('a quarter of the steps, rounded, at least one', () => {
  assert.deepEqual([2, 5, 8, 9, 12, 19].map(lockedStepCount), [1, 1, 2, 2, 3, 5]);
});

test('an 8-step exam (Motorcycle) locks steps 7 and 8', () => {
  assert.deepEqual(lockedStepNumbers(getExamById('moto')), [7, 8]);
});

test('EPA 608 (9 steps) locks steps 5 and 9: its last training step and last test', () => {
  const exam = getExamById('epa608');
  const parts = examTrainingParts(exam);
  assert.equal(parts.length, 5);
  assert.ok(samePart(lockedTrainingParts(exam)[0], parts[4]));
  assert.deepEqual(lockedTestIds(exam), [examTestIds(exam)[3]]);
});

test('Life in the UK (12 steps) locks 10, 11 and 12', () => {
  assert.deepEqual(lockedStepNumbers(getExamById('uklitu')), [10, 11, 12]);
});

test('a longer exam locks more: CDL locks its last five steps', () => {
  const exam = getExamById('cdl');
  const steps = examSteps(exam).length;
  assert.equal(steps, 19);
  assert.deepEqual(lockedStepNumbers(exam), [15, 16, 17, 18, 19]);
  assert.equal(lockedTestIds(exam).length, 2);
});

test('a state version locks training steps only: its one test stays free', () => {
  for (const exam of EXAM_VARIANTS) {
    assert.deepEqual(lockedTestIds(exam), [], exam.id);
    const parts = examTrainingParts(exam);
    const locked = lockedTrainingParts(exam);
    assert.ok(locked.length >= 1 && locked.length < parts.length, exam.id);
    assert.ok(samePart(locked[locked.length - 1], parts[parts.length - 1]), exam.id);
  }
});

test('every national exam locks the tail of its dashboard, about a quarter, and ends on a test', () => {
  for (const exam of EXAMS) {
    const steps = examSteps(exam);
    assert.equal(steps.length, examTrainingParts(exam).length + examTestIds(exam).length, exam.id);
    const locked = lockedStepNumbers(exam);
    const n = lockedStepCount(steps.length);
    assert.deepEqual(locked, Array.from({ length: n }, (_, i) => steps.length - n + 1 + i), exam.id);
    const share = n / steps.length;
    assert.ok(share >= 0.2 && share <= 0.34, `${exam.id} locks ${n} of ${steps.length}`);
    const ids = examTestIds(exam);
    assert.ok(lockedTestIds(exam).includes(ids[ids.length - 1]), exam.id);
    assert.ok(lockedTestIds(exam).length < ids.length, `${exam.id} has a free test`);
    assert.ok(lockedTrainingParts(exam).length < examTrainingParts(exam).length, `${exam.id} has a free training step`);
  }
});

test('v2 Premium exams lock about a quarter of their drills and tests, never all of either', () => {
  for (const exam of EXAMS_V2) {
    if (!exam.premium) continue;
    const { lockedDrills, lockedTests } = exam.premium;
    assert.equal(lockedDrills.length + lockedTests.length, lockedStepCount(exam.drills.length + exam.tests.length), exam.id);
    assert.ok(lockedDrills.length < exam.drills.length, exam.id);
    assert.ok(lockedTests.length < exam.tests.length, exam.id);
    assert.deepEqual(lockedDrills, exam.drills.slice(exam.drills.length - lockedDrills.length).map((d) => d.key), exam.id);
  }
});
