import { getAdminDb } from "@/lib/firebase-admin";
import { getCatalogEntry, TestCatalogEntry } from "@/lib/testCatalog";

// The homepage's "Popular this week": catalog tests ranked by questions
// answered over the last 7 UTC days, today included so a busy test shows
// within the hour, from analytics/questions.byExam
// (internal accounts never send to it). Falls back to a fixed list when
// Firestore is unreachable, e.g. a local build without credentials.

export interface PopularTest {
  test: TestCatalogEntry;
  /** Questions answered in the last 7 days; null on the fallback list. */
  answered: number | null;
}

const FALLBACK_IDS = ["dmv", "sat", "act", "teas", "cna", "cdl"];

function lastSevenDays(now = new Date()): string[] {
  return Array.from({ length: 7 }, (_, i) => new Date(now.getTime() - i * 86_400_000).toISOString().slice(0, 10));
}

export async function getPopularTests(limit = 6): Promise<{ tests: PopularTest[]; totalAnswered: number | null }> {
  try {
    const snap = await getAdminDb().doc("analytics/questions").get();
    const byExam = (snap.data()?.byExam ?? {}) as Record<string, { daily?: Record<string, number> }>;
    const days = lastSevenDays();
    let totalAnswered = 0;
    const ranked = Object.entries(byExam)
      .map(([id, v]) => {
        const answered = days.reduce((sum, d) => sum + (v.daily?.[d] ?? 0), 0);
        totalAnswered += answered;
        return { test: getCatalogEntry(id), answered };
      })
      .filter((x): x is PopularTest & { answered: number; test: TestCatalogEntry } => !!x.test && x.answered > 0)
      .sort((a, b) => b.answered - a.answered);
    if (ranked.length >= 3) return { tests: ranked.slice(0, limit), totalAnswered };
  } catch (error) {
    console.error("Popular tests: falling back to the fixed list", error);
  }
  return {
    tests: FALLBACK_IDS.map(getCatalogEntry)
      .filter((t): t is TestCatalogEntry => !!t)
      .slice(0, limit)
      .map((test) => ({ test, answered: null })),
    totalAnswered: null,
  };
}
