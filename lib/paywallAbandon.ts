/**
 * Which exam a paywall view belongs to, for the paywall follow-up email
 * (app/api/cron/paywall-abandon). Kept out of the route file because a Next
 * route may only export its handlers.
 */
import { voiceFor } from "@/lib/email-voice";
import { V2_PAYWALL_PREFIX } from "@/lib/v2/premium";
import { EXAM_PAYWALL_PREFIX } from "@/lib/examLocks";
import { purchaseExam } from "@/lib/purchaseAttribution";
import { getExamById, examFamilyId } from "@/lib/exams";
import { studyContexts, hasClassStatsAccess } from "@/lib/email-lifecycle";
import type { PaywallHit } from "@/lib/cron-email";

const DMV_DASHBOARD_ITEM = /^(set_[34]|test_[34]|drill_test_[1-4])$/;
const STATS_ITEMS = ["full_stats", "stats_question_list", "community_wrong_questions"];

/**
 * The exam whose paywall this was, or null when it is not one this email
 * covers. The DMV keeps its two paywall places (dashboard sets and tests 3
 * and 4, and the stats page). A v1 exam's hits carry location
 * "<family>_dashboard|_test|_set" with an "exam_" item, or "<family>_stats";
 * a v2 exam's "<exam>_..." with a "v2_" item. Results, drill and upgrade-page
 * hits are left out, as before.
 */
export function paywallExam(hit: Pick<PaywallHit, "location" | "itemId">): string | null {
  if (hit.location === "dashboard") return DMV_DASHBOARD_ITEM.test(hit.itemId) ? "dmv" : null;
  if (hit.location === "stats_page") return STATS_ITEMS.includes(hit.itemId) ? "dmv" : null;
  const examId = purchaseExam(hit.location);
  if (examId === "dmv") return null; // not an exam location
  const v2 = hit.itemId.startsWith(V2_PAYWALL_PREFIX);
  const v1 = hit.itemId.startsWith(EXAM_PAYWALL_PREFIX) || (hit.location === `${examId}_stats` && STATS_ITEMS.includes(hit.itemId));
  if (!v1 && !v2) return null;
  return voiceFor(examId).hasPremium ? examId : null;
}

/** Answers on that exam, family included (a state version counts toward its family's paywalls). */
export function answersOn(raw: Record<string, any>, examId: string, now: number): number {
  const family = (id: string) => { const e = getExamById(id); return e ? examFamilyId(e) : id; };
  const target = family(examId);
  const dated = studyContexts(raw, now).filter((c) => family(c.examId) === target).reduce((n, c) => n + c.answersObserved, 0);
  // v2 drill answers are kept as per-question tallies, not dated events, so
  // studyContexts does not see them. The paywall view itself is the recent act.
  let v2 = 0;
  for (const t of Object.values<any>(raw.v2?.questionStats?.[examId] ?? {})) v2 += Number(t?.n) > 0 ? Math.floor(Number(t.n)) : 0;
  for (const r of Array.isArray(raw.v2?.results) ? raw.v2.results : []) {
    if (r?.examId === examId && Array.isArray(r.items)) v2 += r.items.filter((i: any) => i?.answer !== undefined).length;
  }
  return dated + v2;
}

/**
 * A class student already has what the paywall offered: every stat on the
 * DMV, and every step and stat on any other exam (hooks/useExamLocks.ts,
 * hooks/useV2Premium.ts). DMV dashboard sets and tests are not unlocked by
 * a class.
 */
export function classUnlocks(raw: Record<string, any>, examId: string, hit: Pick<PaywallHit, "location">): boolean {
  if (examId === "dmv" && hit.location === "dashboard") return false;
  return hasClassStatsAccess(raw, examId);
}

