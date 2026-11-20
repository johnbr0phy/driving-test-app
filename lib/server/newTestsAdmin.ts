import { FieldPath, type Firestore } from "firebase-admin/firestore";
import { ALL_EXAMS, EXAMS, examEnglishName, examLandingPath } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { getCatalogEntry } from "@/lib/testCatalog";
import { landingFromKey } from "@/lib/funnelLanding";
import { paymentNetUsdCents } from "@/lib/pricing";
import launchDates from "@/lib/examLaunchDates.json";
import { bingSentFor, daysLive, mostRecent, onTestPages, sumSince, testPages, type NewTestRow, type TestPages } from "@/lib/newTests";
import { pathFromSentKey, RUNS_COLLECTION, SENT_COLLECTION, SENT_DOC } from "@/lib/indexNowSent.mjs";

// Data for the /admin New tests tab: every launched test, newest first
// (lib/examLaunchDates.json), each with what it has done since launch: first
// visits that landed on its pages (funnelLandings/{day}), signups whose first
// visit landed there (signupOrigins), questions answered on it
// (analytics/questions.byExam, keyed by family id) and Premium sales credited
// to it (payments.exam), and when its pages were sent to Bing through
// IndexNow (indexNow/sent and indexNowRuns, lib/indexNowSent.mjs). Internal
// accounts are dropped where we know the uid.

/** One IndexNow submission, for the "Sent to Bing" card. */
export interface IndexNowRunRow {
  at: string;
  /** deploy (after a production deploy), nightly (the cron), manual or full. */
  source: string;
  count: number;
  status: number;
  ok: boolean;
  /** Tests from this tab whose main landing page was in the submission. */
  tests: { id: string; name: string }[];
}

export interface NewTestsPayload {
  generatedAt: string;
  tests: NewTestRow[];
  indexNow: {
    /** Latest submissions, newest first. */
    runs: IndexNowRunRow[];
    /** Latest run of each sender, so a stopped one shows. */
    lastDeploy: string | null;
    lastNightly: string | null;
    /** Earliest time any page was recorded as sent (records began then). */
    since: string | null;
  };
}

/** Main landing path of a test, the page Bing should know first. */
function mainLanding(id: string): string {
  const v1 = ALL_EXAMS.find((e) => e.id === id);
  if (v1) return examLandingPath(v1);
  return EXAMS_V2.find((e) => e.id === id)?.landingPath ?? "";
}

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

