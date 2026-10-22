/**
 * Exams that moved to DMV-style test sets (testSets in lib/exams.ts) used to
 * train by content area, under the same set IDs plus up to two more. Mastery
 * is stored per question, so it carries over exactly: every mastered or
 * missed question the exam's sets hold is handed to the set of the practice
 * test it belongs to, and the old extra sets are dropped. The result of a
 * migrated store is itself, so this can run on every visit.
 *
 * Needs the exam's bank registered (it reads the test slices).
 */
import { ExamConfig, examSetBase, hasTestSets } from "./exams";
import { examTestQuestions } from "./examTestGenerator";

type SetProgress = { masteredIds: string[]; wrongQueue: string[] };

/** Highest set number any of these exams had before (CRCST had 6). */
const OLD_MAX_SETS = 6;

/** Set IDs whose progress belongs to this exam, old and new. */
export function testSetIdsToCheck(exam: ExamConfig): number[] {
  if (!hasTestSets(exam)) return [];
  const base = examSetBase(exam);
  const count = Math.max(OLD_MAX_SETS, exam.trainingSets.length);
  return Array.from({ length: count }, (_, i) => base + i + 1);
}

/** True when this exam's sets hold anything that may need moving. */
export function mayNeedTestSetMigration(
  exam: ExamConfig,
  trainingSets: Record<number, SetProgress | undefined>
): boolean {
  return testSetIdsToCheck(exam).some((id) => {
    const s = trainingSets[id];
    return !!s && (s.masteredIds.length > 0 || s.wrongQueue.length > 0);
  });
}

/**
 * The exam's sets with every question in its test's set, or null when they
 * already are. Keys mapped to undefined are old sets to remove.
 */
export function migrateTestSets(
  exam: ExamConfig,
  trainingSets: Record<number, SetProgress | undefined>
): Record<number, SetProgress | undefined> | null {
  const ids = testSetIdsToCheck(exam);
  if (ids.length === 0) return null;

  const setOf = new Map<string, number>();
  for (const def of exam.trainingSets) {
    if (def.test === undefined) continue;
    for (const q of examTestQuestions(exam, def.test)) setOf.set(q.questionId, def.id);
  }

  const next: Record<number, SetProgress> = {};
  for (const def of exam.trainingSets) next[def.id] = { masteredIds: [], wrongQueue: [] };
  const mastered = new Set<string>();
  for (const id of ids) {
    for (const q of trainingSets[id]?.masteredIds ?? []) {
      const target = setOf.get(q);
      if (target === undefined || mastered.has(q)) continue;
      mastered.add(q);
      next[target].masteredIds.push(q);
    }
  }
  const queued = new Set<string>();
  for (const id of ids) {
    for (const q of trainingSets[id]?.wrongQueue ?? []) {
      const target = setOf.get(q);
      if (target === undefined || mastered.has(q) || queued.has(q)) continue;
      queued.add(q);
      next[target].wrongQueue.push(q);
    }
  }

  const same = (a: string[] = [], b: string[]) => a.length === b.length && a.every((q, i) => q === b[i]);
  const patch: Record<number, SetProgress | undefined> = {};
  let changed = false;
  for (const id of ids) {
    const want = next[id];
    const have = trainingSets[id];
    if (!want) {
      if (have) { patch[id] = undefined; changed = true; }
      continue;
    }
    if (!have && want.masteredIds.length === 0 && want.wrongQueue.length === 0) continue;
    if (!have || !same(have.masteredIds, want.masteredIds) || !same(have.wrongQueue, want.wrongQueue)) {
      patch[id] = want;
      changed = true;
    }
  }
  return changed ? patch : null;
}
