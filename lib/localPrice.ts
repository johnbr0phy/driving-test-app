// The visitor's Premium price on the client: fetched once a page load from
// /api/price (lib/pricing.ts) and kept for the tab in sessionStorage. Until it
// arrives the paywall shows the US price. Read by hooks/usePremiumPrice.ts and
// by lib/analytics.ts (GA4 purchase value and currency).

import { USD_PRICE, type PremiumPrice } from "@/lib/pricing";

export const PRICE_COUNTRY_COOKIE = "tt-price-country";
const STORAGE_KEY = "tigertest-price";

let cached: PremiumPrice | null = null;
let pending: Promise<PremiumPrice> | null = null;

function isPrice(v: unknown): v is PremiumPrice {
  return !!v && typeof (v as PremiumPrice).currency === "string" && typeof (v as PremiumPrice).amount === "number";
}

/** The price if known, else null (server, or before the first fetch lands). */
export function knownPremiumPrice(): PremiumPrice | null {
  if (cached || typeof window === "undefined") return cached;
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    if (isPrice(stored)) cached = stored;
  } catch {
    // Storage blocked: fetch instead.
  }
  return cached;
}

export function loadPremiumPrice(): Promise<PremiumPrice> {
  const known = knownPremiumPrice();
  if (known && !previewCountry()) return Promise.resolve(known);
  pending ??= (async () => {
    try {
      const country = previewCountry();
      if (country) document.cookie = `${PRICE_COUNTRY_COOKIE}=${country}; path=/; max-age=86400; samesite=lax`;
      const res = await fetch("/api/price", { cache: "no-store" });
      const data = await res.json();
      cached = isPrice(data) ? { currency: data.currency, amount: data.amount } : USD_PRICE;
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
      } catch {
        // Fine: next page load fetches again.
      }
    } catch {
      cached = USD_PRICE;
    }
    return cached;
  })();
  return pending;
}

/** ?country=XX on a page, honoured by /api/price off production only. */
function previewCountry(): string | null {
  if (typeof window === "undefined") return null;
  const c = new URLSearchParams(window.location.search).get("country");
  return c && /^[A-Za-z]{2}$/.test(c) ? c.toUpperCase() : null;
}
