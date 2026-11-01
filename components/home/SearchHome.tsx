"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { FLAGS, readRegionCookie } from "@/components/CountryPills";
import { useAuth } from "@/contexts/AuthContext";
import { isInternalBrowser } from "@/lib/internal";
import { Region, TestRegion, regionInfo, regionOfTest } from "@/lib/region";
import { normalizeQuery, searchAllTests, SearchHit } from "@/lib/testSearch";
import type { TestCatalogEntry } from "@/lib/testCatalog";

const flagOf = (r: TestRegion) => (r === "GLOBAL" ? "🌐" : FLAGS[r]);
const TRACK_DELAY_MS = 1200;

/**
 * The search-first homepage (/home-v2): one box, every test in every country,
 * a flag on each result, a tap goes straight to the test. What people type is
 * tracked (api/analytics/search) so searches that find nothing become the list
 * of tests to build.
 */
export function SearchHome({
  initialRegion,
  popularity,
  popular,
}: {
  initialRegion: Region;
  popularity: Record<string, number>;
  popular: TestCatalogEntry[];
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [region, setRegion] = useState<Region>(initialRegion);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const sent = useRef(new Set<string>());

  // A country the visitor picked on this device beats the server's guess.
  useEffect(() => {
    const saved = readRegionCookie();
    if (saved) setRegion(saved);
  }, []);

  const result = useMemo(() => searchAllTests(query, region, popularity), [query, region, popularity]);
  const q = normalizeQuery(query);
  const showResults = q.length > 0;
  const miss = showResults && result.hits.length === 0;

  useEffect(() => setActive(0), [query]);

  function track(body: Record<string, unknown>) {
    if (isInternalBrowser(user?.email)) return;
    const payload = JSON.stringify({ ...body, region });
    try {
      if (navigator.sendBeacon?.("/api/analytics/search", new Blob([payload], { type: "application/json" }))) return;
    } catch {
      // Fall through to fetch.
    }
    fetch("/api/analytics/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
  }

  function trackQuery(text: string, results: number) {
    if (text.length < 2 || sent.current.has(text)) return;
    sent.current.add(text);
    track({ kind: "query", q: text, results });
  }

  // Count a query once the visitor stops typing, so "c", "ca", "cal" never count.
  useEffect(() => {
    if (q.length < 2) return;
    const results = result.hits.length;
    const timer = setTimeout(() => trackQuery(q, results), TRACK_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, result.hits.length]);

  function open(hit: SearchHit) {
    if (q.length >= 2) {
      trackQuery(q, result.hits.length);
      track({ kind: "pick", q, pick: hit.key });
    }
    router.push(hit.href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showResults) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, result.hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = result.hits[active];
      if (hit) open(hit);
      else trackQuery(q, 0);
    } else if (e.key === "Escape") {
      setQuery("");
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-950 flex flex-col items-center px-4">
      <div className={`w-full max-w-2xl transition-all duration-300 ${showResults ? "pt-4 sm:pt-10" : "pt-[14vh] sm:pt-[18vh]"}`}>
        {/* Collapses to one small line while searching, so results stay above a phone keyboard. */}
        <div className={`flex items-center ${showResults ? "flex-row justify-center gap-2 mb-4" : "flex-col mb-6 sm:mb-8"}`}>
          <Image
            src="/tiger.png"
            alt=""
            width={88}
            height={88}
            priority
            className={showResults ? "w-8 h-8" : "w-16 h-16 sm:w-[88px] sm:h-[88px]"}
          />
          <h1
            className={`font-extrabold tracking-tight text-gray-900 dark:text-gray-50 ${showResults ? "text-2xl" : "mt-2 text-4xl sm:text-5xl"}`}
          >
            Tigertest
          </h1>
          {!showResults && (
            <p className="mt-2 text-center text-gray-600 dark:text-gray-300">Free practice tests for any exam, in any country.</p>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            inputMode="search"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search for your test, e.g. permit test, SAT, G1, CNA"
            aria-label="Search for a test"
            role="combobox"
            aria-expanded={showResults}
            aria-controls="test-search-results"
            aria-activedescendant={showResults && result.hits[active] ? `hit-${result.hits[active].key}` : undefined}
            className="w-full h-14 pl-12 pr-12 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-lg text-gray-900 dark:text-gray-50 shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus:border-gray-300 dark:focus:border-gray-700 transition-shadow [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {showResults && !miss && (
          <div className="mt-3">
            {result.fuzzy && <p className="px-2 pb-2 text-sm text-gray-500 dark:text-gray-400">Closest matches:</p>}
            <ul id="test-search-results" role="listbox" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
              {result.hits.map((hit, i) => (
                <li key={hit.key} id={`hit-${hit.key}`} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onClick={() => open(hit)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full flex items-center gap-3 sm:gap-4 px-4 py-3 text-left border-b last:border-b-0 border-gray-100 dark:border-gray-800 ${
                      i === active ? "bg-gray-50 dark:bg-gray-800" : ""
                    }`}
                  >
                    <span className="text-2xl leading-none shrink-0" title={hit.region === "GLOBAL" ? "Worldwide" : regionInfo(hit.region).name}>
                      {flagOf(hit.region)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-gray-900 dark:text-gray-50 truncate">{hit.title}</span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">{hit.subtitle}</span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1 shrink-0 text-sm font-semibold text-gray-900 dark:text-gray-50">
                      Start <ArrowRight className="w-4 h-4" />
                    </span>
                    <ArrowRight className="sm:hidden w-4 h-4 shrink-0 text-gray-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {miss && (
          <div className="mt-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 text-center">
            <p className="font-semibold text-gray-900 dark:text-gray-50">We don&apos;t have &ldquo;{query.trim()}&rdquo; yet.</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">We&apos;ve noted it. The tests people search for most get built next.</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                href={`/request-test?src=search&pick=other`}
                className="inline-flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 text-sm font-semibold"
              >
                Tell us about this test
              </Link>
              <Link
                href="/create"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-50"
              >
                Make your own quiz now
              </Link>
            </div>
          </div>
        )}

        {!showResults && popular.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {popular.map((t) => (
              <Link
                key={t.id}
                href={t.dashboardHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-800 px-3.5 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <span>{flagOf(regionOfTest(t.id))}</span>
                {t.shortName}
              </Link>
            ))}
          </div>
        )}

        {!showResults && (
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {flagOf(region)} Showing {regionInfo(region).name} tests first ·{" "}
            <Link href="/tests" className="underline hover:text-gray-900 dark:hover:text-gray-50">
              Browse every test
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
