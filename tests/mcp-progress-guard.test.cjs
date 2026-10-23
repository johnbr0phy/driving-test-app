// No provider calls: pure guard tests and injected synthetic Firebase client transactions.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const Module = require('node:module');
const guard = require('../lib/mcpProgressGuard.ts');
const { captureMcpProgressRevision: capture, assertMcpProgressRevision: check, isMcpProgressConflict: isConflict } = guard;
const revisions = (catalog = 0, v2 = 0, quiz = 0) => ({ mcpProgressRevisions: { catalog, v2, quiz } });
const emptyQuiz = { progress: {}, recent: [] };
const emptyV2 = { sessions: {}, results: [], drills: {}, basics: {}, goals: {} };
const emptyCode = { masteredIds: [], wrongQueue: [], answers: [], tests: [], known: [], lastPlayedAt: '' };
let active;
const firebaseStub = {
  doc: (_db, collection, uid) => ({ path: `${collection}/${uid}` }),
  getDoc: async (ref) => { active.reads++; return active.snapshot(ref); },
  runTransaction: async (_db, callback) => active.transaction(callback),
};
const originalLoad = Module._load;
let quizSync;
let v2Sync;
try {
  Module._load = function(request, parent, isMain) {
    if (request === 'firebase/firestore') return firebaseStub;
    if (request === '@/lib/firebase') return { db: {} };
    if (request === '@/store/useQuizStore') return { EMPTY_CODE_PROGRESS: emptyCode, EMPTY_QUIZ_DATA: emptyQuiz };
    if (request === '@/store/useV2Store') return { EMPTY_V2: emptyV2, useV2Store: { getState: () => { throw new Error('Unexpected store mutation'); } } };
    return originalLoad.call(this, request, parent, isMain);
  };
  quizSync = require('../lib/quizSync.ts');
  v2Sync = require('../lib/v2/sync.ts');
} finally { Module._load = originalLoad; }

function database(uid, data) {
  const ref = { path: `users/${uid}` };
  let value = data === undefined ? undefined : structuredClone(data);
  let version = 0;
  const db = {
    reads: 0, writes: [], attempts: 0, beforeCommit: undefined,
    get value() { return value === undefined ? undefined : structuredClone(value); },
    replace(next) { value = structuredClone(next); version++; },
    snapshot(target) {
      assert.equal(target.path, ref.path, 'Only the requested account may be read');
      const saved = value === undefined ? undefined : structuredClone(value);
      return { exists: () => saved !== undefined, data: () => saved };
    },
    async transaction(callback) {
      for (let n = 0; n < 5; n++) {
        db.attempts++;
        const seen = version;
        const staged = [];
        const result = await callback({
          get: async (target) => { assert.equal(staged.length, 0); db.reads++; return db.snapshot(target); },
          update: (target, payload) => { assert.equal(target.path, ref.path); staged.push({ kind: 'update', payload: structuredClone(payload) }); },
          set: (target, payload, options) => { assert.equal(target.path, ref.path); assert.equal(options.merge, true); staged.push({ kind: 'set', payload: structuredClone(payload) }); },
        });
        if (db.beforeCommit) { const hook = db.beforeCommit; db.beforeCommit = undefined; hook(); }
        if (seen !== version) continue;
        for (const operation of staged) { db.writes.push(operation); value = { ...value, ...operation.payload }; version++; }
        return result;
      }
      throw new Error('Exceeded synthetic retry budget');
    },
  };
  active = db;
  return db;
}

const rejectConflict = (fn) => assert.rejects(fn, (error) => isConflict(error) && error.code === 'MCP_PROGRESS_CONFLICT');

test('a loaded revision is scoped independently by account and progress store', () => {
  capture('scope-one', 'quiz', revisions(8, 9, 3));
  check('scope-one', 'quiz', revisions(8, 9, 3));
  assert.throws(() => check('scope-one', 'v2', revisions(8, 9, 3)), isConflict);
  assert.throws(() => check('scope-two', 'quiz', revisions(8, 9, 3)), isConflict);
  capture('scope-one', 'catalog', revisions(8, 9, 3));
  check('scope-one', 'catalog', revisions(8, 99, 33));
});

test('unknown zero-revision and absent accounts are backward compatible, but later changes block', () => {
  check('old-account', 'catalog', undefined);
  check('old-account', 'catalog', {});
  assert.throws(() => check('old-account', 'catalog', revisions(1)), isConflict);
  assert.throws(() => check('old-account', 'catalog', {}), isConflict, 'The conflict remains latched');
});

