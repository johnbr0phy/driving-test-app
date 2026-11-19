// Run: node --test tests/v2-from-v1-carry-over.test.cjs
// The Italian tests moved from v1 to v2 keep their question ids; a person's v1
// training-set progress seeds the matching v2 drills once (V1ProgressCarryOver).
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
require('../lib/v2/banks/itcils.ts');
require('../lib/v2/banks/itceli.ts');
require('../lib/v2/banks/ita2.ts');
require('../lib/v2/banks/itcilsb2.ts');
const { getBank } = require('../lib/v2/bank.ts');
const { drillKey, drillQuestions, v1CarryOverPatch } = require('../lib/v2/training.ts');

const exam = (id) => EXAMS_V2.find((e) => e.id === id);

test('every moved exam maps each drill to v1 sets, and each v1 set to one drill', () => {
  for (const id of ['itcils', 'itceli', 'ita2', 'itcilsb2']) {
    const e = exam(id);
    assert.ok(e.fromV1, id);
    for (const d of e.drills) assert.ok(e.fromV1.drills[d.key]?.length, `${id} ${d.key}`);
    const sets = Object.values(e.fromV1.drills).flat();
    assert.equal(new Set(sets).size, sets.length, `${id} set mapped twice`);
  }
});

test('v1 mastery seeds the matching drill, filtered to its questions', () => {
  const e = exam('itcils');
  const bank = getBank('itcils').questions;
  const lettura = e.drills.find((d) => d.key === 'lettura');
  const pool = drillQuestions(bank, lettura, e).map((q) => q.id);
  const heldOut = bank.find((q) => q.test === 4 && q.section === 'lettura').id;
  const sets = { 27401: { masteredIds: [pool[0], pool[1], heldOut], wrongQueue: [pool[2], pool[0]] } };
  const patch = v1CarryOverPatch(e, bank, sets, {});
  const st = patch[drillKey('itcils', 'lettura')];
  assert.deepEqual(st.masteredIds, [pool[0], pool[1]]);
  assert.deepEqual(st.wrongQueue, [pool[2]]);
  assert.equal(st.correct, 2);
  assert.equal(Object.keys(patch).length, 1);
});

test('a drill with v2 state is never overwritten', () => {
  const e = exam('itceli');
  const bank = getBank('itceli').questions;
  const avvisi = e.drills.find((d) => d.key === 'avvisi');
  const pool = drillQuestions(bank, avvisi, e).map((q) => q.id);
  const key = drillKey('itceli', 'avvisi');
  const own = { masteredIds: [], wrongQueue: [], seen: 0, correct: 0 };
  const patch = v1CarryOverPatch(e, bank, { 27501: { masteredIds: [pool[0]], wrongQueue: [] } }, { [key]: own });
  assert.equal(patch[key], undefined);
});

test('v1 question ids still exist in the v2 banks', () => {
  for (const id of ['itcils', 'itceli', 'ita2', 'itcilsb2']) {
    const ids = getBank(id).questions.map((q) => q.id);
    assert.equal(ids.length, 200, id);
    assert.equal(new Set(ids).size, 200, id);
  }
});
