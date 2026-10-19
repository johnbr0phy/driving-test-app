"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getExamByPath } from "@/lib/exams";
import { getExamV2ByPath } from "@/lib/v2/registry";
import { useCurrentTest } from "@/hooks/useHomePath";

const AUTH_PATHS = ["/signup", "/login"];

/**
 * Pages that belong to no test. They keep the header, theme and footer of
 * the current test (the last dashboard opened), so the test menu still
 * reads "SAT" on /admin, /tests or /settings.
 */
const NEUTRAL_PATHS = ["/admin", "/tests", "/settings", "/request-test", "/unsubscribe"];

const under = (path: string, bases: string[]) =>
  bases.some((b) => path === b || path.startsWith(`${b}/`));

/**
 * The path that decides which exam's header, theme and footer to show.
 * Usually the current path; on /signup and /login it is the ?redirect=
 * target, so signing up from /htl/dashboard keeps the HTL tiger; on a
 * neutral page it is the current test's dashboard.
 * Read from window.location (not useSearchParams) so the root layout's
 * header never needs a Suspense boundary.
 */
export function useThemePath(): string | null {
  const pathname = usePathname();
  const [override, setOverride] = useState<string | null>(null);
  const current = useCurrentTest()?.dashboardHref ?? null;

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
    setOverride(AUTH_PATHS.includes(pathname) || under(pathname, NEUTRAL_PATHS) ? current : null);
  }, [pathname, current]);

  return override ?? pathname;
}

/** The exam a ?redirect= target belongs to, for auth page copy. */
export function examNameForPath(path: string | null): string | null {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return null;
  const clean = path.split("?")[0];
  return getExamV2ByPath(clean)?.name ?? getExamByPath(clean)?.name ?? null;
}
