// ─── New tests: is each launch bringing people in? ───────────────────────────
// Pure rules for the /admin New tests tab (lib/server/newTestsAdmin.ts reads
// the data). A test's "pages" are every URL that belongs to it: its landing
// (and translated landings, state landings under it), its app routes and its
// /questions topic pages. A first visit or signup whose first landing was one
// of those pages is credited to that test, so a test is judged on the new
// people it brought to Tigertest, not on people already here who tried it.
// Pinned by tests/new-tests.test.cjs.

export const DAY_MS = 86_400_000;
/** Tests launched this many days ago or less are listed. */
export const NEW_TEST_WINDOW_DAYS = 90;

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

/** Monday of the UTC week a day falls in. */
export function weekOf(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  const back = (d.getUTCDay() + 6) % 7;
  return new Date(d.getTime() - back * DAY_MS).toISOString().slice(0, 10);
}

export interface NewTestRow {
  id: string;
  name: string;
  href: string;
  group: string;
  region: string;
  launched: string;
  daysLive: number;
  /** First visits (new browsers) that landed on this test's pages, since launch. */
  visitors: number;
  visitors7d: number;
  /** Of those, how many answered a first question (any test). */
  firstAnswers: number;
  /** Questions answered on this test since launch, by anyone. */
  answers: number;
  answers7d: number;
  /** Distinct people who answered at least one of its questions. */
  learners: number;
  learners7d: number;
  /** Accounts whose first visit landed on this test's pages. */
  signups: number;
  signups7d: number;
  purchases: number;
  revenueUsdCents: number;
  /** visitors / daysLive: compares a 3-day-old test with a 60-day-old one. */
  visitorsPerDay: number;
}

export interface CohortRow {
  /** Monday of the launch week. */
  week: string;
  tests: number;
  visitors: number;
  signups: number;
  purchases: number;
  revenueUsdCents: number;
  /** Visitors per test per day live, averaged over the week's tests. */
  visitorsPerTestDay: number;
}

export interface GroupRow {
  group: string;
  tests: number;
  visitors7d: number;
  signups: number;
  purchases: number;
  revenueUsdCents: number;
  visitorsPerTestDay: number;
  /** The group's best test by visitors per day. */
  best: { id: string; name: string } | null;
}

const perTestDay = (rows: NewTestRow[]) =>
  rows.length ? rows.reduce((s, r) => s + r.visitorsPerDay, 0) / rows.length : 0;

export function cohorts(rows: NewTestRow[]): CohortRow[] {
  const byWeek = new Map<string, NewTestRow[]>();
  for (const r of rows) {
    const w = weekOf(r.launched);
    byWeek.set(w, [...(byWeek.get(w) ?? []), r]);
  }
  return [...byWeek.entries()]
    .map(([week, rs]) => ({
      week,
      tests: rs.length,
      visitors: rs.reduce((s, r) => s + r.visitors, 0),
      signups: rs.reduce((s, r) => s + r.signups, 0),
      purchases: rs.reduce((s, r) => s + r.purchases, 0),
      revenueUsdCents: rs.reduce((s, r) => s + r.revenueUsdCents, 0),
      visitorsPerTestDay: perTestDay(rs),
    }))
    .sort((a, b) => b.week.localeCompare(a.week));
}

export function groups(rows: NewTestRow[]): GroupRow[] {
  const byGroup = new Map<string, NewTestRow[]>();
  for (const r of rows) byGroup.set(r.group, [...(byGroup.get(r.group) ?? []), r]);
  return [...byGroup.entries()]
    .map(([group, rs]) => {
      const best = [...rs].sort((a, b) => b.visitorsPerDay - a.visitorsPerDay)[0];
      return {
        group,
        tests: rs.length,
        visitors7d: rs.reduce((s, r) => s + r.visitors7d, 0),
        signups: rs.reduce((s, r) => s + r.signups, 0),
        purchases: rs.reduce((s, r) => s + r.purchases, 0),
        revenueUsdCents: rs.reduce((s, r) => s + r.revenueUsdCents, 0),
        visitorsPerTestDay: perTestDay(rs),
        best: best && best.visitors > 0 ? { id: best.id, name: best.name } : null,
      };
    })
    .sort((a, b) => b.visitorsPerTestDay - a.visitorsPerTestDay || b.tests - a.tests);
}
