import { ADMIN_EMAILS } from "./admin";
import { analyticsDeclined } from "@/lib/privacyRegion";

/**
 * Internal accounts: John's own logins, used to test the product. Their
 * activity never counts in /admin numbers. The admin APIs drop them when
 * reading (by uid, via Firebase Auth), and the client skips the anonymous
 * counters (questions answered, funnel, paywall hits, shares) on any browser
 * an internal account has signed into, signed in or not.
 */
const INTERNAL_DOMAINS = ["johnbrophy.net", "stensul.com"];

export function isInternalEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const e = email.trim().toLowerCase();
  return ADMIN_EMAILS.includes(e) || INTERNAL_DOMAINS.some((d) => e.endsWith(`@${d}`));
}

const FLAG = "tigertest-internal";

/** Remember on this browser that an internal account has used it. Never cleared. */
export function markInternalBrowser() {
  try {
    localStorage.setItem(FLAG, "1");
  } catch {
    // Storage blocked: the signed-in checks still apply.
  }
}

const PRODUCTION_HOSTS = ["tigertest.io", "www.tigertest.io"];

/**
 * A browser that is testing the site, not using it: any copy of the site that
 * is not tigertest.io (localhost and preview deployments write to the live
 * Firestore too), Claude's own browser (its user agent carries "Claude/"), and
 * automated browsers (Playwright, the screenshot scripts).
 */
export function isTestBrowser(): boolean {
  if (typeof window === "undefined") return false;
  if (!PRODUCTION_HOSTS.includes(window.location.hostname)) return true;
  if (/\bClaude\//.test(navigator.userAgent)) return true;
  // Not a test browser, but one whose person declined analytics on the cookie
  // banner or /privacy: the anonymous counters gated here skip it too.
  if (analyticsDeclined()) return true;
  return navigator.webdriver === true;
}

/** True on a test browser, on a browser an internal account has signed into, or while one is signed in. */
export function isInternalBrowser(currentEmail?: string | null): boolean {
  if (isInternalEmail(currentEmail)) return true;
  if (isTestBrowser()) return true;
  try {
    return typeof window !== "undefined" && localStorage.getItem(FLAG) === "1";
  } catch {
    return false;
  }
}
