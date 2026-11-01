"use client";

import { useEffect, useRef, useState } from "react";
import {
  REGIONS,
  REGION_COOKIE,
  REGION_COOKIE_MAX_AGE,
  REGION_SOURCE_COOKIE,
  Region,
  isRegion,
  regionHomePath,
  regionInfo,
} from "@/lib/region";
import { useStore } from "@/store/useStore";

export const FLAGS: Record<Region, string> = { US: "🇺🇸", CA: "🇨🇦", UK: "🇬🇧", IE: "🇮🇪", AU: "🇦🇺", NZ: "🇳🇿", IN: "🇮🇳",
  PH: "🇵🇭", MY: "🇲🇾", SG: "🇸🇬", HK: "🇭🇰", AE: "🇦🇪", ZA: "🇿🇦", NG: "🇳🇬", KE: "🇰🇪", PK: "🇵🇰" };

/** The saved country, if any (client only). */
export function readRegionCookie(): Region | null {
  const v = readCookie(REGION_COOKIE);
  return isRegion(v) ? v : null;
}

function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

// Where the pills sat on screen when a country was picked, so the next page
// can put them back under the visitor's thumb. Kept in sessionStorage because
// switching country loads a new page.
const PIN_KEY = "tt-region-pills-top";

function takePinnedTop(): number | null {
  try {
    const v = sessionStorage.getItem(PIN_KEY);
    sessionStorage.removeItem(PIN_KEY);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
}

function setPinnedTop(top: number) {
  try {
    sessionStorage.setItem(PIN_KEY, String(top));
  } catch {
    // Private mode: the page simply opens at the top.
  }
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${REGION_COOKIE_MAX_AGE}; samesite=lax`;
}

/** Save a picked country: the account (useStore), this device's cookie, marked as chosen. Shared with the All tests menu and the footer. */
export function saveRegion(r: Region) {
  useStore.getState().setRegion(r);
  writeCookie(REGION_COOKIE, r);
  writeCookie(REGION_SOURCE_COOKIE, "chosen");
}

/**
 * The country picker above the catalog search. On a country homepage ("/",
 * /uk, /nz, /ph...) each pill is a real link to that country's page, so crawlers
 * follow them too; a tap also saves the country (middleware.ts reads it). On
 * the /tests hub (`onChange` set) the pills are buttons and the hub reorders.
 */
export function CountryPills({ current, onChange }: { current: Region; onChange?: (r: Region) => void }) {
  const [source, setSource] = useState<string | null>(null);
  useEffect(() => setSource(readCookie(REGION_SOURCE_COOKIE)), []);

  // The account remembers the picked country (useStore region, synced like
  // primaryExam). Keep this device's cookie in step with it once the account
  // has loaded: a pick from another device moves this one to that country's
  // page (once, the first time this device learns it), and a pick saved only
  // in this device's cookie goes up to the account.
  const storeRegion = useStore((st) => st.region);
  const userId = useStore((st) => st.userId);
  const loaded = useStore((st) => st.firestoreLoaded);
  useEffect(() => {
    if (userId && !loaded) return;
    const cookie = readRegionCookie();
    const chosen = readCookie(REGION_SOURCE_COOKIE) === "chosen";
    if (!storeRegion) {
      if (cookie && chosen) useStore.getState().setRegion(cookie);
      return;
    }
    if (cookie === storeRegion && chosen) return;
    writeCookie(REGION_COOKIE, storeRegion);
    writeCookie(REGION_SOURCE_COOKIE, "chosen");
    setSource("chosen");
    if (storeRegion === current) return;
    if (onChange) onChange(storeRegion);
    else window.location.replace(regionHomePath(storeRegion));
  }, [storeRegion, userId, loaded, current, onChange]);

  // A new country page has different content above the pills, so keep the
  // pills where the visitor's thumb is instead of letting the page jump.
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = takePinnedTop();
    if (target === null || Number.isNaN(target)) return;
    // Re-pin for a moment while the new content and its images settle.
    const pin = () => box.current && window.scrollBy(0, box.current.getBoundingClientRect().top - target);
    pin();
    const frame = requestAnimationFrame(pin);
    const timers = [100, 300, 600].map((ms) => setTimeout(pin, ms));
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Scroll the current country's flag into the middle of the row (no page scroll).
  useEffect(() => {
    const el = box.current?.firstElementChild as HTMLElement | null | undefined;
    const on = el?.querySelector<HTMLElement>('[aria-checked="true"], [aria-current="page"]');
    if (!el || !on) return;
    el.scrollLeft = on.offsetLeft - (el.clientWidth - on.offsetWidth) / 2;
  }, [current]);

  function save(r: Region) {
    saveRegion(r);
    setSource("chosen");
    onChange?.(r);
  }

  const caption =
    source === "chosen"
      ? "Saved for next time. Your progress is the same in every country."
      : source === "geo" && current !== "US"
        ? `Showing tests for ${regionInfo(current).inName} because that's where you are. Pick another country any time.`
        : null;

  const pill = (on: boolean) =>
    // Text colours matter where flag emoji fall back to letters (Windows shows
    // "GB", "US"...). shrink-0 keeps every flag full size in the scrolling row.
    `flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors sm:w-12 ${
      on
        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
    }`;
  // Flags only; the country name is the accessible label and the hover title.
  const label = (r: (typeof REGIONS)[number]) => (
    <span aria-hidden="true" className="text-2xl leading-none">{FLAGS[r.code]}</span>
  );
  // One row that scrolls sideways when the flags outgrow the screen, never a second line.
  const row = "relative flex max-w-full gap-1 overflow-x-auto rounded-full border border-brand-border bg-white dark:bg-gray-900 p-1 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  return (
    <div ref={box} className="flex flex-col items-center">
      {onChange ? (
        <div role="radiogroup" aria-label="Show tests for" className={row}>
          {REGIONS.map((r) => {
            const on = r.code === current;
            return (
              <button key={r.code} type="button" role="radio" aria-checked={on} aria-label={r.name} title={r.name} onClick={() => !on && save(r.code)} className={pill(on)}>
                {label(r)}
              </button>
            );
          })}
        </div>
      ) : (
        <nav aria-label="Tests by country" className={row}>
          {REGIONS.map((r) => {
            const on = r.code === current;
            return (
              // A plain link and a full page load, not the client router: the
              // router may hold a prefetch of "/" made under the old country,
              // which middleware answered with a redirect back to it.
              <a
                key={r.code}
                href={regionHomePath(r.code)}
                aria-current={on ? "page" : undefined}
                aria-label={`${r.name} tests`}
                title={r.name}
                onClick={(e) => {
                  // Let Cmd/Ctrl/Shift-click open the page in a new tab or window.
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  save(r.code);
                  if (on) return;
                  if (box.current) setPinnedTop(box.current.getBoundingClientRect().top);
                  window.location.assign(regionHomePath(r.code));
                }}
                className={pill(on)}
              >
                {label(r)}
              </a>
            );
          })}
        </nav>
      )}
      <p className="mt-2 min-h-5 text-center text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        {caption}
      </p>
    </div>
  );
}
