import { FieldPath, type Firestore } from "firebase-admin/firestore";
import { ALL_EXAMS, EXAMS, examEnglishName, examLandingPath } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { TEST_GROUPS, getCatalogEntry } from "@/lib/testCatalog";
import { regionOfTest } from "@/lib/region";
import { landingFromKey } from "@/lib/funnelLanding";
import { paymentNetUsdCents } from "@/lib/pricing";
import launchDates from "@/lib/examLaunchDates.json";
import {
  NEW_TEST_WINDOW_DAYS,
  cohorts,
  dayMinus,
  daysLive,
  groups,
  onTestPages,
  testPages,
  type CohortRow,
  type GroupRow,
  type NewTestRow,
  type TestPages,
} from "@/lib/newTests";

// Data for the /admin New tests tab: every test launched in the last 90 days
// (lib/examLaunchDates.json, kept by scripts/build-landing-dates.ts) with the
// new people it brought in. Visits and first answers come from
// funnelLandings/{day} (first visits by landing page), signups from
// signupOrigins (first visit's landing), learners from enrollments (doc
// create time), answers from analytics/questions.byExam and purchases from
// payments.exam. Internal accounts are dropped like every admin tab.

export interface NewTestsPayload {
  generatedAt: string;
  today: string;
  windowDays: number;
  tiles: {
    launched7d: number;
    launched30d: number;
    /** First visits in the last 7 days that landed on a test from the window. */
    visitors7d: number;
    /** Every first visit in the last 7 days, for the share. */
    allVisitors7d: number;
    signups7d: number;
    allSignups7d: number;
    purchases: number;
    revenueUsdCents: number;
    /** Window tests with no first visit yet after 7+ days live. */
    noVisitorsAfterWeek: number;
  };
  tests: NewTestRow[];
  cohorts: CohortRow[];
  groups: GroupRow[];
}

type DayDoc = { day: string; visit: Record<string, number>; answered: Record<string, number> };

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