test('a repeated load cannot bless pending stale work or clear a latched conflict', () => {
  capture('reload-latch', 'v2', revisions(0, 4));
  assert.throws(() => capture('reload-latch', 'v2', revisions(0, 5)), isConflict);
  assert.throws(() => capture('reload-latch', 'v2', revisions(0, 5)), isConflict);
  assert.throws(() => check('reload-latch', 'v2', revisions(0, 5)), isConflict);
  assert.throws(() => check('reload-latch', 'v2', revisions(0, 4)), isConflict);
});

test('conflicts notify subscribers once and keep stable snapshots for React', () => {
  let notifications = 0;
  const unsubscribe = guard.subscribeProgressSyncConflicts(() => notifications++);
  const before = guard.getProgressSyncConflicts();
  assert.throws(() => check('notice-once', 'quiz', revisions(0, 0, 5)), isConflict);
  const after = guard.getProgressSyncConflicts();
  assert.notEqual(after, before);
  assert.equal(after.at(-1).uid, 'notice-once');
  assert.equal(after.at(-1).expectedRevision, null);
  assert.equal(after.at(-1).actualRevision, 5);
  assert.throws(() => check('notice-once', 'quiz', revisions(0, 0, 5)), isConflict);
  assert.equal(guard.getProgressSyncConflicts(), after);
  assert.equal(notifications, 1);
  assert.equal(guard.getServerProgressSyncConflicts(), guard.getServerProgressSyncConflicts());
  assert.deepEqual(guard.getServerProgressSyncConflicts(), []);
  unsubscribe();
});

test('quiz save refuses newer assistant data without changing remote data or local snapshot', async () => {
  const uid = 'quiz-stale';
  const old = { ...emptyCode, masteredIds: ['ABCDEF-q1'] };
  const db = database(uid, { ...revisions(), quizProgress: { progress: { ABCDEF: old }, recent: [] }, unrelated: 'keep' });
  const local = await quizSync.loadQuizData(uid);
  local.progress.ABCDEF.masteredIds.push('ABCDEF-q2');
  const localBefore = structuredClone(local);
  db.replace({ ...db.value, ...revisions(0, 0, 1), quizProgress: { progress: { ABCDEF: { ...old, masteredIds: ['ABCDEF-q1', 'ABCDEF-q3'] } }, recent: [] } });
  const remoteBefore = db.value;
  await rejectConflict(() => quizSync.saveQuizData(uid, local));
  assert.equal(db.writes.length, 0);
  assert.deepEqual(db.value, remoteBefore);
  assert.deepEqual(local, localBefore);
  const reads = db.reads;
  await rejectConflict(() => quizSync.saveQuizData(uid, local));
  await rejectConflict(() => quizSync.loadQuizData(uid));
  assert.equal(db.reads, reads, 'Paused loads/saves do not keep issuing requests');
});

test('quiz transaction retry detects an MCP update after its first read and commits no stale writes', async () => {
  const uid = 'quiz-race';
  const local = { progress: { ABCDEF: { ...emptyCode, masteredIds: ['ABCDEF-q1'] } }, recent: [] };
  const db = database(uid, { ...revisions(), quizProgress: emptyQuiz });
  await quizSync.loadQuizData(uid);
  db.beforeCommit = () => db.replace({ ...db.value, ...revisions(0, 0, 1), quizProgress: { progress: { ABCDEF: { ...emptyCode, masteredIds: ['ABCDEF-q2'] } }, recent: [] } });
  await rejectConflict(() => quizSync.saveQuizData(uid, local));
  assert.equal(db.attempts, 2);
  assert.equal(db.writes.length, 0);
  assert.deepEqual(db.value.quizProgress.progress.ABCDEF.masteredIds, ['ABCDEF-q2']);
});

test('uncontended quiz save preserves explicit deletion and reset semantics plus unrelated user fields', async () => {
  const uid = 'quiz-reset';
  const db = database(uid, { ...revisions(0, 0, 7), quizProgress: { progress: { ABCDEF: { ...emptyCode, masteredIds: ['ABCDEF-q1'] }, GHJKLM: emptyCode }, recent: [] }, v2: { unchanged: true }, entitlement: 'keep' });
  await quizSync.loadQuizData(uid);
  await quizSync.saveQuizData(uid, { progress: { ABCDEF: emptyCode }, recent: [] });
  assert.equal(db.writes.length, 1);
  assert.deepEqual(db.value.quizProgress.progress.ABCDEF.masteredIds, []);
  assert.equal(db.value.quizProgress.progress.GHJKLM, undefined);
  assert.deepEqual(db.value.v2, { unchanged: true });
  assert.equal(db.value.entitlement, 'keep');
  assert.equal(db.value.mcpProgressRevisions.quiz, 7);
});

