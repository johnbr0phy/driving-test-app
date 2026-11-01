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
import type { Language } from "@/i18n";
import { COUNTRY_NAMES, countryNameIn, homeCopy } from "@/components/home/homeCopy";

export const FLAGS: Record<Region, string> = { US: "🇺🇸", CA: "🇨🇦", UK: "🇬🇧", IE: "🇮🇪", AU: "🇦🇺", NZ: "🇳🇿", IN: "🇮🇳",
  PH: "🇵🇭", MY: "🇲🇾", SG: "🇸🇬", HK: "🇭🇰", AE: "🇦🇪", ZA: "🇿🇦", NG: "🇳🇬", KE: "🇰🇪", PK: "🇵🇰", ES: "🇪🇸", PT: "🇵🇹", RO: "🇷🇴", SE: "🇸🇪", GR: "🇬🇷", DK: "🇩🇰", HU: "🇭🇺", BE: "🇧🇪", FI: "🇫🇮", MT: "🇲🇹", DE: "🇩🇪" };

/** Always in the row: the countries with the most Tigertest tests and visitors. */
const LARGEST: Region[] = ["US", "UK", "IN", "CA", "AU"];

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
export function CountryPills({ current, onChange, lang = "en" }: { current: Region; onChange?: (r: Region) => void; lang?: Language }) {
  const [source, setSource] = useState<string | null>(null);
  // The country this browser was placed in by location, if any (client only).
  const [geo, setGeo] = useState<Region | null>(null);
  const [open, setOpen] = useState(false);
  // The row adds the visitor's own and last-picked countries only after
  // mount, so the server HTML and the first client render match.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const src = readCookie(REGION_SOURCE_COOKIE);
    setSource(src);
    if (src === "geo") setGeo(readRegionCookie());
  }, []);
  const c = homeCopy(lang).pills;
  const nameOf = (r: Region) => COUNTRY_NAMES[lang]?.[r] ?? regionInfo(r).name;

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

  // A country link: save the pick, then a full page load (see below).
  function go(e: React.MouseEvent, r: Region, on: boolean) {
    // Let Cmd/Ctrl/Shift-click open the page in a new tab or window.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    save(r);
    if (on) return;
    if (box.current) setPinnedTop(box.current.getBoundingClientRect().top);
    window.location.assign(regionHomePath(r));
  }

  const caption =
    source === "chosen"
      ? c.saved
      : source === "geo" && current !== "US"
        ? c.geo(countryNameIn(current, lang))
        : null;

  // With about thirty countries the row is too long: it shows the current
  // country, the visitor's own, the last one picked and the five largest, and
  // "More countries" opens the rest (a plain list of links, in the page's HTML
  // even while closed, so crawlers still reach every country page).
  const inRow = new Set<Region>([current, ...LARGEST, ...(geo ? [geo] : []), ...(mounted && storeRegion ? [storeRegion] : [])]);
  const rowRegions = REGIONS.filter((r) => inRow.has(r.code));
  const moreRegions = REGIONS.filter((r) => !inRow.has(r.code));

  const pill = (on: boolean) =>
    // Text colours matter where flag emoji fall back to letters (Windows shows
    // "GB", "US"...). shrink-0 keeps every flag full size in the scrolling row.
    `flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors sm:w-12 ${
      on
        ? "bg-gray-100 text-gray-900 ring-1 ring-inset ring-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:ring-gray-600"
        : "text-gray-700 opacity-60 hover:bg-gray-100 hover:opacity-100 dark:text-gray-200 dark:hover:bg-gray-800"
    }`;
  // Flags only; the country name is the accessible label and the hover title.
  const label = (r: { code: Region }) => (
    <span aria-hidden="true" className="text-2xl leading-none">{FLAGS[r.code]}</span>
  );
  // One row that scrolls sideways when the flags outgrow the screen, never a second line.
  const row = "relative flex max-w-full gap-1 overflow-x-auto rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  const moreButton = moreRegions.length > 0 && (
    <button
      type="button"
      aria-expanded={open}
      aria-controls="more-countries"
      onClick={() => setOpen((o) => !o)}
      title={c.moreCountries}
      className="flex h-11 shrink-0 items-center gap-1 rounded-full px-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      <span className="sr-only sm:not-sr-only">{c.moreCountries}</span>
      <span aria-hidden="true">{open ? "−" : "+"}</span>
    </button>
  );

  return (
    <div ref={box} className="flex flex-col items-center">
      {onChange ? (
        <div role="radiogroup" aria-label={c.showTestsFor} className={row}>
          {rowRegions.map((r) => {
            const on = r.code === current;
            return (
              <button key={r.code} type="button" role="radio" aria-checked={on} aria-label={nameOf(r.code)} title={nameOf(r.code)} onClick={() => !on && save(r.code)} className={pill(on)}>
                {label(r)}
              </button>
            );
          })}
          {moreButton}
        </div>
      ) : (
        <nav aria-label={c.testsByCountry} className={row}>
          {rowRegions.map((r) => {
            const on = r.code === current;
            return (
              // A plain link and a full page load, not the client router: the
              // router may hold a prefetch of "/" made under the old country,
              // which middleware answered with a redirect back to it.
              <a
                key={r.code}
                href={regionHomePath(r.code)}
                aria-current={on ? "page" : undefined}
                aria-label={c.countryTests(nameOf(r.code))}
                title={nameOf(r.code)}
                onClick={(e) => go(e, r.code, on)}
                className={pill(on)}
              >
                {label(r)}
              </a>
            );
          })}
          {moreButton}
        </nav>
      )}
      {/* Every other country, as plain links (or buttons on the hub). */}
      <ul
        id="more-countries"
        hidden={!open}
        aria-label={c.moreCountries}
        // `grid` would override the hidden attribute, so the class switches too.
        className={`mt-3 ${open ? "grid" : "hidden"} w-full max-w-xl grid-cols-2 gap-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 text-sm sm:grid-cols-3`}
      >
        {moreRegions.map((r) => (
          <li key={r.code}>
            {onChange ? (
              <button
                type="button"
                onClick={() => {
                  save(r.code);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <span aria-hidden="true" className="text-lg leading-none">{FLAGS[r.code]}</span>
                {nameOf(r.code)}
              </button>
            ) : (
              <a
                href={regionHomePath(r.code)}
                onClick={(e) => go(e, r.code, false)}
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <span aria-hidden="true" className="text-lg leading-none">{FLAGS[r.code]}</span>
                {nameOf(r.code)}
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-2 min-h-5 text-center text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        {caption}
      </p>
    </div>
  );
}
