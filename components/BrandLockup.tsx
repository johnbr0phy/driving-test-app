"use client";

import Link from "next/link";
import Image from "next/image";
import { useHomePath } from "@/hooks/useHomePath";

/**
 * The header logo, the same in every header: the DMV tiger and "tigertest",
 * never a test's own tiger or name. It goes home: the current test's
 * dashboard (the last one opened), or the homepage before any. The wordmark
 * hides below `sm`, leaving the tiger on phones.
 */
export function BrandLockup() {
  const home = useHomePath();
  return (
    <Link href={home} aria-label="tigertest home" className="group flex flex-shrink-0 items-center gap-2.5">
      <Image src="/tiger.png" alt="" width={40} height={40} className="h-10 w-10" />
      <span className="hidden sm:inline text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-50 group-hover:opacity-80 transition-opacity">
        tigertest
      </span>
    </Link>
  );
}
