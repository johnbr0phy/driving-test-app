// ─── Funnel by landing page ──────────────────────────────────────────────────
// The visit and answered funnel steps (lib/funnel.ts) are also counted by the
// browser's first landing path, one doc per UTC day in funnelLandings/{day},
// so /admin can show which landing pages turn visitors into a first answer.
// Pure: imported by the analytics route, the admin metrics route and tests.

/** Path families with one page per code or id, counted as one row. */
const COLLAPSE: [RegExp, string][] = [
  [/^\/q\/[^/]+/, "/q/*"],
  [/^\/c\/[^/]+/, "/c/*"],
  [/^\/teach\/classes\/[^/]+/, "/teach/classes/*"],
];

/**
 * A landing path cut to the page people arrived on: lowercase, no query or
 * trailing slash, class and quiz codes folded together. Null when the path is
 * not one we would show (empty, too long, odd characters).
 */
export function normalizeLanding(path: unknown): string | null {
  if (typeof path !== "string") return null;
  let p = path.split(/[?#]/)[0].toLowerCase();
  if (p.length > 1) p = p.replace(/\/+$/, "");
  if (!/^\/[\w\-/.]{0,119}$/.test(p)) return null;
  for (const [re, label] of COLLAPSE) if (re.test(p)) return label;
  return p;
}

/** Firestore map keys: no dots and no slashes. */
export function landingKey(path: string): string {
  return path.replace(/\//g, "|").replace(/\./g, "~");
}

export function landingFromKey(key: string): string {
  return key.replace(/\|/g, "/").replace(/~/g, ".");
}

export type LandingRow = { landing: string; visits: number; answered: number };

/**
 * Sum per-day docs ({ visit: {key: n}, answered: {key: n} }) into rows, the
 * busiest first. Rows under minVisits are dropped (a rate on 3 visits says
 * nothing); `answered` can exceed visits on a short window, since a browser
 * can visit one day and answer the next.
 */
export function sumLandingDays(
  days: { visit?: Record<string, number>; answered?: Record<string, number> }[],
  minVisits = 1,
  limit = 150,
): LandingRow[] {
  const visits = new Map<string, number>();
  const answered = new Map<string, number>();
  for (const d of days) {
    for (const [k, n] of Object.entries(d.visit || {})) if (typeof n === "number") visits.set(k, (visits.get(k) || 0) + n);
    for (const [k, n] of Object.entries(d.answered || {})) if (typeof n === "number") answered.set(k, (answered.get(k) || 0) + n);
  }
  return [...visits.entries()]
    .filter(([, v]) => v >= minVisits)
    .map(([k, v]) => ({ landing: landingFromKey(k), visits: v, answered: answered.get(k) || 0 }))
    .sort((a, b) => b.visits - a.visits || a.landing.localeCompare(b.landing))
    .slice(0, limit);
}
