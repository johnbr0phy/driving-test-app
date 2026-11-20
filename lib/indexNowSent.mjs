// The record of what has been sent to IndexNow (Bing, which ChatGPT search
// reads), shared by the two senders so they write the same shape:
//   - scripts/indexnow-recent.mjs, after every production deploy (GitHub Actions)
//   - app/api/indexnow/ping (lib/server/indexNowLog.ts), the nightly Vercel cron
// Firestore:
//   indexNow/sent      { urls: { <key>: { first, last, n } }, updatedAt,
//                        lastRun: { <source>: { at, count, status, ok } } }
//                      one entry per page path (key = path with / as | and . as ~),
//                      first and last ISO times it was sent, n = times sent
//   indexNowRuns/{id}  { at, source, days, count, status, ok, sha, paths }
// "Sent" means Bing accepted the list (HTTP 200/202). Bing does not report back
// whether or when it indexed a page. Read by the /admin New tests tab.
// Both senders skip pages already sent since their lastmod (unsentUrls).
// Pinned by tests/indexnow.test.cjs.

export const SENT_COLLECTION = "indexNow";
export const SENT_DOC = "sent";
export const RUNS_COLLECTION = "indexNowRuns";

/** The path of a site URL ("https://www.tigertest.io/x/" -> "/x"; the homepage is "/"). */
export function pathOfUrl(url) {
  let p;
  try {
    p = new URL(url).pathname;
  } catch {
    p = String(url);
  }
  p = p.toLowerCase().replace(/\/+$/, "");
  return p || "/";
}

/** Firestore map key for a path: no slashes, no dots. */
export function sentKey(path) {
  return path.replace(/\//g, "|").replace(/\./g, "~");
}

export function pathFromSentKey(key) {
  return key.replace(/\|/g, "/").replace(/~/g, ".");
}

/**
 * The entries to write for one accepted submission: each URL's first-sent time
 * kept from `existing` (the stored urls map), its last-sent time set to `at`
 * and its count raised by one.
 * @param {Record<string, {first: string, last: string, n: number}> | undefined} existing
 * @param {string[]} urls
 * @param {string} at ISO time
 */
export function mergeSent(existing, urls, at) {
  const out = {};
  for (const url of urls) {
    const key = sentKey(pathOfUrl(url));
    if (out[key]) continue;
    const prev = existing && existing[key];
    out[key] = { first: (prev && prev.first) || at, last: at, n: ((prev && prev.n) || 0) + 1 };
  }
  return out;
}

/**
 * One submission, for indexNowRuns.
 * @param {{source: string, urls: string[], status: number, ok: boolean, at: string, days?: number | null, sha?: string | null}} r
 */
export function runRecord(r) {
  return {
    at: r.at,
    source: r.source,
    days: r.days ?? null,
    count: r.urls.length,
    status: r.status,
    ok: r.ok,
    sha: r.sha ?? null,
    paths: r.urls.map(pathOfUrl),
  };
}

/** The fields to merge into indexNow/sent for any run, accepted or not: its sender's latest run. */
export function lastRunFields(source, run) {
  return { lastRun: { [source]: { at: run.at, count: run.count, status: run.status, ok: run.ok } } };
}

/**
 * The URLs Bing has not yet been told about in their current version: never
 * sent, or last sent on a UTC day before their sitemap lastmod. Bing asks for
 * a URL only when it changes, and deploys land many times a day, so without
 * this every deploy resent the same pages. lastmod is a date, so a page edited
 * again on the day it was sent waits for its next lastmod bump.
 * @param {{url: string, lastmod: string}[]} entries
 * @param {Record<string, {last?: string}> | undefined} sent the stored urls map
 */
export function unsentUrls(entries, sent) {
  const out = [];
  const seen = new Set();
  for (const e of entries) {
    if (!e.url || seen.has(e.url)) continue;
    seen.add(e.url);
    const prev = sent && sent[sentKey(pathOfUrl(e.url))];
    const lastSentDay = prev && prev.last ? String(prev.last).slice(0, 10) : "";
    if (!lastSentDay || lastSentDay < String(e.lastmod || "").slice(0, 10)) out.push(e.url);
  }
  return out;
}
