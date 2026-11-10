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

/** What else the same purchase opens, for lock and welcome copy. */
export function otherPremiumExams(_exam: ExamV2Config): string {
  return "every other test on Tigertest";
}

/** "Practice Test 2": the Premium test's name, for lock copy. */
export function premiumTestName(exam: ExamV2Config): string | null {
  const n = exam.premium?.lockedTests[0];
  if (n === undefined) return null;
  return exam.tests.find((t) => t.number === n)?.name ?? `Practice Test ${n}`;
}
