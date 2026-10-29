// Shared by the client (lib/paywallTest.ts) and the server routes that record
// the English paywall test: no client imports here.
export const PAYWALL_TEST_ID = "paywallJohn1";
export const PAYWALL_VARIANTS = ["john", "classic"] as const;
export type PaywallVariant = (typeof PAYWALL_VARIANTS)[number];

export const isPaywallVariant = (v: unknown): v is PaywallVariant =>
  typeof v === "string" && (PAYWALL_VARIANTS as readonly string[]).includes(v);
