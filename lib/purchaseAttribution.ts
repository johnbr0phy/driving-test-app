import { EXAMS_V2 } from "@/lib/v2/registry";
import { EXAMS } from "@/lib/exams";

// What a Premium purchase came from. Checkout sends a `location` (the paywall
// the buyer clicked through) in the Stripe session metadata: DMV feature names
// ("training_set_4", "practice_test_4", "stats_page", "results_page"...) or,
// for v2 exams, "<examId>_<where>" ("sat_dashboard", "act_drill",
// components/v2/V2Paywall) or, for v1 exams, "<examId>_stats" (the stats page
// lock in components/exam/ExamStatsPage). The webhook stores both on the payment, and
// The /admin Today tab reads older payments' location back from Stripe.

/** Which exam a checkout location belongs to: a v2 or v1 exam id, else the DMV. */
export function purchaseExam(location: string | null | undefined): string {
  if (location) {
    const exam = EXAMS_V2.find((e) => location.startsWith(`${e.id}_`)) ?? EXAMS.find((e) => location.startsWith(`${e.id}_`));
    if (exam) return exam.id;
  }
  return "dmv";
}

const FEATURE_LABELS: Record<string, string> = {
  // The checkout location names the fourth set and test, but the dashboard
  // sends it for the third too (both are locked).
  training_set_4: "DMV training sets 3 and 4",
  practice_test_4: "DMV practice tests 3 and 4",
  stats_page: "DMV stats page",
  full_stats: "DMV stats page",
  results_page: "Results page",
  test_hub: "Test hub",
  drill: "Missed-question drill",
};

/** A readable name for a checkout location. */
export function purchaseLocationLabel(location: string | null | undefined): string {
  if (!location) return "Unknown (no location sent)";
  if (FEATURE_LABELS[location]) return FEATURE_LABELS[location];
  const exam = EXAMS_V2.find((e) => location.startsWith(`${e.id}_`)) ?? EXAMS.find((e) => location.startsWith(`${e.id}_`));
  if (exam) return `${exam.shortName} ${location.slice(exam.id.length + 1).replace(/_/g, " ")}`;
  return location.replace(/_/g, " ");
}

/**
 * The checkout location a paywall hit (analytics/paywalls key
 * "<location>:<itemId>") leads to, so hits and purchases line up per paywall.
 * DMV hits are keyed by where the lock was seen ("dashboard:set_3"), checkouts
 * by what it locks ("training_set_4", sent for sets 3 and 4 alike).
 */
export function paywallHitFeature(key: string): string {
  const [location, item = ""] = key.split(":");
  if (purchaseExam(location) !== "dmv") return location; // v2: "sat_dashboard" is both
  if (/^set_\d+$/.test(item)) return "training_set_4";
  if (/^test_\d+$/.test(item)) return "practice_test_4";
  if (/drill/.test(item) && item !== "results_drill_rates") return "drill";
  return location;
}
