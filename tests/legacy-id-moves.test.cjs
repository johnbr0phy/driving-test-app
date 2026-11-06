require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { applyLegacyIdMoves, applyLegacySetMoves } = require('../lib/legacyIdMoves.ts');
const { ALL_EXAMS, examSetBase, getExamById, getExamForTestId, getExamForSetId } = require('../lib/exams.ts');
const { answerCatalogPractice, nextCatalogPractice, catalogProgress } = require('../lib/server/mcpCatalogPractice.ts');

const q = (id) => ({ questionId: id });
const session = (testNumber, state, prefix, score, at) => ({
  id: `test-${testNumber}-${at}`,
  testNumber,
  state,
  questions: [q(`${prefix}001`), q(`${prefix}002`)],
  answers: [{ questionId: `${prefix}001` }, { questionId: `${prefix}002` }],
  score,
  startedAt: new Date(at - 1000).toISOString(),
  completedAt: new Date(at).toISOString(),
  totalQuestions: 2,
});

test('no two exams share a test or set id, a question prefix or a state code', () => {
  for (const kind of ['test', 'set']) {
    const ranges = ALL_EXAMS.map((e) => {
      const base = kind === 'test' ? e.idBase : examSetBase(e);
      const n = kind === 'test' ? e.testCount : e.trainingSets.length;
      return [e.id, base + 1, base + n];
    }).sort((a, b) => a[1] - b[1]);
    for (let i = 1; i < ranges.length; i++) {
      assert.ok(ranges[i][1] > ranges[i - 1][2], `${kind} ids of ${ranges[i - 1][0]} and ${ranges[i][0]} overlap`);
    }
  }
  const prefixes = ALL_EXAMS.map((e) => e.questionIdPrefix);
  assert.equal(new Set(prefixes).size, prefixes.length, 'duplicate question id prefix');
  const codes = ALL_EXAMS.map((e) => e.stateCode);
  assert.equal(new Set(codes).size, codes.length, 'duplicate state code');
});

test('ASWB Clinical and K53 Code 3 resolve to their own exams', () => {
  assert.equal(getExamById('aswbclin').idBase, 21900);
  assert.equal(getExamForTestId(16901).id, 'zak53c3');
  assert.equal(getExamForSetId(16905).id, 'zak53c3');
  assert.equal(getExamForTestId(21901).id, 'aswbclin');
  assert.equal(getExamForSetId(21905).id, 'aswbclin');
});

test('mixed training sets are split by question prefix', () => {
  const sets = {
    16901: { masteredIds: ['ASWBCLIN-ETH-001', 'ZAC3-LIC-001'], wrongQueue: ['ASWBCLIN-ETH-002', 'ZAC3-LIC-002'] },
    16903: { masteredIds: ['ASWBCLIN-DX-001'], wrongQueue: [] },
    16906: { masteredIds: ['ZAC3-CTL-001'], wrongQueue: [] },
    21901: { masteredIds: ['ASWBCLIN-ETH-003'], wrongQueue: ['ASWBCLIN-ETH-001'] },
  };
  const out = applyLegacySetMoves(sets);
  assert.deepEqual(out[16901], { masteredIds: ['ZAC3-LIC-001'], wrongQueue: ['ZAC3-LIC-002'] });
  assert.equal(out[16903], undefined, 'a set left empty is removed');
  assert.deepEqual(out[16906], sets[16906]);
  // Already on the new id: kept, merged, and a newly mastered id leaves the wrong queue.
  assert.deepEqual(out[21901], { masteredIds: ['ASWBCLIN-ETH-003', 'ASWBCLIN-ETH-001'], wrongQueue: ['ASWBCLIN-ETH-002'] });
  assert.deepEqual(out[21903], { masteredIds: ['ASWBCLIN-DX-001'], wrongQueue: [] });
  assert.equal(applyLegacySetMoves(out), out, 'running again changes nothing');
});

