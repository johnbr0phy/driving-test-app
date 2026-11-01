import { NextRequest, NextResponse } from "next/server";
import {
  REGION_COOKIE,
  REGION_COOKIE_MAX_AGE,
  REGION_SOURCE_COOKIE,
  REGIONS,
  isRegion,
  regionFromCountry,
  regionHomePath,
} from "@/lib/region";
import { LANG_COOKIE, isHomeLanguage } from "@/lib/homeLanguages";

const HOME_REGION = new Map(REGIONS.map((r) => [regionHomePath(r.code), r]));

// Country for the homepage and the /tests hub (lib/region.ts). A first visit
// takes the country Vercel reports for the request; after that the cookie
// wins, including a country the visitor picked. A visitor from a country
// with its own page opening "/" is sent to its country page (/uk, /nz, /ph...), each its own indexable page;
// everyone else stays on the US homepage.
//
// Crawlers never get a location: whatever IP they crawl from, they see "/"
// itself, the same page as any visitor with no country, and reach the country
// pages through links, the sitemap and hreflang.
// AI fetchers that act for a person (Claude-User, Perplexity-User) carry no
// "bot" in their user-agent, so they are named.
const CRAWLER = /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|embedly|preview|lighthouse|claude-user|perplexity-user|chatgpt|google-extended|ccbot|anthropic/i;

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
    // A homepage in the language the person picked (tt-lang, lib/language.ts)
    // when it is not the country's own: app/home-lang/[region]/[lang] under the
    // same URL. Crawlers carry no cookie, so they always get the country's page.
    const home = HOME_REGION.get(req.nextUrl.pathname);
    const lang = req.cookies.get(LANG_COOKIE)?.value;
    if (home && !crawler && isHomeLanguage(lang) && lang !== home.lang) {
      const to = req.nextUrl.clone();
      to.pathname = `/home-lang/${home.code}/${lang}`;
      res = NextResponse.rewrite(to);
    } else {
      res = NextResponse.next();
    }
  }

  if (source && !crawler) {
    const opts = { path: "/", maxAge: REGION_COOKIE_MAX_AGE, sameSite: "lax" as const };
    res.cookies.set(REGION_COOKIE, region, opts);
    res.cookies.set(REGION_SOURCE_COOKIE, source, opts);
  }
  return res;
}

// Every country homepage (regionHomePath) is listed: a matcher must be literal.
export const config = {
  matcher: [
    "/", "/tests",
    "/ca", "/uk", "/ie", "/au", "/nz", "/in", "/ph", "/my", "/sg", "/hk", "/ae", "/za", "/ng", "/ke", "/pk",
    "/es", "/pt", "/ro", "/se", "/gr", "/dk", "/hu", "/be", "/fi", "/mt", "/de",
  ],
};
