require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { compactCompletedTests, expandCompletedTests, isSlimQuestion } = require('../lib/testHistoryCompact.ts');
const { shuffleQuestionOptions } = require('../lib/shuffleOptions.ts');
const dmv = require('../data/questions.json');
const dmvEs = require('../data/questions_es.json');
const cdl = require('../data/cdl-questions.json');

const bytes = (v) => Buffer.byteLength(JSON.stringify(v));
// What Firestore gives back: plain JSON, key order not kept.
const roundTrip = (v) => JSON.parse(JSON.stringify(v));

let clock = 1_700_000_000_000;
function attempt(testNumber, state, bank, { shuffle = true } = {}) {
  const at = (clock += 60_000);
  const questions = bank.slice(0, 50).map((q) => (shuffle ? shuffleQuestionOptions(q) : { ...q }));
  return {
    id: `test-${testNumber}-${at}`,
    testNumber,
    state,
    questions,
    answers: questions.map((q, i) => ({
      questionId: q.questionId,
      userAnswer: 'ABCD'[i % 4],
      isCorrect: 'ABCD'[i % 4] === q.correctAnswer,
      answeredAt: new Date(at).toISOString(),
    })),
    startedAt: new Date(at - 600_000).toISOString(),
    completedAt: new Date(at).toISOString(),
    score: 37,
    totalQuestions: questions.length,
  };
}

const universal = dmv.filter((q) => q.state === 'ALL' || q.type === 'Universal');
const dmvTest = (n) => universal.slice((n - 1) * 40, (n - 1) * 40 + 50);

test('thirty retakes come back exactly as they were saved, at a fraction of the size', () => {
  const history = [];
  for (let i = 0; i < 30; i++) history.push(attempt((i % 4) + 1, 'CA', dmvTest((i % 4) + 1)));
  for (let i = 0; i < 6; i++) history.push(attempt(101 + (i % 2), 'CDL', cdl.slice((i % 2) * 50)));

  const stored = roundTrip(compactCompletedTests(history));
  assert.deepEqual(expandCompletedTests(stored), history);

  // The latest attempt of each test is whole; every older one is pointers.
  const latest = new Map();
  history.forEach((s) => latest.set(`${s.state}|${s.testNumber}`, s.id));
  for (const s of stored) {
    const isLatest = latest.get(`${s.state}|${s.testNumber}`) === s.id;
    assert.equal(s.questions.some(isSlimQuestion), !isLatest, s.id);
    if (!isLatest) assert.equal(s.qref, latest.get(`${s.state}|${s.testNumber}`));
  }
  assert.ok(bytes(history) > 900_000, 'the old form is near the 1 MiB limit');
  assert.ok(bytes(stored) < bytes(history) * 0.4, `${bytes(stored)} of ${bytes(history)} bytes`);
});

test('the input is not changed and a second pass changes nothing', () => {
  const history = [attempt(1, 'TX', dmvTest(1)), attempt(1, 'TX', dmvTest(1)), attempt(1, 'TX', dmvTest(1))];
  const before = JSON.stringify(history);
  const once = compactCompletedTests(history);
  assert.equal(JSON.stringify(history), before);
  assert.deepEqual(compactCompletedTests(roundTrip(once)), roundTrip(once));
  assert.deepEqual(expandCompletedTests(expandCompletedTests(roundTrip(once))), history);
});

test('attempts saved before option order was recorded survive too', () => {
  const strip = (s) => ({ ...s, questions: s.questions.map(({ optionOrder: _o, ...q }) => q) });
  const history = [strip(attempt(2, 'NY', dmvTest(2))), attempt(2, 'NY', dmvTest(2)), strip(attempt(2, 'NY', dmvTest(2)))];
  const stored = roundTrip(compactCompletedTests(history));
  assert.ok(stored[0].questions.every(isSlimQuestion));
  assert.deepEqual(expandCompletedTests(stored), history);
});

test('a question that changed between attempts, or was taken in another language, is kept whole', () => {
  const old = attempt(3, 'CA', dmvTest(3));
  old.questions[0] = { ...old.questions[0], explanation: 'The wording before the bank was corrected.' };
  old.questions[1] = { ...old.questions[1], optionA: 'An option that has since been rewritten' };
  const esById = new Map(dmvEs.map((q) => [q.questionId, q]));
  const spanish = attempt(3, 'CA', dmvTest(3).map((q) => esById.get(q.questionId) ?? q));
  const history = [old, spanish, attempt(3, 'CA', dmvTest(3))];

  const stored = roundTrip(compactCompletedTests(history));
  assert.deepEqual(expandCompletedTests(stored), history);
  assert.equal(isSlimQuestion(stored[0].questions[1]), false, 'rewritten option stays whole');
  assert.equal(stored[0].questions[0].d.explanation, old.questions[0].explanation, 'a changed field rides along');
  assert.ok(stored[1].questions.filter((q) => !isSlimQuestion(q)).length >= 45, 'the Spanish attempt is not folded into English');
});

test('an attempt added by the assistant after a save keeps older pointers valid', () => {
  const history = [attempt(4, 'FL', dmvTest(4)), attempt(4, 'FL', dmvTest(4)), attempt(4, 'FL', dmvTest(4))];
  const stored = roundTrip(compactCompletedTests(history));
  // lib/server/progress.ts appends to the stored array as it is.
  const fromAssistant = attempt(4, 'FL', dmvTest(4));
  const onAccount = [...stored, roundTrip(fromAssistant)];
  const loaded = expandCompletedTests(onAccount);
  assert.deepEqual(loaded, [...history, fromAssistant]);
  // The next browser save points everything at the newest attempt.
  const again = roundTrip(compactCompletedTests(loaded));
  assert.ok(again.slice(0, 3).every((s) => s.qref === fromAssistant.id));
  assert.deepEqual(expandCompletedTests(again), [...history, fromAssistant]);
});

test('a pointer that cannot be followed is left alone, never guessed at or overwritten', () => {
  const history = [attempt(1, 'WA', dmvTest(1)), attempt(1, 'WA', dmvTest(1))];
  const stored = roundTrip(compactCompletedTests(history));
  const orphaned = [stored[0]]; // the attempt it points at is gone
  const loaded = expandCompletedTests(orphaned);
  assert.deepEqual(loaded, orphaned);
  assert.deepEqual(roundTrip(compactCompletedTests([...loaded, attempt(1, 'WA', dmvTest(1))]))[0], orphaned[0]);
});

test('two sessions with one id are never used as a reference', () => {
  const a = attempt(1, 'OR', dmvTest(1));
  const b = { ...attempt(1, 'OR', dmvTest(1)), id: a.id };
  const history = [a, b];
  assert.deepEqual(roundTrip(compactCompletedTests(history)), history);
});

test('odd input passes through', () => {
  assert.deepEqual(compactCompletedTests([]), []);
  assert.deepEqual(expandCompletedTests([]), []);
  const odd = [{ id: 'x', testNumber: 1, state: 'CA' }, null, { id: 'y', testNumber: 1, state: 'CA', questions: [] }];
  assert.deepEqual(compactCompletedTests(odd), odd);
  assert.deepEqual(expandCompletedTests(odd), odd);
});
