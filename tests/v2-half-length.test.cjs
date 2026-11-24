// Half-length v2 practice: every other item, half the time, section scores
// scaled up to the full-length stages they stand for.
require('tsx/cjs');
require.extensions['.css'] = (module) => { module.exports = {}; };
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { SAT } = require('../lib/v2/exams/sat.ts');
const { createSession, scoreSession, withLength, stageTimeLimit } = require('../lib/v2/session.ts');
const { stagesOf } = require('../lib/v2/registry.ts');
const { getBank, getQuestionIndex } = require('../lib/v2/bank.ts');
const { isCorrect } = require('../lib/v2/grading.ts');
require('../lib/v2/banks/sat.ts');

const bank = getBank(SAT.id).questions;
const byId = getQuestionIndex(SAT.id);
const answerAllRight = (session) => ({
  ...session,
  stages: session.stages.map((st) => ({ ...st, answers: Object.fromEntries(st.questionIds.map((id) => [id, byId.get(id).correct ?? byId.get(id).numeric?.answers[0]])) })),
});

test('half length keeps every other item and half the time per stage', () => {
  const full = createSession(SAT, bank, 1);
  const half = withLength(SAT, bank, full, 'half');
  assert.equal(half.length, 'half');
  assert.equal(half.key, full.key);
  const defs = stagesOf(SAT);
  half.stages.forEach((st, i) => {
    assert.equal(st.questionIds.length, Math.ceil(full.stages[i].questionIds.length / 2));
    assert.equal(st.remaining, stageTimeLimit(defs[i].module.timeLimit, 'half'));
    for (const id of st.questionIds) assert.ok(full.stages[i].questionIds.includes(id));
  });
  assert.equal(withLength(SAT, bank, half, 'full').stages[0].questionIds.length, full.stages[0].questionIds.length);
});

test('a perfect half-length sitting scales like a perfect full one', () => {
  const full = scoreSession(SAT, answerAllRight(createSession(SAT, bank, 1)), byId);
  const half = scoreSession(SAT, answerAllRight(createSession(SAT, bank, 1, 'half')), byId);
  assert.equal(half.length, 'half');
  assert.equal(full.length, undefined);
  for (let i = 0; i < full.sections.length; i++) {
    assert.ok(half.sections[i].total < full.sections[i].total);
    const allRight = half.items.filter((it) => it.section === half.sections[i].section).every((it) => it.correct || !isCorrect(byId.get(it.id), undefined));
    if (allRight) assert.equal(half.sections[i].scaled, full.sections[i].scaled);
  }
});
