import { DrillDef, DrillState, QuestionV2 } from "./types";

export const EMPTY_DRILL: DrillState = { masteredIds: [], wrongQueue: [], seen: 0, correct: 0 };

/** Every bank item in a drill's domains, in a fixed order that mixes modules. */
export function drillQuestions(bank: QuestionV2[], drill: DrillDef): QuestionV2[] {
  return bank
    .filter((q) => q.section === drill.section && drill.domains.includes(q.domain))
    .sort((a, b) => a.difficulty - b.difficulty || a.id.localeCompare(b.id));
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
