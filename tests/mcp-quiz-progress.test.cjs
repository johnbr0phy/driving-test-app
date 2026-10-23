// Run: node --test tests/mcp-quiz-progress.test.cjs. All data and Firestore transactions are synthetic.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const { Firestore } = require('firebase-admin/firestore');
const { nextQuizQuestion, answerQuizQuestion, getPlayState, resetQuizPlay, pickNext } = require('../lib/server/mcpQuizPlay.ts');

const code = 'ABCDEF';
const uid = 'player';
const at = '2026-10-22T12:00:00.000Z';
const quiz = {
  code, title: 'Synthetic colours', description: '', ownerUid: uid, ownerName: 'Fixture', visibility: 'public',
  passPct: 80, createdVia: 'mcp', createdAt: at, updatedAt: at, plays: 0, memberCount: 0, reports: 0, nextQuestionId: 4,
  questions: [1, 2, 3].map((n) => ({ id: `q${n}`, question: `Choose red ${n}`, options: ['Red', 'Blue', 'Green', 'Yellow'], correctIndex: 0, explanation: 'Red is correct.', topic: 'Colours' })),
};
const empty = () => ({ masteredIds: [], wrongQueue: [], answers: [], tests: [], known: [], lastPlayedAt: at });
const userPath = `users/${uid}`;
const sessionPath = `mcpQuizPlay/${uid}_${code}`;
const clone = (value) => structuredClone(value);

/** Optimistic transactions retry on conflicting reads. Real SDK batches validate writes but never commit. */
function syntheticDb(initial = {}, { discardFirstTransaction = false } = {}) {
  const docs = new Map(Object.entries(initial).map(([key, value]) => [key, clone(value)]));
  const versions = new Map();
  const writes = [];
  const sdk = new Firestore({ projectId: 'synthetic-mcp-progress-only' });
  let attempts = 0;
  let discarded = false;
  let beforeCommit;
  const merge = (old, patch) => {
    if (patch?.constructor?.name === 'NumericIncrementTransform') return (typeof old === 'number' ? old : 0) + patch.operand;
    if (patch === null || typeof patch !== 'object' || Array.isArray(patch)) return clone(patch);
    if (!Object.keys(patch).length) return {};
    const result = { ...(old && typeof old === 'object' && !Array.isArray(old) ? old : {}) };
    for (const [key, value] of Object.entries(patch)) result[key] = merge(result[key], value);
    return result;
  };
  const snapshot = (path) => ({ exists: docs.has(path), data: () => docs.has(path) ? clone(docs.get(path)) : undefined });
  function apply({ path, method, data, options }) {
    writes.push({ path, method, data, options });
    if (method === 'delete') docs.delete(path);
    else {
      if (method === 'update' && !docs.has(path)) throw new Error(`Missing synthetic document: ${path}`);
      docs.set(path, merge(method === 'update' || options?.merge ? docs.get(path) : undefined, data));
    }
    versions.set(path, (versions.get(path) ?? 0) + 1);
  }
  function validate(op) {
    const batch = sdk.batch();
    const ref = sdk.doc(op.path);
    if (op.method === 'delete') batch.delete(ref);
    else if (op.method === 'update') batch.update(ref, op.data);
    else if (op.options) batch.set(ref, op.data, op.options);
    else batch.set(ref, op.data);
  }
  function reference(path) {
    return {
      path, get: async () => snapshot(path), collection: (name) => collection(`${path}/${name}`),
      set: async (data, options) => { const op = { path, method: 'set', data, options }; validate(op); apply(op); },
      update: async (data) => { const op = { path, method: 'update', data }; validate(op); apply(op); },
      delete: async () => apply({ path, method: 'delete' }),
    };
  }
  const collection = (path) => ({ doc: (id) => reference(`${path}/${id}`) });
  return {
    collection, docs, writes,
    get attempts() { return attempts; },
    set beforeCommit(callback) { beforeCommit = callback; },
    read: (path) => snapshot(path).data(),
    close: () => sdk.terminate(),
    async runTransaction(fn) {
      for (let attempt = 0; attempt < 20; attempt++) {
        attempts++;
        const reads = new Map();
        const pending = [];
        const tx = {
          get: async (ref) => {
            assert.equal(pending.length, 0, 'All transaction reads must precede writes');
            reads.set(ref.path, versions.get(ref.path) ?? 0);
            return snapshot(ref.path);
          },
          set: (ref, data, options) => pending.push({ path: ref.path, method: 'set', data, options }),
          update: (ref, data) => pending.push({ path: ref.path, method: 'update', data }),
          delete: (ref) => pending.push({ path: ref.path, method: 'delete' }),
        };
        const result = await fn(tx);
        pending.forEach(validate);
        if (beforeCommit) { const hook = beforeCommit; beforeCommit = undefined; await hook(reference); }
        if (discardFirstTransaction && !discarded) { discarded = true; continue; }
        if ([...reads].some(([path, version]) => (versions.get(path) ?? 0) !== version)) continue;
        pending.forEach(apply);
        return result;
      }
      throw new Error('Synthetic transaction exceeded retry budget');
    },
  };
}

