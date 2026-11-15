import { FieldPath, type Firestore } from "firebase-admin/firestore";
import { ALL_EXAMS, EXAMS, examEnglishName, examLandingPath } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { getCatalogEntry } from "@/lib/testCatalog";
import { landingFromKey } from "@/lib/funnelLanding";
import { paymentNetUsdCents } from "@/lib/pricing";
import launchDates from "@/lib/examLaunchDates.json";
import { daysLive, mostRecent, onTestPages, sumSince, testPages, type NewTestRow, type TestPages } from "@/lib/newTests";

// Data for the /admin New tests tab: the 50 most recently launched tests
// (lib/examLaunchDates.json), each with what it has done since launch: first
// visits that landed on its pages (funnelLandings/{day}), signups whose first
// visit landed there (signupOrigins), questions answered on it
// (analytics/questions.byExam, keyed by family id) and Premium sales credited
// to it (payments.exam). Internal accounts are dropped where we know the uid.

export interface NewTestsPayload {
  generatedAt: string;
  tests: NewTestRow[];
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

  const [landingSnap, originsSnap, paymentsSnap, questionsSnap] = await Promise.all([
    db.collection("funnelLandings").where(FieldPath.documentId(), ">=", since).get(),
    db.collection("signupOrigins").where("at", ">=", since).get(),
    db.collection("payments").where("createdAt", ">=", since).get(),
    db.collection("analytics").where(FieldPath.documentId(), "==", "questions").select("byExam").get(),
  ]);

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
    };
  });

  return { generatedAt: now.toISOString(), tests };
}
