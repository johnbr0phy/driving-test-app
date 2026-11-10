// The real store against an in-memory stand-in for Firestore: finish tests,
// let the store save, "open the site on another device" (a fresh store loading
// the same document) and compare. Nothing an account holds may change on the way.
require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');

// ── a tiny Firestore ────────────────────────────────────────────────────────
const docs = new Map();
let writes = 0;
let failNext = 0;
const clone = (v) => JSON.parse(JSON.stringify(v));
const noUndefined = (v, path = '') => {
  if (v === undefined) throw new Error(`Unsupported field value: undefined (${path})`);
  if (Array.isArray(v)) v.forEach((x, i) => { if (Array.isArray(x)) throw new Error(`Nested arrays are not supported (${path})`); noUndefined(x, `${path}[${i}]`); });
  else if (v && typeof v === 'object' && !(v instanceof Date)) for (const [k, x] of Object.entries(v)) noUndefined(x, `${path}.${k}`);
};
const snap = (path) => ({ exists: () => docs.has(path), data: () => (docs.has(path) ? clone(docs.get(path)) : undefined) });
const applyUpdate = (path, data) => {
  noUndefined(data);
  if (!docs.has(path)) throw new Error('No document to update');
  const next = { ...docs.get(path) };
  for (const [k, v] of Object.entries(clone(data))) next[k] = v; // top-level fields are replaced whole
  docs.set(path, next);
  writes++;
};
const fakeFirestore = {
  doc: (_db, ...segments) => ({ path: segments.join('/') }),
  getDoc: async (ref) => snap(ref.path),
  updateDoc: async (ref, data) => applyUpdate(ref.path, data),
  setDoc: async (ref, data) => { noUndefined(data); docs.set(ref.path, { ...(docs.get(ref.path) ?? {}), ...clone(data) }); writes++; },
  runTransaction: async (_db, fn) => {
    if (failNext > 0) { failNext--; throw new Error('unavailable'); }
    await new Promise((r) => setTimeout(r, 5)); // a round trip
    return fn({
      get: async (ref) => snap(ref.path),
      update: (ref, data) => applyUpdate(ref.path, data),
      set: (ref, data) => { noUndefined(data); docs.set(ref.path, { ...(docs.get(ref.path) ?? {}), ...clone(data) }); writes++; },
    });
  },
  getFirestore: () => ({}),
};

const realLoad = Module._load;
Module._load = function (request, parent, ...rest) {
  if (request === 'firebase/firestore') return fakeFirestore;
  if (request === '@/lib/firebase' || /lib[\\/]firebase(\.ts)?$/.test(request)) return { db: {}, auth: {}, default: {} };
  return realLoad.call(this, request, parent, ...rest);
};

function freshStore() {
  for (const key of Object.keys(require.cache)) {
    if (/store[\\/]useStore\.ts$/.test(key) || /lib[\\/]mcpProgressGuard\.ts$/.test(key)) delete require.cache[key];
  }
  return require('../store/useStore.ts');
}

const { shuffleQuestionOptions } = require('../lib/shuffleOptions.ts');
const { isSlimQuestion, expandCompletedTests } = require('../lib/testHistoryCompact.ts');
const dmv = require('../data/questions.json');
const cdl = require('../data/cdl-questions.json');
const universal = dmv.filter((q) => q.type === 'Universal');

const plain = (v) => JSON.parse(JSON.stringify(v));
const UID = 'user-1';
const PATH = `users/${UID}`;

async function signIn() {
  const mod = freshStore();
  await mod.useStore.getState().loadUserData(UID);
  return mod;
}

function finish(store, testId, bank) {
  const questions = bank.slice(0, 50).map(shuffleQuestionOptions);
  store.getState().startTest(testId, questions);
  questions.forEach((q, i) => store.getState().setAnswer(testId, i, i % 3 === 0 ? q.correctAnswer : 'A'));
  const answers = store.getState().currentTests[testId].answers;
  const score = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
  store.getState().completeTest(testId, score, questions, answers);
}

