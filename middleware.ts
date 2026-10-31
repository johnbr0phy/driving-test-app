import { NextRequest, NextResponse } from "next/server";
import {
  REGION_COOKIE,
  REGION_COOKIE_MAX_AGE,
  REGION_SOURCE_COOKIE,
  isRegion,
  regionFromCountry,
  regionHomePath,
} from "@/lib/region";

// Country for the homepage and the /tests hub (lib/region.ts). A first visit
// takes the country Vercel reports for the request; after that the cookie
// wins, including a country the visitor picked. A visitor from a country
// with its own page opening "/" is sent to its country page (/uk, /nz, /ph...), each its own indexable page;
// everyone else stays on the US homepage.
//
// Crawlers never get a location: whatever IP they crawl from, they see "/"
// itself, the same page as any visitor with no country, and reach the country
// pages through links, the sitemap and hreflang.
const CRAWLER = /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|embedly|preview|lighthouse/i;

export function middleware(req: NextRequest) {
  const crawler = CRAWLER.test(req.headers.get("user-agent") ?? "");
  const saved = req.cookies.get(REGION_COOKIE)?.value;
  let region = isRegion(saved) ? saved : null;
  let source: "geo" | "default" | null = null;
  if (!region) {
    const geo = crawler ? null : regionFromCountry(req.headers.get("x-vercel-ip-country"));
    region = geo ?? "US";
    source = geo ? "geo" : "default";
  }

  // 307: temporary, so neither browsers nor search engines store the hop.
  // Keep the query string (utm_source and the like) through the hop.
  let res: NextResponse;
  if (req.nextUrl.pathname === "/" && region !== "US") {
    const to = req.nextUrl.clone();
    to.pathname = regionHomePath(region);
    res = NextResponse.redirect(to, 307);
  } else {
    res = NextResponse.next();
  }

  if (source && !crawler) {
    const opts = { path: "/", maxAge: REGION_COOKIE_MAX_AGE, sameSite: "lax" as const };
    res.cookies.set(REGION_COOKIE, region, opts);
    res.cookies.set(REGION_SOURCE_COOKIE, source, opts);
  }
  return res;
}

export const config = { matcher: ["/", "/tests"] };
