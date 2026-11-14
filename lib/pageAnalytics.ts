// Vercel Web Analytics (components/VercelPageAnalytics.tsx): page views by
// path, referrer and country, no cookies and no visitor ID, used to see which
// test landings get traffic. Before an event leaves the browser its URL is
// cut down to what that needs: query strings go (they can hold sign-in
// redirects, emails or tokens) except utm_* campaign tags, and a class or
// quiz code in the path is blanked so one class's link is never recorded.

const KEEP_PARAM = /^utm_/;

/** The URL as reported: no fragment, only utm_* parameters, codes redacted. */
export function redactPageUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return raw;
  }
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) if (!KEEP_PARAM.test(key)) url.searchParams.delete(key);
  url.pathname = url.pathname
    .replace(/^\/c\/[^/]+/, "/c/[code]")
    .replace(/^\/q\/[^/]+/, "/q/[code]")
    .replace(/^\/teach\/classes\/[^/]+/, "/teach/classes/[code]");
  return url.toString();
}

// App pages (where people practise, not where they arrive from search) are
// not counted, which keeps Vercel's event count low: the point is traffic to
// landings, homepages and topic pages. Matched by whole path segment, so
// "/cdl-practice-test" is counted and "/cdl/practice/2" is not.
const APP_SEGMENTS = new Set([
  "dashboard", "test", "practice", "training", "train", "drill", "stats", "results",
  "settings", "admin", "login", "signup", "oauth", "upgrade", "onboarding", "unsubscribe",
  "edit", "report", "flashcards", "classes", "new",
]);
const APP_PREFIXES = ["/dmv/", "/c/", "/q/", "/home-lang/"];

/** True for a page someone can land on from search or an AI answer. */
export function isTrackedPage(pathname: string): boolean {
  if (APP_PREFIXES.some((p) => pathname.startsWith(p))) return false;
  return !pathname.split("/").some((seg) => APP_SEGMENTS.has(seg));
}
