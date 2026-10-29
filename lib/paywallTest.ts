// 50/50 paywall test for English readers: John's "chip in" paywall
// (SupportPaywallModal) against the classic Premium one (PaywallModal).
// Each browser is assigned once and keeps its variant; `?paywall=john` or
// `?paywall=classic` pins it (for previewing). Views go to
// analytics/paywallTest via /api/analytics/paywall-test, and the variant rides
// on the Stripe checkout so the payment records which paywall sold it.
// Results are on the /admin Today tab.

import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";
import { PAYWALL_TEST_ID, isPaywallVariant, type PaywallVariant } from "@/lib/paywallTestIds";

export { PAYWALL_TEST_ID, isPaywallVariant, type PaywallVariant };

const KEY = "tigertest-paywall-test";

type Stored = { test: string; variant: PaywallVariant; seen?: boolean };

// Used when localStorage is unavailable, so one page view stays consistent.
let memory: Stored | null = null;

function load(): Stored | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null") as Stored | null;
    if (parsed?.test === PAYWALL_TEST_ID && isPaywallVariant(parsed.variant)) return parsed;
  } catch {
    // Fall through to memory.
  }
  return memory;
}

function save(rec: Stored) {
  memory = rec;
  try {
    localStorage.setItem(KEY, JSON.stringify(rec));
  } catch {
    // Memory keeps it for this page view.
  }
}

/** This browser's variant, assigned at random on first call. */
export function paywallVariant(): PaywallVariant {
  if (typeof window === "undefined") return "john";
  let rec = load();
  const pinned = new URLSearchParams(window.location.search).get("paywall");
  if (isPaywallVariant(pinned) && rec?.variant !== pinned) {
    rec = { test: PAYWALL_TEST_ID, variant: pinned, seen: rec?.seen };
    save(rec);
  }
  if (!rec) {
    rec = { test: PAYWALL_TEST_ID, variant: Math.random() < 0.5 ? "john" : "classic" };
    save(rec);
  }
  return rec.variant;
}

/** The variant to send with a checkout, only once this browser has seen a test paywall. */
export function paywallVariantForCheckout(): PaywallVariant | undefined {
  if (typeof window === "undefined") return undefined;
  const rec = load();
  return rec?.seen ? rec.variant : undefined;
}

/** Count one view of the test paywall (and the browser's first, once). */
export async function recordPaywallTestView(variant: PaywallVariant) {
  const rec = load() ?? { test: PAYWALL_TEST_ID, variant };
  const first = !rec.seen;
  save({ ...rec, variant, seen: true });
  if (isInternalBrowser(auth.currentUser?.email)) return;
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const user = auth.currentUser;
    if (user) {
      try {
        headers.Authorization = `Bearer ${await user.getIdToken()}`;
      } catch {
        // Record as an anonymous view.
      }
    }
    await fetch("/api/analytics/paywall-test", {
      method: "POST",
      headers,
      body: JSON.stringify({ test: PAYWALL_TEST_ID, variant, first }),
      keepalive: true,
    });
  } catch {
    // Analytics must never surface errors to the user.
  }
}
