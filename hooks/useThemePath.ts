"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getExamByPath } from "@/lib/exams";
import { getExamV2ByPath } from "@/lib/v2/registry";

const AUTH_PATHS = ["/signup", "/login"];

/**
 * Pages that belong to no test. They keep the header, theme and footer of
 * the last test the person was in, so the logo still reads "SAT" and links
 * back to the SAT dashboard from /admin, /tests or /settings.
 */
const NEUTRAL_PATHS = ["/admin", "/tests", "/settings", "/request-test", "/unsubscribe"];

/** DMV app routes (not the landing or state pages, which anyone may browse). */
const DMV_APP_PATHS = ["/dmv", "/test", "/training", "/drill", "/stats"];

const LAST_TEST_KEY = "tigertest-last-test-path";

const under = (path: string, bases: string[]) =>
  bases.some((b) => path === b || path.startsWith(`${b}/`));

/** The path to remember for a page that belongs to a test, else null. */
function testPathFor(path: string): string | null {
  const exam = getExamV2ByPath(path) ?? getExamByPath(path);
  if (exam) return exam.slug;
  if (under(path, DMV_APP_PATHS)) return "/dmv/dashboard";
  return null;
}

/**
 * The path that decides which exam's header, theme and footer to show.
 * Usually the current path; on /signup and /login it is the ?redirect=
 * target, so signing up from /htl/dashboard keeps the HTL tiger; on a
 * neutral page it is the last test visited on this device.
 * Read from window.location (not useSearchParams) so the root layout's
 * header never needs a Suspense boundary.
 */
export function useThemePath(): string | null {
  const pathname = usePathname();
  const [override, setOverride] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) {
      setOverride(null);
      return;
    }
    if (AUTH_PATHS.includes(pathname)) {
      const target = new URLSearchParams(window.location.search).get("redirect");
      // Same-site paths only
      if (target && target.startsWith("/") && !target.startsWith("//")) {
        setOverride(target.split("?")[0]);
        return;
      }
    }
    if (AUTH_PATHS.includes(pathname) || under(pathname, NEUTRAL_PATHS)) {
      let last: string | null = null;
      try {
        last = localStorage.getItem(LAST_TEST_KEY);
      } catch {}
      setOverride(last && testPathFor(last) ? last : null);
      return;
    }
    setOverride(null);
    const testPath = testPathFor(pathname);
    if (testPath) {
      try {
        localStorage.setItem(LAST_TEST_KEY, testPath);
      } catch {}
    }
  }, [pathname]);

  return override ?? pathname;
}

/** The exam a ?redirect= target belongs to, for auth page copy. */
export function examNameForPath(path: string | null): string | null {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return null;
  const clean = path.split("?")[0];
  return getExamV2ByPath(clean)?.name ?? getExamByPath(clean)?.name ?? null;
}
