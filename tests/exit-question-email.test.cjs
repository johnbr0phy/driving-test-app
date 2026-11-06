// The "question that got away" email: which question an account left on,
// and that bank text is escaped into the HTML.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { findAccountExit } = require('../lib/exitQuestions.ts');
const { exitQuestionEmail, exitQuestionSubject } = require('../lib/email-templates.ts');
const { voiceFor } = require('../lib/email-voice.ts');

const opts = { examOf: (id) => (id.startsWith('U-') ? 'dmv' : id.startsWith('CDL-') ? 'cdl' : undefined), passPctOf: () => 80 };
const h = (questionId, isCorrect, day) => ({ questionId, isCorrect, answeredAt: `2026-10-${String(day).padStart(2, '0')}T12:00:00Z` });

test('the last training answer is the exit', () => {
  const exit = findAccountExit({ trainingAnswerHistory: [h('U-001', true, 1), h('U-002', true, 2), h('U-005', false, 3)] }, opts);
  assert.equal(exit.examId, 'dmv');
  assert.equal(exit.questionId, 'U-005');
  assert.equal(exit.isCorrect, false);
  assert.equal(exit.answers, 3);
});

test('no exit: too few answers, a passed test, or a test was the last thing', () => {
  assert.equal(findAccountExit({ trainingAnswerHistory: [h('U-001', true, 1), h('U-002', false, 2)] }, opts), null);
  const history = [h('U-001', true, 1), h('U-002', true, 2), h('U-003', false, 5)];
  const passed = { state: 'CA', score: 45, totalQuestions: 50, answers: [{ questionId: 'U-009', userAnswer: 'A', isCorrect: true, answeredAt: '2026-10-04T12:00:00Z' }] };
  assert.equal(findAccountExit({ trainingAnswerHistory: history, completedTests: [passed] }, opts), null);
  const failedLate = { ...passed, score: 10, answers: [{ ...passed.answers[0], answeredAt: '2026-10-09T12:00:00Z' }] };
  assert.equal(findAccountExit({ trainingAnswerHistory: history, completedTests: [failedLate] }, opts), null);
});

test('the exit belongs to the exam with the last answer', () => {
  const exit = findAccountExit({ trainingAnswerHistory: [h('U-001', true, 1), h('CDL-1', true, 2), h('CDL-2', true, 3), h('CDL-3', true, 4)] }, opts);
  assert.equal(exit.examId, 'cdl');
  assert.equal(exit.isCorrect, true);
});

test('the email escapes bank text and marks the answer', () => {
  const c = { question: 'Is 5 < 6?', options: ['Yes', 'No <b>'], answer: 'Yes', explanation: 'Because & so.', isCorrect: false };
  const html = exitQuestionEmail(voiceFor('dmv'), c);
  assert.match(html, /Is 5 &lt; 6\?/);
  assert.match(html, /No &lt;b&gt;/);
  assert.match(html, /Because &amp; so\./);
  assert.match(html, /A\. Yes &#10003;/);
  assert.match(html, /utm_campaign=exit_question/);
  assert.notEqual(exitQuestionSubject(c), exitQuestionSubject({ ...c, isCorrect: true }));
});
