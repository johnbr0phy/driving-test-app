import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { SearchHome } from "@/components/home/SearchHome";
import { getPopularTests } from "@/lib/server/popularTests";
import { getTrendingSearches } from "@/lib/server/trendingSearches";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { REGION_COOKIE, Region, isRegion, regionFromCountry, regionOfTest } from "@/lib/region";

// A trial of a search-first homepage (one box, every test, flags), kept off
// the live homepage: noindex, not in the sitemap, and middleware never sends
// anyone here. Searches are logged to searchQueries; see /home-v2/searches.
export const metadata: Metadata = {
  title: "Find your practice test",
  robots: { index: false, follow: false },
};

export default async function HomeV2Page() {
  const saved = (await cookies()).get(REGION_COOKIE)?.value;
  const region: Region = isRegion(saved) ? saved : regionFromCountry((await headers()).get("x-vercel-ip-country")) ?? "US";

  const { tests } = await getPopularTests(500);
  const popularity: Record<string, number> = {};
  for (const p of tests) popularity[p.test.id] = p.answered ?? 0;

  // The feed under the box: this week's most practised tests from the visitor's
  // country (or worldwide), topped up with the country's own tests.
  const local = (id: string) => regionOfTest(id) === region || regionOfTest(id) === "GLOBAL";
  const feed = tests.filter((p) => local(p.test.id));
  for (const test of TEST_CATALOG) {
    if (feed.length >= 6) break;
    if (regionOfTest(test.id) === region && !feed.some((p) => p.test.id === test.id)) feed.push({ test, answered: null });
  }

  // Signed-out view: what people searched most this week, topped up with the
  // names of the popular tests so the list is never short.
  const trending = await getTrendingSearches(6);
  for (const p of feed) {
    if (trending.length >= 6) break;
    const name = p.test.name.toLowerCase();
    if (!trending.includes(name)) trending.push(name);
  }

  return <SearchHome initialRegion={region} popularity={popularity} popular={feed.slice(0, 6)} trending={trending} />;
}
