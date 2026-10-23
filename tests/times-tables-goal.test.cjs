// Run: node --test tests/times-tables-goal.test.cjs
// Render the real views with local state and capture child-component contracts.
// No browser, Firebase, or network is needed.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { TIMESTABLES } = require('../lib/v2/exams/timestables.ts');
const { SAT } = require('../lib/v2/exams/sat.ts');
const { NCLEX } = require('../lib/v2/exams/nclex.ts');
const { goalFor } = require('../lib/v2/goals.ts');
const { getBank, getQuestionIndex } = require('../lib/v2/bank.ts');
const { basicsFor, basicsKey, basicsComplete } = require('../lib/v2/basics.ts');
const { drillQuestions, drillKey } = require('../lib/v2/training.ts');
const { createSession, scoreSession } = require('../lib/v2/session.ts');
const { v2Routes } = require('../lib/v2/registry.ts');
const { getTigerAsset } = require('../lib/tigerAssets.ts');
require('../lib/v2/banks/timestables.ts');
require('../lib/v2/banks/sat.ts');
require('../lib/v2/banks/nclex.ts');

const root = path.resolve(__dirname, '..');
const emptyState = () => ({ sessions: {}, results: {}, drills: {}, basics: {}, goals: {}, setGoal() {}, removeSession() {} });
let state = emptyState();
let cards = [];
let images = [];
let celebration;
const stubs = {
  'next/image': {
    default: (props) => {
      images.push(props);
      return React.createElement('img', { src: props.src, alt: props.alt });
    },
    __esModule: true,
  },
  '@/hooks/useHydration': { useHydration: () => true },
  '@/contexts/AuthContext': { useAuth: () => ({ user: null, loading: false }) },
  '@/hooks/useIsPremium': { useIsPremium: () => ({ isPremium: false, ready: true }) },
  '@/hooks/usePurchaseReturn': { usePurchaseReturn: () => ({ justPurchased: false }) },
  '@/store/useStore': { useStore: (select) => select({ setPrimaryExam() {} }) },
  '@/store/useV2Store': {
    useV2Store: (select) => select(state),
    resultsForExam: (results, id) => Object.values(results).filter((r) => r.examId === id),
  },
  './V2Paywall': { useV2Paywall: () => ({ modalProps: {} }), V2Paywall: () => null },
  '@/components/GuestSaveCard': { GuestSaveCard: () => null, v2GuestAnswered: () => 0 },
  '@/components/exam/ClassBanner': { ClassBanner: () => null },
  '@/components/TeachNudge': { TeachNudge: () => null },
  '@/components/dashboard/ProgressCard': {
    ProgressCard: (props) => {
      cards.push(props);
      return React.createElement('a', { href: props.href }, props.title, ' ', props.subtitle, ' ', props.stamp?.label);
    },
    Collapse: ({ open, children }) => open ? children : null,
  },
  '@/components/SuperAmazingCard': {
    SuperAmazingCard: (props) => {
      celebration = props;
      return null;
    },
  },
  './QuestionView': { QuestionView: () => null },
  './AchievementCelebration.module.css': { default: {}, __esModule: true },
};

// Match nclex-copy.test.cjs: transpile the actual view, replacing only its
// external state/services and child components at the import boundary.
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
stubs['@/components/AchievementCelebration'] = loadView('components/AchievementCelebration.tsx');
const { DashboardV2 } = loadView('components/v2/DashboardV2.tsx');
const { ResultsV2 } = loadView('components/v2/ResultsV2.tsx');

function render(view, props) {
  cards = [];
  images = [];
  celebration = undefined;
  return renderToStaticMarkup(React.createElement(view, props));
}
const plainText = (html) => html.replace(/<[^>]*>/g, '');
const dashboard = (exam = TIMESTABLES) => render(DashboardV2, { exam });
const testCards = () => cards.filter((card) => card.title.startsWith('🎯'));
const heroTiger = () => images.find((image) => image.alt === 'Tiger mascot').src;

function timesTablesResult(raw, number = 1) {
  const session = createSession(TIMESTABLES, getBank('timestables').questions, number);
  const byId = getQuestionIndex('timestables');
  session.stages[0].questionIds.slice(0, raw).forEach((id) => {
    const question = byId.get(id);
    session.stages[0].answers[id] = question.format === 'numeric' ? question.numeric.answers[0] : question.correct;
  });
  const result = scoreSession(TIMESTABLES, session, byId);
  assert.equal(result.composite, raw * 4, '25-question check keeps its actual percent scoring');
  return result;
}

function saveResult(result) {
  state.results[result.key] = result;
}