function seeded(progress = empty(), extra = {}) {
  return {
    [`quizzes/${code}`]: quiz,
    [userPath]: { email: 'synthetic@example.invalid', trainingSets: { 1: { masteredIds: ['dmv-1'] } }, v2: { untouched: true }, quizProgress: { progress: { [code]: progress, GHJKLM: { ...empty(), known: ['GHJKLM-q1'] } }, recent: [{ code: 'GHJKLM', title: 'Other', at }], customField: 'keep' } },
    'users/other': { quizProgress: { progress: { [code]: { ...empty(), masteredIds: [`${code}-q3`] } } } },
    ...extra,
  };
}

async function withDb(initial, options, run) {
  const db = syntheticDb(initial, options);
  try { await run(db); } finally { await db.close(); }
}

test('resumes browser mastery with engine IDs, not stale legacy assistant mastery', async () => {
  const browser = { ...empty(), masteredIds: [`${code}-q1`], wrongQueue: [`${code}-q2`], answers: [{ q: `${code}-q1`, ok: true, t: at }] };
  await withDb(seeded(browser, { [sessionPath]: { masteredIds: ['q3'], wrongQueue: [], answered: 10, correct: 10, lastQuestionId: null } }), {}, async (db) => {
    const result = await nextQuizQuestion(uid, quiz, db);
    assert.equal(result.question.questionId, 'q3');
    assert.deepEqual(result.progress, { mastered: 1, total: 3, wrongQueueSize: 1, answered: 1, correct: 1, complete: false });
    assert.equal(result.question.correctAnswer, undefined);
    assert.equal(result.question.explanation, undefined);
    assert.deepEqual(db.read(userPath).quizProgress.progress[code].masteredIds, [`${code}-q1`]);
    assert.deepEqual(db.read(sessionPath).masteredIds, ['q3'], 'Keep legacy source data');
  });
});

test('correct and wrong answers share browser practice history without touching test or flashcard state', async () => {
  const browser = { ...empty(), known: [`${code}-q3`], tests: [{ at, total: 3, correct: 2, missedIds: [`${code}-q2`] }], current: { startedAt: at, questionIds: [`${code}-q2`, `${code}-q1`], answers: { [`${code}-q2`]: 'B' }, optionOrders: { [`${code}-q2`]: 'BCDA' } }, customField: { preserved: true } };
  await withDb(seeded(browser), {}, async (db) => {
    const before = db.read(userPath);
    const wrong = await answerQuizQuestion(uid, quiz, 'q1', 'B', db);
    assert.equal(wrong.isCorrect, false);
    assert.equal(wrong.correctAnswer, 'A');
    assert.equal(wrong.next.questionId, 'q2');
    let p = db.read(userPath).quizProgress.progress[code];
    assert.deepEqual(p.wrongQueue, [`${code}-q1`]);
    assert.deepEqual(p.answers.map(({ q, ok }) => ({ q, ok })), [{ q: `${code}-q1`, ok: false }]);
    await answerQuizQuestion(uid, quiz, 'q2', 'A', db);
    const fresh = await answerQuizQuestion(uid, quiz, 'q3', 'A', db);
    assert.equal(fresh.next.questionId, 'q1');
    const done = await answerQuizQuestion(uid, quiz, 'q1', 'a', db);
    assert.equal(done.progress.complete, true);
    assert.equal(done.next, null);
    assert.equal(done.progress.answered, 4);
    assert.equal(done.progress.correct, 3);
    p = db.read(userPath).quizProgress.progress[code];
    assert.deepEqual(p.wrongQueue, []);
    assert.equal(p.answers.length, 4);
    for (const key of ['current', 'tests', 'known', 'customField']) assert.deepEqual(p[key], browser[key], key);
    const after = db.read(userPath);
    for (const key of ['email', 'trainingSets', 'v2']) assert.deepEqual(after[key], before[key], key);
    assert.deepEqual(after.quizProgress.recent, before.quizProgress.recent);
    assert.deepEqual(after.quizProgress.progress.GHJKLM, before.quizProgress.progress.GHJKLM);
    assert.equal(after.quizProgress.customField, 'keep');
    assert.deepEqual(db.read('users/other'), seeded()['users/other']);
    assert.equal(db.read(`quizzes/${code}`).plays, 1);
    assert.equal(db.read('analytics/quizzes').plays, 1);
    assert.ok(db.writes.every(({ method }) => method !== 'delete'));
    assert.equal((await nextQuizQuestion(uid, quiz, db)).complete, true);
  });
});

