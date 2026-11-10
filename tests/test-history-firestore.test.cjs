// Firestore's own client checks a write before it leaves the device (no
// undefined values, no array directly inside an array, legal field names).
// Both shapes this app writes must pass it: the compact stored form, and a
// session that was rebuilt from pointers and is later written in full.
require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { initializeApp, deleteApp } = require('firebase/app');
const { getFirestore, doc, writeBatch, terminate } = require('firebase/firestore');
const { compactCompletedTests, expandCompletedTests } = require('../lib/testHistoryCompact.ts');
const { shuffleQuestionOptions } = require('../lib/shuffleOptions.ts');
const dmv = require('../data/questions.json');

function attempt(n, { legacy = false } = {}) {
  const questions = dmv.slice(0, 50).map((q) => {
    const s = shuffleQuestionOptions(q);
    if (!legacy) return s;
    const { optionOrder: _o, ...rest } = s;
    return rest;
  });
  return {
    id: `test-1-${n}`,
    testNumber: 1,
    state: 'CA',
    questions,
    answers: questions.map((q) => ({ questionId: q.questionId, userAnswer: 'A', isCorrect: q.correctAnswer === 'A', answeredAt: new Date(n).toISOString() })),
    startedAt: new Date(n - 1000).toISOString(),
    completedAt: new Date(n).toISOString(),
    score: 30,
    totalQuestions: 50,
  };
}

test('the Firestore client accepts both the stored form and rebuilt sessions', async () => {
  const app = initializeApp({ projectId: 'tigertest-offline-check', apiKey: 'none' }, 'history-check');
  const db = getFirestore(app);
  try {
    const history = [attempt(1000, { legacy: true }), attempt(2000), attempt(3000, { legacy: true }), attempt(4000)];
    history[0].questions[3] = { ...history[0].questions[3], explanation: 'changed since' };
    const stored = compactCompletedTests(history);
    const rebuilt = expandCompletedTests(JSON.parse(JSON.stringify(stored)));
    assert.deepEqual(rebuilt, history);

    const ref = doc(db, 'users', 'someone');
    // update() and set() validate synchronously and send nothing until commit().
    assert.doesNotThrow(() => writeBatch(db).update(ref, { completedTests: stored }));
    assert.doesNotThrow(() => writeBatch(db).update(ref, { completedTests: rebuilt }));
    assert.doesNotThrow(() => writeBatch(db).set(ref, { completedTests: stored }, { merge: true }));
    // The check is real: this is the kind of value it refuses.
    assert.throws(() => writeBatch(db).update(ref, { completedTests: [{ questions: [{ optionA: undefined }] }] }), /undefined/i);
    assert.throws(() => writeBatch(db).update(ref, { completedTests: [[1]] }), /nested array/i);
  } finally {
    await terminate(db);
    await deleteApp(app);
  }
});
