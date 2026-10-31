"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useThemePath } from "@/hooks/useThemePath";
import { Check, ChevronDown, LayoutGrid, Search, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getCatalogEntryByPath,
  searchTestGroups,
  TestCatalogEntry,
} from "@/lib/testCatalog";
import { TestIcon } from "@/components/TestIcon";
import { hasTigerSet } from "@/lib/tigerAssets";
import { useStartedTests } from "@/hooks/useStartedTests";
import { useCurrentTest } from "@/hooks/useHomePath";
import { FLAGS, readRegionCookie, saveRegion } from "@/components/CountryPills";
import { REGIONS, Region, isRegion, orderGroupsForRegion, regionInfo, regionOfTest } from "@/lib/region";
import { useStore } from "@/store/useStore";

const SEEN_KEY = "tigertest-seen-all-tests";

/**
 * Header menu for moving between the site's practice tests. Lives in both
 * the DMV header and the exam headers. A search box filters a compact,
 * grouped list; items link to each test's landing page (the SEO page),
 * with the current test (the last dashboard opened, see useCurrentTest)
 * pinned at the top; a visitor who has opened no dashboard has none. Tests
 * already in progress link to their dashboard instead. Enter opens the first match.
 * A country dropdown beside the search lists that country's tests and the
 * worldwide ones (search still finds every test), so someone studying for
 * another country's exam can switch from any page. Picking one saves it like
 * the homepage pills; it starts on the saved country, else the current test's.
 */
