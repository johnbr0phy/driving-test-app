"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ChevronRight, History, Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FLAGS, readRegionCookie } from "@/components/CountryPills";
import { useAuth } from "@/contexts/AuthContext";
import { useTestsInProgress } from "@/hooks/useTestsInProgress";
import { Region, TestRegion, regionHomePath, regionOfTest } from "@/lib/region";
import { normalizeQuery, searchAllTests, SearchHit } from "@/lib/testSearch";
import { trackSearch } from "@/lib/searchTracking";
import { useStore } from "@/store/useStore";

const flagOf = (r: TestRegion) => (r === "GLOBAL" ? "🌐" : FLAGS[r]);
const TRACK_DELAY_MS = 1200;

function progressLine(mastered: number, testsTaken: number): string {
  const parts = [];
  if (mastered > 0) parts.push(`${mastered} mastered`);
  if (testsTaken > 0) parts.push(`${testsTaken} test${testsTaken === 1 ? "" : "s"} taken`);
  return parts.join(" · ") || "Started";
}

/**
 * The header's test chip opens this: the homepage search (every test in every
 * country) with the person's own tests above it. It replaced the All tests menu.
 */
export function TestSearchSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const { user } = useAuth();
  const storeRegion = useStore((s) => s.region);
  const [region, setRegion] = useState<Region>("US");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const sent = useRef(new Set<string>());
  const started = useTestsInProgress();

  useEffect(() => {
    if (open) setRegion(readRegionCookie() ?? storeRegion ?? "US");
    else setQuery("");
  }, [open, storeRegion]);

  const result = useMemo(() => searchAllTests(query, region), [query, region]);
  const q = normalizeQuery(query);
  const searching = q.length > 0;
  const found = result.partial ? 0 : result.hits.length;
  useEffect(() => setActive(0), [query]);

  const trackQuery = (text: string, results: number) => {
    if (text.length < 2 || sent.current.has(text)) return;
    sent.current.add(text);
    trackSearch({ kind: "query", q: text, results }, region, user?.email);
  };
  useEffect(() => {
    if (q.length < 2) return;
    const timer = setTimeout(() => trackQuery(q, found), TRACK_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, found]);

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };
  const pick = (hit: SearchHit) => {
    if (q.length >= 2) {
      trackQuery(q, found);
      trackSearch({ kind: "pick", q, pick: hit.key }, region, user?.email);
    }
    go(hit.href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          // On touch screens the keyboard would cover the list before it can be read.
          if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
        }}
        className="top-4 sm:top-16 translate-y-0 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] flex flex-col w-[calc(100vw-24px)] max-w-xl max-h-[calc(100dvh-32px)] sm:max-h-[min(36rem,calc(100dvh-8rem))] overflow-hidden rounded-3xl sm:rounded-3xl p-3 gap-2 [&>button:last-child]:hidden"
      >
        <DialogTitle className="sr-only">Find a test</DialogTitle>
        <div className="relative shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            inputMode="search"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (!searching) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, result.hits.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                const hit = result.hits[active];
                if (hit) pick(hit);
                else trackQuery(q, 0);
              }
            }}
            placeholder="Search for your test"
            aria-label="Search for a test"
            className="search-pill w-full h-12 pl-12 pr-12 rounded-full bg-gray-100 dark:bg-gray-800 text-base text-gray-900 dark:text-gray-50 placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={() => (query ? (setQuery(""), inputRef.current?.focus()) : onOpenChange(false))}
            aria-label={query ? "Clear search" : "Close"}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain -mx-1 px-1">
        {searching ? (
          result.hits.length > 0 ? (
            <div>
              {(result.partial || result.fuzzy) && (
                <p className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
                  {result.partial ? <>We don&apos;t have &ldquo;{query.trim()}&rdquo; yet, and we&apos;ve noted it. Closest matches:</> : "Closest matches:"}
                </p>
              )}
              <ul role="listbox" aria-label="Tests">
                {result.hits.map((hit, i) => (
                  <li key={hit.key} role="option" aria-selected={i === active}>
                    <button
                      type="button"
                      onClick={() => pick(hit)}
                      onMouseEnter={() => setActive(i)}
                      className={`w-full flex items-center gap-4 rounded-2xl px-3 py-3 text-left ${i === active ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                    >
                      <span className="text-2xl leading-none shrink-0">{flagOf(hit.region)}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-gray-900 dark:text-gray-50 truncate">{hit.title}</span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">{hit.subtitle}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 p-5 text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-50">We don&apos;t have &ldquo;{query.trim()}&rdquo; yet.</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">We&apos;ve noted it. The tests people search for most get built next.</p>
              <div className="mt-3 flex flex-col sm:flex-row gap-2 justify-center">
                <Link href="/request-test?src=search&pick=other" onClick={() => onOpenChange(false)} className="rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-semibold">
                  Tell us about this test
                </Link>
                <Link href="/create" onClick={() => onOpenChange(false)} className="rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
                  Make your own quiz
                </Link>
              </div>
            </div>
          )
        ) : (
          <div>
            {started.length > 0 && (
              <>
                <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Your tests</p>
                <ul>
                  {started.map(({ test, mastered, testsTaken }) => (
                    <li key={test.id}>
                      <button
                        type="button"
                        onClick={() => go(test.dashboardHref)}
                        className="w-full flex items-center gap-4 rounded-2xl px-3 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <History className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400" aria-hidden />
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-gray-900 dark:text-gray-50 truncate">{test.name}</span>
                          <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">{progressLine(mastered, testsTaken)}</span>
                        </span>
                        <span className="text-xl leading-none shrink-0">{flagOf(regionOfTest(test.id))}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Link
              href={regionHomePath(region)}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-4 rounded-2xl px-3 py-3 text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="flex-1 font-semibold">Browse every test</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