test('a wrong answer removes prior mastery and repeated wrong answers keep queue order', async () => {
  await withDb(seeded({ ...empty(), masteredIds: [`${code}-q1`], wrongQueue: [`${code}-q2`, `${code}-q3`] }), {}, async (db) => {
    await answerQuizQuestion(uid, quiz, 'q1', 'D', db);
    await answerQuizQuestion(uid, quiz, 'q2', 'C', db);
    const p = db.read(userPath).quizProgress.progress[code];
    assert.deepEqual(p.masteredIds, []);
    assert.deepEqual(p.wrongQueue, [`${code}-q2`, `${code}-q3`, `${code}-q1`]);
    assert.equal(p.answers.length, 2);
  });
});

test('legacy-only mastery migrates once without fabricating answer history or deleting its source', async () => {
  const legacy = { masteredIds: ['q1', `${code}-q1`], wrongQueue: ['q2'], lastQuestionId: 'q2', answered: 8, correct: 3, startedAt: at, updatedAt: at, extra: 'keep' };
  await withDb({ [`quizzes/${code}`]: quiz, [userPath]: { unrelated: true }, [sessionPath]: legacy }, {}, async (db) => {
    assert.equal((await getPlayState(uid, code, db)).answered, 8);
    const first = await nextQuizQuestion(uid, quiz, db);
    assert.equal(first.question.questionId, 'q3');
    const migrated = db.read(userPath).quizProgress.progress[code];
    assert.deepEqual(migrated.masteredIds, [`${code}-q1`]);
    assert.deepEqual(migrated.wrongQueue, [`${code}-q2`]);
    assert.deepEqual(migrated.answers, []);
    assert.equal(db.read(userPath).unrelated, true);
    assert.deepEqual(db.read(sessionPath).masteredIds, legacy.masteredIds);
    assert.equal(db.read(sessionPath).extra, 'keep');
    await answerQuizQuestion(uid, quiz, 'q3', 'A', db);
    assert.equal((await getPlayState(uid, code, db)).answered, 9);
    assert.equal((await getPlayState(uid, code, db)).correct, 4);
    // Simulate an explicit browser reset. Historical assistant mastery must not return.
    await db.collection('users').doc(uid).set({ quizProgress: { progress: { [code]: { masteredIds: [], wrongQueue: [] } } } }, { merge: true });
    await nextQuizQuestion(uid, quiz, db);
    assert.deepEqual(db.read(userPath).quizProgress.progress[code].masteredIds, []);
    // Simulate a forgotten browser entry too. The migration marker prevents reimport.
    await db.collection('users').doc(uid).set({ unrelated: true });
    assert.deepEqual((await getPlayState(uid, code, db)).masteredIds, []);
    await nextQuizQuestion(uid, quiz, db);
    assert.deepEqual(db.read(userPath).quizProgress.progress[code].masteredIds, []);
    assert.equal((await getPlayState(uid, code, db)).answered, 0);
  });
});

