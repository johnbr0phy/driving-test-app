// Which sitemap URLs to send to IndexNow. Bing (and ChatGPT search, which
// reads Bing) re-crawls what it is told about, so the deploy hook and the
// nightly cron send only pages whose lastmod is recent; a full resubmit of
// every URL every night reads as noise and can slow Bing down for the site.

export type DatedUrl = { url: string; lastModified: string };

/** UTC date (YYYY-MM-DD) `days` days before `now`. */
export function cutoffDate(days: number, now: Date = new Date()): string {
  const d = new Date(now.getTime() - days * 86_400_000);
  return d.toISOString().slice(0, 10);
}

/** Entries whose lastmod is on or after the cutoff, URLs de-duplicated. */
export function recentUrls(entries: DatedUrl[], days: number, now: Date = new Date()): string[] {
  const cutoff = cutoffDate(days, now);
  const urls = new Set<string>();
  for (const e of entries) {
    if (e.lastModified.slice(0, 10) >= cutoff) urls.add(e.url);
  }
  return Array.from(urls);
}

/** IndexNow takes at most 10,000 URLs per request. */
export const INDEXNOW_MAX_URLS = 10_000;
