import { getAdminDb } from "@/lib/firebase-admin";

// "Trending searches" on the search homepage (/home-v2): the queries typed
// most over the last 7 days that found a test (from searchQueries, written by
// /api/analytics/search). Empty when Firestore is unreachable.
export async function getTrendingSearches(limit = 6): Promise<string[]> {
  try {
    const days = Array.from({ length: 7 }, (_, i) => new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10));
    const snap = await getAdminDb().collection("searchQueries").orderBy("count", "desc").limit(200).get();
    return snap.docs
      .map((d) => {
        const v = d.data();
        const week = days.reduce((sum, day) => sum + ((v.daily?.[day] as number) ?? 0), 0);
        return { q: String(v.q ?? ""), week, found: (v.lastResults ?? 0) > 0 };
      })
      // Two searches at least, so one person's typing never trends.
      .filter((x) => x.found && x.week >= 2 && x.q.length >= 2)
      .sort((a, b) => b.week - a.week)
      .slice(0, limit)
      .map((x) => x.q);
  } catch (error) {
    console.error("Trending searches: none", error);
    return [];
  }
}
