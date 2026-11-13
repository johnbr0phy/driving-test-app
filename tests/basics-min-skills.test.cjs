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
