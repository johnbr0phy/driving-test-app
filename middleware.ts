import { NextRequest, NextResponse } from "next/server";
import {
  REGION_COOKIE,
  REGION_COOKIE_MAX_AGE,
  REGION_SOURCE_COOKIE,
  isRegion,
  regionFromCountry,
} from "@/lib/region";

// Country for the homepage and the /tests hub (lib/region.ts). A first visit
// takes the country Vercel reports for the request; after that the cookie
// wins, including a country the visitor picked. The homepage URL never
// changes: a UK, Canada or Australia visitor is served the static
// /home/<region> page at "/", while everyone else, crawlers included, gets
// today's US homepage.
export function middleware(req: NextRequest) {
  const saved = req.cookies.get(REGION_COOKIE)?.value;
  let region = isRegion(saved) ? saved : null;
  let source: "geo" | "default" | null = null;
  if (!region) {
    const geo = regionFromCountry(req.headers.get("x-vercel-ip-country"));
    region = geo ?? "US";
    source = geo ? "geo" : "default";
  }

  const res =
    req.nextUrl.pathname === "/" && region !== "US"
      ? NextResponse.rewrite(new URL(`/home/${region.toLowerCase()}`, req.url))
      : NextResponse.next();

  // "/" is a different page per country at one URL, so browsers must not reuse
  // a stored copy after the country changes. The CDN still caches each
  // /home/<region> page on its own path.
  if (req.nextUrl.pathname === "/") res.headers.set("Cache-Control", "private, no-cache, must-revalidate");

  if (source) {
    const opts = { path: "/", maxAge: REGION_COOKIE_MAX_AGE, sameSite: "lax" as const };
    res.cookies.set(REGION_COOKIE, region, opts);
    res.cookies.set(REGION_SOURCE_COOKIE, source, opts);
  }
  return res;
}

export const config = { matcher: ["/", "/tests"] };