function learnBasics(drill) {
  for (const skill of basicsFor(drill)) {
    state.basics[basicsKey(TIMESTABLES.id, skill.id)] = {
      done: true, firstTry: skill.questions.length, total: skill.questions.length,
      completedAt: '2026-01-01T00:00:00.000Z',
    };
  }
}

function completePhoneSteps() {
  const bank = getBank(TIMESTABLES.id).questions;
  for (const drill of TIMESTABLES.drills) {
    learnBasics(drill);
    const masteredIds = drillQuestions(bank, drill, TIMESTABLES).map((q) => q.id);
    state.drills[drillKey(TIMESTABLES.id, drill.key)] = {
      masteredIds, wrongQueue: [], seen: masteredIds.length, correct: masteredIds.length,
    };
  }
}

test('Times Tables always resolves a fixed 100 target, overriding stale saved goals', () => {
  assert.equal(TIMESTABLES.fixedGoal, 100);
  assert.equal(TIMESTABLES.defaultGoal, 100);
  for (const savedGoal of [undefined, 60, 80, 90, 100]) {
    assert.equal(goalFor(TIMESTABLES, savedGoal), 100);
  }
  for (const exam of [SAT, NCLEX]) {
    assert.equal(exam.fixedGoal, undefined);
    assert.equal(goalFor(exam, undefined), exam.defaultGoal);
    for (const savedGoal of exam.goalChoices) assert.equal(goalFor(exam, savedGoal), savedGoal);
  }
});

test('new and returning Times Tables learners skip the score picker and cannot edit the target', () => {
  const routes = v2Routes(TIMESTABLES);
  const firstDrill = TIMESTABLES.drills[0];
  const firstSkill = basicsFor(firstDrill)[0];
  for (const savedGoal of [undefined, 60, 80, 90, 100]) {
    state = emptyState();
    if (savedGoal !== undefined) state.goals.timestables = savedGoal;
    const html = dashboard();
    assert.doesNotMatch(html, /What score are you aiming for\?|Change your goal|Pick a target/);
    assert.doesNotMatch(plainText(html), /Change/);
    assert.match(plainText(html), /Goal 100%/);
    assert.match(plainText(html), /0\/16/);
    assert.equal(cards[0].stamp.label, 'Start here');
    assert.equal(cards[0].href, routes.basics(firstDrill.key, firstSkill.id));
    assert.equal(cards[0].href, '/times-tables/practice/1?skill=ttGroupsOf');
    assert.equal(cards[0].isPremiumLocked, false);
    assert.equal(celebration.allComplete, false);
    assert.equal(heroTiger(), getTigerAsset(TIMESTABLES.id, 8));
  }
});

test('returning Times Tables progress stays visible with a fixed target', () => {
  state = emptyState();
  state.goals.timestables = 60;
  learnBasics(TIMESTABLES.drills[0]);
  const html = dashboard();
  assert.doesNotMatch(html, /What score are you aiming for\?|Pick a target/);
  assert.match(plainText(html), /Goal 100%/);
  assert.match(plainText(html), /1\/16/);
  assert.equal(cards[0].completed, true);
  assert.equal(cards[0].stamp.label, 'Complete!');
  assert.equal(cards[0].href, v2Routes(TIMESTABLES).drill(TIMESTABLES.drills[0].key));
});

test('completion return links have focusable progress rows on the dashboard', () => {
  state = emptyState();
  const html = dashboard();
  for (const drill of TIMESTABLES.drills) {
    for (const kind of ['basics', 'drill']) {
      assert.match(html, new RegExp(`id="progress-${kind}:${drill.key}"[^>]*tabindex="-1"`));
    }
  }
  for (const check of TIMESTABLES.tests) {
    assert.match(html, new RegExp(`id="progress-test:${check.number}"[^>]*tabindex="-1"`));
  }
});