test('an explicitly empty browser entry takes precedence over nonempty legacy data', async () => {
  await withDb(seeded(empty(), { [sessionPath]: { masteredIds: ['q1', 'q2'], wrongQueue: ['q3'], answered: 3, correct: 2 } }), {}, async (db) => {
    const result = await nextQuizQuestion(uid, quiz, db);
    assert.equal(result.question.questionId, 'q1');
    assert.equal(result.progress.mastered, 0);
    assert.deepEqual(db.read(userPath).quizProgress.progress[code].masteredIds, []);
  });
});

test('concurrent answers retry against the latest shared progress without losing either answer', async () => {
  await withDb(seeded(), {}, async (db) => {
    await Promise.all([answerQuizQuestion(uid, quiz, 'q1', 'A', db), answerQuizQuestion(uid, quiz, 'q2', 'B', db)]);
    const p = db.read(userPath).quizProgress.progress[code];
    assert.deepEqual(p.masteredIds, [`${code}-q1`]);
    assert.deepEqual(p.wrongQueue, [`${code}-q2`]);
    assert.equal(p.answers.length, 2);
    assert.equal(db.read(sessionPath).answered, 2);
    assert.ok(db.attempts >= 3, 'A conflicting synthetic transaction retried');
    assert.equal(db.read(`quizzes/${code}`).plays, 1);
    assert.equal(db.read('analytics/quizzes').plays, 1);
  });
});

test('transaction retry commits one history event and reports to the creator only once', async () => {
  const memberPath = `quizzes/${code}/members/u_${uid}`;
  const otherOwnerQuiz = { ...quiz, ownerUid: 'creator' };
  await withDb(seeded(empty(), { [memberPath]: { name: 'Synthetic player', answered: 4, correct: 2, tests: {}, missed: { 'old-question': 2 }, via: 'assistant' } }), { discardFirstTransaction: true }, async (db) => {
    await answerQuizQuestion(uid, otherOwnerQuiz, 'q1', 'B', db);
    assert.equal(db.read(userPath).quizProgress.progress[code].answers.length, 1);
    assert.equal(db.read(sessionPath).answered, 1);
    assert.equal(db.read(`quizzes/${code}`).plays, 1);
    const member = db.read(memberPath);
    assert.equal(member.answered, 5);
    assert.equal(member.correct, 2);
    assert.equal(member.missed[`${code}-q1`], 1);
    assert.equal(member.missed['old-question'], 2);
    assert.equal(member.picks[`${code}-q1`]['1'], 1);
    assert.equal(member.byCategory.Colours.a, 1);
  });
});

test('distinct same-question answers in one millisecond survive browser history deduplication', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse(at) });
  await withDb(seeded(), {}, async (db) => {
    await Promise.all([answerQuizQuestion(uid, quiz, 'q1', 'B', db), answerQuizQuestion(uid, quiz, 'q1', 'B', db)]);
    const answers = db.read(userPath).quizProgress.progress[code].answers;
    assert.equal(answers.length, 2);
    assert.equal(new Set(answers.map((answer) => `${answer.t}|${answer.q}`)).size, 2);
    assert.equal(db.read(sessionPath).answered, 2);
  });
});

test('a racing browser update survives the answer transaction retry', async () => {
  await withDb(seeded(), {}, async (db) => {
    const current = { startedAt: at, questionIds: [`${code}-q3`], answers: {}, optionOrders: {} };
    db.beforeCommit = async (ref) => ref(userPath).set({ quizProgress: { progress: { [code]: { masteredIds: [`${code}-q2`], current, known: [`${code}-q1`] } } }, newTopLevel: 'browser update' }, { merge: true });
    await answerQuizQuestion(uid, quiz, 'q1', 'A', db);
    const user = db.read(userPath);
    assert.deepEqual(user.quizProgress.progress[code].masteredIds, [`${code}-q2`, `${code}-q1`]);
    assert.deepEqual(user.quizProgress.progress[code].current, current);
    assert.deepEqual(user.quizProgress.progress[code].known, [`${code}-q1`]);
    assert.equal(user.newTopLevel, 'browser update');
    assert.equal(user.quizProgress.progress[code].answers.length, 1);
  });
});

