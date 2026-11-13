// Nothing a student practises should come round twice inside one exam:
//  1. a Basics skill opens at most one drill (a skill is learned once per exam,
//     so a second drill showing it is a wasted step);
//  2. no two drills draw from the same domain (the same questions twice);
//  3. a question's `basics` tag names a skill its own drill opens with (any other
//     tag can never show its brush-up card);
//  4. no question appears twice in a bank (same stem, options, rows and blanks on
//     the same stimulus), across tests, drills or modules.
// Exams built before this rule are listed in tests/no-repeats-baseline.json. The
// baseline may only shrink: a new exam, or a new repeat in an old one, fails.
// Rebuild the baseline after fixing old exams:
//   NO_REPEATS_WRITE_BASELINE=1 node --test tests/no-repeats.test.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { findRepeats } = require('../scripts/find-repeats.cjs');

const BASELINE = path.join(__dirname, 'no-repeats-baseline.json');

test('no Basics skill, drill domain or question repeats inside an exam', () => {
  const found = findRepeats();
  if (process.env.NO_REPEATS_WRITE_BASELINE) {
    fs.writeFileSync(BASELINE, JSON.stringify(found, null, 2) + '\n');
    return;
  }
  const baseline = new Set(JSON.parse(fs.readFileSync(BASELINE, 'utf8')));
  const fresh = found.filter((r) => !baseline.has(r));
  assert.deepEqual(fresh, [], 'New repeats. Give each drill its own Basics skills (write new ones rather than borrow), tag questions only with their drill\'s skills, and remove duplicate questions.');
  const gone = [...baseline].filter((r) => !found.includes(r));
  assert.deepEqual(gone, [], 'Fixed repeats are still in tests/no-repeats-baseline.json: rebuild it with NO_REPEATS_WRITE_BASELINE=1.');
});
