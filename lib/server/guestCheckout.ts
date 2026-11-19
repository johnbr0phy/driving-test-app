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
 * Only an account this checkout created may be signed in from the success
 * page (createdForGuest). An email that already had an account gets Premium
 * but must sign in the usual way: typing someone's address into Stripe and
 * paying must never sign you in to their account.
 */

export type GuestBuyer = { uid: string; email: string; createdForGuest: boolean };

/** How long after paying the success page may still sign the buyer in. */
export const GUEST_SIGN_IN_WINDOW_MS = 24 * 60 * 60 * 1000;

export function isGuestSession(session: Stripe.Checkout.Session): boolean {
  return session.metadata?.guest === '1' && !session.metadata?.userId;
}

export function guestSessionEmail(session: Stripe.Checkout.Session): string | null {
  const email = session.customer_details?.email || session.customer_email || null;
  return email ? email.trim().toLowerCase() : null;
}

function isAuthError(err: unknown, code: string): boolean {
  return typeof err === 'object' && err !== null && (err as { code?: string }).code === code;
}

async function findOrCreateUser(email: string, sessionCreatedSec: number): Promise<{ uid: string; created: boolean }> {
  const auth = getAdminAuth();
  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch (err) {
    if (!isAuthError(err, 'auth/user-not-found')) throw err;
    try {
      // Not marked verified: Stripe checked a card, not that they own the inbox.
      user = await auth.createUser({ email });
    } catch (createErr) {
      // Another request (the webhook or the success page) made it just now.
      if (!isAuthError(createErr, 'auth/email-already-exists')) throw createErr;
      user = await auth.getUserByEmail(email);
    }
  }
  // Made for this checkout: created after the session opened and nobody has
  // signed in to it with a password or Google yet. Judged from the account
  // itself, so it comes out the same whichever request created it.
  const createdMs = Date.parse(user.metadata.creationTime);
  const created = createdMs >= sessionCreatedSec * 1000 - 60_000 && user.providerData.length === 0;
  return { uid: user.uid, created };
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
  const { uid, created } = await findOrCreateUser(email, session.created);

  try {
    await ref.create({
      uid,
      email,
      createdForGuest: created,
      createdAt: new Date().toISOString(),
    });
    return { uid, email, createdForGuest: created };
  } catch (err) {
    // The webhook and the success page raced: the first pin wins. If both
    // saw "no account", Auth refused the second createUser, so both hold the
    // same uid; only the flag can differ, and the stored one is right.
    const winner = (await ref.get()).data();
    if (!winner) throw err;
    return { uid: winner.uid, email: winner.email, createdForGuest: winner.createdForGuest === true };
  }
}

/** Hide most of an address for the success page: "jo***@gmail.com". */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  return `${local.slice(0, 2)}***@${domain}`;
}