export async function buildNewTestsAdmin(db: Firestore, internalUids: Set<string>, now = new Date()): Promise<NewTestsPayload> {
  const today = now.toISOString().slice(0, 10);
  const windowStart = dayMinus(today, NEW_TEST_WINDOW_DAYS);
  const since7 = dayMinus(today, 6);
  const since30 = dayMinus(today, 29);

  // Base exams only: state versions count in their family (as analytics do).
  const baseIds = new Set<string>([...EXAMS.map((e) => e.id), ...EXAMS_V2.map((e) => e.id)]);
  const launched = Object.entries(launchDates as Record<string, string>)
    .filter(([id, day]) => baseIds.has(id) && day >= windowStart && day <= today)
    .map(([id, day]) => ({ id, day, pages: pagesFor(id) }))
    .filter((t): t is { id: string; day: string; pages: TestPages } => !!t.pages);
  const ids = launched.map((t) => t.id);

  const enrollmentChunks: string[][] = [];
  for (let i = 0; i < ids.length; i += 30) enrollmentChunks.push(ids.slice(i, i + 30));

  const [questionsSnap, landingSnap, originsSnap, paymentsSnap, ...enrollSnaps] = await Promise.all([
    db.collection("analytics").where(FieldPath.documentId(), "==", "questions").select("byExam").get(),
    db.collection("funnelLandings").where(FieldPath.documentId(), ">=", windowStart).get(),
    db.collection("signupOrigins").where("at", ">=", windowStart).get(),
    db.collection("payments").where("createdAt", ">=", windowStart).get(),
    ...enrollmentChunks.map((chunk) => db.collection("enrollments").where("exam", "in", chunk).select("exam", "uid").get()),
  ]);

  const byExam = (questionsSnap.docs[0]?.get("byExam") ?? {}) as Record<string, { daily?: Record<string, number> }>;

  // Landing keys are summed once per page; each test then sums its pages.
  const days: DayDoc[] = landingSnap.docs.map((d) => ({
    day: d.id,
    visit: (d.get("visit") ?? {}) as Record<string, number>,
    answered: (d.get("answered") ?? {}) as Record<string, number>,
  }));
  let allVisitors7d = 0;
  for (const d of days) if (d.day >= since7) for (const n of Object.values(d.visit)) if (typeof n === "number") allVisitors7d += n;

  const origins = originsSnap.docs
    .filter((d) => !internalUids.has(d.id))
    .map((d) => ({ at: String(d.get("at") ?? "").slice(0, 10), landing: d.get("landing") as string | undefined }));
  const allSignups7d = origins.filter((o) => o.at >= since7).length;

  const payments = paymentsSnap.docs
    .map((d) => d.data())
    .filter((p) => !internalUids.has(String(p.userId ?? "")) && p.status !== "refunded")
    .map((p) => ({
      exam: typeof p.exam === "string" ? p.exam : null,
      day: String(p.createdAt ?? "").slice(0, 10),
      net: paymentNetUsdCents(p, typeof p.refundedCents === "number" ? p.refundedCents : 0),
    }));

  const learners = new Map<string, { all: number; recent: number }>();
  for (const snap of enrollSnaps) {
    for (const d of snap.docs) {
      const uid = d.get("uid");
      if (typeof uid === "string" && internalUids.has(uid)) continue;
      const exam = String(d.get("exam"));
      const cur = learners.get(exam) ?? { all: 0, recent: 0 };
      cur.all++;
      if (d.createTime.toDate().toISOString().slice(0, 10) >= since7) cur.recent++;
      learners.set(exam, cur);
    }
  }

  const rows: NewTestRow[] = launched.map(({ id, day, pages }) => {
    let visitors = 0;
    let visitors7d = 0;
    let firstAnswers = 0;
    for (const d of days) {
      if (d.day < day) continue;
      for (const [k, n] of Object.entries(d.visit)) {
        if (typeof n !== "number" || !onTestPages(landingFromKey(k), pages)) continue;
        visitors += n;
        if (d.day >= since7) visitors7d += n;
      }
      for (const [k, n] of Object.entries(d.answered)) {
        if (typeof n === "number" && onTestPages(landingFromKey(k), pages)) firstAnswers += n;
      }
    }
    const daily = byExam[id]?.daily ?? {};
    let answers = 0;
    let answers7d = 0;
    for (const [d, n] of Object.entries(daily)) {
      if (typeof n !== "number" || d < day) continue;
      answers += n;
      if (d >= since7) answers7d += n;
    }
    const mine = origins.filter((o) => o.at >= day && onTestPages(o.landing, pages));
    const paid = payments.filter((p) => p.exam === id && p.day >= day);
    const live = daysLive(day, today);
    const entry = getCatalogEntry(id);
    const v1 = ALL_EXAMS.find((e) => e.id === id);
    return {
      id,
      name: entry?.name ?? (v1 ? examEnglishName(v1).name : id),
      href: entry?.href ?? "/",
      group: groupOf(id),
      region: regionOfTest(id),
      launched: day,
      daysLive: live,
      visitors,
      visitors7d,
      firstAnswers: Math.min(firstAnswers, visitors),
      answers,
      answers7d,
      learners: learners.get(id)?.all ?? 0,
      learners7d: learners.get(id)?.recent ?? 0,
      signups: mine.length,
      signups7d: mine.filter((o) => o.at >= since7).length,
      purchases: paid.length,
      revenueUsdCents: paid.reduce((s, p) => s + p.net, 0),
      visitorsPerDay: visitors / live,
    };
  });
  rows.sort((a, b) => b.launched.localeCompare(a.launched) || b.visitors - a.visitors);

  return {
    generatedAt: now.toISOString(),
    today,
    windowDays: NEW_TEST_WINDOW_DAYS,
    tiles: {
      launched7d: rows.filter((r) => r.launched >= since7).length,
      launched30d: rows.filter((r) => r.launched >= since30).length,
      visitors7d: rows.reduce((s, r) => s + r.visitors7d, 0),
      allVisitors7d,
      signups7d: rows.reduce((s, r) => s + r.signups7d, 0),
      allSignups7d,
      purchases: rows.reduce((s, r) => s + r.purchases, 0),
      revenueUsdCents: rows.reduce((s, r) => s + r.revenueUsdCents, 0),
      noVisitorsAfterWeek: rows.filter((r) => r.daysLive >= 8 && r.visitors === 0).length,
    },
    tests: rows,
    cohorts: cohorts(rows),
    groups: groups(rows),
  };
}