export function TestSwitcher({ className = "" }: { className?: string }) {
  const pathname = useThemePath();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // The menu takes the page's colors; the pinned test is the current one.
  const pageTest = getCatalogEntryByPath(pathname);
  const current = useCurrentTest();
  const hasStarted = useStartedTests();
  const hrefFor = (t: TestCatalogEntry) => (hasStarted(t.id) || t.id === current?.id ? t.dashboardHref : t.href);
  // "New" badge until the menu is opened once. Read after mount so the
  // server render (no badge) matches the first client render.
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(SEEN_KEY)) setShowNew(true);
    } catch {}
  }, []);

  const storeRegion = useStore((st) => st.region);
  const [region, setRegion] = useState<Region>("US");
  useEffect(() => {
    if (!open) return;
    const currentRegion = current ? regionOfTest(current.id) : null;
    setRegion(readRegionCookie() ?? storeRegion ?? (isRegion(currentRegion) ? currentRegion : "US"));
    // Only on opening: a pick inside the menu sets `region` itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const [regionOpen, setRegionOpen] = useState(false);
  const pickRegion = (r: Region) => {
    setRegion(r);
    saveRegion(r);
    setRegionOpen(false);
    // Search ignores the country, so a pick made mid-search shows the country's list.
    setQuery("");
  };

  const searching = query.trim().length > 0;
  const groups = useMemo(
    () =>
      orderGroupsForRegion(
        searching
          ? searchTestGroups(query)
          : searchTestGroups(query)
              .filter((g) => g.title !== "Most popular" || region === "US")
              .map((g) =>
                g.title === "Most popular"
                  ? g
                  : // Mixed groups (citizenship, nurse licensing) keep only this country's and worldwide members.
                    { ...g, tests: g.tests.filter((t) => regionOfTest(t.id) === region || regionOfTest(t.id) === "GLOBAL") }
              )
              .filter((g) => g.tests.length > 0),
        region
      ),
    [query, searching, region]
  );
  const first = groups[0]?.tests[0];

  useEffect(() => {
    if (!open) {
      setQuery("");
      setRegionOpen(false);
    }
    if (open && showNew) {
      setShowNew(false);
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {}
    }
  }, [open, showNew]);

  const close = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={current ? `All tests: switch practice test, currently ${current.shortName}` : "All tests: choose a practice test"}
        className={`relative flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-1.5 text-sm text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ${className}`}
      >
        <LayoutGrid className="h-4 w-4 text-gray-500 dark:text-gray-400 sm:hidden" aria-hidden="true" />
        <span className="hidden sm:inline font-medium">All tests</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-500 dark:text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
        {showNew && (
          <span className="pointer-events-none absolute -right-2.5 -top-2 rounded-md bg-red-600 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-white shadow-sm ring-2 ring-white">
            New
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        collisionPadding={12}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          // Focus the search only with a mouse or trackpad. On touch devices
          // the keyboard would cover most of the list before the user can read it.
          if (window.matchMedia("(pointer: fine)").matches)
            inputRef.current?.focus();
        }}
        className="w-[calc(100vw-24px)] sm:w-[20rem] p-0 overflow-hidden rounded-xl"
      >
        <div data-theme={pageTest.theme}>
          <div className="flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-800 p-2">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                role="searchbox"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && first) {
                    e.preventDefault();
                    close();
                    router.push(hrefFor(first));
                  }
                }}
                placeholder="Search tests"
                aria-label="Search practice tests"
                autoComplete="off"
                className="h-9 w-full rounded-lg bg-gray-100 dark:bg-gray-800 pl-9 pr-8 text-base sm:text-sm text-gray-900 dark:text-gray-50 placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              {searching && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <Popover open={regionOpen} onOpenChange={setRegionOpen}>
              <PopoverTrigger
                aria-label={`Show tests for: ${regionInfo(region).name}`}
                title="Show tests for"
                className="flex h-9 shrink-0 items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 px-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span aria-hidden="true" className="text-base leading-none">{FLAGS[region]}</span>
                {regionInfo(region).short}
                <ChevronDown
                  className={`h-3.5 w-3.5 text-gray-500 dark:text-gray-400 transition-transform ${regionOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </PopoverTrigger>
              <PopoverContent
                align="end"
                collisionPadding={12}
                onOpenAutoFocus={(e) => {
                  e.preventDefault();
                  (e.currentTarget as HTMLElement | null)?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();
                }}
                className="w-56 p-1 rounded-xl"
              >
                <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Show tests for
                </p>
                <div
                  role="radiogroup"
                  aria-label="Show tests for"
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                    e.preventDefault();
                    const items = [...e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')];
                    const i = items.indexOf(document.activeElement as HTMLElement);
                    items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
                  }}
                >
                  {REGIONS.map((r) => {
                    const on = r.code === region;
                    return (
                      <button
                        key={r.code}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => pickRegion(r.code)}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors focus:outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          on ? "font-semibold text-gray-900 dark:text-gray-50" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span aria-hidden="true" className="text-base leading-none">{FLAGS[r.code]}</span>
                        <span className="flex-1">{r.name}</span>
                        {on && <Check className="h-4 w-4 text-gray-900 dark:text-gray-50" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="max-h-[min(60vh,26rem,calc(var(--radix-popover-content-available-height)_-_9rem))] overflow-y-auto overscroll-contain p-1.5">
            {!searching && current && (
              <div className="mb-1 border-b border-gray-100 dark:border-gray-800 pb-1.5">
                <SwitcherItem
                  test={current}
                  href={hrefFor(current)}
                  started={hasStarted(current.id)}
                  isActive
                  onSelect={close}
                />
              </div>
            )}

            {groups.length === 0 && (
              <p className="px-2.5 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                No tests match &ldquo;{query}&rdquo;.
              </p>
            )}

            {groups.map((g) => (
              <div key={g.title} className="mb-1">
                <p className="px-2.5 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {g.title}
                </p>
                <ul>
                  {g.tests.map((t) => (
                    <li key={t.id}>
                      <SwitcherItem
                        test={t}
                        href={hrefFor(t)}
                        started={hasStarted(t.id)}
                        isActive={!searching && t.id === current?.id}
                        onSelect={close}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link
            href="/tests"
            onClick={close}
            className="block border-t border-gray-100 dark:border-gray-800 px-4 py-2.5 text-center text-sm font-medium text-brand-dark hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Browse all tests →
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SwitcherItem({
  test,
  href,
  started,
  isActive,
  onSelect,
}: {
  test: TestCatalogEntry;
  href: string;
  started: boolean;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div data-theme={test.theme}>
      <Link
        href={href}
        onClick={onSelect}
        aria-current={isActive ? "page" : undefined}
        className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isActive ? "bg-gray-100 dark:bg-gray-800" : ""
        }`}
      >
        <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md ${hasTigerSet(test.id) ? "" : "bg-brand text-white"}`}>
          <TestIcon examId={test.id} icon={test.icon} className={hasTigerSet(test.id) ? "h-7 w-7" : "h-3.5 w-3.5"} />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-sm font-medium text-gray-900 dark:text-gray-50">
            {test.shortName}
          </span>
          <span className={`block truncate text-[11px] ${started ? "font-medium text-brand-dark" : "text-gray-500 dark:text-gray-400"}`}>
            {started ? "In progress" : test.org}
          </span>
        </span>
        {isActive && (
          <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wide text-brand-dark">
            Current
          </span>
        )}
      </Link>
    </div>
  );
}