test('non-fixed SAT and NCLEX dashboards keep their picker and saved editable targets', () => {
  for (const [exam, savedGoal] of [[SAT, 1300], [NCLEX, 75]]) {
    state = emptyState();
    const fresh = dashboard(exam);
    assert.match(fresh, /What score are you aiming for\?/);
    for (const choice of exam.goalChoices) assert.ok(plainText(fresh).includes(exam.goalNotes[choice]));

    state.goals[exam.id] = savedGoal;
    const returning = dashboard(exam);
    assert.doesNotMatch(returning, /What score are you aiming for\?/);
    assert.match(plainText(returning), new RegExp(`Goal ${savedGoal}`));
    assert.match(plainText(returning), /Change/);
    const routes = v2Routes(exam);
    const firstDrill = exam.drills[0];
    assert.equal(cards[0].href, basicsFor(firstDrill).length ? routes.drill(firstDrill.key) : routes.drillQuestions(firstDrill.key));

    // A saved target remains the completion boundary in both shared views.
    for (const score of [savedGoal - 1, savedGoal]) {
      state.results = {
        sample: { key: 'sample', examId: exam.id, testNumber: 1, completedAt: '2026-01-01T00:00:00.000Z', composite: score, sections: [], items: [] },
      };
      dashboard(exam);
      assert.equal(testCards()[0].completed, score >= savedGoal);
      const resultHtml = render(ResultsV2, { exam, testNumber: 1 });
      assert.match(plainText(resultHtml), new RegExp(`goal ${savedGoal}`));
      assert.match(resultHtml, score >= savedGoal ? /At your goal/ : /1 to your goal/);
    }
  }
});

test('Basics completion does not depend on test scores or a saved target', () => {
  for (const savedGoal of [undefined, 60, 80, 90, 100]) {
    state = emptyState();
    if (savedGoal !== undefined) state.goals.timestables = savedGoal;
    for (const drill of TIMESTABLES.drills) learnBasics(drill);
    const html = dashboard();
    assert.match(plainText(html), /6\/16/);
    for (const [index, drill] of TIMESTABLES.drills.entries()) {
      assert.equal(basicsComplete(state.basics, TIMESTABLES, drill), true);
      assert.equal(cards[index * 2].completed, true);
      assert.equal(cards[index * 2 + 1].completed, false, 'learning basics does not complete drill mastery');
    }
    assert.ok(testCards().every((card) => !card.completed));
    assert.equal(celebration.allComplete, false);
  }
});

test('test stamps, step counter, tiger and Super Amazing require full marks on every check', () => {
  for (const savedGoal of [60, 80, 90]) {
    state = emptyState();
    state.goals.timestables = savedGoal;
    completePhoneSteps();
    for (const check of TIMESTABLES.tests) saveResult(timesTablesResult(24, check.number));
    let html = dashboard();
    assert.match(plainText(html), /12\/16/);
    assert.ok(testCards().every((card) => !card.completed && card.stamp.label === 'Retake it'));
    assert.ok(testCards().every((card) => card.subtitle === 'Best 96 · 4 to your goal of 100'));
    assert.equal(heroTiger(), getTigerAsset(TIMESTABLES.id, 2));
    assert.equal(celebration.allComplete, false);

    for (const [index, check] of TIMESTABLES.tests.entries()) {
      // Keep the sub-100 attempt, so completion must use the best score.
      state.results[`perfect-${check.number}`] = timesTablesResult(25, check.number);
      html = dashboard();
      const done = 13 + index;
      assert.match(plainText(html), new RegExp(`${done}/16`));
      assert.equal(testCards().filter((card) => card.completed).length, index + 1);
      assert.equal(testCards()[index].stamp.label, 'Goal hit!');
      assert.equal(testCards()[index].subtitle, 'Best 100 · goal 100 hit');
      assert.equal(celebration.dashboardKey, 'v2:timestables');
      assert.equal(celebration.totalSteps, 16);
      assert.equal(celebration.allComplete, done === 16);
      assert.equal(heroTiger(), getTigerAsset(TIMESTABLES.id, done === 16 ? 1 : 2));
    }
  }
});

test('Times Tables Results use the same 100 target and tiger boundary as the dashboard', () => {
  for (const savedGoal of [undefined, 60, 80, 90]) {
    for (const raw of [0, 15, 20, 23, 24, 25]) {
      state = emptyState();
      if (savedGoal !== undefined) state.goals.timestables = savedGoal;
      const result = timesTablesResult(raw);
      saveResult(result);
      const html = render(ResultsV2, { exam: TIMESTABLES, testNumber: 1 });
      assert.match(plainText(html), /Your score · goal 100/);
      assert.doesNotMatch(html, /Score estimate/);
      assert.match(html, raw === 25 ? /At your goal/ : new RegExp(`${100 - result.composite} to your goal`));
      if (raw < 25) assert.doesNotMatch(html, /At your goal/);
      assert.equal(images[0].src, getTigerAsset(TIMESTABLES.id, raw === 25 ? 1 : 4));
      if (raw === 25) {
        assert.match(html, /Full marks!/);
        assert.match(html, /href="\/times-tables\/dashboard\?completed=test:1"/);
      } else {
        assert.doesNotMatch(html, /Full marks!|\?completed=test:1/);
      }
      dashboard();
      assert.equal(testCards()[0].completed, raw === 25);
    }
  }
});
