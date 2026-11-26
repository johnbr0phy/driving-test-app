"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Every new page opens at the very top, with the site header in view.
 *
 * The App Router scrolls a new page so its own segment (inside <main>) is at
 * the top of the screen, which leaves the header in the root layout just
 * above it: phones opened dashboards with the nav scrolled away. On each
 * pathname change this scrolls the window to 0, except:
 * - Back/Forward (popstate): the browser and Next restore the old position.
 * - A #hash in the URL: Next scrolls to that element (e.g. #today-rank).
 * - The first render (a full load): the browser decides.
 * Query-only changes (?tab=) never scroll. Rendered before <main> so a page's
 * own scroll on arrival (the dashboards' ?completed= row) runs after this.
 */
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const first = useRef(true);
  const poppedAt = useRef(0);

  useEffect(() => {
    const onPop = () => {
      poppedAt.current = Date.now();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // Back/Forward: Next restores the old position (a hash-only Back, with no
    // pathname change, ages out instead of skipping the next real navigation).
    if (Date.now() - poppedAt.current < 1000) return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
