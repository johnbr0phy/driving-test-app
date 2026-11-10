import { getAdminDb } from "@/lib/firebase-admin";
import { isRegion } from "@/lib/region";
import { searchAllTests } from "@/lib/testSearch";

// "Trending searches" on the homepage search (SearchHome): the queries typed
// most over the last 7 days that found a test (from searchQueries, written by
// /api/analytics/search). Empty when Firestore is unreachable. With a region,
// only queries searched at least twice from that country (`byRegion`, all time)
// count, so a country homepage never shows another country's list.
export async function getTrendingSearches(limit = 6, region?: string): Promise<string[]> {
  try {
    const days = Array.from({ length: 7 }, (_, i) => new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10));
    // Only queries typed this week: an all-time top list would miss a new
    // search that is trending now once the collection is large.
    const since = new Date(Date.now() - 7 * 86_400_000).toISOString();
    const snap = await getAdminDb().collection("searchQueries").where("lastAt", ">=", since).get();
    return snap.docs
      .map((d) => {
        const v = d.data();
        const week = days.reduce((sum, day) => sum + ((v.daily?.[day] as number) ?? 0), 0);
        const local = region ? ((v.byRegion?.[region] as number) ?? 0) : Infinity;
        return { q: String(v.q ?? ""), week, local };
      })
      // Two searches at least, so one person's typing never trends.
      .filter((x) => x.week >= 2 && x.local >= 2 && x.q.length >= 2)
      .sort((a, b) => b.week - a.week)
      // Shown on every homepage, so "found a test" is checked here, against
      // today's catalog with every word matching exactly, never taken from
      // the result count the browser reported with the search.
      .filter((x) => {
        const res = searchAllTests(x.q, region && isRegion(region) ? region : "US");
        return res.hits.length > 0 && !res.partial && !res.fuzzy;
      })
      .slice(0, limit)
      .map((x) => x.q);
  } catch (error) {
    console.error("Trending searches: none", error);
    return [];
  }
}