test('v2 unknown positive revision is blocked and another scope load cannot authorize it', async () => {
  const uid = 'v2-unknown';
  const db = database(uid, { ...revisions(3, 5, 2), v2: { ...emptyV2, drills: { 'sat:math': { masteredIds: ['sat-1'], wrongQueue: [], seen: 1, correct: 1 } } }, quizProgress: emptyQuiz });
  await quizSync.loadQuizData(uid);
  await rejectConflict(() => v2Sync.saveV2(uid, emptyV2));
  assert.equal(db.writes.length, 0);
  await rejectConflict(() => v2Sync.loadV2(uid));
});

test('v2 saves at a loaded revision, preserves full-test/session fields and honors explicit empty replacements', async () => {
  const uid = 'v2-current';
  const db = database(uid, { ...revisions(1, 4, 2), v2: emptyV2, quizProgress: emptyQuiz, subscription: { isPremium: true } });
  await v2Sync.loadV2(uid);
  const session = { key: 'sat:test1', examId: 'sat', startedAt: '2026-10-23T00:00:00Z' };
  const data = { ...emptyV2, sessions: { 'sat:test1': session }, drills: { 'sat:math': { masteredIds: ['sat-1'], wrongQueue: [], seen: 1, correct: 1 } } };
  await v2Sync.saveV2(uid, data);
  assert.deepEqual(db.value.v2.sessions['sat:test1'], session);
  assert.deepEqual(db.value.v2.drills['sat:math'].masteredIds, ['sat-1']);
  await v2Sync.saveV2(uid, emptyV2);
  assert.deepEqual(db.value.v2.sessions, {});
  assert.deepEqual(db.value.v2.drills, {});
  assert.deepEqual(db.value.subscription, { isPremium: true });
  assert.deepEqual(db.value.quizProgress, emptyQuiz);
});

test('v2 transaction race fails closed and never takes an unconditional set fallback', async () => {
  const uid = 'v2-race';
  const db = database(uid, { ...revisions(), v2: emptyV2 });
  await v2Sync.loadV2(uid);
  db.beforeCommit = () => db.replace({ ...db.value, ...revisions(0, 1), v2: { ...emptyV2, drills: { 'sat:math': { masteredIds: ['sat-2'], wrongQueue: [], seen: 1, correct: 1 } } } });
  await rejectConflict(() => v2Sync.saveV2(uid, emptyV2));
  assert.equal(db.writes.length, 0);
  assert.deepEqual(db.value.v2.drills['sat:math'].masteredIds, ['sat-2']);
});

test('new accounts may create a scoped store with no MCP revision and no destructive whole-user write', async () => {
  const uid = 'new-quiz';
  const db = database(uid, undefined);
  assert.equal(await quizSync.loadQuizData(uid), null);
  await quizSync.saveQuizData(uid, emptyQuiz);
  assert.equal(db.writes[0].kind, 'set');
  assert.deepEqual(Object.keys(db.writes[0].payload), ['quizProgress']);
});

test('shared notice is persistent, account-filtered and warns about unsynced work before explicit reload', () => {
  const source = readFileSync('components/ProgressSyncConflictNotice.tsx', 'utf8');
  assert.match(source, /role="alert"/);
  assert.match(source, /item\.uid === user\?\.uid/);
  assert.match(source, /Reloading may replace unsynced answers/);
  assert.match(source, /resetting or deleting progress/);
  assert.match(source, /onClick=\{\(\) => window\.location\.reload\(\)\}/);
  assert.doesNotMatch(source, /setTimeout|setInterval|useEffect/);
});
test('catalog snapshot writes use an atomic revision check and load the account language', () => {
  const source = readFileSync('store/useStore.ts', 'utf8');
  const save = source.slice(source.indexOf('saveToFirestore: async () =>'), source.indexOf('resetAllData: () =>', source.indexOf('saveToFirestore: async () =>')));
  assert.match(save, /runTransaction\(db, async \(transaction\)/);
  assert.ok(save.indexOf("assertMcpProgressRevision(userId, 'catalog', remote.data())") < save.indexOf('transaction.update(userRef, payload)'));
  assert.doesNotMatch(save, /await updateDoc\(userRef, payload\)|await setDoc/);
  const load = source.slice(source.indexOf('loadUserData: async'), source.indexOf('checkUserHasData: async'));
  assert.match(load, /captureMcpProgressRevision\(userId, 'catalog', userDoc.data\(\)\)/);
  assert.match(load, /language: data.language === 'en' \|\| data.language === 'es' \? data.language/);
  const checkOnly = source.slice(source.indexOf('checkUserHasData: async'), source.indexOf('saveToFirestore: async'));
  assert.doesNotMatch(checkOnly, /captureMcpProgressRevision/);
});
