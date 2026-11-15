import { FieldPath, type Firestore } from "firebase-admin/firestore";
import { ALL_EXAMS, EXAMS, examEnglishName, examLandingPath } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { TEST_GROUPS, getCatalogEntry } from "@/lib/testCatalog";
import { landingFromKey } from "@/lib/funnelLanding";
import { paymentNetUsdCents } from "@/lib/pricing";
import launchDates from "@/lib/examLaunchDates.json";
import {
  NEW_TEST_WINDOW_DAYS,
  dayMinus,
  daysLive,
  groups,
  onTestPages,
  shares,
  testPages,
  trafficCounts,
  type GroupRow,
  type NewTestRow,
  type TestPages,
  type Traffic,
} from "@/lib/newTests";

// Data for the /admin New tests tab: are the tests launched in the last 90
// days (lib/examLaunchDates.json) bringing new people in, what kind works
// best and where their visitors come from. First visits by landing page,
// source and country come from funnelLandings/{day} (source and country
// since 2026-11-16), signups from signupOrigins (first visit's landing and
// source), purchases from payments.exam. Internal accounts are dropped.

export const SOURCES_SINCE = "2026-11-16";

export interface NewTestsPayload {
  generatedAt: string;
  windowDays: number;
  launched30d: number;
  launched7d: number;
  /** First visits in the last 7 days to new tests, and to the whole site. */
  visitors7d: number;
  allVisitors7d: number;
  signups30d: number;
  allSignups30d: number;
  revenueUsdCents: number;
  traffic: Record<Traffic, number>;
  groups: GroupRow[];
  /** Last 30 days, new tests only. Visitor splits start at SOURCES_SINCE. */
  sources: { key: string; n: number; share: number }[];
  signupSources: { key: string; n: number; share: number }[];
  countries: { key: string; n: number; share: number }[];
  sourcesSince: string;
  tests: NewTestRow[];
}

type DayDoc = {
  day: string;
  visit: Record<string, number>;
  src: Record<string, Record<string, number>>;
  cty: Record<string, Record<string, number>>;
};

function pagesFor(id: string): TestPages | null {
  const v1 = ALL_EXAMS.find((e) => e.id === id);
  if (v1) {
    const family = ALL_EXAMS.filter((e) => e.id === id || e.variantOf === id);
    const landings = family.flatMap((e) => [
      examLandingPath(e),
      ...Object.values(e.translations ?? {}).map((t) => t?.landingPath ?? ""),
    ]);
    return testPages(landings, v1.slug, v1.slug.slice(1));
  }
  const v2 = EXAMS_V2.find((e) => e.id === id);
  if (v2) return testPages([v2.landingPath], v2.slug, v2.slug.slice(1));
  return null;
}

function groupOf(id: string): string {
  return TEST_GROUPS.find((g) => g.tests.some((t) => t.id === id))?.title ?? "Other exams";
}

const add = (into: Record<string, number>, from: Record<string, number> | undefined) => {
  for (const [k, n] of Object.entries(from ?? {})) if (typeof n === "number") into[k] = (into[k] ?? 0) + n;
};

