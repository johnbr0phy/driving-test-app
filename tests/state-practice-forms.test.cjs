const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');

require('../lib/banks/realEstateStates.ts');
require('../lib/banks/lifeHealthStates.ts');
require('../lib/banks/propertyCasualtyStates.ts');
const { EXAM_VARIANTS, examTestLength } = require('../lib/exams.ts');
const { getExamQuestions } = require('../lib/examData.ts');
const { examTestQuestions } = require('../lib/examTestGenerator.ts');

const ids = (questions) => questions.map((q) => q.questionId);
const spread = (counts) => Math.max(...counts) - Math.min(...counts);

// CA and NJ real estate use the reviewed handoff's RE-CA-/RE-NJ- IDs for local
// content. Other state forms retain the built question's ID as its local source.
function stateItem(q, state) {
  return q.sourceQuestionId === q.questionId || q.sourceQuestionId.startsWith(`RE-${state}-`);
}

test('short state tests cover the approved full-length form exactly once, with a mix of general and state law', () => {
  for (const exam of EXAM_VARIANTS) {
    if (!['realestate', 'insurance', 'pnc'].includes(exam.variantOf)) continue;
    const bank = getExamQuestions(exam.id);
    const full = examTestQuestions(exam, 1);
    assert.deepEqual(ids(full).sort(), ids(bank).sort(), `${exam.id}: full-length test 1`);
    assert.equal(examTestLength(exam, 1), full.length, exam.id);

    const forms = [2, 3, 4].map((n) => {
      const questions = examTestQuestions(exam, n);
      assert.equal(questions.length, examTestLength(exam, n), `${exam.id} test ${n} length`);
      assert.deepEqual(ids(questions), ids(examTestQuestions(exam, n)), `${exam.id} test ${n} fixed membership`);
      return questions;
    });
    assert.deepEqual(ids(forms.flat()).sort(), ids(full).sort(), `${exam.id}: short tests partition the full form`);
    assert.ok(spread(forms.map((form) => form.length)) <= 1, `${exam.id}: short test lengths`);

    const stateCounts = forms.map((form) => form.filter((q) => stateItem(q, exam.jurisdiction.code)).length);
    assert.ok(stateCounts.every((n, i) => n > 0 && n < forms[i].length), `${exam.id}: national and local questions in every form`);
    assert.ok(spread(stateCounts) <= 1, `${exam.id}: local question counts ${stateCounts}`);
    for (const category of Object.keys(exam.blueprint)) {
      for (const local of [true, false]) {
        const counts = forms.map((form) => form.filter((q) =>
          q.category === category && stateItem(q, exam.jurisdiction.code) === local).length);
        assert.ok(spread(counts) <= 1, `${exam.id}: ${category}, local=${local}, counts=${counts}`);
      }
    }
  }
});
