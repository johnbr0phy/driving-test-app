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
