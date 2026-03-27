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

function trackPaywallEvent(event: string, paywall?: string) {
  fetch("/api/analytics/paywall", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, paywall }),
  }).catch(() => {});
}

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
  trackPaywallEvent("checkout_start");
}

export function trackPaywallHit(itemId: string, itemName: string, location = "dashboard") {
  window.gtag?.("event", "paywall_hit", {
    item_id: itemId,
    item_name: itemName,
    location,
  });
  trackPaywallEvent("paywall_hit", itemId);
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
  trackPaywallEvent("purchase");
}
