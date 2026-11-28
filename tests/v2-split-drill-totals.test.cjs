require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { getExamV2 } = require('../lib/v2/registry.ts');
const { getBank } = require('../lib/v2/bank.ts');
const { drillQuestions, drillStateFor, inheritedDrillState } = require('../lib/v2/training.ts');
const { drillTotalsForExam } = require('../lib/v2/drillTotals.ts');
const { pickLandingTryQuestion } = require('../lib/landingTryQuestion.ts');
require('../lib/v2/banks/aws.ts');
require('../lib/v2/banks/aplus.ts');

global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
const { useV2Store, EMPTY_V2 } = require('../store/useV2Store.ts');
const { v2GuestAnswered } = require('../components/GuestSaveCard.tsx');
// Use the app's local-host analytics exclusion for these real store actions.
global.window = { location: { hostname: 'localhost' } };

test('a replacement and its former drill count once, including retries and a reset', () => {
  const exam = getExamV2('aws');
  const bank = getBank(exam.id).questions;
  const identity = exam.drills.find(d => d.key === 'identity');
  const pool = drillQuestions(bank, identity, exam);
  const controls = drillQuestions(bank, exam.drills.find(d => d.key === 'security-controls'), exam);
  const saved = {
    'aws:security': {
      masteredIds: [pool[0].id, pool[1].id, controls[0].id], wrongQueue: [pool[2].id], seen: 6, correct: 3,
    },
    'another:drill': { masteredIds: ['outside'], wrongQueue: [], seen: 1, correct: 1 },
  };
  useV2Store.setState({ ...EMPTY_V2, drills: saved });
  const state = useV2Store.getState;
  assert.deepEqual(drillTotalsForExam(saved, exam), { mastered: 3, seen: 6 });
  state().answerDrill('aws:identity', pool[2].id, true, drillStateFor(saved, exam.id, identity, pool));
  assert.equal(drillTotalsForExam(state().drills, exam), undefined, 'mixed records require the bank');
  assert.deepEqual(drillTotalsForExam(state().drills, exam, bank), { mastered: 4, seen: 7 });
  const results = [{ examId: 'aws', items: [{ answer: [0] }, {}] }, { examId: 'another', items: [{ answer: [0] }] }];
  assert.equal(v2GuestAnswered(state().drills, results, exam), 8);

  state().resetDrill('aws:identity');
  assert.deepEqual(drillTotalsForExam(state().drills, exam, bank), { mastered: 1, seen: 3 });
  state().answerDrill('aws:identity', pool[0].id, true);
  assert.deepEqual(drillTotalsForExam(state().drills, exam, bank), { mastered: 2, seen: 4 });

  // Sync unions mastered IDs while keeping the larger of two devices' seen counters.
  const merged = { ...state().drills,
    'aws:security': { ...saved['aws:security'], seen: 1 },
    'aws:concepts': { masteredIds: ['unrelated'], wrongQueue: [], seen: 1, correct: 1 },
  };
  assert.deepEqual(drillTotalsForExam(merged, exam, bank), { mastered: 3, seen: 2 });
});

test('the landing sample carries forward only the questions in its replacement drill', () => {
  const exam = getExamV2('aplus');
  const bank = getBank(exam.id).questions;
  const sample = pickLandingTryQuestion(exam.slug + '/dashboard');
  const { drillKey, carryOver } = sample.v2;
  const [other] = carryOver.questionIds.filter(id => id !== sample.questionId);
  const sibling = drillQuestions(bank, exam.drills.find(d => d.key === 'c1-networking'), exam)[0].id;
  assert.equal(carryOver.legacyKey, 'aplus:c1-devices');
  assert.ok(carryOver.questionIds.includes(sample.questionId));
  assert.ok(!carryOver.questionIds.includes(sibling));
  const saved = { [carryOver.legacyKey]: { masteredIds: [other, sibling], wrongQueue: [], seen: 2, correct: 2 } };
  useV2Store.setState({ ...EMPTY_V2, drills: saved });
  const base = inheritedDrillState(saved[carryOver.legacyKey], new Set(carryOver.questionIds));
  useV2Store.getState().answerDrill(drillKey, sample.questionId, true, base);
  const drills = useV2Store.getState().drills;
  assert.deepEqual(drills[drillKey].masteredIds, [other, sample.questionId]);
  assert.deepEqual(drillTotalsForExam(drills, exam, bank), { mastered: 3, seen: 3 });
});
