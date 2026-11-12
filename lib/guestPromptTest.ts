// The in-training sign-up step's message test (components/GuestPromptStep,
// hooks/useGuestPrompt). English readers see a different one of ten designs
// each time the step comes up, in an order shuffled once per browser, so every
// design is equally likely at every showing (the first showing on its own is
// a clean 10-way A/B test). Each showing, button tap and finished sign-up is
// counted per design in analytics/guestPromptTest through
// /api/analytics/guest-prompt; the Conversion tab on /admin compares them.
// Other languages keep the single translated design and are not in the test.

import { isInternalBrowser } from "@/lib/internal";

export const GUEST_PROMPT_TEST_ID = "guestPrompt10";

export const GUEST_PROMPT_VARIANTS = ["v01", "v02", "v03", "v04", "v05", "v06", "v07", "v08", "v09", "v10"] as const;
export type GuestPromptVariant = (typeof GUEST_PROMPT_VARIANTS)[number];

/** What each design tries, for the admin table. v01 is the control. */
export const GUEST_PROMPT_VARIANT_NAMES: Record<GuestPromptVariant, string> = {
  v01: "Streak card (control): \"You're on a roll. Don't lose it.\"",
  v02: "Big number: your N answers could vanish",
  v03: "One tap: a single big Google button",
  v04: "Pass first time: practice that counts",
  v05: "Note from John, with his face",
  v06: "Your missed questions, saved (stats preview)",
  v07: "Start here, finish on your phone",
  v08: "Guest vs free account table",
  v09: "Compact: one line, Save or Not now",
  v10: "Celebration: claim your streak",
};

export const GUEST_PROMPT_ACTIONS = ["shown", "skipped", "google", "email", "signup"] as const;
export type GuestPromptAction = (typeof GUEST_PROMPT_ACTIONS)[number];

export function isGuestPromptVariant(v: unknown): v is GuestPromptVariant {
  return typeof v === "string" && (GUEST_PROMPT_VARIANTS as readonly string[]).includes(v);
}

export function isGuestPromptAction(a: unknown): a is GuestPromptAction {
  return typeof a === "string" && (GUEST_PROMPT_ACTIONS as readonly string[]).includes(a);
}

/** A Fisher-Yates shuffle of the ten designs, random source injectable for tests. */
export function shuffledVariants(random: () => number = Math.random): GuestPromptVariant[] {
  const order = [...GUEST_PROMPT_VARIANTS];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// ── Browser side ────────────────────────────────────────────────────────────

const ORDER_KEY = "tigertest-guest-prompt-test";
const TAP_KEY = "tigertest-guest-prompt-tap";
/** A sign-up within this long of tapping a design's button is credited to it. */
const TAP_WINDOW_MS = 60 * 60_000;

type Stored = { test: string; order: GuestPromptVariant[]; next: number };

function readOrder(): Stored | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(ORDER_KEY) ?? "null");
    if (
      parsed?.test === GUEST_PROMPT_TEST_ID &&
      Array.isArray(parsed.order) &&
      parsed.order.length === GUEST_PROMPT_VARIANTS.length &&
      parsed.order.every(isGuestPromptVariant) &&
      Number.isInteger(parsed.next)
    ) {
      return parsed as Stored;
    }
  } catch {
    // Unreadable: start a new order.
  }
  return null;
}

/**
 * The design for this showing and its position (1 for this browser's first
 * showing), moving the browser on to the next design. `?guestPrompt=v05` pins
 * one, for previews.
 */
export function takeGuestPromptVariant(): { variant: GuestPromptVariant; position: number } {
  try {
    const pinned = new URLSearchParams(window.location.search).get("guestPrompt");
    if (isGuestPromptVariant(pinned)) return { variant: pinned, position: 0 };
  } catch {
    // No URL: carry on.
  }
  const stored = readOrder() ?? { test: GUEST_PROMPT_TEST_ID, order: shuffledVariants(), next: 0 };
  const variant = stored.order[stored.next % stored.order.length];
  const position = stored.next + 1;
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify({ ...stored, next: stored.next + 1 }));
  } catch {
    // Storage blocked: this browser sees the first design of a new order each time.
  }
  return { variant, position };
}

/** Counts one action for a design (not from test, internal or declined browsers). */
export async function trackGuestPromptTest(action: GuestPromptAction, variant: GuestPromptVariant, position: number) {
  if (position === 0) return; // a pinned preview
  if (isInternalBrowser()) return;
  if (action === "google" || action === "email") {
    try {
      localStorage.setItem(TAP_KEY, JSON.stringify({ variant, position, at: Date.now() }));
    } catch {
      // Without storage the sign-up can't be credited; the tap still counts.
    }
  }
  try {
    await fetch("/api/analytics/guest-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: GUEST_PROMPT_TEST_ID, action, variant, position }),
      keepalive: true,
    });
  } catch {
    // Analytics never surfaces errors.
  }
}

/** Called when a new account is made: credits it to the design tapped in the last hour. */
export function creditGuestPromptSignup() {
  if (typeof window === "undefined") return;
  try {
    const tap = JSON.parse(localStorage.getItem(TAP_KEY) ?? "null");
    localStorage.removeItem(TAP_KEY);
    if (!tap || !isGuestPromptVariant(tap.variant) || Date.now() - Number(tap.at) > TAP_WINDOW_MS) return;
    void trackGuestPromptTest("signup", tap.variant, Number(tap.position) || 1);
  } catch {
    // Nothing to credit.
  }
}

// ── Admin maths ─────────────────────────────────────────────────────────────

export type GuestPromptCounts = Partial<Record<GuestPromptAction, number>>;

/** Two-sided p-value for two proportions (pooled z test); 1 when either side is empty. */
export function twoProportionP(x1: number, n1: number, x2: number, n2: number): number {
  if (!n1 || !n2) return 1;
  const p = (x1 + x2) / (n1 + n2);
  const se = Math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2));
  if (!se) return 1;
  const z = Math.abs(x1 / n1 - x2 / n2) / se;
  // Normal tail via the Abramowitz-Stegun erfc approximation.
  const t = 1 / (1 + 0.3275911 * (z / Math.SQRT2));
  const erfc =
    t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-(z * z) / 2);
  return Math.min(1, Math.max(0, erfc));
}
