import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type Stripe from 'stripe';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';

/**
 * Guest checkout: someone pays for Premium without an account. Stripe
 * collects their email, and this turns that email into a Tigertest account:
 * the account that already has it, or a new one made for them.
 *
 * The answer is pinned per Checkout Session in guestCheckouts/{sessionId}, so
 * the webhook and the success page (whichever runs first) always agree on the
 * account, and a retry never makes a second one.
 *
 * Who may be signed in from the success page, and only once:
 *  - the account must have been made by this very session: its uid is derived
 *    from the session id (guestUidFor), so no other session, however early it
 *    was opened, can claim an account another one made;
 *  - the request must come from the browser that started the checkout: it
 *    holds a random key in an httpOnly cookie (one per checkout, so two tabs
 *    never clobber each other) whose hash is in the session's metadata, so a
 *    leaked success URL (history, analytics, a screenshot) is worth nothing.
 * That browser may ask again (a sign-in that failed on the way is retried)
 * until someone sets a password or links Google on the account, or a day
 * has passed.
 * An email that already had an account gets Premium but must sign in the
 * usual way: paying with someone's address never signs you in to theirs.
 */

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

export type GuestBuyer = { uid: string; email: string; createdForGuest: boolean };

/** How long after paying the success page may still sign the buyer in. */
export const GUEST_SIGN_IN_WINDOW_MS = 24 * 60 * 60 * 1000;

/** The cookie holding the browser's key for one guest checkout. */
export function guestKeyCookie(sessionId: string): string {
  return `tt-gc-${sha256(`cookie:${sessionId}`).slice(0, 16)}`;
}

/** Guest checkouts one IP may open in a day: plenty for a family or a school. */
export const GUEST_CHECKOUTS_PER_IP_PER_DAY = 30;

export function isGuestSession(session: Stripe.Checkout.Session): boolean {
  return session.metadata?.guest === '1' && !session.metadata?.userId;
}

export function guestSessionEmail(session: Stripe.Checkout.Session): string | null {
  const email = session.customer_details?.email || session.customer_email || null;
  return email ? email.trim().toLowerCase() : null;
}

/** The uid an account made for this Checkout Session gets (and only it). */
export function guestUidFor(sessionId: string): string {
  return `gc_${sha256(`guest-checkout:${sessionId}`).slice(0, 26)}`;
}

/** A new browser key for the cookie, and the hash that goes in the metadata. */
export function newGuestKey(): { key: string; hash: string } {
  const key = randomBytes(24).toString('base64url');
  return { key, hash: sha256(key) };
}

