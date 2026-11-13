// Finds repeats inside each v2 exam (see tests/no-repeats.test.cjs for the rules).
// CLI: node scripts/find-repeats.cjs [examId ...]   prints the repeats, all exams or the named ones.
require('tsx/cjs');
require('../lib/server/mcpV2Practice.ts'); // registers every v2 bank
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { getBank } = require('../lib/v2/bank.ts');

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

module.exports = { findRepeats };

if (require.main === module) {
  const only = process.argv.slice(2);
  const found = findRepeats().filter((r) => !only.length || only.includes(r.split(':')[0]));
  console.log(found.join('\n') || 'no repeats');
  console.log(`${found.length} repeat(s)`);
}
