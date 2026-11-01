"use client";

import Link from "next/link";
import Image from "next/image";
import { useIsPremium } from "@/hooks/useIsPremium";

/**
 * The header logo: the DMV tiger and "Tigertest", never a test's own tiger
 * or name. It goes to the homepage; the header's test chip is the way back
 * to a test (since Nov 2026; it used to open the current test). The wordmark
 * hides below `sm`, leaving the tiger on phones. A Premium account's tiger
 * wears a crown.
 */
export function BrandLockup() {
  const { isPremium } = useIsPremium();
  return (
    <Link href="/" aria-label="Tigertest home" className="group flex flex-shrink-0 items-center gap-2.5">
      <Image src={isPremium ? "/tiger_face_01.png" : "/tiger.png"} alt="" width={40} height={40} className="h-10 w-10" />
      <span className="hidden sm:inline text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-50 group-hover:opacity-80 transition-opacity">
        Tigertest
      </span>
    </Link>
  );
}
