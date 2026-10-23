// Execute the sync effects with injected hooks/stores. No browser, auth or Firestore calls.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');
const { captureMcpProgressRevision } = require('../lib/mcpProgressGuard.ts');
const emptyQuiz = { progress: {}, recent: [] };
const emptyV2 = { sessions: {}, results: [], drills: {}, basics: {}, goals: {} };
let scenario;
let effects;
const hooks = { useEffect: (callback) => effects.push(callback), useRef: (current) => ({ current }) };
const auth = { useAuth: () => ({ user: { uid: scenario.uid }, loading: false }) };
const quizStore = { EMPTY_QUIZ_DATA: emptyQuiz, useQuizStore: { getState: () => scenario.store, subscribe: () => () => {} } };
const v2Store = { EMPTY_V2: emptyV2, useV2Store: { getState: () => scenario.store, subscribe: () => () => {} } };
const load = async () => {
  captureMcpProgressRevision(scenario.uid, scenario.scope, { mcpProgressRevisions: { [scenario.scope]: scenario.revision } });
  return structuredClone(scenario.remote);
};
const merge = (local, remote) => { scenario.mergeInputs.push(structuredClone(local)); return { ...local, ...remote }; };
const save = async (_uid, data) => { scenario.saved.push(structuredClone(data)); };
const originalLoad = Module._load;
let QuizSync;
let V2Sync;
try {
  Module._load = function(request, parent, isMain) {
    if (request === 'react') return hooks;
    if (request === '@/contexts/AuthContext') return auth;
    if (request === '@/store/useQuizStore') return quizStore;
    if (request === '@/store/useV2Store') return v2Store;
    if (request === '@/lib/quizSync') return { loadQuizData: load, mergeQuizData: merge, saveQuizData: save };
    if (request === '@/lib/v2/sync') return { loadV2: load, mergeV2: merge, saveV2: save };
    return originalLoad.call(this, request, parent, isMain);
  };
  ({ QuizSync } = require('../components/quiz/QuizSync.tsx'));
  ({ V2Sync } = require('../components/v2/V2Sync.tsx'));
} finally { Module._load = originalLoad; }

async function run({ uid, syncedUid = uid, scope, revision, local, remote }) {
  scenario = { uid, scope, revision, remote, saved: [], mergeInputs: [], replacements: [] };
  scenario.store = {
    ...structuredClone(local), syncedUid,
    replaceData(data, account) { scenario.replacements.push({ data: structuredClone(data), account }); Object.assign(scenario.store, data, { syncedUid: account }); },
  };
  effects = [];
  const originalDocument = global.document;
  global.document = { addEventListener() {}, removeEventListener() {} };
  let cleanup;
  try {
    (scope === 'quiz' ? QuizSync : V2Sync)();
    assert.equal(effects.length, 1);
    cleanup = effects[0]();
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(scenario.saved.length, 1, 'The initial synchronization completed');
    return scenario;
  } finally { cleanup?.(); global.document = originalDocument; }
}

const quizProgress = (ids) => ({ progress: { ABCDEF: { masteredIds: ids, wrongQueue: [], answers: [], tests: [], known: [], lastPlayedAt: '' } }, recent: [] });
const v2Progress = (ids) => ({ ...emptyV2, drills: { 'sat:math': { masteredIds: ids, wrongQueue: [], seen: ids.length, correct: ids.length } } });

for (const scope of ['quiz', 'v2']) {
  const make = scope === 'quiz' ? quizProgress : v2Progress;
  const empty = scope === 'quiz' ? emptyQuiz : emptyV2;
  const mastery = (data) => scope === 'quiz' ? data.progress.ABCDEF.masteredIds : data.drills['sat:math'].masteredIds;

  test(`${scope}: same-account MCP reset remains empty on reload rather than resurrecting stale mastery`, async () => {
    const result = await run({ uid: `${scope}-reset-load`, scope, revision: 2, local: make(['old-mastered']), remote: make([]) });
    assert.equal(result.mergeInputs.length, 0);
    assert.deepEqual(mastery(result.saved[0]), []);
    assert.deepEqual(mastery(result.replacements[0].data), []);
  });

  test(`${scope}: a missing revised account store is authoritative too`, async () => {
    const result = await run({ uid: `${scope}-missing-load`, scope, revision: 3, local: make(['old-mastered']), remote: null });
    assert.equal(result.mergeInputs.length, 0);
    assert.deepEqual(result.saved[0], empty);
  });

  test(`${scope}: guest progress still takes the existing merge path on sign-in`, async () => {
    const local = make(['guest-mastered']);
    const result = await run({ uid: `${scope}-guest-load`, syncedUid: null, scope, revision: 4, local, remote: make(['remote-mastered']) });
    assert.deepEqual(result.mergeInputs, [local]);
  });

  test(`${scope}: another account's local progress never enters the merge`, async () => {
    const result = await run({ uid: `${scope}-other-load`, syncedUid: 'different-account', scope, revision: 4, local: make(['private-other-account']), remote: make(['remote-mastered']) });
    assert.deepEqual(result.mergeInputs, [empty]);
    assert.deepEqual(mastery(result.saved[0]), ['remote-mastered']);
  });

  test(`${scope}: accounts without MCP changes retain existing same-account merge behavior`, async () => {
    const local = make(['local-mastered']);
    const result = await run({ uid: `${scope}-legacy-load`, scope, revision: 0, local, remote: make(['remote-mastered']) });
    assert.deepEqual(result.mergeInputs, [local]);
  });

  test(`${scope}: a later same-revision mount preserves fresh local work through the merge path`, async () => {
    const uid = `${scope}-same-session-remount`;
    await run({ uid, scope, revision: 5, local: make(['stale-local']), remote: make(['remote-mastered']) });
    const local = make(['remote-mastered', 'just-answered-in-browser']);
    const result = await run({ uid, scope, revision: 5, local, remote: make(['remote-mastered']) });
    assert.deepEqual(result.mergeInputs, [local], 'Do not replace fresh local work on an ordinary SPA remount');
  });
}
