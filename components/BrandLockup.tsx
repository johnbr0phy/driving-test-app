"use client";

import Link from "next/link";
import Image from "next/image";
import { useIsPremium } from "@/hooks/useIsPremium";

/**
 * The header logo goes to the homepage. It never uses a test's own tiger.
 * Premium uses a separate open-eyed crowned icon, not the results mascot.
 */
export function BrandLockup() {
  const { isPremium } = useIsPremium();
  return (
    <Link href="/" aria-label="Tigertest home" className="flex flex-shrink-0 items-center hover:opacity-80 transition-opacity">
      <Image src={isPremium ? "/tiger-premium-header.webp" : "/tiger.png"} alt="" width={40} height={40} className="h-10 w-10" />
    </Link>
  );
}
