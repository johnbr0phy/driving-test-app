// Run: node --test tests/nclex-copy.test.cjs
// Render the real views with deterministic local state; no Firebase or browser needed.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { NCLEX } = require('../lib/v2/exams/nclex.ts');
const { SAT } = require('../lib/v2/exams/sat.ts');
const { createSession, scoreSession } = require('../lib/v2/session.ts');
const { getBank, getQuestionIndex } = require('../lib/v2/bank.ts');
const { drillQuestions } = require('../lib/v2/training.ts');
require('../lib/v2/banks/nclex.ts');
require('../lib/v2/banks/sat.ts');

const root = path.resolve(__dirname, '..');
const unsupported = /passing line|comfortably passing|ready to schedule|schedule your NCLEX|solid sign|measures readiness|ready to pass|you(?:'|&#x27;)re ready/i;
const limitation = /Practice percentages do not predict your NCLEX result/;
const emptyState = () => ({ sessions: {}, results: {}, drills: {}, basics: {}, goals: {}, setGoal() {}, removeSession() {} });
let state = emptyState();
const stubs = {
  '@/hooks/useHydration': { useHydration: () => true },
  '@/contexts/AuthContext': { useAuth: () => ({ user: null, loading: false }) },
  '@/hooks/useIsPremium': { useIsPremium: () => ({ isPremium: false, ready: true }) },
  '@/hooks/usePurchaseReturn': { usePurchaseReturn: () => ({ justPurchased: false }) },
  '@/store/useV2Store': {
    useV2Store: (select) => select(state),
    resultsForExam: (results, id) => Object.values(results).filter((r) => r.examId === id),
  },
  './V2Paywall': { useV2Paywall: () => ({ modalProps: {} }), V2Paywall: () => null },
  '@/components/dashboard/ProgressCard': { ProgressCard: () => null, Collapse: () => null },
  '@/components/exam/ExamLandingHero': { ExamLandingHero: () => null, ExamLandingCTA: () => null },
  '@/components/exam/ExamRelatedTests': { ExamRelatedTests: () => null },
};
function loadView(relativePath) {
  const filename = path.join(root, relativePath);
  const localRequire = createRequire(filename);
  const code = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  const exports = {};
  new Function('require', 'exports', code)((id) => {
    if (Object.hasOwn(stubs, id)) return stubs[id];
    return localRequire(id.startsWith('@/') ? path.join(root, id.slice(2)) : id);
  }, exports);
  return exports;
}
const { DashboardV2 } = loadView('components/v2/DashboardV2.tsx');
const { ResultsV2 } = loadView('components/v2/ResultsV2.tsx');
stubs['@/components/exam/ExamFacts'] = loadView('components/exam/ExamFacts.tsx');
const { default: Landing } = loadView('app/nclex-rn-practice-test/page.tsx');
const render = (view, props = {}) => renderToStaticMarkup(React.createElement(view, props));

function resultAt(raw, number = 1) {
  const bank = getBank('nclex').questions;
  const session = createSession(NCLEX, bank, number);
  const byId = getQuestionIndex('nclex');
  session.stages[0].questionIds.slice(0, raw).forEach((id) => {
    const q = byId.get(id);
    session.stages[0].answers[id] = q.format === 'numeric' ? q.numeric.answers[0] : q.correct;
  });
  return scoreSession(NCLEX, session, byId);
}

test('all NCLEX goal choices describe practice targets and disclose the limitation', () => {
  state = emptyState();
  const html = render(DashboardV2, { exam: NCLEX });
  for (const goal of NCLEX.goalChoices) assert.match(html, new RegExp(`${goal}% practice score target`));
  assert.match(html, limitation);
  assert.doesNotMatch(html, unsupported);
  assert.equal(NCLEX.defaultGoal, 70);
  assert.deepEqual(NCLEX.goalChoices, [60, 65, 70, 75, 80, 85]);
});

test('completed NCLEX dashboard describes completed practice, including a saved 75 goal', () => {
  state = emptyState();
  state.goals.nclex = 75;
  const bank = getBank('nclex').questions;
  for (const drill of NCLEX.drills) {
    state.drills[`nclex:${drill.key}`] = {
      masteredIds: drillQuestions(bank, drill, NCLEX).map((q) => q.id), wrongQueue: [], seen: 100, correct: 100,
    };
  }
  for (const number of [1, 2]) {
    const result = resultAt(64, number);
    state.results[result.key] = result;
  }
  const html = render(DashboardV2, { exam: NCLEX });
  assert.match(html, /Practice steps complete/);
  assert.match(html, /10\/10/);
  const defaultCopy = { ...NCLEX, copy: { ...NCLEX.copy, completedTitle: undefined } };
  assert.match(render(DashboardV2, { exam: defaultCopy }), /You&#x27;re ready/);
  assert.match(html, /Practice goal hit/);
  assert.match(html, limitation);
  assert.doesNotMatch(html, unsupported);
});

test('results at low, near-goal, goal and perfect scores preserve percent scoring and disclaim prediction', () => {
  for (const raw of [0, 55, 60, 64, 85]) {
    state = emptyState();
    state.goals.nclex = 75;
    const result = resultAt(raw);
    state.results[result.key] = result;
    assert.equal(result.composite, Math.round(raw / 85 * 100));
    assert.equal(result.sections[0].raw, raw);
    assert.equal(result.sections[0].total, 85);
    const html = render(ResultsV2, { exam: NCLEX, testNumber: 1 });
    assert.match(html, /Practice percent correct · goal 75/);
    assert.match(html, limitation);
    assert.doesNotMatch(html, /estimate/);
    assert.doesNotMatch(html, unsupported);
    assert.match(html, result.composite >= 75 ? /At your goal/ : /to your goal/);
  }
});

test('visible FAQ and JSON-LD agree about scoring limits and supported NGN formats', () => {
  const html = render(Landing);
  assert.doesNotMatch(html, unsupported);
  const script = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1];
  const faq = JSON.parse(script)['@graph'].find((entry) => entry['@type'] === 'FAQPage');
  const answers = faq.mainEntity.map((entry) => entry.acceptedAnswer.text);
  assert.ok(answers.some((answer) => limitation.test(answer)));
  const formats = answers.find((answer) => answer.includes('matrix'));
  assert.ok(formats.includes('bowtie'));
  assert.ok(formats.includes('all or nothing'));
  for (const format of ['matrix', 'bowtie']) {
    assert.ok(getBank('nclex').questions.some((q) => q.format === format));
    assert.match(html.replace(script, ''), new RegExp(format));
  }
  assert.match(html.replace(script, ''), limitation);
});

test('exams without copy overrides retain their existing result label', () => {
  state = emptyState();
  const result = resultAt(60);
  state.results.sample = { ...result, examId: 'sat', sections: [], items: [] };
  const html = render(ResultsV2, { exam: SAT, testNumber: 1 });
  assert.ok(html.includes(`${SAT.composite.name} estimate`));
  assert.doesNotMatch(html, limitation);
});
