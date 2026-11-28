// A Basics step is a short course before a drill, so it never holds fewer than four
// skills: one or two cards do not feel like a step of their own. Top a thin
// step up with existing skills that fit and that no other drill of the same exam
// opens (tests/no-repeats.test.cjs); if none are left, write new ones.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { basicsFor } = require('../lib/v2/basics.ts');

test('every Basics step has at least four skills, and every listed skill exists', () => {
  const thin = [];
  for (const exam of EXAMS_V2) {
    for (const drill of exam.drills ?? []) {
      const ids = drill.basics ?? [];
      if (!ids.length) continue;
      assert.equal(basicsFor(drill).length, new Set(ids).size, `${exam.id}:${drill.key} lists a skill that is missing or repeated`);
      if (ids.length < 4) thin.push(`${exam.id}:${drill.key}`);
    }
  }
  assert.deepEqual(thin, []);
});

test('new Basics groups link matching exam-level misses to their own lessons', () => {
  const { getBank } = require('../lib/v2/bank.ts');
  const { matchBasicsSkill } = require('../lib/v2/skillMatch.ts');
  const { drillQuestions } = require('../lib/v2/training.ts');
  const groups = {
    apcsp: ['algorithms'],
    iegarda: ['tfc', 'pct'],
    jamblit: ['prose', 'appreciation'],
    osssc: ['maths'],
    vidyagyan: ['english', 'maths'],
  };
  for (const [examId, keys] of Object.entries(groups)) {
    require('../lib/v2/banks/' + examId + '.ts');
    const exam = EXAMS_V2.find(e => e.id === examId);
    for (const key of keys) {
      const drill = exam.drills.find(d => d.key === key);
      const items = drillQuestions(getBank(examId).questions, drill, exam);
      const tagged = items.filter(q => q.basics);
      assert.deepEqual(new Set(tagged.map(q => q.basics)), new Set(drill.basics), examId + '/' + key);
      for (const q of tagged) assert.equal(matchBasicsSkill(q, drill)?.id, q.basics, q.id);
    }
  }
});

test('AP list mistakes open a one-based lesson and binary-search misses have no unrelated card', () => {
  const { getBank } = require('../lib/v2/bank.ts');
  const { matchBasicsSkill } = require('../lib/v2/skillMatch.ts');
  require('../lib/v2/banks/apcsp.ts');
  const drill = EXAMS_V2.find(e => e.id === 'apcsp').drills.find(d => d.key === 'algorithms');
  const { questions } = getBank('apcsp');
  const list = questions.find(q => q.id === 'APCSP-ALGORITHMS-030');
  const search = questions.find(q => q.id === 'APCSP-ALGORITHMS-018');
  assert.equal(matchBasicsSkill(list, drill)?.id, 'apcspListIndices');
  assert.equal(matchBasicsSkill(search, drill), null);
  for (const lesson of basicsFor(drill)) {
    assert.ok(lesson.walkthrough.steps.length >= 3, lesson.id);
    assert.ok(lesson.questions.length >= 2, lesson.id);
    for (const check of [...lesson.questions, ...lesson.walkthrough.steps.filter(s => s.ask)]) {
      assert.ok(check.answer >= 0 && check.answer < check.options.length, lesson.id);
    }
  }
});
