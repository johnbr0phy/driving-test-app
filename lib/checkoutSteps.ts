// Shared with the Stripe routes. Only product-defined keys belong in checkout
// analytics; item labels, question text, URLs and raw error messages never do.
export type CheckoutDevice = "desktop" | "mobile" | "tablet";
export type CheckoutBuyer = "signed_in" | "guest" | "unknown";
export type CheckoutFailure = "auth_restore" | "auth_token" | "network" | "unauthorized" | "rate_limited" | "rejected" | "server" | "invalid_response" | "redirect";

export function isCheckoutDevice(value: unknown): value is CheckoutDevice {
  return value === "desktop" || value === "mobile" || value === "tablet";
}

export function checkoutDeviceFor(userAgent: string, touchPoints: number): CheckoutDevice {
  if (/iPad|Tablet|Silk\//i.test(userAgent) ||
      (/Macintosh/.test(userAgent) && touchPoints > 1) ||
      (/Android/i.test(userAgent) && !/Mobile/i.test(userAgent))) return "tablet";
  return /Mobile|iPhone|iPod|Android/i.test(userAgent) ? "mobile" : "desktop";
}

const DMV_LOCATIONS = new Set(["dashboard", "training_set_4", "practice_test_4", "stats_page", "full_stats", "results_page", "test_hub", "drill"]);
const EXAM_LOCATION = /^([a-z][a-z0-9-]{0,31})_(?:dashboard|set|test|stats|drill)$/;
const FIXED_ITEMS = new Set(["email_unlock", "full_stats", "stats_question_list", "community_wrong_questions", "drill_locked", "drill_locked_row", "results_drill_rates", "test_header_stats", "training_header_stats", "quizzes_premium"]);
const NUMBERED_ITEM = /^(?:set|test|drill_test)_[1-9][0-9]{0,2}$/;

export function checkoutExamId(location: string): string | undefined {
  if (DMV_LOCATIONS.has(location)) return "dmv";
  return EXAM_LOCATION.exec(location)?.[1];
}

export function checkoutItemId(item: unknown, location: string): string | undefined {
  if (typeof item !== "string" || item.length > 100) return undefined;
  if (FIXED_ITEMS.has(item) || NUMBERED_ITEM.test(item)) return item;
  const exam = EXAM_LOCATION.exec(location)?.[1];
  if (!exam) return undefined;
  for (const prefix of [`exam_${exam}_`, `v2_${exam}_`]) {
    if (!item.startsWith(prefix)) continue;
    const key = item.slice(prefix.length);
    if (NUMBERED_ITEM.test(key) || FIXED_ITEMS.has(key)) return item;
    // Drill keys vary by exam. Report the type without storing a free-form id.
    if (prefix.startsWith("v2_") && /^drill(?:_[a-zA-Z0-9_-]{1,50})?$/.test(key)) return `${prefix}drill`;
  }
  return undefined;
}

export function checkoutHttpFailure(status: number): CheckoutFailure {
  if (status === 401 || status === 403) return "unauthorized";
  if (status === 429) return "rate_limited";
  return status >= 500 ? "server" : "rejected";
}