test('tests and attempt stats are sorted out, including K53 tests saved under the wrong state', () => {
  const data = {
    currentTests: {
      16902: { questions: [q('ASWBCLIN-ETH-010')], answers: { 0: 'A' } },
      16903: { questions: [q('ZAC3-LIC-010')], answers: {} },
    },
    completedTests: [
      session(16901, 'ASWBCLIN', 'ASWBCLIN-ETH-', 60, 1000),
      session(16901, 'ASWBCLIN', 'ZAC3-LIC-', 70, 2000),
      session(16901, 'ASWBCLIN', 'ASWBCLIN-ETH-', 80, 3000),
      session(101, 'CDL', 'CDL-SAF-', 90, 4000),
    ],
    testAttempts: [
      { testNumber: 16901, state: 'ASWBCLIN', attemptCount: 3, firstScore: 60, bestScore: 80, lastAttemptDate: 'x' },
      { testNumber: 101, state: 'CDL', attemptCount: 1, firstScore: 90, bestScore: 90, lastAttemptDate: 'y' },
    ],
    trainingSets: {},
    other: { sentinel: true },
  };
  const out = applyLegacyIdMoves(data);
  assert.deepEqual(Object.keys(out.currentTests).sort(), ['16903', '21902']);
  assert.deepEqual(out.completedTests.map((t) => [t.testNumber, t.state]), [
    [21901, 'ASWBCLIN'], [16901, 'ZAK53C3'], [21901, 'ASWBCLIN'], [101, 'CDL'],
  ]);
  const attempt = (n, s) => out.testAttempts.find((a) => a.testNumber === n && a.state === s);
  assert.deepEqual(
    { ...attempt(21901, 'ASWBCLIN'), lastAttemptDate: undefined },
    { testNumber: 21901, state: 'ASWBCLIN', attemptCount: 2, firstScore: 60, bestScore: 80, lastAttemptDate: undefined },
  );
  assert.equal(attempt(16901, 'ZAK53C3').attemptCount, 1);
  assert.equal(attempt(16901, 'ZAK53C3').bestScore, 70);
  assert.equal(attempt(16901, 'ASWBCLIN'), undefined);
  assert.deepEqual(attempt(101, 'CDL'), data.testAttempts[1], 'other exams untouched');
  assert.deepEqual(out.other, { sentinel: true });
  assert.equal(applyLegacyIdMoves(out), out, 'running again changes nothing');
});

test('data with nothing to move comes back as the same object', () => {
  const data = { trainingSets: { 16901: { masteredIds: ['ZAC3-LIC-001'], wrongQueue: [] } }, completedTests: [session(16901, 'ZAK53C3', 'ZAC3-LIC-', 70, 1)], testAttempts: [] };
  assert.equal(applyLegacyIdMoves(data), data);
  const empty = {};
  assert.equal(applyLegacyIdMoves(empty), empty);
});

function database(data) {
  const ref = { id: 'alice' };
  return {
    data,
    collection() { return { doc() { return ref; } }; },
    async runTransaction(fn) {
      return fn({
        get: async () => ({ exists: true, data: () => data }),
        update(_, patch) {
          for (const [path, value] of Object.entries(patch)) {
            const keys = path.split('.');
            let o = data;
            for (const key of keys.slice(0, -1)) o = o[key] ??= {};
            const key = keys.at(-1);
            if (value?.constructor?.name === 'DeleteTransform') delete o[key]; else o[key] = value;
          }
        },
      });
    },
  };
}

test('assistant practice reads and writes each exam on its own ids', async () => {
  const data = {
    trainingSets: { 16901: { masteredIds: ['ASWBCLIN-ETH-001', 'ZAC3-LIC-001'], wrongQueue: [] } },
  };
  const aswb = catalogProgress(getExamById('aswbclin'), data).sets.find((s) => s.setNumber === 1);
  const k53 = catalogProgress(getExamById('zak53c3'), data).sets.find((s) => s.setNumber === 1);
  assert.equal(aswb.mastered, 1);
  assert.equal(k53.mastered, 1);

  const db = database(data);
  const r = await nextCatalogPractice('alice', 'zak53c3', db, 1);
  assert.equal(r.ok, true);
  const { getExamTrainingSetQuestions } = require('../lib/examTestGenerator.ts');
  const full = getExamTrainingSetQuestions(getExamById('zak53c3'), 1).find((x) => x.questionId === r.data.question.questionId);
  const a = await answerCatalogPractice('alice', 'zak53c3', full.questionId, full.correctAnswer, r.data.attemptId, db);
  assert.equal(a.ok, true);
  assert.ok(db.data.trainingSets[16901].masteredIds.every((id) => id.startsWith('ZAC3-')), 'K53 set no longer holds ASWB questions');
});
