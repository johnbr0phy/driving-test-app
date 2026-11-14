"use client";

import { Analytics } from "@vercel/analytics/next";
import { isInternalBrowser } from "@/lib/internal";
import { redactPageUrl } from "@/lib/pageAnalytics";

/**
 * Vercel Web Analytics: anonymous page views (no cookies, no visitor ID), so
 * we can see which landings people reach. Never sent from a test, internal or
 * analytics-declined browser, the same rule as the site's own counters.
 */
export function VercelPageAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (isInternalBrowser()) return null;
        return { ...event, url: redactPageUrl(event.url) };
      }}
    />
  );
}
