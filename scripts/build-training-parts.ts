/**
 * Splits every registry-exam training set over TRAINING_PART_MAX questions
 * into parts of about TRAINING_PART_TARGET, and writes where each part
 * starts to lib/trainingParts.json. The dashboard reads that file instead of
 * the question bank (which it does not bundle), and the training page uses
 * the same starts, so both always agree on which question is in which part.
 * Progress stays stored per set; parts only filter it.
 *
 * A part is a contiguous run of the set's questions in question-ID order
 * (the order training already goes in), so existing progress fills part 1
 * first. Cuts go where the category changes whenever the sizes allow, so a
 * part can be named for its topic (`partNames` on the set) instead of
 * "part 2 of 3"; a single-category set is cut evenly. Re-run after changing a bank or a set's categories:
 *   npx tsx scripts/build-training-parts.ts           # rewrite the file
 *   npx tsx scripts/build-training-parts.ts --check   # exit 1 if it is stale
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { ALL_EXAMS, TRAINING_PART_MAX, TRAINING_PART_TARGET } from "@/lib/exams";
import { getExamQuestions } from "@/lib/examData";
// State variant banks are registered by these modules, not by examData itself.
import "@/lib/banks/realEstateStates";
import "@/lib/banks/lifeHealthStates";
import "@/lib/banks/propertyCasualtyStates";

/** Cuts at a category change cost nothing extra; a cut inside a category
 *  costs this many questions of imbalance, so a set is split mid-topic only
 *  when its topics are far too lopsided to split on. */
const MID_TOPIC_CUT = 40;
const PART_MIN = 20;

/** Where each part starts (plus the end), as indexes into the sorted set:
 *  ceil(n / TARGET) parts, each PART_MIN..MAX, as even as possible after
 *  preferring cuts between categories. */
function splitPoints(cats: string[]): number[] {
  const n = cats.length;
  const count = Math.ceil(n / TRAINING_PART_TARGET);
  const even = n / count;
  const cutCost = (i: number) => (cats[i] === cats[i - 1] ? MID_TOPIC_CUT : 0);
  // best[k][i]: cheapest way to cover the first i questions with k parts.
  const best = Array.from({ length: count + 1 }, () => new Array<number>(n + 1).fill(Infinity));
  const from = Array.from({ length: count + 1 }, () => new Array<number>(n + 1).fill(-1));
  best[0][0] = 0;
  for (let k = 1; k <= count; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = Math.max(0, i - TRAINING_PART_MAX); j <= i - PART_MIN; j++) {
        if (best[k - 1][j] === Infinity) continue;
        const cost = best[k - 1][j] + Math.abs(i - j - even) + (j > 0 ? cutCost(j) : 0);
        if (cost < best[k][i]) { best[k][i] = cost; from[k][i] = j; }
      }
    }
  }
  const bounds = [n];
  for (let k = count, i = n; k > 0; k--) { i = from[k][i]; bounds.unshift(i); }
  return bounds;
}

const out: Record<string, { starts: string[]; sizes: number[] }> = {};
const problems: string[] = [];

for (const exam of ALL_EXAMS) {
  const bank = getExamQuestions(exam.id);
  for (const def of exam.trainingSets) {
    const ids = bank
      .filter((q) => def.categories.includes(q.category))
      .map((q) => q.questionId)
      .sort((a, b) => a.localeCompare(b));
    if (ids.length !== def.size) problems.push(`${exam.id} set ${def.setNumber}: size ${def.size}, bank has ${ids.length}`);
    if (ids.length <= TRAINING_PART_MAX) continue;
    const category = new Map(bank.map((q) => [q.questionId, q.category]));
    const bounds = splitPoints(ids.map((id) => category.get(id)!));
    if (def.partNames && def.partNames.length !== bounds.length - 1) {
      problems.push(`${exam.id} set ${def.setNumber}: ${def.partNames.length} partNames for ${bounds.length - 1} parts`);
    }
    out[def.id] = {
      starts: bounds.slice(0, -1).map((b) => ids[b]),
      sizes: bounds.slice(1).map((b, i) => b - bounds[i]),
    };
  }
}

const file = join(process.cwd(), "lib/trainingParts.json");
const json = JSON.stringify(out, null, 2) + "\n";
if (problems.length) console.warn(`Set sizes that do not match the bank:\n  ${problems.join("\n  ")}`);
if (process.argv.includes("--check")) {
  const current = readFileSync(file, "utf8");
  if (current !== json) {
    console.error("lib/trainingParts.json is stale: run npx tsx scripts/build-training-parts.ts");
    process.exit(1);
  }
  console.log(`lib/trainingParts.json is up to date (${Object.keys(out).length} split sets)`);
} else {
  writeFileSync(file, json);
  console.log(`Wrote ${Object.keys(out).length} split sets to lib/trainingParts.json`);
}
