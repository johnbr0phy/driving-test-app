import type { NextRequest } from "next/server";
import { isBotRequest } from "@/lib/botUserAgent";
import { isCheckoutDevice, checkoutItemId, type CheckoutDevice } from "@/lib/checkoutSteps";
import { isInternalEmail } from "@/lib/internal";
import { CONSENT_COOKIE, COUNTRY_COOKIE, COOKIE_CONSENT_COUNTRIES, isChildPath } from "@/lib/privacyRegion";

type Dimensions = { checkoutDevice?: CheckoutDevice; checkoutItem?: string };

/** Only accept the coarse categories sent by this checkout, including on webhook retries. */
export function checkoutDimensions(
  fields?: Record<string, unknown> | null,
): Dimensions {
  if (!fields || !isCheckoutDevice(fields.checkoutDevice)) return {};
  const item = typeof fields.location === "string" ? checkoutItemId(fields.checkoutItem, fields.location) : undefined;
  return { checkoutDevice: fields.checkoutDevice, ...(item && { checkoutItem: item }) };
}

/** Guest class membership and the internal-browser flag are checked on the browser. */
export function checkoutMeasurementAllowed(
  request: NextRequest, returnPath: string, country: string | null, email: string | null, classMember: boolean,
): boolean {
  if (classMember || isInternalEmail(email) || isBotRequest(request) || isChildPath(returnPath)) return false;
  if (!["www.tigertest.io", "tigertest.io"].includes(request.nextUrl.hostname)) return false;
  const choice = request.cookies.get(CONSENT_COOKIE)?.value;
  const cookieCountry = request.cookies.get(COUNTRY_COOKIE)?.value;
  if (choice === "denied" || !cookieCountry || !/^[A-Z]{2}$/.test(cookieCountry)) return false;
  const strict = COOKIE_CONSENT_COUNTRIES.includes(cookieCountry) || COOKIE_CONSENT_COUNTRIES.includes(country ?? "ZZ");
  return !strict || choice === "granted";
}
