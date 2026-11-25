import { auth } from "@/lib/firebase";
import { DMV_ANALYTICS_KEY, type ExamAnalyticsKey } from "@/lib/exams";
import { getBrowserId, trackEnrollment } from "@/lib/enrollment";
import { trackFunnelStep } from "@/lib/funnel";
import { noteLandingTryPurchase } from "@/lib/landingTryTest";
import { noteRankTestPurchase } from "@/lib/dailyRankTest";
import { isInternalBrowser } from "@/lib/internal";
import { guestPaidEmail } from "@/lib/guestPaidHint";
import { knownPremiumPrice } from "@/lib/localPrice";
import { USD_PRICE } from "@/lib/pricing";
import { checkoutAttribution } from "@/lib/funnel";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// GA4 value and currency: the visitor's local price once known (lib/localPrice.ts).
function premiumValue() {
  const p = knownPremiumPrice() ?? USD_PRICE;
  const currency = p.currency.toUpperCase();
  return {
    currency,
    value: p.amount,
    items: [{ item_id: "tigertest_premium", item_name: "Tigertest Premium", price: p.amount, currency, quantity: 1 }],
  };
}

export function trackViewItem(location?: string) {
  window.gtag?.("event", "view_item", {
    ...premiumValue(),
    ...(location && { location }),
  });
}

export function trackBeginCheckout(location?: string) {
  window.gtag?.("event", "begin_checkout", {
    ...premiumValue(),
    ...(location && { location }),
  });
}

export function trackPaywallHit(itemId: string, itemName: string, location = "dashboard") {
  window.gtag?.("event", "paywall_hit", {
    item_id: itemId,
    item_name: itemName,
    location,
  });
  void recordPaywallHit(itemId, itemName, location);
}

// Persist the hit to Firestore (via API) so the admin dashboard can report
// paywall hits and per-paywall conversion. Fire-and-forget; never blocks UI.
async function recordPaywallHit(itemId: string, itemName: string, location: string) {
  try {
    // Wait for Firebase to restore a session, so a signed-in tap during page
    // load is not booked as a guest (startCheckout waits the same way).
    await auth.authStateReady();
  } catch {
    // Carry on with whatever auth knows.
  }
  if (isInternalBrowser(auth.currentUser?.email)) return;
  // A signed-out browser that already paid as a guest is told to sign in,
  // not sold to: it is not a prospect (lib/guestPaidHint.ts).
  if (!auth.currentUser && guestPaidEmail()) return;
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const user = auth.currentUser;
    // Signed in: always send the token, so the server knows who answered
    // (the 1,000,000th question, lib/server/millionth).
    if (user) {
      try {
        headers.Authorization = `Bearer ${await user.getIdToken()}`;
      } catch {
        // Not signed in or token refresh failed; record as an anonymous hit.
      }
    }
    const firsts = notePaywallDay(headers.Authorization ? "signedIn" : "guest");
    await fetch("/api/analytics/paywall", {
      method: "POST",
      headers,
      body: JSON.stringify({ itemId, itemName, location, ...firsts }),
      keepalive: true,
    });
  } catch {
    // Analytics must never surface errors to the user.
  }
}

// Whether this is the browser's first paywall hit of the UTC day, and its
// first as a guest or signed in, so /admin can count browsers as well as
// opens without storing any id (app/api/analytics/paywall).
const PAYWALL_DAY_KEY = "tigertest-paywall-day";

function notePaywallDay(state: "guest" | "signedIn"): { newBrowserToday?: true; newStateToday?: true } {
  const day = new Date().toISOString().slice(0, 10);
  try {
    const raw = JSON.parse(localStorage.getItem(PAYWALL_DAY_KEY) || "null") as { day?: string; guest?: boolean; signedIn?: boolean } | null;
    const rec = raw?.day === day ? raw : { day };
    const newBrowserToday = !rec.guest && !rec.signedIn;
    const newStateToday = !rec[state];
    if (newStateToday) localStorage.setItem(PAYWALL_DAY_KEY, JSON.stringify({ ...rec, [state]: true }));
    return { ...(newBrowserToday && { newBrowserToday: true }), ...(newStateToday && { newStateToday: true }) };
  } catch {
    // Storage blocked: count the open, not the browser.
    return {};
  }
}

// ─── Answered-question counter ───────────────────────────────────────────────
// Feeds the persistent analytics/questions aggregate (total + per-day counts,
// plus the same split per exam) behind the admin "Questions Answered" chart
// and "Questions by exam" table. Counts are batched locally and flushed after
// a short delay (or when the tab is hidden) so answering a question never
// costs a network round-trip of its own.

const pendingByExam: Record<string, number> = {};
let answerFlushTimer: ReturnType<typeof setTimeout> | null = null;

// One learner report per identity per UTC day. Later flushes still send the
// answer counts. The server arrayUnion would dedupe, this just skips the write.
const WAL_SENT_KEY = "tigertest-wal-sent";

