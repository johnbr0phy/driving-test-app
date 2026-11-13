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
require('tsx/cjs');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { test } = require('node:test');
require('../lib/server/mcpV2Practice.ts'); // registers every v2 bank
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { getBank } = require('../lib/v2/bank.ts');

const BASELINE = path.join(__dirname, 'no-repeats-baseline.json');

function norm(s) {
  return String(s ?? '').toLowerCase().replace(/[^a-z0-9À-￿]+/g, ' ').trim();
}

function findRepeats() {
  const out = [];
  for (const exam of EXAMS_V2) {
    const drills = exam.drills ?? [];
    const skillDrills = {};
    const domainDrills = {};
    const drillBasics = {};
    for (const d of drills) {
      for (const s of d.basics ?? []) (skillDrills[s] ??= []).push(d.key);
      for (const dom of d.domains ?? []) {
        (domainDrills[dom] ??= []).push(d.key);
        drillBasics[dom] = new Set([...(drillBasics[dom] ?? []), ...(d.basics ?? [])]);
      }
    }
    for (const [s, keys] of Object.entries(skillDrills))
      if (keys.length > 1) out.push(`${exam.id}: Basics skill ${s} opens ${keys.join(', ')}`);
    for (const [dom, keys] of Object.entries(domainDrills))
      if (keys.length > 1) out.push(`${exam.id}: domain ${dom} is drilled by ${keys.join(', ')}`);

    const seen = new Map();
    for (const q of getBank(exam.id).questions) {
      if (q.basics && drillBasics[q.domain] && !drillBasics[q.domain].has(q.basics))
        out.push(`${exam.id}: ${q.id} is tagged ${q.basics}, which its drill does not open with`);
      const key = JSON.stringify([
        norm(q.stem), norm(q.passage), q.stimulusId ?? '',
        (q.options ?? []).map(norm).sort(), (q.rows ?? []).map(norm), (q.blanks ?? []).map((b) => b.map(norm)),
      ]);
      if (seen.has(key)) out.push(`${exam.id}: ${q.id} repeats ${seen.get(key)}`);
      else seen.set(key, q.id);
    }
  }
  return out.sort();
}

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
