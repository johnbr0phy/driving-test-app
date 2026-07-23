// States whose DMV offers the real knowledge test in Vietnamese.
// Vietnamese SEO pages, hreflang alternates, and sitemap entries are
// intentionally limited to these states.
export const VI_STATE_CODES = [
  "CA",
  "WA",
  "OR",
  "AZ",
  "VA",
  "GA",
  "MA",
  "PA",
  "MN",
  "MD",
] as const;

export function isViState(stateCode: string): boolean {
  return (VI_STATE_CODES as readonly string[]).includes(stateCode);
}
