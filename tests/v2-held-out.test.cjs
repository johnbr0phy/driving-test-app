// With two or more practice tests, only the later ones are held out of the
// drills: drills train on Test 1's questions plus the drill-only ones. In Nov
// 2026 three exams (SecurityX, SSCP, ServiceNow CSA) held out every test, so
// their drills had 12 to 20 questions while each test had 60 to 100.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');

test('Test 1 feeds the drills whenever an exam has more than one test', () => {
  const bad = EXAMS_V2.filter((e) => e.tests.length > 1 && e.tests.every((t) => t.heldOut)).map((e) => e.id);
  assert.deepEqual(bad, []);
});
