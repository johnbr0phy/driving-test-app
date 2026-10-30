"use client";

import Link from "next/link";
import type { TestCatalogEntry } from "@/lib/testCatalog";
import { TestIcon } from "@/components/TestIcon";

/** "UK Theory Test Practice" reads as "UK Theory Test", "CDL Practice Test" as "CDL". */
export const headerTestLabel = (name: string) => name.replace(/\s+Practice( Test)?$/, "");

/**
 * Which test this page belongs to, in the header. Centred in the header row
 * from lg up; below that it fills the gap between the logo and the controls,
 * truncating if it must, so it never adds a row on a phone. Goes to the test's
 * dashboard.
 */
export function HeaderTestName({ entry, label }: { entry: TestCatalogEntry; label?: string }) {
  return (
    <Link
      href={entry.dashboardHref}
      className="mx-2 flex min-w-0 flex-1 items-center justify-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-brand dark:text-gray-50 lg:absolute lg:left-1/2 lg:top-1/2 lg:mx-0 lg:max-w-[40%] lg:-translate-x-1/2 lg:-translate-y-1/2"
    >
      <TestIcon icon={entry.icon} className="h-4 w-4 shrink-0 text-brand" />
      <span className="truncate">{label ?? headerTestLabel(entry.name)}</span>
    </Link>
  );
}
