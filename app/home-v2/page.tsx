import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { SearchHome } from "@/components/home/SearchHome";
import { getPopularTests } from "@/lib/server/popularTests";
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

  // Chips under the box: this week's most practised tests from the visitor's
  // country (or worldwide), topped up with the country's own tests.
  const local = (id: string) => regionOfTest(id) === region || regionOfTest(id) === "GLOBAL";
  const chips = tests.map((p) => p.test).filter((t) => local(t.id));
  for (const t of TEST_CATALOG) {
    if (chips.length >= 6) break;
    if (regionOfTest(t.id) === region && !chips.some((c) => c.id === t.id)) chips.push(t);
  }

  return <SearchHome initialRegion={region} popularity={popularity} popular={chips.slice(0, 6)} />;
}
