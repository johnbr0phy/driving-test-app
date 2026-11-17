import { FieldPath } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { getCatalogEntry, TestCatalogEntry } from "@/lib/testCatalog";
import { sharedRead } from "@/lib/server/sharedRead";

// The homepage's "Popular this week": catalog tests ranked by questions
// answered over the last 168 hours, from analytics/questions.byExam
// (internal accounts never send to it). Falls back to a fixed list when
// Firestore is unreachable, e.g. a local build without credentials.

export interface PopularTest {
  test: TestCatalogEntry;
  /** Questions answered in the last 7 days; null on the fallback list. */
  answered: number | null;
}

const FALLBACK_IDS = ["dmv", "sat", "act", "teas", "cna", "cdl"];

/**
 * Answers are stored per UTC day, so a rolling 7-day window is estimated:
 * today and the 6 days before it count in full, and the day before those
 * counts for the part of it still inside the last 168 hours. Summing 7
 * calendar days instead made the homepage count drop by a whole day's
 * answers at every UTC midnight and climb back through the day.
 */
export function rollingWeekWeights(now = new Date()): Array<[string, number]> {
  const dayMs = 86_400_000;
  const elapsed = (now.getTime() % dayMs) / dayMs;
  return Array.from({ length: 8 }, (_, i) => [
    new Date(now.getTime() - i * dayMs).toISOString().slice(0, 10),
    i < 7 ? 1 : 1 - elapsed,
  ]);
}

export async function getPopularTests(limit = 6): Promise<{ tests: PopularTest[]; totalAnswered: number | null }> {
  try {
    // Only byExam, read once for every homepage this process renders.
    const byExam = await sharedRead("analytics/questions.byExam", async () => {
      // A query, not a doc get, so only byExam is downloaded.
      const snap = await getAdminDb().collection("analytics").where(FieldPath.documentId(), "==", "questions").select("byExam").get();
      return (snap.docs[0]?.get("byExam") ?? {}) as Record<string, { daily?: Record<string, number> }>;
    });
    const days = rollingWeekWeights();
    let totalAnswered = 0;
    const ranked = Object.entries(byExam)
      .map(([id, v]) => {
        const answered = Math.round(days.reduce((sum, [d, w]) => sum + w * (v.daily?.[d] ?? 0), 0));
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
