// States covered by the Korean SEO pages. Scoped to the states with the
// largest Korean-speaking populations rather than all 50, mirroring how the
// Vietnamese pages are scoped. Korean SEO pages, hreflang alternates, and
// sitemap entries are intentionally limited to these states.
export const KO_STATE_CODES = [
  "CA",
  "NY",
  "NJ",
  "VA",
  "WA",
  "GA",
  "IL",
  "MD",
  "TX",
  "PA",
] as const;

export function isKoState(stateCode: string): boolean {
  return (KO_STATE_CODES as readonly string[]).includes(stateCode);
}
