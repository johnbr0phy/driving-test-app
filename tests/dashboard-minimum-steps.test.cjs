require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { ALL_EXAMS } = require('../lib/exams.ts');
const { examSteps } = require('../lib/examLocks.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { basicsFor } = require('../lib/v2/basics.ts');

test('every registry exam and state version offers at least eight dashboard steps', () => {
  for (const exam of ALL_EXAMS) {
    const count = examSteps(exam).length;
    assert.ok(count >= 8, `${exam.id} offers only ${count} steps`);
  }
});

test('every sectioned exam offers at least eight dashboard steps', () => {
  for (const exam of EXAMS_V2) {
    const basics = exam.drills.filter(drill => basicsFor(drill).length > 0);
    const count = basics.length + exam.drills.length + exam.tests.length;
    assert.ok(count >= 8, `${exam.id} offers only ${count} steps`);
  }
});

test('split topic drills preserve the old pool, holdouts, mastery and access', () => {
  const { drillQuestions, drillStateFor } = require('../lib/v2/training.ts');
  const { hasDrillProgress } = require('../lib/v2/premium.ts');
  const { getBank } = require('../lib/v2/bank.ts');
  for (const exam of EXAMS_V2.filter(e => e.preserveSplitDrillAccess)) {
    require('../lib/v2/banks/' + exam.id + '.ts');
    const questions = getBank(exam.id).questions;
    for (const key of new Set(exam.drills.map(d => d.legacyKey).filter(Boolean))) {
      const parts = exam.drills.filter(d => d.legacyKey === key);
      const domain = { ...parts[0], domains: parts.flatMap(d => d.domains), skillFilter: undefined };
      const original = drillQuestions(questions, domain, exam).map(q => q.id);
      const saved = { [exam.id + ':' + key]: { masteredIds: original, wrongQueue: [], seen: original.length, correct: original.length } };
      const combined = parts.flatMap(d => {
        const pool = drillQuestions(questions, d, exam);
        assert.ok(pool.length, exam.id + ':' + d.key);
        const ids = pool.map(q => q.id);
        assert.deepEqual(new Set(drillStateFor(saved, exam.id, d, pool).masteredIds), new Set(ids));
        assert.ok(hasDrillProgress(saved, {}, exam, d));
        return ids;
      });
      assert.deepEqual(combined.sort(), original.sort(), exam.id + ':' + key);
    }
  }
});
