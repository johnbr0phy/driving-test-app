// The build queue's score for a live test (scripts/build-queue.ts), kept pure so
// tests/build-queue-score.test.cjs can pin it without Firestore.
import { paymentNetUsdCents, stripeUnitAmount, USD_PRICE } from "@/lib/pricing";

/**
 * Purchases count from this day: Premium became sellable on non-DMV exams on
 * Nov 10 2026, and purchases before it are almost all DMV.
 */
export const PURCHASES_SINCE = "2026-11-10";
/** Purchases older than this many days drop out too, once that is later than PURCHASES_SINCE. */
export const PURCHASE_WINDOW_DAYS = 60;

/**
 * perTrend scores a candidate's Google Trends interest (backlog `trends`, "cna
 * practice test" = 100): OSHA 30 at 662 adds about 130, like three sold tests;
 * a term at 10 adds 2.
 */
export const WEIGHTS = { per100Answers: 1, perPaywallView: 1, perPurchase: 40, perSearch: 15, perTrend: 0.2 };

/** First day (YYYY-MM-DD) of the purchase window ending `today`. */
export function purchaseWindowStart(today: Date = new Date()): string {
  const rolling = new Date(today.getTime() - PURCHASE_WINDOW_DAYS * 86400000).toISOString().slice(0, 10);
  return rolling > PURCHASES_SINCE ? rolling : PURCHASES_SINCE;
}

export interface PaymentLike {
  status?: unknown;
  createdAt?: unknown;
  amount?: unknown;
  currency?: unknown;
  amountUsdCents?: unknown;
  refundedCents?: unknown;
}

/**
 * One purchase's weight: what it brought in dollars over the US list price, so
 * a US $9.99 sale is 1.0 and a $5 sale about 0.5. Uses what Stripe settled
 * (`paymentNetUsdCents`), net of any partial refund. 0 outside the window or
 * when not a counted sale.
 */
export function purchaseWeight(p: PaymentLike, windowStart: string): number {
  if (p.status !== "succeeded") return 0;
  if (typeof p.createdAt !== "string" || p.createdAt.slice(0, 10) < windowStart) return 0;
  const refunded = typeof p.refundedCents === "number" ? p.refundedCents : 0;
  return paymentNetUsdCents(p, refunded) / stripeUnitAmount(USD_PRICE);
}

/** answers / 100 + paywall views + price-weighted purchases x 40. */
export function liveScore(r: { answers: number; views: number; purchases: number }): number {
  return Math.round(
    (r.answers / 100) * WEIGHTS.per100Answers + r.views * WEIGHTS.perPaywallView + r.purchases * WEIGHTS.perPurchase,
  );
}
