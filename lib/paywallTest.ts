// 50/50 paywall test for English readers: John's "chip in" paywall
// (SupportPaywallModal) against the classic Premium one (PaywallModal).
// Each browser is assigned once and keeps its variant; `?paywall=john` or
// `?paywall=classic` pins it (for previewing). Views go to
// analytics/paywallTest via /api/analytics/paywall-test, and the variant rides
// on the Stripe checkout so the payment records which paywall sold it.
// Results are on the /admin Today tab.
//
// On both sides, half of browsers ("new") get a different message the second
// and third time they hit a paywall, and half ("same") keep the first one
// (notePaywallHit below; the copy is in the two modals). The visit number and
// that arm ride along with every view and checkout, so the Today tab can show
// whether the new messages sell more. `?paywallHit=2` previews a message
// without counting.

import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";
import {
  PAYWALL_TEST_ID,
  isPaywallHit,
  isPaywallReturnArm,
  isPaywallVariant,
  type PaywallHit,
  type PaywallReturnArm,
  type PaywallVariant,
} from "@/lib/paywallTestIds";

export { PAYWALL_TEST_ID, isPaywallVariant, type PaywallHit, type PaywallReturnArm, type PaywallVariant };

const KEY = "tigertest-paywall-test";

type Stored = {
  test: string;
  variant: PaywallVariant;
  seen?: boolean;
  /** Paywall visits so far, and when the latest one began. */
  hits?: number;
  hitAt?: number;
  /** New message on return visits, or the first one again (assigned once). */
  ret?: PaywallReturnArm;
};

// Opening a paywall again within this long is the same visit: someone tapping
// two locks in a row should not burn through the second and third messages.
const HIT_GAP_MS = 10 * 60 * 1000;

const toHit = (n: number): PaywallHit => (n >= 3 ? 3 : n === 2 ? 2 : 1);

// A browser that saw a paywall before visits were counted has had one.
const hitsOf = (rec: Stored | null) => rec?.hits ?? (rec?.seen ? 1 : 0);

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

export type PaywallVisit = {
  /** Which visit this is: 1, 2, or 3 from the third on. */
  hit: PaywallHit;
  arm: PaywallReturnArm;
  /** The message to show: the visit's own in the "new" arm, the first otherwise. */
  message: PaywallHit;
};

/**
 * Call once when a paywall opens: counts the visit (unless the last one began
 * under ten minutes ago) and returns which message to show.
 */
export function notePaywallHit(): PaywallVisit {
  if (typeof window === "undefined") return { hit: 1, arm: "new", message: 1 };
  const pinned = Number(new URLSearchParams(window.location.search).get("paywallHit"));
  if (isPaywallHit(pinned)) return { hit: pinned, arm: "new", message: pinned };
  const rec = load() ?? { test: PAYWALL_TEST_ID, variant: paywallVariant() };
  const now = Date.now();
  let hits = hitsOf(rec);
  const arm: PaywallReturnArm = isPaywallReturnArm(rec.ret) ? rec.ret : Math.random() < 0.5 ? "new" : "same";
  const counted = hits === 0 || now - (rec.hitAt ?? 0) > HIT_GAP_MS;
  if (counted) hits += 1;
  if (counted || rec.ret !== arm) save({ ...rec, ret: arm, hits, ...(counted && { hitAt: now }) });
  const hit = toHit(hits);
  return { hit, arm, message: arm === "new" ? hit : 1 };
}

/** The visit number and return-message arm of this browser, to send with a checkout. */
export function paywallHitForCheckout(): PaywallHit | undefined {
  if (typeof window === "undefined") return undefined;
  const rec = load();
  return rec?.seen ? toHit(hitsOf(rec)) : undefined;
}

export function paywallReturnForCheckout(): PaywallReturnArm | undefined {
  if (typeof window === "undefined") return undefined;
  const rec = load();
  return rec?.seen && isPaywallReturnArm(rec.ret) ? rec.ret : undefined;
}

/** The variant to send with a checkout, only once this browser has seen a test paywall. */
export function paywallVariantForCheckout(): PaywallVariant | undefined {
  if (typeof window === "undefined") return undefined;
  const rec = load();
  return rec?.seen ? rec.variant : undefined;
}

/** Count one view of the test paywall (and the browser's first, once). */
export async function recordPaywallTestView(
  variant: PaywallVariant,
  hit: PaywallHit = 1,
  arm?: PaywallReturnArm,
) {
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
      body: JSON.stringify({ test: PAYWALL_TEST_ID, variant, first, hit, arm }),
      keepalive: true,
    });
  } catch {
    // Analytics must never surface errors to the user.
  }
}