test('completion ignores duplicate and removed question IDs while preserving their stored history', async () => {
  const masteredIds = [`${code}-q1`, `${code}-q1`, `${code}-q99`];
  await withDb(seeded({ ...empty(), masteredIds }), {}, async (db) => {
    const result = await nextQuizQuestion(uid, quiz, db);
    assert.equal(result.complete, false);
    assert.equal(result.progress.mastered, 1);
    assert.equal(result.question.questionId, 'q2');
    await answerQuizQuestion(uid, quiz, 'q2', 'A', db);
    assert.deepEqual(db.read(userPath).quizProgress.progress[code].masteredIds, [...masteredIds, `${code}-q2`]);
  });
});

test('history uses the browser cap and returned counts agree with subsequently read progress', async () => {
  const answers = Array.from({ length: 600 }, (_, n) => ({ q: `${code}-q1`, ok: n % 2 === 0, t: `${at}-${n}` }));
  await withDb(seeded({ ...empty(), answers }), {}, async (db) => {
    const result = await answerQuizQuestion(uid, quiz, 'q2', 'B', db);
    const state = await getPlayState(uid, code, db);
    const saved = db.read(userPath).quizProgress.progress[code].answers;
    assert.equal(saved.length, 600);
    assert.deepEqual(saved[0], answers[1]);
    assert.equal(result.progress.answered, state.answered);
    assert.equal(result.progress.correct, state.correct);
  });
});

test('invalid questions and choices do not read or mutate any progress', async () => {
  const unavailableDb = { collection() { throw new Error('Invalid input must not access Firestore'); } };
  assert.deepEqual(await answerQuizQuestion(uid, quiz, 'q999', 'A', unavailableDb), { error: 'QUESTION_NOT_FOUND' });
  assert.deepEqual(await answerQuizQuestion(uid, quiz, 'q1', 'E', unavailableDb), { error: 'BAD_ANSWER' });
});

test('explicit reset clears shared practice only, preserving browser test, cards, history and creator report', async () => {
  const progress = { ...empty(), masteredIds: [`${code}-q1`], wrongQueue: [`${code}-q2`], known: [`${code}-q3`], answers: [{ q: `${code}-q1`, ok: true, t: at }], tests: [{ at }], current: { startedAt: at, questionIds: [], answers: {}, optionOrders: {} } };
  const memberPath = `quizzes/${code}/members/u_${uid}`;
  await withDb(seeded(progress, { [sessionPath]: { masteredIds: ['q1'], answered: 2 }, [memberPath]: { answered: 7 } }), {}, async (db) => {
    const before = db.read(userPath);
    await resetQuizPlay(uid, code, db);
    const after = db.read(userPath);
    const p = after.quizProgress.progress[code];
    assert.deepEqual(p.masteredIds, []);
    assert.deepEqual(p.wrongQueue, []);
    for (const key of ['known', 'current', 'answers', 'tests']) assert.deepEqual(p[key], progress[key], key);
    assert.deepEqual(after.quizProgress.recent, before.quizProgress.recent);
    assert.deepEqual(after.quizProgress.progress.GHJKLM, before.quizProgress.progress.GHJKLM);
    assert.deepEqual(db.read(memberPath), { answered: 7 });
    assert.equal(db.read(sessionPath), undefined);
    assert.equal((await nextQuizQuestion(uid, quiz, db)).question.questionId, 'q1');
  });
  const tools = readFileSync('lib/server/mcp-tools.ts', 'utf8');
  assert.match(tools, /name: 'reset_quiz_play'[\s\S]*?confirm: z\.literal\(true\)/);
});

test('pickNext keeps its public local-ID interface and fresh-before-retry behavior', () => {
  const state = { masteredIds: ['q1'], wrongQueue: ['q2'], lastQuestionId: null, answered: 2, correct: 1, startedAt: at, updatedAt: at };
  assert.equal(pickNext(quiz, state).id, 'q3');
  assert.equal(pickNext(quiz, { ...state, masteredIds: ['q1', 'q3'] }).id, 'q2');
  assert.equal(pickNext(quiz, { ...state, masteredIds: ['q1', 'q2', 'q3'] }), null);
});
