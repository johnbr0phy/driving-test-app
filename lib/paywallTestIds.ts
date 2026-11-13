// Shared by the client (lib/paywallTest.ts) and the server routes that record
// the English paywall test: no client imports here.
export const PAYWALL_TEST_ID = "paywallJohn1";
export const PAYWALL_VARIANTS = ["john", "classic"] as const;
export type PaywallVariant = (typeof PAYWALL_VARIANTS)[number];

/**
 * Which message a paywall open shows: 1 the first time a browser hits a
 * paywall, 2 the second time, 3 from the third on (lib/paywallTest.ts).
 */
export const PAYWALL_HITS = [1, 2, 3] as const;
export type PaywallHit = (typeof PAYWALL_HITS)[number];

export const isPaywallHit = (v: unknown): v is PaywallHit =>
  typeof v === "number" && (PAYWALL_HITS as readonly number[]).includes(v);

/**
 * Half of browsers get the new message on a return visit ("new"), half keep
 * the first-visit message ("same"), so the two can be compared.
 */
export const PAYWALL_RETURN_ARMS = ["new", "same"] as const;
export type PaywallReturnArm = (typeof PAYWALL_RETURN_ARMS)[number];

export const isPaywallReturnArm = (v: unknown): v is PaywallReturnArm =>
  typeof v === "string" && (PAYWALL_RETURN_ARMS as readonly string[]).includes(v);

export const isPaywallVariant = (v: unknown): v is PaywallVariant =>
  typeof v === "string" && (PAYWALL_VARIANTS as readonly string[]).includes(v);
