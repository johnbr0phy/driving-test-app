"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import {
  searchTestGroups,
  TEST_CATALOG,
  TestCatalogEntry,
} from "@/lib/testCatalog";
import { TestIcon } from "@/components/TestIcon";
import { hasTigerSet } from "@/lib/tigerAssets";

function TestCard({ test }: { test: TestCatalogEntry }) {
  return (
    <div data-theme={test.theme} className="h-full">
      <Link
        href={test.href}
        className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-brand hover:shadow-lg"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${hasTigerSet(test.id) ? "" : "bg-brand text-white"}`}>
            <TestIcon examId={test.id} icon={test.icon} className={hasTigerSet(test.id) ? "h-11 w-11" : "h-6 w-6"} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{test.name}</h2>
            <p className="text-sm text-gray-500">{test.org}</p>
          </div>
        </div>
        <p className="flex-1 text-gray-600">{test.blurb}</p>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {test.questions} questions · {test.pricing ?? "Free"}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-brand group-hover:gap-2 transition-all">
            Start <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </div>
  );
}

/**
 * The /tests hub body: a search box plus every test grouped by category.
 * Rendered on the client so typing filters instantly; with an empty query it
 * shows the full catalog exactly as the server would.
 */
export function TestCatalogGrid() {
  const [query, setQuery] = useState("");
  const groups = useMemo(() => searchTestGroups(query), [query]);
  const count = groups.reduce((n, g) => n + g.tests.length, 0);
  const searching = query.trim().length > 0;

  return (
    <>
      <div className="mx-auto mb-10 max-w-xl">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
            className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-11 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          {searching && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <p
          className="mt-2 text-center text-sm text-gray-500"
          aria-live="polite"
        >
          {searching
            ? `${count} of ${TEST_CATALOG.length} tests`
            : `${TEST_CATALOG.length} practice tests, all free to start`}
        </p>
      </div>

      {groups.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <p className="text-lg font-semibold text-gray-900">
            No tests match &ldquo;{query}&rdquo;
          </p>
          <p className="mt-1 text-gray-600">
            Try the exam name, the job title, or the certifying body.
          </p>
        </div>
      )}

      {groups.map((group, i) => (
        <div key={group.title} className={i < groups.length - 1 ? "mb-12" : ""}>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
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
