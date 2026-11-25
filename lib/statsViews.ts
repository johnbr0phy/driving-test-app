// Stats page traffic (Nov 2026): how many people open a stats page, by day
// and by where they came from, so the effect of moving the way in (the Tiger
// Time chip in the site header, components/DailyRank.tsx) can be measured.
//
// The link a person taps notes its source in sessionStorage
// (noteStatsSource); the stats page, once it actually renders for them,
// reads and clears it and sends one view (useStatsView). Anything without a
// noted source (dashboards, results, typed URLs) counts as "other". Counts
// go to analytics/statsViews through /api/analytics/stats-view; the card is
// on the /admin Growth tab. Test, internal and analytics-declined browsers
// never send (isTestBrowser, isInternalBrowser), and bots are refused.

import { useEffect, useRef } from "react";
import { auth } from "@/lib/firebase";
import { isInternalBrowser, isTestBrowser } from "@/lib/internal";

export const STATS_VIEWS_DOC = "analytics/statsViews";

/** Where a stats page visit came from. */
export const STATS_SOURCES = [
  "header_icon", // the Your Stats icon in the site header
  "header_chip", // the Tiger Time chip in the site header (when it replaces the icon)
  "bar_chip", // the Tiger Time chip in a training or drill bar
  "bar_link", // "View stats" in a test, training or drill bar
  "done_link", // "View stats" on a finished training set
  "other", // anything else: dashboards, results, typed or shared URLs
] as const;
export type StatsSource = (typeof STATS_SOURCES)[number];

export const isStatsSource = (v: unknown): v is StatsSource =>
  typeof v === "string" && (STATS_SOURCES as readonly string[]).includes(v);

/** Human labels for the admin card. */
export const STATS_SOURCE_LABELS: Record<StatsSource, string> = {
  header_icon: "Header stats icon",
  header_chip: "Header Tiger Time chip",
  bar_chip: "Test bar Tiger Time chip",
  bar_link: "Test bar \"View stats\"",
  done_link: "Set complete \"View stats\"",
  other: "Other (dashboard, results, direct)",
};

const KEY = "tigertest-stats-from";
/** A noted source older than this is ignored (the tap did not lead here). */
const NOTE_TTL_MS = 60_000;

function quiet(): boolean {
  return isTestBrowser() || isInternalBrowser(auth.currentUser?.email);
}

/** Call from a link's onClick just before it opens a stats page. */
export function noteStatsSource(source: StatsSource) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ source, at: Date.now() }));
  } catch {
    // Storage blocked: the visit counts as "other".
  }
}

function takeSource(): StatsSource {
  try {
    const raw = JSON.parse(sessionStorage.getItem(KEY) || "null") as { source?: unknown; at?: number } | null;
    sessionStorage.removeItem(KEY);
    if (raw && isStatsSource(raw.source) && typeof raw.at === "number" && Date.now() - raw.at < NOTE_TTL_MS) return raw.source;
  } catch {
    // Fall through.
  }
  return "other";
}

/**
 * One view per stats page visit, sent once the page is really shown to the
 * person (`ready`: past the sign-in gate and loaded). `exam` is the test's
 * key (dmv, an exam id or a v2 exam id).
 */
export function useStatsView(exam: string, ready: boolean) {
  const sent = useRef(false);
  useEffect(() => {
    if (!ready || sent.current || typeof window === "undefined") return;
    sent.current = true;
    const source = takeSource();
    if (quiet()) return;
    void fetch("/api/analytics/stats-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, exam: exam.slice(0, 40) }),
      keepalive: true,
    }).catch(() => {});
  }, [exam, ready]);
}
