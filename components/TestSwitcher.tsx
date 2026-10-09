"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LayoutGrid, Search, X } from "lucide-react";
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

/**
 * Header menu for moving between the site's practice tests. Lives in both
 * the DMV header and the exam headers. A search box filters a compact,
 * grouped list; items link to each test's landing page (the SEO page),
 * with the current test pinned at the top. Enter opens the first match.
 */
export function TestSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const current = getCatalogEntryByPath(pathname);

  const groups = useMemo(() => searchTestGroups(query), [query]);
  const first = groups[0]?.tests[0];
  const searching = query.trim().length > 0;

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`Switch practice test, currently ${current.shortName}`}
        className={`flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ${className}`}
      >
        <LayoutGrid className="h-4 w-4 text-gray-500" aria-hidden="true" />
        <span className="hidden sm:inline font-medium">All tests</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
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
        <div data-theme={current.theme}>
          <div className="relative border-b border-gray-100 p-2">
            <Search
              className="pointer-events-none absolute left-[18px] top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
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
                  router.push(first.href);
                }
              }}
              placeholder="Search tests"
              aria-label="Search practice tests"
              autoComplete="off"
              className="h-9 w-full rounded-lg bg-gray-100 pl-9 pr-8 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand"
            />
            {searching && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="max-h-[min(60vh,26rem,calc(var(--radix-popover-content-available-height)_-_6.5rem))] overflow-y-auto overscroll-contain p-1.5">
            {!searching && (
              <div className="mb-1 border-b border-gray-100 pb-1.5">
                <SwitcherItem test={current} isActive onSelect={close} />
              </div>
            )}

            {groups.length === 0 && (
              <p className="px-2.5 py-6 text-center text-sm text-gray-500">
                No tests match &ldquo;{query}&rdquo;.
              </p>
            )}

            {groups.map((g) => (
              <div key={g.title} className="mb-1">
                <p className="px-2.5 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  {g.title}
                </p>
                <ul>
                  {g.tests.map((t) => (
                    <li key={t.id}>
                      <SwitcherItem
                        test={t}
                        isActive={!searching && t.id === current.id}
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
            className="block border-t border-gray-100 px-4 py-2.5 text-center text-sm font-medium text-brand hover:bg-gray-50"
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
  isActive,
  onSelect,
}: {
  test: TestCatalogEntry;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div data-theme={test.theme}>
      <Link
        href={test.href}
        onClick={onSelect}
        aria-current={isActive ? "page" : undefined}
        className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-gray-100 ${
          isActive ? "bg-gray-100" : ""
        }`}
      >
        <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md ${hasTigerSet(test.id) ? "" : "bg-brand text-white"}`}>
          <TestIcon examId={test.id} icon={test.icon} className={hasTigerSet(test.id) ? "h-7 w-7" : "h-3.5 w-3.5"} />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-sm font-medium text-gray-900">
            {test.shortName}
          </span>
          <span className="block truncate text-[11px] text-gray-500">
            {test.org}
          </span>
        </span>
        {isActive && (
          <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wide text-brand">
            Current
          </span>
        )}
      </Link>
    </div>
  );
}
