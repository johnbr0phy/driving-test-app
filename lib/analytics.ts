import { auth } from "@/lib/firebase";
import { DMV_ANALYTICS_KEY, type ExamAnalyticsKey } from "@/lib/exams";
import { getBrowserId, trackEnrollment } from "@/lib/enrollment";
import { trackFunnelStep } from "@/lib/funnel";
import { isInternalBrowser } from "@/lib/internal";
import { knownPremiumPrice } from "@/lib/localPrice";
import { USD_PRICE } from "@/lib/pricing";

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
  if (isInternalBrowser(auth.currentUser?.email)) return;
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const user = auth.currentUser;
    if (user) {
      try {
        headers.Authorization = `Bearer ${await user.getIdToken()}`;
      } catch {
        // Not signed in or token refresh failed; record as an anonymous hit.
      }
    }
    await fetch("/api/analytics/paywall", {
      method: "POST",
      headers,
      body: JSON.stringify({ itemId, itemName, location }),
      keepalive: true,
    });
  } catch {
    // Analytics must never surface errors to the user.
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
    if (user && reportLearner) {
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
  window.gtag?.("event", "purchase", {
    transaction_id: transactionId,
    ...premiumValue(),
  });
}

// The in-training sign-up prompt (components/GuestPromptStep): shown, skipped,
// or one of its buttons tapped. where: "training" (v1 exam sets) | "drill" (v2).
/** A DMV state set on the dashboard: from its picker, or from a state landing's ?state= link. */
export function trackStateSelected(state: string, via: "picker" | "link") {
  window.gtag?.("event", "state_selected", { state, via });
  if (via === "picker") trackFunnelStep("dmv_state");
}

// John's "tell a friend" ask in training (components/SharePromptStep).
export function trackSharePrompt(action: "shown" | "skipped" | "share" | "copy", where: string) {
  window.gtag?.("event", "share_prompt", { action, where });
}

export function trackGuestPrompt(action: "shown" | "skipped" | "google" | "email", where: string) {
  window.gtag?.("event", "guest_prompt", { action, where });
}
