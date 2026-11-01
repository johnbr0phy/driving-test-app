// Premium's price in the buyer's own currency. One table, read by the paywall
// (through /api/price and hooks/usePremiumPrice.ts) and by the Stripe checkout
// route, both from Vercel's x-vercel-ip-country header, so the price a person
// sees is the price they are charged. A country missing here pays US dollars.
//
// Prices are hand-set "local" numbers, not live conversions: about $10 where
// that is a normal price, about $5 where $10 is a lot of money (marked "ppp").
// Change a number here and both the paywall and checkout follow. Only currencies
// the Stripe account accepts (a US account takes no Ghanaian cedi, for one).

export interface PremiumPrice {
  /** ISO 4217, lowercase, as Stripe takes it. */
  currency: string;
  /** In whole units of the currency (9.99, 499, 13000). */
  amount: number;
}

export const USD_PRICE: PremiumPrice = { currency: "usd", amount: 9.99 };

/** Price by currency. */
const PRICES: Record<string, number> = {
  usd: 9.99,
  gbp: 7.99,
  eur: 8.99,
  cad: 12.99,
  aud: 14.99,
  nzd: 16.99,
  chf: 8.99,
  sek: 99,
  nok: 99,
  dkk: 69,
  pln: 39.99,
  czk: 229,
  huf: 3490,
  ron: 44.99,
  jpy: 1500,
  krw: 13000,
  sgd: 12.99,
  hkd: 78,
  twd: 299,
  aed: 36.99,
  sar: 37.99,
  qar: 36.99,
  ils: 36.99,
  mxn: 179,
  brl: 49.9,
  // ppp: priced at about $5.
  inr: 499,
  php: 299,
  myr: 24.9,
  zar: 99,
  ngn: 7500,
  kes: 650,
  pkr: 1400,
  idr: 79000,
  thb: 179,
  vnd: 129000,
  egp: 249,
  bdt: 599,
  lkr: 1500,
  try: 199,
};

const EURO = ["AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK", "AD", "MC", "SM", "VA", "ME", "XK"];

/** Country (ISO 3166-1 alpha-2) to currency. */
const CURRENCY_BY_COUNTRY: Record<string, string> = {
  ...Object.fromEntries(EURO.map((c) => [c, "eur"])),
  US: "usd", PR: "usd", GU: "usd", VI: "usd", AS: "usd", MP: "usd",
  GB: "gbp", IM: "gbp", JE: "gbp", GG: "gbp",
  CA: "cad", AU: "aud", NZ: "nzd", CH: "chf", LI: "chf",
  SE: "sek", NO: "nok", DK: "dkk", FO: "dkk", GL: "dkk",
  PL: "pln", CZ: "czk", HU: "huf", RO: "ron",
  JP: "jpy", KR: "krw", SG: "sgd", HK: "hkd", TW: "twd",
  AE: "aed", SA: "sar", QA: "qar", IL: "ils",
  MX: "mxn", BR: "brl",
  IN: "inr", PH: "php", MY: "myr", ZA: "zar", NG: "ngn", KE: "kes", PK: "pkr",
  ID: "idr", TH: "thb", VN: "vnd", EG: "egp", BD: "bdt", LK: "lkr", TR: "try",
};

/** Currencies Stripe counts in whole units (no cents). */
const ZERO_DECIMAL = new Set(["jpy", "krw", "vnd"]);

export function premiumPriceFor(country: string | null | undefined): PremiumPrice {
  const currency = country ? CURRENCY_BY_COUNTRY[country.toUpperCase()] : undefined;
  const amount = currency ? PRICES[currency] : undefined;
  return currency && amount !== undefined ? { currency, amount } : USD_PRICE;
}

/** The amount in Stripe's smallest unit (cents, or whole yen). */
export function stripeUnitAmount(price: PremiumPrice): number {
  return ZERO_DECIMAL.has(price.currency) ? Math.round(price.amount) : Math.round(price.amount * 100);
}

/**
 * "$9.99", "£7.99", "₹499", "CA$12.99", "kr 99": the local symbol, except
 * where it would be a bare "$" for a currency that is not the US dollar.
 * Always en-US number style, so a US reader of a Spanish page still sees $9.99.
 */
export function formatPrice(price: PremiumPrice): string {
  const whole = Number.isInteger(price.amount);
  const code = price.currency.toUpperCase();
  const format = (currencyDisplay: "symbol" | "narrowSymbol") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      currencyDisplay,
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: whole ? 0 : 2,
    }).format(price.amount);
  try {
    if (code === "SGD") return format("narrowSymbol").replace("$", "S$");
    const narrow = format("narrowSymbol");
    return narrow.startsWith("$") && code !== "USD" ? format("symbol") : narrow;
  } catch {
    return `${price.amount} ${code}`;
  }
}

/**
 * A payment's net revenue in US cents for /admin. Non-dollar payments carry
 * `amountUsdCents` (what Stripe settled in dollars, stored by the webhook);
 * a refund is taken off in the same proportion. A non-dollar payment without
 * it (should not happen) counts at the US list price.
 */
export function paymentNetUsdCents(
  p: { amount?: unknown; currency?: unknown; amountUsdCents?: unknown },
  refundedInCurrency: number,
): number {
  const amount = typeof p.amount === "number" ? p.amount : 0;
  const currency = typeof p.currency === "string" ? p.currency.toLowerCase() : "usd";
  const net = Math.max(0, amount - refundedInCurrency);
  if (currency === "usd") return net;
  const usd = typeof p.amountUsdCents === "number" ? p.amountUsdCents : stripeUnitAmount(USD_PRICE);
  return amount > 0 ? Math.round((usd * net) / amount) : 0;
}
