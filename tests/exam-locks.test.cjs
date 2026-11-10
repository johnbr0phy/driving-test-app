// The Premium locks on v1 exams (lib/examLocks.ts): the final training step
// and the final practice test, with a state version's single test left free.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');

const { EXAMS, EXAM_VARIANTS, getExamById, examTrainingParts, examTestIds } = require('../lib/exams.ts');
const { lockedTestId, lockedTrainingPart } = require('../lib/examLocks.ts');

const stepOf = (exam, part) => examTrainingParts(exam).findIndex((p) => p.set.id === part.set.id && p.part === part.part) + 1;

test('EPA 608 locks steps 5 and 9', () => {
  const exam = getExamById('epa608');
  const parts = examTrainingParts(exam);
  assert.equal(stepOf(exam, lockedTrainingPart(exam)), 5);
  assert.equal(parts.length + examTestIds(exam).indexOf(lockedTestId(exam)) + 1, 9);
});

test('Life in the UK locks steps 4 and 12', () => {
  const exam = getExamById('uklitu');
  assert.equal(stepOf(exam, lockedTrainingPart(exam)), 4);
  assert.equal(examTrainingParts(exam).length + examTestIds(exam).indexOf(lockedTestId(exam)) + 1, 12);
});

test('Motorcycle (Set N, Test N) locks Training Set 4 and Test 4, steps 7 and 8', () => {
  const exam = getExamById('moto');
  assert.equal(lockedTrainingPart(exam).set.setNumber, 4);
  assert.equal(lockedTestId(exam), examTestIds(exam)[3]);
});

test('a state version locks only its last set: its one test stays free', () => {
  for (const exam of EXAM_VARIANTS) {
    assert.equal(lockedTestId(exam), null, exam.id);
    const part = lockedTrainingPart(exam);
    assert.equal(stepOf(exam, part), examTrainingParts(exam).length, exam.id);
  }
});

test('every national exam locks exactly one training step and one test, and keeps the rest free', () => {
  for (const exam of EXAMS) {
    const ids = examTestIds(exam);
    assert.equal(lockedTestId(exam), ids[ids.length - 1], exam.id);
    assert.ok(ids.length >= 2, `${exam.id} has a free test`);
    const parts = examTrainingParts(exam);
    assert.ok(parts.length >= 2, `${exam.id} has a free training step`);
    assert.equal(stepOf(exam, lockedTrainingPart(exam)), parts.length, exam.id);
  }
});
