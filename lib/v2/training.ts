import { DrillDef, DrillState, ExamV2Config, QuestionV2 } from "./types";

export const EMPTY_DRILL: DrillState = { masteredIds: [], wrongQueue: [], seen: 0, correct: 0 };

/** Test numbers whose items are kept out of every drill. */
export function heldOutTests(exam: ExamV2Config): number[] {
  return exam.tests.filter((t) => t.heldOut).map((t) => t.number);
}

/**
 * The questions a drill runs: items in its domains, never from a held-out
 * test (so that test stays unseen until the student sits it), sorted easiest
 * first. Items tagged test 0 are drill-only. When the exam sets `drillSize`
 * (or the drill sets `size`), the pool is trimmed to that many by taking an
 * even spread across the difficulty range, so a drill stays short enough to
 * finish in one sitting while the bank behind it can keep growing. The
 * spread is a pure function of the pool, so the same questions come back
 * every visit and the dashboard counts follow the same number.
 */
export function drillQuestions(bank: QuestionV2[], drill: DrillDef, exam: ExamV2Config): QuestionV2[] {
  const heldOut = heldOutTests(exam);
  const pool = bank
    .filter((q) => q.section === drill.section && drill.domains.includes(q.domain) && !heldOut.includes(q.test))
    .sort((a, b) => a.difficulty - b.difficulty || a.id.localeCompare(b.id));
  const size = drill.size ?? exam.drillSize;
  if (!size || pool.length <= size) return pool;
  return Array.from({ length: size }, (_, i) => pool[Math.floor((i * pool.length) / size)]);
}

/**
 * Next unmastered question. Fresh items first in difficulty order, then the
 * wrong-answer queue oldest first, never the item just answered unless it is
 * the only one left. Same mastery mechanics as v1 training sets.
 */
export function nextDrillQuestion(questions: QuestionV2[], state: DrillState, currentId: string | null): QuestionV2 | null {
  let pool = questions.filter((q) => !state.masteredIds.includes(q.id));
  if (pool.length === 0) return null;
  if (currentId && pool.length > 1) pool = pool.filter((q) => q.id !== currentId);
  const fresh = pool.filter((q) => !state.wrongQueue.includes(q.id));
  if (fresh.length > 0) return fresh[0];
  for (const id of state.wrongQueue) {
    const q = pool.find((x) => x.id === id);
    if (q) return q;
  }
  return pool[0];
}

export function drillKey(examId: string, drill: string) {
  return `${examId}:${drill}`;
}

/**
 * A drill's saved state, falling back to its legacyKey drill's progress
 * (only the questions that belong to this drill) when it has none yet.
 */
export function drillStateFor(
  drills: Record<string, DrillState>,
  examId: string,
  drill: DrillDef,
  questions: QuestionV2[]
): DrillState {
  const own = drills[drillKey(examId, drill.key)];
  if (own || !drill.legacyKey) return own ?? EMPTY_DRILL;
  const legacy = drills[drillKey(examId, drill.legacyKey)];
  if (!legacy) return EMPTY_DRILL;
  const ids = new Set(questions.map((q) => q.id));
  const masteredIds = legacy.masteredIds.filter((id) => ids.has(id));
  const wrongQueue = legacy.wrongQueue.filter((id) => ids.has(id));
  if (masteredIds.length === 0 && wrongQueue.length === 0) return EMPTY_DRILL;
  return { masteredIds, wrongQueue, seen: masteredIds.length + wrongQueue.length, correct: masteredIds.length };
}
