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
 * first. Re-run after changing a bank or a set's categories:
 *   npx tsx scripts/build-training-parts.ts           # rewrite the file
 *   npx tsx scripts/build-training-parts.ts --check   # exit 1 if it is stale
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { ALL_EXAMS, TRAINING_PART_MAX, TRAINING_PART_TARGET } from "@/lib/exams";
import { getExamQuestions } from "@/lib/examData";

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
    const count = Math.ceil(ids.length / TRAINING_PART_TARGET);
    const bounds = Array.from({ length: count + 1 }, (_, i) => Math.floor((i * ids.length) / count));
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
