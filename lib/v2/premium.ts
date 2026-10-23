/**
 * What Tigertest Premium unlocks on a v2 exam. One purchase, the same flag
 * as the DMV (users/{uid}.subscription.isPremium), covers every exam that
 * declares `premium` in its config. Exams without it are entirely free.
 *
 * Client-side gating, like the DMV: the banks ship with the page.
 */

import { BasicsSkillState, DrillDef, DrillState, ExamV2Config } from "@/lib/v2/types";
import { basicsFor, basicsKey } from "@/lib/v2/basics";
import { drillKey } from "@/lib/v2/training";
import { EXAMS_V2 } from "@/lib/v2/registry";

export function isTestLocked(exam: ExamV2Config, testNumber: number, isPremium: boolean): boolean {
  return !isPremium && !!exam.premium?.lockedTests.includes(testNumber);
}

/** True when this whole drill (Basics included) needs Premium for this person. */
export function isDrillLocked(exam: ExamV2Config, drillKey: string, isPremium: boolean): boolean {
  return !isPremium && !!exam.premium?.lockedDrills.includes(drillKey);
}

/**
 * A locked drill stays open for anyone already working in it: their own
 * saved exam-level state, or a Basics skill of it they have learned.
 */
export function hasDrillProgress(drills: Record<string, DrillState>, basics: Record<string, BasicsSkillState>, exam: ExamV2Config, drill: DrillDef): boolean {
  if (drills[drillKey(exam.id, drill.key)]) return true;
  return basicsFor(drill).some((s) => basics[basicsKey(exam.id, s.id)]?.done);
}

/**
 * Paywall item ids from v2 exams start with this prefix, so the DMV
 * paywall-abandon email never quotes an SAT or ACT paywall back at someone.
 * Underscore, not colon: /api/analytics/paywall only accepts [A-Za-z0-9_].
 */
export const V2_PAYWALL_PREFIX = "v2_";

/** "the ACT and DMV tests": the other exams the same purchase unlocks. */
export function otherPremiumExams(exam: ExamV2Config): string {
  const others = [...EXAMS_V2.filter((e) => e.premium && e.id !== exam.id).map((e) => e.shortName), "DMV"];
  const list = others.length > 1 ? `${others.slice(0, -1).join(", ")} and ${others[others.length - 1]}` : others[0];
  return `the ${list} tests`;
}
