import { isBotUserAgent } from "@/lib/botUserAgent";
import { isInternalBrowser } from "@/lib/internal";
import { analyticsAllowed } from "@/lib/privacyRegion";

export function checkoutMeasurementAllowed(path: string, email?: string | null): boolean {
  try {
    // Checkout dimensions can outlive a page in a payment record. If storage
    // is unreadable we cannot exclude class members or internal browsers.
    return analyticsAllowed(path, true) && !isInternalBrowser(email) && !isBotUserAgent(navigator.userAgent);
  } catch {
    return false;
  }
}
