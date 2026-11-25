// Server-safe parts of lib/statsViews.ts (no React), so API routes can
// import them without pulling a client hook into a server bundle.

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
