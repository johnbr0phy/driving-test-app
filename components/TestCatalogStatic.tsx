import Link from "next/link";
import { groupAnchor, searchTestGroups } from "@/lib/testCatalog";
import { CountryPills } from "@/components/CountryPills";
import { Region, orderGroupsForRegion, regionOfTest } from "@/lib/region";
import { getExamById } from "@/lib/exams";
import type { Language } from "@/i18n";

/** Links per group before "+N more" sends the rest to /tests. */
const PER_GROUP = 6;

/**
 * The homepage's catalog (Nov 2026): every category as a short list of plain
 * text links, busiest tests first, instead of a card for each of 360 tests.
 * Server-rendered, so every link is crawlable; a group over PER_GROUP links
 * its remainder to that group on /tests, which lists every test as a card.
 * Grouping and order follow TestCatalogGrid; keep the two in step.
 */
export function TestCatalogStatic({
  region,
  localOnly = false,
  lang = "en",
  popularity = {},
}: {
  region: Region;
  localOnly?: boolean;
  lang?: Language;
  /** Questions answered this week per test id, to put the busiest first. */
  popularity?: Record<string, number>;
}) {
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
      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
        {groups.map((group) => {
          const tests = [...group.tests].sort((a, b) => (popularity[b.id] ?? 0) - (popularity[a.id] ?? 0));
          const shown = tests.slice(0, PER_GROUP);
          const more = tests.length - shown.length;
          return (
            <div key={group.title} className="mb-8 break-inside-avoid">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{group.title}</h3>
              <ul className="space-y-1.5">
                {shown.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={getExamById(t.id)?.translations?.[lang]?.landingPath ?? t.href}
                      className="text-gray-900 dark:text-gray-50 hover:text-brand-dark hover:underline"
                    >
                      {t.nativeName && t.language === lang ? t.nativeName : t.name}
                    </Link>
                  </li>
                ))}
                {more > 0 && (
                  <li>
                    {/* The search homepages are English only, so this line is too. */}
                    <Link href={`/tests#${groupAnchor(group.title)}`} className="text-sm font-medium text-brand-dark hover:underline">
                      +{more} more
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
