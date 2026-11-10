import { searchTestGroups } from "@/lib/testCatalog";
import { TestCard } from "@/components/TestCard";
import { CountryPills } from "@/components/CountryPills";
import { Region, orderGroupsForRegion, regionOfTest } from "@/lib/region";
import type { Language } from "@/i18n";

/**
 * The homepage's catalog: every test grouped by category, in the order and
 * with the filtering of TestCatalogGrid for a fixed country and no search
 * box, but rendered on the server. Only the country pills hydrate, so the
 * page no longer pays to hydrate some 5,000 nodes of cards on a phone.
 * Keep the grouping rules in step with TestCatalogGrid.
 */
export function TestCatalogStatic({ region, localOnly = false, lang = "en" }: { region: Region; localOnly?: boolean; lang?: Language }) {
  const local = (t: { id: string }) => regionOfTest(t.id) === region || regionOfTest(t.id) === "GLOBAL";
  const groups = orderGroupsForRegion(
    searchTestGroups("")
      .map((g) => (localOnly ? { ...g, tests: g.tests.filter(local) } : g))
      .filter((g) => g.title !== "Most popular" && g.tests.length > 0),
    region
  );
  return (
    <>
      <div className="mb-8">
        <CountryPills current={region} lang={lang} />
      </div>
      {groups.map((group, i) => (
        <div key={group.title} className={i < groups.length - 1 ? "mb-12" : ""}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">{group.title}</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.tests.map((t) => (
              <TestCard key={t.id} test={t} headingLevel={4} lang={lang} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
