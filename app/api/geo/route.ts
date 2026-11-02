import { NextRequest, NextResponse } from "next/server";
import { visitorCountry } from "@/lib/server/visitorCountry";

// The visitor's country (Vercel IP geolocation), read once per browser by
// components/AnalyticsConsent and kept in the tt-cc cookie: it decides
// whether analytics needs an opt-in and whether the signup email box starts
// ticked (lib/privacyRegion.ts). "ZZ" when unknown (local development).
export function GET(request: NextRequest) {
  return NextResponse.json(
    { country: visitorCountry(request) ?? "ZZ" },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
