"use client";

import { useCallback, useEffect, useRef } from "react";
import { trackSearch } from "@/lib/searchTracking";
import type { Region } from "@/lib/region";

const TRACK_DELAY_MS = 1200;

/**
 * Counts what someone searched for, not every pause on the way there. A query
 * is held while the visitor keeps typing into it ("written clin" then
 * "written clinical exam"): each pause replaces the held one, and it is sent
 * only when they open a test, press Enter, clear the box, start an unrelated
 * search, or leave the page. So the Searches tab sees one row per search.
 */
export function useSearchTracking(q: string, results: number, region: Region, email?: string | null) {
  const pending = useRef<{ q: string; results: number } | null>(null);
  const sent = useRef(new Set<string>());
  const ctx = useRef({ region, email });
  ctx.current = { region, email };

  const flush = useCallback(() => {
    const p = pending.current;
    pending.current = null;
    if (!p || p.q.length < 2 || sent.current.has(p.q)) return;
    sent.current.add(p.q);
    trackSearch({ kind: "query", q: p.q, results: p.results }, ctx.current.region, ctx.current.email);
  }, []);

  const hold = useCallback(
    (text: string, n: number) => {
      const p = pending.current;
      // A new search that does not continue (or back up) the held one ends it.
      if (p && !text.startsWith(p.q) && !p.q.startsWith(text)) flush();
      pending.current = { q: text, results: n };
    },
    [flush],
  );

  useEffect(() => {
    if (q.length < 2) {
      flush();
      return;
    }
    const timer = setTimeout(() => hold(q, results), TRACK_DELAY_MS);
    return () => clearTimeout(timer);
  }, [q, results, hold, flush]);

  // Leaving the page (or closing the sheet, which unmounts nothing but clears q) sends what is held.
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onHide);
      flush();
    };
  }, [flush]);

  /** Enter with nothing to open: count the search as it stands. */
  const submit = useCallback(
    (text: string, n: number) => {
      if (text.length < 2) return;
      hold(text, n);
      flush();
    },
    [hold, flush],
  );

  /** A test was opened from this search. */
  const picked = useCallback(
    (text: string, n: number, key: string) => {
      if (text.length < 2) return;
      submit(text, n);
      trackSearch({ kind: "pick", q: text, pick: key }, ctx.current.region, ctx.current.email);
    },
    [submit],
  );

  return { submit, picked };
}
