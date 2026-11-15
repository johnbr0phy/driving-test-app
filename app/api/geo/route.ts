import { NextRequest, NextResponse } from "next/server";
import { visitorCountry } from "@/lib/server/visitorCountry";

// The visitor's country (Vercel IP geolocation), read once per browser by
// components/AnalyticsConsent and kept in the tt-cc cookie: it decides
// whether analytics needs an opt-in and whether the signup email box starts
// ticked (lib/privacyRegion.ts). "ZZ" when unknown (local development).
// A US visitor also gets their state (the region code, "TX"), which the DMV
// state picker offers as a one-tap suggestion; never chosen for them.
export function GET(request: NextRequest) {
  const country = visitorCountry(request) ?? "ZZ";
  const region = (request.headers.get("x-vercel-ip-country-region") || "").toUpperCase();
  return NextResponse.json(
    { country, ...(country === "US" && /^[A-Z]{2}$/.test(region) ? { state: region } : {}) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
