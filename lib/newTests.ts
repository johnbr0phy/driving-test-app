// ─── New tests: are the launches bringing people in? ─────────────────────────
// Pure rules for the /admin New tests tab (lib/server/newTestsAdmin.ts reads
// the data). A test's "pages" are every URL that belongs to it: its landing
// (and translated landings, state landings under it), its app routes and its
// /questions topic pages. A first visit or signup whose first landing was one
// of those pages is credited to that test, so a test is judged on the new
// people it brought to Tigertest. Pinned by tests/new-tests.test.cjs.

export const DAY_MS = 86_400_000;
/** Tests launched this many days ago or less are listed. */
export const NEW_TEST_WINDOW_DAYS = 90;
/** A test needs this many days live before it is judged on traffic. */
export const JUDGE_AFTER_DAYS = 7;
/** Visitors a day at or above this count as "getting traffic". */
export const STEADY_PER_DAY = 1;

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

export interface NewTestRow {
  id: string;
  name: string;
  href: string;
  group: string;
  launched: string;
  daysLive: number;
  /** First visits (new browsers) that landed on this test's pages, since launch. */
  visitors: number;
  visitors7d: number;
  /** visitors / daysLive: compares a 3-day-old test with a 60-day-old one. */
  perDay: number;
  /** Accounts whose first visit landed on this test's pages. */
  signups: number;
  revenueUsdCents: number;
  /** Where most of its visitors came from (since source tracking began). */
  topSource: string | null;
}

export type Traffic = "steady" | "trickle" | "none" | "tooNew";

export function trafficOf(r: Pick<NewTestRow, "daysLive" | "visitors" | "perDay">): Traffic {
  if (r.daysLive < JUDGE_AFTER_DAYS) return "tooNew";
  if (r.visitors === 0) return "none";
  return r.perDay >= STEADY_PER_DAY ? "steady" : "trickle";
}

export function trafficCounts(rows: NewTestRow[]): Record<Traffic, number> {
  const out: Record<Traffic, number> = { steady: 0, trickle: 0, none: 0, tooNew: 0 };
  for (const r of rows) out[trafficOf(r)]++;
  return out;
}

export interface GroupRow {
  group: string;
  tests: number;
  /** Visitors per test per day live, averaged over the group's tests. */
  perTestDay: number;
  signups: number;
  best: string | null;
}

export function groups(rows: NewTestRow[]): GroupRow[] {
  const byGroup = new Map<string, NewTestRow[]>();
  for (const r of rows) byGroup.set(r.group, [...(byGroup.get(r.group) ?? []), r]);
  return [...byGroup.entries()]
    .map(([group, rs]) => {
      const best = [...rs].sort((a, b) => b.perDay - a.perDay)[0];
      return {
        group,
        tests: rs.length,
        perTestDay: rs.reduce((s, r) => s + r.perDay, 0) / rs.length,
        signups: rs.reduce((s, r) => s + r.signups, 0),
        best: best && best.visitors > 0 ? best.name : null,
      };
    })
    .sort((a, b) => b.perTestDay - a.perTestDay || b.tests - a.tests);
}

/** A count map into rows, biggest first, each with its share of the total. */
export function shares(counts: Record<string, number>): { key: string; n: number; share: number }[] {
  const total = Object.values(counts).reduce((s, n) => s + n, 0);
  return Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([key, n]) => ({ key, n, share: total ? n / total : 0 }))
    .sort((a, b) => b.n - a.n);
}
