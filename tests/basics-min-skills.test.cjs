// A Basics step is a short course before a drill, so it never holds a single
// skill: one card and two questions does not feel like a step of its own.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { basicsFor } = require('../lib/v2/basics.ts');

test('every Basics step has at least two skills, and every listed skill exists', () => {
  const thin = [];
  for (const exam of EXAMS_V2) {
    for (const drill of exam.drills ?? []) {
      const ids = drill.basics ?? [];
      if (!ids.length) continue;
      assert.equal(basicsFor(drill).length, new Set(ids).size, `${exam.id}:${drill.key} lists a skill that is missing or repeated`);
      if (ids.length < 2) thin.push(`${exam.id}:${drill.key}`);
    }
  }
  assert.deepEqual(thin, []);
});
