"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  COUNTRY_COOKIE,
  CONSENT_COOKIE,
  GA_ID,
  REOPEN_CONSENT_EVENT,
  analyticsAllowed,
  needsConsentBanner,
  visitorCountryCookie,
  writeCookie,
} from "@/lib/privacyRegion";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void } & Record<string, unknown>;

/**
 * Keeps Google Analytics' kill switch in step with lib/privacyRegion.ts as
 * the person moves around the site, learns the visitor's country once
 * (/api/geo), and shows the cookie banner to visitors in the EEA, the UK and
 * Switzerland until they choose. When analytics becomes allowed on a page
 * where it was off, the page view is sent then.
 */
export function AnalyticsConsent() {
  const pathname = usePathname() ?? "/";
  const [banner, setBanner] = useState(false);
  const enabled = useRef<boolean | null>(null);

  const apply = useCallback(() => {
    const w = window as unknown as GtagWindow;
    const allowed = analyticsAllowed(pathname);
    w[`ga-disable-${GA_ID}`] = !allowed;
    if (allowed && enabled.current === false && typeof w.gtag === "function") {
      w.gtag("config", GA_ID, { page_path: pathname });
    }
    enabled.current = allowed;
    setBanner(needsConsentBanner(pathname));
  }, [pathname]);

  useEffect(() => {
    if (enabled.current === null) {
      // The <head> script already decided for the first page.
      enabled.current = (window as unknown as GtagWindow)[`ga-disable-${GA_ID}`] !== true;
    }
    if (visitorCountryCookie()) {
      apply();
      return;
    }
    let cancelled = false;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d: { country?: string }) => {
        if (cancelled) return;
        writeCookie(COUNTRY_COOKIE, typeof d.country === "string" ? d.country : "ZZ");
        apply();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [apply]);

  useEffect(() => {
    const reopen = () => setBanner(true);
    window.addEventListener(REOPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_CONSENT_EVENT, reopen);
  }, []);

  const choose = (value: "granted" | "denied") => {
    writeCookie(CONSENT_COOKIE, value);
    if (value === "denied") {
      // Drop the cookies GA set before, if any.
      for (const c of document.cookie.split("; ")) {
        const name = c.split("=")[0];
        if (name === "_ga" || name.startsWith("_ga_")) {
          for (const domain of ["", `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, "")}`]) {
            document.cookie = `${name}=; path=/; max-age=0${domain}`;
          }
        }
      }
    }
    apply();
    setBanner(false);
  };

  if (!banner) return null;
  return (
    <div
      role="dialog"
      aria-label="Cookie choice"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-xl rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-4 text-sm text-gray-700 dark:text-gray-200">
        <p>
          May we use Google Analytics cookies to see which pages help people pass? Your progress works either way.{" "}
          <Link href="/privacy#cookies" className="underline">
            Privacy policy
          </Link>
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="flex-1 rounded-lg border-2 border-gray-300 dark:border-gray-700 px-3 py-2 font-medium text-gray-900 dark:text-gray-50"
          >
            No thanks
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="flex-1 rounded-lg border-2 border-gray-900 dark:border-white bg-gray-900 dark:bg-white px-3 py-2 font-medium text-white dark:text-gray-900"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
}

/** "Cookie settings" on /privacy: reopens the banner, for any visitor. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REOPEN_CONSENT_EVENT))}
      className="underline text-brand-dark"
    >
      Change your cookie choice
    </button>
  );
}
