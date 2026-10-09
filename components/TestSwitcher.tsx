"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, LayoutGrid } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TEST_CATALOG, getCatalogEntryByPath } from "@/lib/testCatalog";
import { TestIcon } from "@/components/TestIcon";

/**
 * Header menu for moving between the site's practice tests. Lives in both
 * the DMV header and the exam headers. Items link to each test's landing
 * page (the SEO page), with the current test marked.
 */
export function TestSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = getCatalogEntryByPath(pathname);

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

      <PopoverContent align="end" className="w-64 p-1">
        <ul>
          {TEST_CATALOG.map((t) => {
            const isActive = t.id === current.id;
            return (
              <li key={t.id}>
                <Link
                  href={t.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex w-full items-center gap-2.5 rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
                    isActive ? "font-semibold text-gray-900" : "text-gray-700"
                  }`}
                >
                  <span className="text-gray-500">
                    <TestIcon icon={t.icon} className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    {t.shortName}
                    <span className="block text-xs font-normal text-gray-500">{t.org}</span>
                  </span>
                  {isActive && <Check className="h-4 w-4 text-brand" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
          <li className="mt-1 border-t pt-1">
            <Link
              href="/tests"
              onClick={() => setOpen(false)}
              className="block rounded-sm px-2 py-2 text-sm font-medium text-brand hover:bg-gray-100"
            >
              Compare all practice tests →
            </Link>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
