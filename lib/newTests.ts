// ─── New tests: are the launches bringing people in? ─────────────────────────
// Pure rules for the /admin New tests tab (lib/server/newTestsAdmin.ts reads
// the data). A test's "pages" are every URL that belongs to it: its landing
// (and translated landings, state landings under it), its app routes and its
// /questions topic pages. A first visit or signup whose first landing was one
// of those pages is credited to that test, so a test is judged on the new
// people it brought to Tigertest. Pinned by tests/new-tests.test.cjs.

export const DAY_MS = 86_400_000;
/** The tab lists this many tests, newest launch first. */
export const RECENT_TESTS = 50;

export type TestPages = { exact: string[]; prefixes: string[] };

/** Pages of one test, from its landing paths and app slug (both "/x" paths). */
export function testPages(landings: string[], slug: string | null, topicSlug: string | null): TestPages {
  const exact = new Set<string>();
  const prefixes = new Set<string>();
  const add = (p: string | null | undefined) => {
    if (!p || !p.startsWith("/") || p === "/") return;
    const path = p.toLowerCase().replace(/\/+$/, "");
    exact.add(path);
    prefixes.add(`${path}/`);
  };
  landings.forEach(add);
  add(slug);
  if (topicSlug) prefixes.add(`/questions/${topicSlug.toLowerCase()}/`);
  return { exact: [...exact], prefixes: [...prefixes] };
}

export function onTestPages(path: string | null | undefined, pages: TestPages): boolean {
  if (!path) return false;
  const p = path.split(/[?#]/)[0].toLowerCase().replace(/\/+$/, "") || "/";
  return pages.exact.includes(p) || pages.prefixes.some((pre) => p.startsWith(pre));
}

/** Whole days from launch day to today, at least 1 (launch day counts as a day). */
export function daysLive(launched: string, today: string): number {
  return Math.max(1, Math.round((Date.parse(today) - Date.parse(launched)) / DAY_MS) + 1);
}

/** The UTC day N days before `today` (N = 6 gives the start of a 7-day window). */
export function dayMinus(today: string, n: number): string {
  return new Date(Date.parse(today) - n * DAY_MS).toISOString().slice(0, 10);
}

/** Sum of a {day: n} map from `since` on (inclusive). */
export function sumSince(daily: Record<string, number> | undefined, since: string): number {
  let n = 0;
  for (const [day, v] of Object.entries(daily ?? {})) if (day >= since && typeof v === "number") n += v;
  return n;
}

/** The newest launches first (ties by id), capped at RECENT_TESTS. */
export function mostRecent<T extends { id: string; day: string }>(launches: T[], limit = RECENT_TESTS): T[] {
  return [...launches].sort((a, b) => b.day.localeCompare(a.day) || a.id.localeCompare(b.id)).slice(0, limit);
}

export interface NewTestRow {
  id: string;
  name: string;
  href: string;
  launched: string;
  daysLive: number;
  /** First visits (new browsers) that landed on this test's pages, since launch. */
  visitors: number;
  /** Accounts whose first visit landed on this test's pages, since launch. */
  signups: number;
  /** Questions answered on this test since launch (analytics/questions.byExam). */
  answered: number;
  /** Premium purchases credited to this test since launch, and their net revenue. */
  sales: number;
  revenueUsdCents: number;
}
