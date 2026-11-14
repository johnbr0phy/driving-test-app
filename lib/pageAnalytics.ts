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
