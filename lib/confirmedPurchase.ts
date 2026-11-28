"use client";

import { auth } from "@/lib/firebase";
import { checkoutAttribution } from "@/lib/funnel";
import { checkoutMeasurementAllowed } from "@/lib/checkoutEligibility";

type PurchaseReceipt = {
  transactionId: string;
  value: number;
  currency: string;
  examId?: string;
  paywallLocation?: string;
  checkoutItem?: string;
  checkoutDevice: string;
  buyerState: string;
};

const running = new Set<string>();
const sent = new Set<string>();
const RECEIPTS_KEY = "tigertest-reported-purchases";

function reported(): string[] {
  try {
    const ids = JSON.parse(localStorage.getItem(RECEIPTS_KEY) ?? "[]");
    return Array.isArray(ids) ? ids.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function allowed(originPath: string) {
  const email = auth.currentUser?.email;
  return checkoutMeasurementAllowed(originPath, email) && checkoutMeasurementAllowed(window.location.pathname, email);
}

// The root return handler survives page-specific cleanup of the success URL.
// Stripe's webhook may run after the browser returns. Retry briefly without
// blocking sign-in or Premium. Non-returning buyers remain in the payment ledger.
export async function reportConfirmedPurchase(sessionId: string) {
  if (!/^cs_[a-zA-Z0-9_]{1,240}$/.test(sessionId) || running.has(sessionId) || sent.has(sessionId)) return;
  running.add(sessionId);
  try {
    const originPath = window.location.pathname;
    for (const delay of [0, 1000, 3000, 10000]) {
      if (delay) await new Promise((resolve) => window.setTimeout(resolve, delay));
      // Consent, geolocation and gtag can finish after the return page mounts.
      // Wait locally until they are ready, including when the URL is cleaned.
      if (!allowed(originPath) || !window.gtag) continue;
      if (reported().includes(sessionId)) return;
      let res: Response;
      try {
        const token = await auth.currentUser?.getIdToken();
        res = await fetch("/api/stripe/purchase-receipt", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
          body: JSON.stringify({ sessionId }),
        });
      } catch {
        continue;
      }
      if (res.status === 202 || res.status >= 500) continue;
      if (res.status !== 200) return;
      const receipt: PurchaseReceipt = await res.json();
      if (receipt.transactionId !== sessionId || !allowed(originPath)) return;
      const first = checkoutAttribution();
      window.gtag("event", "purchase", {
        transaction_id: sessionId,
        value: receipt.value,
        currency: receipt.currency,
        items: [{ item_id: "tigertest_premium", item_name: "Tigertest Premium", price: receipt.value, currency: receipt.currency, quantity: 1 }],
        ...(receipt.examId && { exam_id: receipt.examId }),
        ...(receipt.paywallLocation && { paywall_location: receipt.paywallLocation }),
        ...(receipt.checkoutItem && { checkout_item: receipt.checkoutItem }),
        checkout_device: receipt.checkoutDevice,
        buyer_state: receipt.buyerState,
        ...(first.source && { first_source: first.source }),
        ...(first.landing && { first_landing: first.landing }),
      });
      sent.add(sessionId);
      // Reuse the ledger's transaction ID if another browser reports this payment.
      localStorage.setItem(RECEIPTS_KEY, JSON.stringify([...reported().slice(-15), sessionId]));
      return;
    }
  } catch {
    // Analytics is optional, including when storage is unavailable.
  } finally {
    running.delete(sessionId);
  }
}