test('finished tests are identical on another device, however many there are', async () => {
  docs.clear();
  // An account from before this change: one finished test stored in full.
  docs.set(PATH, { selectedState: 'CA', completedTests: [], testAttempts: [], trainingAnswerHistory: [{ questionId: 'CA-001', isCorrect: true, answeredAt: '2026-01-01T00:00:00.000Z' }] });

  let { useStore, flushPendingSaves } = await signIn();
  for (let round = 0; round < 6; round++) {
    finish(useStore, 1, universal);
    finish(useStore, 2, universal.slice(40));
    if (round % 2 === 0) finish(useStore, 101, cdl);
  }
  await flushPendingSaves(10000);
  const onDeviceA = plain(useStore.getState().completedTests);
  assert.equal(onDeviceA.length, 15);

  // What is on the account: latest attempt of each test whole, the rest pointers.
  const account = docs.get(PATH);
  assert.equal(account.completedTests.length, 15);
  const wholeOnes = account.completedTests.filter((s) => !s.questions.some(isSlimQuestion));
  assert.equal(wholeOnes.length, 3, 'one whole attempt per test');
  assert.ok(JSON.stringify(account).length < 400_000, `account doc is ${JSON.stringify(account).length} bytes`);
  // Untouched by the save.
  assert.deepEqual(account.trainingAnswerHistory, [{ questionId: 'CA-001', isCorrect: true, answeredAt: '2026-01-01T00:00:00.000Z' }]);
  assert.deepEqual(account.completedTests.map((s) => [s.id, s.score, s.answers]), onDeviceA.map((s) => [s.id, s.score, s.answers]));

  // Another device.
  ({ useStore, flushPendingSaves } = await signIn());
  assert.deepEqual(plain(useStore.getState().completedTests), onDeviceA);
  assert.deepEqual(plain(useStore.getState().testAttempts), plain(account.testAttempts));
  assert.equal(useStore.getState().getTestSession(1).id, onDeviceA.filter((s) => s.testNumber === 1).pop().id);

  // It finishes one more and saves; a third device sees all sixteen, exact.
  finish(useStore, 2, universal.slice(40));
  await flushPendingSaves(10000);
  const onDeviceB = plain(useStore.getState().completedTests);
  assert.deepEqual(onDeviceB.slice(0, 15), onDeviceA);
  ({ useStore, flushPendingSaves } = await signIn());
  assert.deepEqual(plain(useStore.getState().completedTests), onDeviceB);
  assert.deepEqual(expandCompletedTests(plain(docs.get(PATH).completedTests)), onDeviceB);
});

test('an account stored the old way (everything whole) loads the same and shrinks on its next save', async () => {
  docs.clear();
  const old = [];
  for (let i = 0; i < 8; i++) {
    const questions = universal.slice(0, 50).map(shuffleQuestionOptions).map(({ optionOrder: _o, ...q }) => q);
    old.push({ id: `test-1-${1000 + i}`, testNumber: 1, state: 'CA', questions, answers: questions.map((q) => ({ questionId: q.questionId, userAnswer: 'B', isCorrect: q.correctAnswer === 'B', answeredAt: '2026-05-01T10:00:00.000Z' })), startedAt: '2026-05-01T09:50:00.000Z', completedAt: '2026-05-01T10:00:00.000Z', score: 20 + i, totalQuestions: 50 });
  }
  docs.set(PATH, { selectedState: 'CA', completedTests: plain(old), testAttempts: [{ testNumber: 1, state: 'CA', attemptCount: 8, firstScore: 20, bestScore: 27, lastAttemptDate: '2026-05-01T10:00:00.000Z' }] });
  const before = JSON.stringify(docs.get(PATH)).length;

  let { useStore, flushPendingSaves } = await signIn();
  assert.deepEqual(plain(useStore.getState().completedTests), old);
  useStore.getState().setPhotoURL('https://example.com/p.png'); // any save
  await flushPendingSaves(10000);
  const after = JSON.stringify(docs.get(PATH)).length;
  assert.ok(after < before / 2, `${before} -> ${after}`);

  ({ useStore, flushPendingSaves } = await signIn());
  assert.deepEqual(plain(useStore.getState().completedTests), old);
  assert.deepEqual(plain(useStore.getState().testAttempts), docs.get(PATH).testAttempts);
});

test('answers given while saves fail are not lost: the next save carries them all', async () => {
  docs.clear();
  docs.set(PATH, { selectedState: 'CA', completedTests: [] });
  let { useStore, flushPendingSaves } = await signIn();
  const quiet = console.error;
  console.error = () => {};
  failNext = 4;
  const questions = universal.slice(0, 50).map(shuffleQuestionOptions);
  useStore.getState().startTest(1, questions);
  for (let i = 0; i < 10; i++) {
    useStore.getState().setAnswer(1, i, 'C');
    await new Promise((r) => setTimeout(r, 8));
  }
  await flushPendingSaves(10000);
  console.error = quiet;
  assert.equal(failNext, 0);
  assert.deepEqual(Object.keys(docs.get(PATH).currentTests['1'].answers).length, 10);
  assert.equal(useStore.getState().syncFailures, 0, 'cleared by the save that worked');
});
