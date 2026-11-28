// Finds repeats inside each v2 exam (see tests/no-repeats.test.cjs for the rules).
// CLI: node scripts/find-repeats.cjs [examId ...]   prints the repeats, all exams or the named ones.
require('tsx/cjs');
require('../lib/server/mcpV2Practice.ts'); // registers every v2 bank
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { getBank } = require('../lib/v2/bank.ts');
const { drillCoversQuestion } = require('../lib/v2/training.ts');

function norm(s) {
  return String(s ?? '').toLowerCase().replace(/[^a-z0-9À-￿]+/g, ' ').trim();
}

function findRepeats() {
  const out = [];
  for (const exam of EXAMS_V2) {
    const drills = exam.drills ?? [];
    const skillDrills = {};
    for (const d of drills)
      for (const s of d.basics ?? []) (skillDrills[s] ??= []).push(d.key);
    for (const [s, keys] of Object.entries(skillDrills))
      if (keys.length > 1) out.push(`${exam.id}: Basics skill ${s} opens ${keys.join(', ')}`);
    const seen = new Map();
    for (const q of getBank(exam.id).questions) {
      const matches = drills.filter(d => drillCoversQuestion(d, q));
      if (matches.length > 1)
        out.push(`${exam.id}: ${q.id} is drilled by ${matches.map(d => d.key).join(', ')}`);
      if (q.basics && matches.length && !matches.some(d => d.basics?.includes(q.basics)))
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