/** Whether the cookie's key is the one this session was started with. */
export function guestKeyMatches(session: Stripe.Checkout.Session, cookieKey: string | undefined | null): boolean {
  const expected = session.metadata?.guestKey;
  if (!expected || !cookieKey) return false;
  const a = Buffer.from(sha256(cookieKey));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function isAuthError(err: unknown, code: string): boolean {
  return typeof err === 'object' && err !== null && (err as { code?: string }).code === code;
}

async function findOrCreateUser(email: string, sessionId: string): Promise<string> {
  const auth = getAdminAuth();
  try {
    return (await auth.getUserByEmail(email)).uid;
  } catch (err) {
    if (!isAuthError(err, 'auth/user-not-found')) throw err;
  }
  try {
    // Not marked verified: Stripe checked a card, not that they own the inbox.
    return (await auth.createUser({ uid: guestUidFor(sessionId), email })).uid;
  } catch (err) {
    // The webhook and the success page made it at the same moment (same uid),
    // or someone else signed up with this email a moment ago.
    if (!isAuthError(err, 'auth/email-already-exists') && !isAuthError(err, 'auth/uid-already-exists')) throw err;
    return (await auth.getUserByEmail(email)).uid;
  }
}

/** The account a paid guest Checkout Session belongs to, made if needed. */
export async function resolveGuestBuyer(session: Stripe.Checkout.Session): Promise<GuestBuyer> {
  const ref = getAdminDb().collection('guestCheckouts').doc(session.id);
  const pinned = await ref.get();
  if (pinned.exists) {
    const d = pinned.data()!;
    return { uid: d.uid, email: d.email, createdForGuest: d.createdForGuest === true };
  }

  const email = guestSessionEmail(session);
  if (!email) throw new Error(`Guest checkout ${session.id} has no email`);
  const uid = await findOrCreateUser(email, session.id);
  const createdForGuest = uid === guestUidFor(session.id);

  try {
    await ref.create({ uid, email, createdForGuest, createdAt: new Date().toISOString() });
    return { uid, email, createdForGuest };
  } catch (err) {
    // The webhook and the success page raced: the first pin wins. Both
    // computed the same answer, since it depends only on the session.
    const winner = (await ref.get()).data();
    if (!winner) throw err;
    return { uid: winner.uid, email: winner.email, createdForGuest: winner.createdForGuest === true };
  }
}

/**
 * Counts a guest checkout against the IP's daily budget and says whether it
 * may go ahead. Anyone can open one without signing in, so a script could
 * otherwise spend the Stripe API's rate limit. Fails open on a Firestore
 * error: a real buyer must never be blocked by it.
 */
export async function allowGuestCheckout(ip: string, now = new Date()): Promise<boolean> {
  const db = getAdminDb();
  const day = now.toISOString().slice(0, 10);
  const ref = db.collection('guestCheckoutLimits').doc(`${sha256(`guest-checkout-ip:${ip}`).slice(0, 32)}_${day}`);
  try {
    return await db.runTransaction(async (tx) => {
      const used = ((await tx.get(ref)).data()?.count as number) || 0;
      if (used >= GUEST_CHECKOUTS_PER_IP_PER_DAY) return false;
      tx.set(ref, { count: used + 1, expiresAt: new Date(now.getTime() + 3 * 86400000) }, { merge: true });
      return true;
    });
  } catch (err) {
    console.error('Guest checkout limit check failed:', err);
    return true;
  }
}

/** Hide most of an address for the success page: "jo***@gmail.com". */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  return `${local.slice(0, 2)}***@${domain}`;
}

/**
 * The receipt's one-tap sign-in link for an account a guest checkout made.
 * Opening it proves the buyer owns the inbox, so it works on any device for
 * a week (then Forgot password does the same job). The token sits in the
 * URL's fragment, which browsers never send to a server or to analytics; the
 * page posts it to /api/account/guest-link.
 *
 * One link per Checkout Session, made once: a retried webhook must send the
 * same receipt it would have sent the first time.
 */
export const GUEST_LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export async function guestSignInLink(sessionId: string, buyer: GuestBuyer, siteUrl: string, now = new Date()): Promise<string> {
  const ref = getAdminDb().collection('guestLoginLinks').doc(sessionId);
  const url = (token: string) => `${siteUrl}/login/link#s=${encodeURIComponent(sessionId)}&t=${token}`;
  const existing = await ref.get();
  if (existing.exists) return url(existing.data()!.token);
  const token = randomBytes(32).toString('base64url');
  try {
    await ref.create({ token, uid: buyer.uid, email: buyer.email, createdAt: now.toISOString(), expiresAt: new Date(now.getTime() + GUEST_LINK_TTL_MS) });
    return url(token);
  } catch (err) {
    const winner = (await ref.get()).data();
    if (!winner) throw err;
    return url(winner.token);
  }
}

/** Whether a token from the link matches the stored one (constant time). */
export function guestLinkTokenMatches(stored: string | undefined, given: string | undefined | null): boolean {
  if (!stored || !given) return false;
  const a = Buffer.from(sha256(stored));
  const b = Buffer.from(sha256(given));
  return timingSafeEqual(a, b);
}
