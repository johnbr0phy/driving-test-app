"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
import {
  searchTestGroups,
  TEST_CATALOG,
  TestCatalogEntry,
} from "@/lib/testCatalog";
import { TestIcon } from "@/components/TestIcon";
import { CountUp } from "@/components/CountUp";
import { hasTigerSet } from "@/lib/tigerAssets";
import { getExamById } from "@/lib/exams";
import { LANGUAGES, type Language } from "@/i18n";
import { homeCopy } from "@/components/home/homeCopy";
import { CountryPills, readRegionCookie } from "@/components/CountryPills";
import { Region, orderGroupsForRegion, regionOfTest } from "@/lib/region";

/**
 * One test on the hub. Every card has the same rows so a grid lines up:
 * name and certifying body (always two lines tall, flags on the second for
 * multilingual tests), a chip row (size, price) and the optional weekly count,
 * with a chevron on the right like the dashboard rows.
 */
/** A test's landing in the page's language when it has one (the Spanish DGT
 *  test on the Spanish homepage), else its usual landing. */
function landingIn(test: TestCatalogEntry, lang: Language): string {
  return getExamById(test.id)?.translations?.[lang]?.landingPath ?? test.href;
}

export function TestCard({ test, answered, headingLevel = 3, lang = "en" }: { test: TestCatalogEntry; answered?: number | null; headingLevel?: 3 | 4; lang?: Language }) {
  const tiger = hasTigerSet(test.id);
  const c = homeCopy(lang).card;
  // A native exam shows its own name on a page in its language (the German homepage).
  const name = test.nativeName && test.language === lang ? test.nativeName : test.name;
  // Cards sit under a section or group heading, so their names are one level below it.
  const Heading = headingLevel === 4 ? "h4" : "h3";
  return (
    <div data-theme={test.theme} className="h-full">
      <Link
        href={landingIn(test, lang)}
        className="group flex h-full items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 transition-all hover:border-brand hover:shadow-lg"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tiger ? "" : "bg-brand text-white"}`}>
              <TestIcon examId={test.id} icon={test.icon} className={tiger ? "h-12 w-12" : "h-6 w-6"} />
            </div>
            <div className="min-w-0">
              <Heading className="text-balance text-lg font-semibold leading-snug text-gray-900 dark:text-gray-50">{name}</Heading>
              {/* Two lines tall either way: a long org wraps into the second, a multilingual test puts its flags there. */}
              {test.languages.length > 1 ? (
                <div className="min-h-[2.5rem] text-sm leading-5 text-gray-500 dark:text-gray-400">
                  <p className="truncate">{test.org}</p>
                  <LanguageFlags languages={test.languages} lang={lang} />
                </div>
              ) : (
                <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-gray-500 dark:text-gray-400">{test.org}</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-gray-700 dark:text-gray-300">
              {c.questions(test.questions)}
            </span>
            <span
              className="rounded-full bg-brand-light px-2.5 py-1 text-brand-dark"
              title={test.pricing ? `Practice tests: ${test.pricing}` : undefined}
            >
              {test.pricing ? c.freePlusPremium : c.free}
            </span>
          </div>

          {answered ? (
            <p className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-3 text-center text-xs text-gray-500 dark:text-gray-400">
              <CountUp value={answered} className="text-sm font-semibold text-gray-900 dark:text-gray-50" /> {c.answeredThisWeek}
            </p>
          ) : null}
        </div>
        <ChevronRight
          className="h-5 w-5 shrink-0 text-gray-300 dark:text-gray-600 transition-all group-hover:translate-x-0.5 group-hover:text-brand"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

/** The flags of every language a test comes in, same flags as the language switcher. */
function LanguageFlags({ languages, lang }: { languages: TestCatalogEntry["languages"]; lang: Language }) {
  // In the test's own order (base language first), as the languages call themselves.
  const langs = languages.map((code) => LANGUAGES.find((l) => l.code === code)).filter((l) => !!l);
  const names = langs.map((l) => (lang === "en" ? l.englishName : l.label)).join(", ");
  const label = homeCopy(lang).card.availableIn(names);
  return (
    <span className="flex h-5 items-center gap-1" title={label}>
      <span className="sr-only">{label}</span>
      {langs.map((l) => (
        <span key={l.code} aria-hidden="true" className="text-sm leading-none">
          {l.flag}
        </span>
      ))}
    </span>
  );
}

/**
 * The /tests hub body: a search box plus every test grouped by category.
 * Rendered on the client so typing filters instantly; with an empty query it
 * shows the full catalog exactly as the server would.
 */
export function TestCatalogGrid({
  showPopular = true,
  nested = false,
  region: fixedRegion,
  regionPicker = false,
  localOnly = false,
  lang = "en",
  searchBox = true,
}: {
  showPopular?: boolean;
  nested?: boolean;
  /** The country the page was rendered for (the homepage); its groups come first. */
  region?: Region;
  /** Show the country pills above the search. With `region` set the server renders each country (the homepage); without it the hub follows the saved country. */
  regionPicker?: boolean;
  /** List only the country's own groups and the worldwide ones until the visitor searches (the homepage). */
  localOnly?: boolean;
  /** The page's language (a country homepage in German): the search box, counts and cards. */
  lang?: Language;
  /** The search homepages have their own box above, so the grid leaves its out. */
  searchBox?: boolean;
} = {}) {
  const c = homeCopy(lang);
  // nested: the grid sits under a page section's h2 (the homepage), so groups are h3 and cards h4.
  const GroupHeading = nested ? "h3" : "h2";
  const [query, setQuery] = useState("");
  const [pickedRegion, setPickedRegion] = useState<Region>(fixedRegion ?? "US");
  useEffect(() => {
    const saved = regionPicker && !fixedRegion ? readRegionCookie() : null;
    if (saved) setPickedRegion(saved);
  }, [regionPicker, fixedRegion]);
  const region = fixedRegion ?? pickedRegion;
  // The homepage shows its own live "Popular this week" row above the grid, and
  // "Most popular" is US tests, so other countries skip it.
  const groups = useMemo(() => {
    const searching = query.trim().length > 0;
    // localOnly (country homepages) keeps only the country's own and worldwide tests,
    // inside mixed groups too (Citizenship tests shows /uk only Life in the UK).
    const local = (t: { id: string }) => regionOfTest(t.id) === region || regionOfTest(t.id) === "GLOBAL";
    return orderGroupsForRegion(
      searchTestGroups(query)
        .map((g) => (localOnly && !searching ? { ...g, tests: g.tests.filter(local) } : g))
        .filter(
          (g) =>
            ((showPopular && region === "US") || g.title !== "Most popular") &&
            g.tests.length > 0
        ),
      region
    );
  }, [query, showPopular, region, localOnly]);
  const count = groups.reduce((n, g) => n + g.tests.length, 0);
  const searching = query.trim().length > 0;

  return (
    <>
      {regionPicker && (
        <div className="mb-8">
          <CountryPills current={region} onChange={fixedRegion ? undefined : setPickedRegion} lang={lang} />
        </div>
      )}
      {searchBox && (
      <div className="mx-auto mb-10 max-w-xl">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-300"
            aria-hidden="true"
          />
          <input
            type="text"
            role="searchbox"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c.search.placeholder}
            aria-label={c.search.label}
            autoComplete="off"
            className="h-12 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 pl-12 pr-11 text-base text-gray-900 dark:text-gray-50 shadow-sm placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          {searching && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={c.search.clear}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <p
          className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400"
          aria-live="polite"
        >
          {searching
            ? c.search.countOf(count, TEST_CATALOG.length)
            : c.search.allFree(localOnly ? count : TEST_CATALOG.length)}
        </p>
      </div>
      )}

      {groups.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {c.search.noMatch(query)}
          </p>
          <p className="mt-1 text-gray-600 dark:text-gray-300">{c.search.noMatchHint}</p>
        </div>
      )}

      {groups.map((group, i) => (
        <div key={group.title} className={i < groups.length - 1 ? "mb-12" : ""}>
          <GroupHeading className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
            {group.title}
          </GroupHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.tests.map((t) => (
              <TestCard key={t.id} test={t} headingLevel={nested ? 4 : 3} lang={lang} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
