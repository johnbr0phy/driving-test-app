"use client";

import Link from "next/link";
import Image from "next/image";
import { useHomePath } from "@/hooks/useHomePath";
import { useIsPremium } from "@/hooks/useIsPremium";

/**
 * The header logo, the same in every header: the DMV tiger and "Tigertest",
 * never a test's own tiger or name. It goes home: the current test's
 * dashboard (the last one opened), or the homepage before any. The wordmark
 * hides below `sm`, leaving the tiger on phones. A Premium account's tiger
 * wears a crown.
 */
export function BrandLockup() {
  const home = useHomePath();
  const { isPremium } = useIsPremium();
  return (
    <Link href={home} aria-label="Tigertest home" className="group flex flex-shrink-0 items-center gap-2.5">
      <Image src={isPremium ? "/tiger_face_01.png" : "/tiger.png"} alt="" width={40} height={40} className="h-10 w-10" />
      <span className="hidden sm:inline text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-50 group-hover:opacity-80 transition-opacity">
        Tigertest
      </span>
    </Link>
  );
}
