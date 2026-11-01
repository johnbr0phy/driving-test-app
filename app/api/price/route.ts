import { NextRequest, NextResponse } from "next/server";
import { premiumPriceFor } from "@/lib/pricing";
import { visitorCountry } from "@/lib/server/visitorCountry";

// Premium's price in the visitor's currency (lib/pricing.ts), the same one
// /api/stripe/checkout charges.
export function GET(request: NextRequest) {
  const country = visitorCountry(request);
  return NextResponse.json(
    { country, ...premiumPriceFor(country) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
