import type { NextRequest } from "next/server";
import { PRICE_COUNTRY_COOKIE } from "@/lib/localPrice";

/**
 * The visitor's country from Vercel's IP geolocation (null locally). Off
 * production a ?country=XX page parameter stands in for it (hooks/usePremiumPrice
 * keeps it in a cookie so checkout sees it too), to try any currency on a preview.
 */
export function visitorCountry(request: NextRequest): string | null {
  const override =
    process.env.VERCEL_ENV !== "production"
      ? request.nextUrl.searchParams.get("country") ?? request.cookies.get(PRICE_COUNTRY_COOKIE)?.value
      : null;
  const country = override || request.headers.get("x-vercel-ip-country");
  return country && /^[A-Za-z]{2}$/.test(country) ? country.toUpperCase() : null;
}