function walAlreadySent(id: string, day: string): boolean {
  try {
    const parsed = JSON.parse(localStorage.getItem(WAL_SENT_KEY) || "null") as { id?: string; day?: string } | null;
    return parsed?.id === id && parsed?.day === day;
  } catch {
    return false;
  }
}

function markWalSent(id: string, day: string) {
  try {
    localStorage.setItem(WAL_SENT_KEY, JSON.stringify({ id, day }));
  } catch {
    // The next flush tries again.
  }
}

// examKey: a v1 analytics key, or a v2 exam id (sat, act...) from useV2Store.
export function trackQuestionsAnswered(count = 1, examKey: ExamAnalyticsKey | string = DMV_ANALYTICS_KEY) {
  if (count <= 0 || isInternalBrowser(auth.currentUser?.email)) return;
  trackFunnelStep("answered");
  trackEnrollment(examKey);
  pendingByExam[examKey] = (pendingByExam[examKey] || 0) + count;
  if (!answerFlushTimer) {
    answerFlushTimer = setTimeout(() => void flushAnsweredQuestions(), 10_000);
  }
}

async function flushAnsweredQuestions() {
  if (answerFlushTimer) {
    clearTimeout(answerFlushTimer);
    answerFlushTimer = null;
  }
  const byExam = { ...pendingByExam };
  for (const key of Object.keys(pendingByExam)) delete pendingByExam[key];
  const count = Object.values(byExam).reduce((a, b) => a + b, 0);
  if (count <= 0) return;
  const user = auth.currentUser;
  const browserId = getBrowserId();
  const day = new Date().toISOString().slice(0, 10);
  const learnerKey = user?.uid ?? browserId;
  const reportLearner = !!learnerKey && !isInternalBrowser(user?.email) && !walAlreadySent(learnerKey, day);
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    // Signed in: always send the token, so the server knows who answered
    // (the 1,000,000th question, lib/server/millionth).
    if (user) {
      try {
        headers.Authorization = `Bearer ${await user.getIdToken()}`;
      } catch {
        // Record the browser id. The server treats a missing token as logged out.
      }
    }
    const res = await fetch("/api/analytics/questions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        count,
        byExam,
        ...(reportLearner && browserId ? { browserId } : {}),
        wal: reportLearner,
      }),
      keepalive: true,
    });
    if (res.ok && reportLearner && learnerKey) {
      const body = (await res.json().catch(() => ({}))) as { learner?: boolean };
      if (body.learner) markWalSent(learnerKey, day);
    }
  } catch {
    // Re-queue so the counts ride along with the next flush.
    for (const [key, n] of Object.entries(byExam)) {
      pendingByExam[key] = (pendingByExam[key] || 0) + n;
    }
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") void flushAnsweredQuestions();
  });
}

export function trackStatsEntry(source: string, tab: "yours" | "community" = "yours") {
  window.gtag?.("event", "stats_entry", { source, tab });
}

// kind: which surface the quiz row lives on — "community" | "nemesis"
// (dashboard daily quiz) | "stats_yours" | "stats_community"
export function trackDailyQuizAnswer(correct: boolean, kind: string = "community") {
  window.gtag?.("event", "daily_quiz_answer", { correct, kind });
}

export function trackPaywallDismissed(location = "dashboard") {
  window.gtag?.("event", "paywall_dismissed", { location });
}

export function trackPurchase(transactionId: string) {
  noteLandingTryPurchase();
  noteRankTestPurchase();
  const first = checkoutAttribution();
  window.gtag?.("event", "purchase", {
    transaction_id: transactionId,
    ...(first.source && { first_source: first.source }),
    ...(first.landing && { first_landing: first.landing }),
    ...premiumValue(),
  });
}

// The in-training sign-up prompt (components/GuestPromptStep): shown, skipped,
// or one of its buttons tapped. where: "training" (v1 exam sets) | "drill" (v2).
/** A DMV state set on the dashboard: from its picker, a state landing's ?state= link, or the visitor's IP state. */
export function trackStateSelected(state: string, via: "picker" | "link" | "geo") {
  window.gtag?.("event", "state_selected", { state, via });
  if (via === "picker") trackFunnelStep("dmv_state");
}

// John's "tell a friend" ask in training (components/SharePromptStep).
export function trackSharePrompt(action: "shown" | "skipped" | "share" | "copy", where: string) {
  window.gtag?.("event", "share_prompt", { action, where });
}

// Which design of the in-training sign-up step (components/GuestPromptStep) sent
// the event, so GA4 can compare sign-up taps per showing before and after a change.
// v1: the save card plus a full-size Keep practicing button (until Nov 12 2026).
// v2: the streak card; English readers get one of ten test designs instead,
// sent as `variant` (lib/guestPromptTest).
export const GUEST_PROMPT_DESIGN = "v2";

export function trackGuestPrompt(action: "shown" | "skipped" | "google" | "email", where: string, variant?: string) {
  window.gtag?.("event", "guest_prompt", { action, where, design: GUEST_PROMPT_DESIGN, ...(variant && { variant }) });
}
