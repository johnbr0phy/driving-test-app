"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
import {
  searchTestGroups,
  TEST_CATALOG,
  TestCatalogEntry,
} from "@/lib/testCatalog";
import { TestIcon } from "@/components/TestIcon";
import { hasTigerSet } from "@/lib/tigerAssets";
import { LANGUAGES } from "@/i18n";

/**
 * One test on the hub. Every card has the same rows so a grid lines up:
 * name and certifying body (always two lines tall, flags on the second for
 * multilingual tests), a chip row (size, price) and the optional weekly count,
 * with a chevron on the right like the dashboard rows.
 */
export function TestCard({ test, answered }: { test: TestCatalogEntry; answered?: number | null }) {
  const tiger = hasTigerSet(test.id);
  return (
    <div data-theme={test.theme} className="h-full">
      <Link
        href={test.href}
        className="group flex h-full items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 transition-all hover:border-brand hover:shadow-lg"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tiger ? "" : "bg-brand text-white"}`}>
              <TestIcon examId={test.id} icon={test.icon} className={tiger ? "h-12 w-12" : "h-6 w-6"} />
            </div>
            <div className="min-w-0">
              <h2 className="text-balance text-lg font-semibold leading-snug text-gray-900 dark:text-gray-50">{test.name}</h2>
              {/* Two lines tall either way: a long org wraps into the second, a multilingual test puts its flags there. */}
              {test.languages.length > 1 ? (
                <div className="min-h-[2.5rem] text-sm leading-5 text-gray-500 dark:text-gray-400">
                  <p className="truncate">{test.org}</p>
                  <LanguageFlags languages={test.languages} />
                </div>
              ) : (
                <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-gray-500 dark:text-gray-400">{test.org}</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-gray-700 dark:text-gray-300">
              {test.questions} questions
            </span>
            <span
              className="rounded-full bg-brand-light px-2.5 py-1 text-brand-dark"
              title={test.pricing ? `Practice tests: ${test.pricing}` : undefined}
            >
              {test.pricing ? "Free + Premium" : "Free"}
            </span>
          </div>

          {answered ? (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{answered.toLocaleString("en-US")} answered this week</p>
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
function LanguageFlags({ languages }: { languages: TestCatalogEntry["languages"] }) {
  const langs = LANGUAGES.filter((l) => languages.includes(l.code));
  const names = langs.map((l) => l.englishName).join(", ");
  return (
    <span className="flex h-5 items-center gap-1" title={`Available in ${names}`}>
      <span className="sr-only">Available in {names}</span>
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
export function TestCatalogGrid({ showPopular = true }: { showPopular?: boolean } = {}) {
  const [query, setQuery] = useState("");
  // The homepage shows its own live "Popular this week" row above the grid.
  const groups = useMemo(
    () => searchTestGroups(query).filter((g) => showPopular || g.title !== "Most popular"),
    [query, showPopular]
  );
  const count = groups.reduce((n, g) => n + g.tests.length, 0);
  const searching = query.trim().length > 0;

  return (
    <>
      <div className="mx-auto mb-10 max-w-xl">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
          <input
            type="text"
            role="searchbox"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by exam, job or certifying body"
            aria-label="Search practice tests"
            autoComplete="off"
            className="h-12 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pl-12 pr-11 text-base text-gray-900 dark:text-gray-50 shadow-sm placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          {searching && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300"
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
            ? `${count} of ${TEST_CATALOG.length} tests`
            : `${TEST_CATALOG.length} practice tests, all free to start`}
        </p>
      </div>

      {groups.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            No tests match &ldquo;{query}&rdquo;
          </p>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Try the exam name, the job title, or the certifying body.
          </p>
        </div>
      )}

      {groups.map((group, i) => (
        <div key={group.title} className={i < groups.length - 1 ? "mb-12" : ""}>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
            {group.title}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.tests.map((t) => (
              <TestCard key={t.id} test={t} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
