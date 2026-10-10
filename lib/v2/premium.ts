/**
 * What TigerTest Premium unlocks on a v2 exam. One purchase, the same flag
 * as the DMV (users/{uid}.subscription.isPremium), covers every exam that
 * declares `premium` in its config. Exams without it are entirely free.
 *
 * Client-side gating, like the DMV: the banks ship with the page.
 */

import { ExamV2Config } from "@/lib/v2/types";
import { EXAMS_V2 } from "@/lib/v2/registry";

export function isTestLocked(exam: ExamV2Config, testNumber: number, isPremium: boolean): boolean {
  return !isPremium && !!exam.premium?.lockedTests.includes(testNumber);
}

/** True when this whole drill needs Premium for this person. */
export function isDrillLocked(exam: ExamV2Config, drillKey: string, isPremium: boolean): boolean {
  return !isPremium && !!exam.premium?.lockedDrills.includes(drillKey);
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
