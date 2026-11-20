/**
 * Checkout recovery (Nov 2026): when a signed-in buyer opens Stripe Checkout
 * and leaves without paying, the session expires after 24 hours and Stripe
 * sends checkout.session.expired with a recovery link (valid 30 days) that
 * opens a fresh copy of the same checkout. The webhook emails that link once.
 *
 * It is promotional mail, so it follows the campaign rules: marketing consent,
 * not unsubscribed, not internal, English readers only (the copy is English),
 * and once ever per account. Opening checkout is the person's own action, so
 * this fits the rule that Premium is only emailed after something they did.
 * Guests are left out: their checkout ties sign-in to a cookie keyed by the
 * original session id, which a recovered session would not match.
 *
 * Pure rules only; the webhook does the reads and the send.
 */

export const CHECKOUT_RECOVERY_KEY = "checkoutRecovery";

/** Skip if any other campaign email went out this recently. */
export const CHECKOUT_RECOVERY_GAP_MS = 4 * 60 * 60 * 1000;

export interface RecoverySession {
  metadata?: Record<string, string> | null;
  after_expiration?: { recovery?: { url?: string | null; expires_at?: number | null } | null } | null;
}

/** The recovery link Stripe gave this expired session, if any. */
export function recoveryUrl(session: RecoverySession, nowSec = Math.floor(Date.now() / 1000)): string | null {
  const r = session.after_expiration?.recovery;
  const url = r?.url;
  if (typeof url !== "string" || !/^https:\/\/[a-z0-9.-]+\.stripe\.com\//i.test(url)) return null;
  if (typeof r?.expires_at === "number" && r.expires_at <= nowSec) return null;
  return url;
}

export function isInternalRecoveryEmail(email: string): boolean {
  const e = email.toLowerCase();
  return e.endsWith("@johnbrophy.net") || e.endsWith("@stensul.com");
}

/** Whether this account may get the recovery email (user doc as stored). */
export function recoveryEligible(user: Record<string, any> | undefined, email: string | null | undefined): boolean {
  if (!user || !email) return false;
  if (isInternalRecoveryEmail(email)) return false;
  if (user.emailConsent !== true || user.unsubscribed === true) return false;
  if (user.subscription?.isPremium === true) return false;
  if (typeof user.language === "string" && user.language !== "en") return false;
  const sent: unknown = user.emailsSent;
  if (Array.isArray(sent) && sent.includes(CHECKOUT_RECOVERY_KEY)) return false;
  return true;
}