export async function buildNewTestsAdmin(db: Firestore, internalUids: Set<string>, now = new Date()): Promise<NewTestsPayload> {
  const today = now.toISOString().slice(0, 10);

  // Base exams only: state versions count in their family.
  const baseIds = new Set<string>([...EXAMS.map((e) => e.id), ...EXAMS_V2.map((e) => e.id)]);
  const launched = mostRecent(
    Object.entries(launchDates as Record<string, string>)
      .filter(([id, day]) => baseIds.has(id) && day <= today)
      .map(([id, day]) => ({ id, day, pages: pagesFor(id) }))
      .filter((t): t is { id: string; day: string; pages: TestPages } => !!t.pages),
  );
  const since = launched.reduce((min, t) => (t.day < min ? t.day : min), today);

  const [landingSnap, originsSnap, paymentsSnap, questionsSnap, sentSnap, runsSnap] = await Promise.all([
    db.collection("funnelLandings").where(FieldPath.documentId(), ">=", since).get(),
    db.collection("signupOrigins").where("at", ">=", since).get(),
    db.collection("payments").where("createdAt", ">=", since).get(),
    db.collection("analytics").where(FieldPath.documentId(), "==", "questions").select("byExam").get(),
    db.collection(SENT_COLLECTION).doc(SENT_DOC).get(),
    db.collection(RUNS_COLLECTION).orderBy("at", "desc").limit(15).get(),
  ]);

  const sent = Object.entries((sentSnap.get("urls") ?? {}) as Record<string, { first?: string; last?: string }>)
    .filter(([, v]) => typeof v?.first === "string" && typeof v?.last === "string")
    .map(([k, v]) => ({ path: pathFromSentKey(k), first: v.first as string, last: v.last as string }));

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
  const bump = (m: Map<string, number>, id: string, n: number) => m.set(id, (m.get(id) ?? 0) + n);

  const visitors = new Map<string, number>();
  for (const d of landingSnap.docs) {
    for (const [k, n] of Object.entries((d.get("visit") ?? {}) as Record<string, number>)) {
      const owner = ownerOf(landingFromKey(k));
      if (owner && d.id >= owner.day && typeof n === "number") bump(visitors, owner.id, n);
    }
  }

  const signups = new Map<string, number>();
  for (const d of originsSnap.docs) {
    if (internalUids.has(d.id)) continue;
    const owner = ownerOf(d.get("landing") as string | undefined);
    if (owner && String(d.get("at") ?? "").slice(0, 10) >= owner.day) bump(signups, owner.id, 1);
  }

  const launchOf = new Map(launched.map((l) => [l.id, l.day]));
  const sales = new Map<string, number>();
  const revenue = new Map<string, number>();
  for (const doc of paymentsSnap.docs) {
    const p = doc.data();
    if (internalUids.has(String(p.userId ?? "")) || p.status === "refunded" || typeof p.exam !== "string") continue;
    const day = launchOf.get(p.exam);
    if (!day || String(p.createdAt ?? "").slice(0, 10) < day) continue;
    bump(sales, p.exam, 1);
    bump(revenue, p.exam, paymentNetUsdCents(p, typeof p.refundedCents === "number" ? p.refundedCents : 0));
  }

  const byExam = (questionsSnap.docs[0]?.get("byExam") ?? {}) as Record<string, { daily?: Record<string, number> }>;

  const tests: NewTestRow[] = launched.map(({ id, day }) => {
    const entry = getCatalogEntry(id);
    const v1 = ALL_EXAMS.find((e) => e.id === id);
    return {
      id,
      name: entry?.name ?? (v1 ? examEnglishName(v1).name : id),
      href: entry?.href ?? "/",
      launched: day,
      daysLive: daysLive(day, today),
      visitors: visitors.get(id) ?? 0,
      signups: signups.get(id) ?? 0,
      answered: sumSince(byExam[id]?.daily, day),
      sales: sales.get(id) ?? 0,
      revenueUsdCents: revenue.get(id) ?? 0,
      bing: bingSentFor(sent, pagesFor(id)!, mainLanding(id)),
    };
  });

  const nameOf = new Map(tests.map((t) => [t.id, t.name]));
  const landingOwner = new Map(
    launched.map((l) => [mainLanding(l.id).toLowerCase().replace(/\/+$/, ""), l.id] as const).filter(([p]) => p),
  );
  const runs: IndexNowRunRow[] = runsSnap.docs.map((d) => {
    const paths = (d.get("paths") ?? []) as string[];
    const ids = [...new Set(paths.map((p) => landingOwner.get(p)).filter((x): x is string => !!x))];
    return {
      at: String(d.get("at") ?? ""),
      source: String(d.get("source") ?? ""),
      count: Number(d.get("count") ?? 0),
      status: Number(d.get("status") ?? 0),
      ok: d.get("ok") === true,
      tests: ids.map((id) => ({ id, name: nameOf.get(id) ?? id })),
    };
  });
  const lastRun = (sentSnap.get("lastRun") ?? {}) as Record<string, { at?: string }>;
  const latest = (source: string) => lastRun[source]?.at ?? null;
  const firstSent = sent.reduce<string | null>((m, s) => (!m || s.first < m ? s.first : m), null);

  return {
    generatedAt: now.toISOString(),
    tests,
    indexNow: { runs, lastDeploy: latest("deploy"), lastNightly: latest("nightly"), since: firstSent },
  };
}
