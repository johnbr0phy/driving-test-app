// States whose DMV offers the real knowledge test in Chinese (see the PR that
// added them for each state's official source). Chinese SEO pages, hreflang
// alternates, and sitemap entries are intentionally limited to these states.
// The Chinese question bank translates the universal questions plus these
// states' state-specific questions; every other row falls back to English.
export const ZH_STATE_CODES = [
  "CA",
  "NY",
  "NJ",
  "MA",
  "WA",
  "PA",
  "MD",
  "VA",
] as const;

export function isZhState(stateCode: string): boolean {
  return (ZH_STATE_CODES as readonly string[]).includes(stateCode);
}
