/**
 * A browser that paid as a guest but was not signed in on return (the
 * purchase went to an account it cannot prove it owns: existing_account,
 * already_premium, sign_in_used in components/GuestPurchaseReturn.tsx).
 *
 * This is only a hint, never an entitlement: Premium stays with the account
 * and opens once they sign in. Paywalls use it to say "you already bought
 * Premium with jo***@gmail.com, sign in to use it" instead of selling again,
 * and the paywall counter skips the browser (lib/analytics.ts), since it is
 * not a prospect. Cleared on any sign-in (contexts/AuthContext.tsx); kept
 * for 30 days at most.
 */

const KEY = "tigertest-guest-paid";
const MAX_AGE_MS = 30 * 86_400_000;

/** "john.smith@gmail.com" -> "jo***@gmail.com". */
export function maskEmail(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 1) return "***";
  return `${email.slice(0, Math.min(2, at))}***${email.slice(at)}`;
}

export function markGuestPaid(email: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ email: maskEmail(email), at: Date.now() }));
  } catch {
    // Storage blocked: the paywall simply sells as before.
  }
}

/** The masked address Premium went to, or null. */
export function guestPaidEmail(): string | null {
  try {
    const raw = typeof window === "undefined" ? null : localStorage.getItem(KEY);
    if (!raw) return null;
    const rec = JSON.parse(raw) as { email?: unknown; at?: unknown };
    if (typeof rec.email !== "string" || typeof rec.at !== "number" || Date.now() - rec.at > MAX_AGE_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return rec.email;
  } catch {
    return null;
  }
}

export function clearGuestPaid(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}
