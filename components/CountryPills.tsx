"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  REGIONS,
  REGION_COOKIE,
  REGION_COOKIE_MAX_AGE,
  REGION_SOURCE_COOKIE,
  Region,
  isRegion,
  regionInfo,
} from "@/lib/region";

const FLAGS: Record<Region, string> = { US: "🇺🇸", CA: "🇨🇦", UK: "🇬🇧", AU: "🇦🇺" };

/** The saved country, if any (client only). */
export function readRegionCookie(): Region | null {
  const v = readCookie(REGION_COOKIE);
  return isRegion(v) ? v : null;
}

function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

// Where the pills sat on screen when a country was picked. Module scope, not a
// ref: on the homepage the new country is a different route, so the pills
// remount before they can restore it.
let pinnedTop: number | null = null;

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${REGION_COOKIE_MAX_AGE}; samesite=lax`;
}

/**
 * The country picker at the top of the homepage hero and the /tests hub. A
 * tap saves the country in a cookie (middleware.ts reads it), then either
 * re-renders the page from the server (the homepage, whose content is
 * per-country) or tells the parent (the hub, which reorders on the client).
 */
export function CountryPills({ current, onChange }: { current: Region; onChange?: (r: Region) => void }) {
  const router = useRouter();
  const [source, setSource] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  useEffect(() => setSource(readCookie(REGION_SOURCE_COOKIE)), []);

  // A new country changes the content above the pills (the homepage), so keep
  // the pills where the visitor's thumb is instead of letting the page jump.
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = pinnedTop;
    if (target === null) return;
    pinnedTop = null;
    // Re-pin for a moment while the new content and its images settle.
    const pin = () => box.current && window.scrollBy(0, box.current.getBoundingClientRect().top - target);
    pin();
    const frame = requestAnimationFrame(pin);
    const timers = [100, 300, 600].map((ms) => setTimeout(pin, ms));
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [current]);

  function pick(r: Region) {
    pinnedTop = onChange ? null : box.current?.getBoundingClientRect().top ?? null;
    writeCookie(REGION_COOKIE, r);
    writeCookie(REGION_SOURCE_COOKIE, "chosen");
    setSource("chosen");
    if (onChange) onChange(r);
    else startTransition(() => router.refresh());
  }

  const caption =
    source === "chosen"
      ? "Saved for next time. Your progress is the same in every country."
      : source === "geo"
        ? `Showing tests for ${regionInfo(current).inName} because that's where you are. Pick another country any time.`
        : null;

  return (
    <div ref={box} className="flex flex-col items-center">
      <div
        role="radiogroup"
        aria-label="Show tests for"
        aria-busy={pending}
        className="grid w-full max-w-md grid-cols-4 gap-1 rounded-full border border-brand-border bg-white dark:bg-gray-900 p-1 shadow-sm sm:inline-grid sm:w-auto sm:max-w-none"
      >
        {REGIONS.map((r) => {
          const on = r.code === current;
          return (
            <button
              key={r.code}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={r.name}
              onClick={() => !on && pick(r.code)}
              className={`flex h-11 items-center justify-center gap-2 rounded-full px-2 text-sm font-semibold transition-colors sm:px-4 ${
                on
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span aria-hidden="true" className="text-base leading-none">{FLAGS[r.code]}</span>
              <span className="sm:hidden">{r.short}</span>
              <span className="hidden sm:inline">{r.name}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 min-h-5 text-center text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        {caption}
      </p>
    </div>
  );
}