export async function buildNewTestsAdmin(db: Firestore, internalUids: Set<string>, now = new Date()): Promise<NewTestsPayload> {
  const today = now.toISOString().slice(0, 10);
  const windowStart = dayMinus(today, NEW_TEST_WINDOW_DAYS);
  const since7 = dayMinus(today, 6);
  const since30 = dayMinus(today, 29);

  // Base exams only: state versions count in their family.
  const baseIds = new Set<string>([...EXAMS.map((e) => e.id), ...EXAMS_V2.map((e) => e.id)]);
  const launched = Object.entries(launchDates as Record<string, string>)
    .filter(([id, day]) => baseIds.has(id) && day >= windowStart && day <= today)
    .map(([id, day]) => ({ id, day, pages: pagesFor(id) }))
    .filter((t): t is { id: string; day: string; pages: TestPages } => !!t.pages);

  const [landingSnap, originsSnap, paymentsSnap] = await Promise.all([
    db.collection("funnelLandings").where(FieldPath.documentId(), ">=", windowStart).get(),
    db.collection("signupOrigins").where("at", ">=", windowStart).get(),
    db.collection("payments").where("createdAt", ">=", windowStart).get(),
  ]);

  const days: DayDoc[] = landingSnap.docs.map((d) => ({
    day: d.id,
    visit: (d.get("visit") ?? {}) as DayDoc["visit"],
    src: (d.get("src") ?? {}) as DayDoc["src"],
    cty: (d.get("cty") ?? {}) as DayDoc["cty"],
  }));
  let allVisitors7d = 0;
  for (const d of days) if (d.day >= since7) for (const n of Object.values(d.visit)) if (typeof n === "number") allVisitors7d += n;

  // Which test each landing key belongs to, worked out once per key.
  const ownerCache = new Map<string, { id: string; day: string } | null>();
  const ownerOf = (path: string | undefined | null) => {
    if (!path) return null;
    if (!ownerCache.has(path)) {
      const t = launched.find((l) => onTestPages(path, l.pages));
      ownerCache.set(path, t ? { id: t.id, day: t.day } : null);
    }
    return ownerCache.get(path)!;
  };

  const visits = new Map<string, { all: number; d7: number; src: Record<string, number> }>();
  const sources: Record<string, number> = {};
  const countries: Record<string, number> = {};
  for (const d of days) {
    for (const [k, n] of Object.entries(d.visit)) {
      const owner = ownerOf(landingFromKey(k));
      if (!owner || d.day < owner.day || typeof n !== "number") continue;
      const v = visits.get(owner.id) ?? { all: 0, d7: 0, src: {} };
      v.all += n;
      if (d.day >= since7) v.d7 += n;
      add(v.src, d.src[k]);
      visits.set(owner.id, v);
      if (d.day >= since30) {
        add(sources, d.src[k]);
        add(countries, d.cty[k]);
      }
    }
  }

  const origins = originsSnap.docs
    .filter((d) => !internalUids.has(d.id))
    .map((d) => ({
      at: String(d.get("at") ?? "").slice(0, 10),
      owner: ownerOf(d.get("landing") as string | undefined),
      source: (d.get("source") as string | undefined) ?? "unknown",
    }));
  const allSignups30d = origins.filter((o) => o.at >= since30).length;
  const signupsBy = new Map<string, number>();
  const signupSources: Record<string, number> = {};
  for (const o of origins) {
    if (!o.owner || o.at < o.owner.day) continue;
    signupsBy.set(o.owner.id, (signupsBy.get(o.owner.id) ?? 0) + 1);
    if (o.at >= since30) signupSources[o.source] = (signupSources[o.source] ?? 0) + 1;
  }
  const signups30d = Object.values(signupSources).reduce((s, n) => s + n, 0);

  const revenue = new Map<string, number>();
  const launchOf = new Map(launched.map((l) => [l.id, l.day]));
  for (const doc of paymentsSnap.docs) {
    const p = doc.data();
    if (internalUids.has(String(p.userId ?? "")) || p.status === "refunded" || typeof p.exam !== "string") continue;
    const day = launchOf.get(p.exam);
    if (!day || String(p.createdAt ?? "").slice(0, 10) < day) continue;
    revenue.set(p.exam, (revenue.get(p.exam) ?? 0) + paymentNetUsdCents(p, typeof p.refundedCents === "number" ? p.refundedCents : 0));
  }

  const tests: NewTestRow[] = launched
    .map(({ id, day }) => {
      const v = visits.get(id) ?? { all: 0, d7: 0, src: {} };
      const live = daysLive(day, today);
      const entry = getCatalogEntry(id);
      const v1 = ALL_EXAMS.find((e) => e.id === id);
      return {
        id,
        name: entry?.name ?? (v1 ? examEnglishName(v1).name : id),
        href: entry?.href ?? "/",
        group: groupOf(id),
        launched: day,
        daysLive: live,
        visitors: v.all,
        visitors7d: v.d7,
        perDay: v.all / live,
        signups: signupsBy.get(id) ?? 0,
        revenueUsdCents: revenue.get(id) ?? 0,
        topSource: shares(v.src)[0]?.key ?? null,
      };
    })
    .sort((a, b) => b.perDay - a.perDay || b.launched.localeCompare(a.launched));

  return {
    generatedAt: now.toISOString(),
    windowDays: NEW_TEST_WINDOW_DAYS,
    launched30d: tests.filter((t) => t.launched >= since30).length,
    launched7d: tests.filter((t) => t.launched >= since7).length,
    visitors7d: tests.reduce((s, t) => s + t.visitors7d, 0),
    allVisitors7d,
    signups30d,
    allSignups30d,
    revenueUsdCents: tests.reduce((s, t) => s + t.revenueUsdCents, 0),
    traffic: trafficCounts(tests),
    groups: groups(tests),
    sources: shares(sources),
    signupSources: shares(signupSources),
    countries: shares(countries),
    sourcesSince: SOURCES_SINCE,
    tests,
  };
}
