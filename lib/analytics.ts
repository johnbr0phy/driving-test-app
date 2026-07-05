import { auth } from "@/lib/firebase";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const PREMIUM_ITEM = {
  item_id: "tigertest_premium",
  item_name: "TigerTest Premium",
  price: 9.99,
  currency: "USD",
  quantity: 1,
};

export function trackViewItem(location?: string) {
  window.gtag?.("event", "view_item", {
    currency: "USD",
    value: 9.99,
    items: [PREMIUM_ITEM],
    ...(location && { location }),
  });
}

export function trackBeginCheckout(location?: string) {
  window.gtag?.("event", "begin_checkout", {
    currency: "USD",
    value: 9.99,
    items: [PREMIUM_ITEM],
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

export function trackStatsEntry(source: string, tab: "yours" | "community" = "yours") {
  window.gtag?.("event", "stats_entry", { source, tab });
}

export function trackDailyQuizAnswer(correct: boolean, kind: "community" | "nemesis" = "community") {
  window.gtag?.("event", "daily_quiz_answer", { correct, kind });
}

export function trackPaywallDismissed(location = "dashboard") {
  window.gtag?.("event", "paywall_dismissed", { location });
}

export function trackPurchase(transactionId: string) {
  window.gtag?.("event", "purchase", {
    transaction_id: transactionId,
    currency: "USD",
    value: 9.99,
    items: [PREMIUM_ITEM],
  });
}
