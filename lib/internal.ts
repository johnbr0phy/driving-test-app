import { ADMIN_EMAILS } from "./admin";

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

/** True on a browser an internal account has signed into, or while one is signed in. */
export function isInternalBrowser(currentEmail?: string | null): boolean {
  if (isInternalEmail(currentEmail)) return true;
  try {
    return typeof window !== "undefined" && localStorage.getItem(FLAG) === "1";
  } catch {
    return false;
  }
}
