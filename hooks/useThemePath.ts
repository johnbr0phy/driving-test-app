"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const AUTH_PATHS = ["/signup", "/login"];

/**
 * The path that decides which exam's header, theme and footer to show.
 * Usually the current path; on /signup and /login it is the ?redirect=
 * target, so signing up from /htl/dashboard keeps the HTL tiger.
 * Read from window.location (not useSearchParams) so the root layout's
 * header never needs a Suspense boundary.
 */
export function useThemePath(): string | null {
  const pathname = usePathname();
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname || !AUTH_PATHS.includes(pathname)) {
      setRedirect(null);
      return;
    }
    const target = new URLSearchParams(window.location.search).get("redirect");
    // Same-site paths only
    setRedirect(target && target.startsWith("/") && !target.startsWith("//") ? target.split("?")[0] : null);
  }, [pathname]);

  return redirect ?? pathname;
}
