import { drillKey, drillQuestions, inheritedDrillState } from "./training";
import type { DrillState, ExamV2Config, QuestionV2 } from "./types";

type DrillTotals = { mastered: number; seen: number };

/** A saved replacement supersedes the part of the retired drill it covers.
 * Only accounts that have both records need the question bank to resolve them. */
export function drillTotalsForExam(drills: Record<string, DrillState>, exam: ExamV2Config, bank: QuestionV2[]): DrillTotals;
export function drillTotalsForExam(drills: Record<string, DrillState>, exam: ExamV2Config, bank?: QuestionV2[]): DrillTotals | undefined;
export function drillTotalsForExam(drills: Record<string, DrillState>, exam: ExamV2Config, bank?: QuestionV2[]): DrillTotals | undefined {
  const totals = { mastered: 0, seen: 0 };
  for (const [key, state] of Object.entries(drills)) {
    if (!key.startsWith(`${exam.id}:`)) continue;
    totals.mastered += state.masteredIds.length;
    totals.seen += state.seen;
  }
  const inheritedSeen = new Map<DrillState, number>();
  for (const drill of exam.drills) {
    if (!drill.legacyKey || !drills[drillKey(exam.id, drill.key)]) continue;
    const legacy = drills[drillKey(exam.id, drill.legacyKey)];
    if (!legacy) continue;
    if (!bank) return undefined;
    const ids = new Set(drillQuestions(bank, drill, exam).map(q => q.id));
    const inherited = inheritedDrillState(legacy, ids);
    totals.mastered -= inherited.masteredIds.length;
    // drillStateFor seeds a replacement with one attempt per inherited ID.
    // Any earlier retries remain in the retired drill's original seen total.
    inheritedSeen.set(legacy, (inheritedSeen.get(legacy) ?? 0) + inherited.seen);
  }
  // A merged legacy record can have the union of two devices' IDs but only
  // the larger seen counter. It can contribute at most that many duplicates.
  for (const [legacy, duplicate] of inheritedSeen) totals.seen -= Math.min(legacy.seen, duplicate);
  return totals;
}
