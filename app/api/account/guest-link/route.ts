import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { guestLinkTokenMatches } from '@/lib/server/guestCheckout';

/**
 * The receipt's one-tap sign-in link (lib/server/guestCheckout.ts
 * guestSignInLink): signs the buyer in to the account their guest checkout
 * made, on any device, for a week after paying.
 *
 * Opening the link proves they own the inbox, so the email is marked
 * verified, and the first time it does what /api/account/guest-claim does:
 * whoever paid with this address but does not own it loses every sign-in
 * method they added and every session they had.
 */
export async function POST(request: NextRequest) {
  let body: { s?: unknown; t?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: 'invalid' }, { status: 400 });
  }
  const sessionId = typeof body.s === 'string' ? body.s : '';
  const token = typeof body.t === 'string' ? body.t : '';
  if (!/^cs_[A-Za-z0-9_]{1,200}$/.test(sessionId) || !token || token.length > 200) {
    return NextResponse.json({ status: 'invalid' }, { status: 400 });
  }

  const db = getAdminDb();
  const auth = getAdminAuth();
  try {
    const link = (await db.collection('guestLoginLinks').doc(sessionId).get()).data();
    if (!link || !guestLinkTokenMatches(link.token, token)) return NextResponse.json({ status: 'invalid' }, { status: 404 });
    const expiresAt = link.expiresAt?.toDate ? link.expiresAt.toDate() : new Date(link.expiresAt);
    if (!(expiresAt.getTime() > Date.now())) return NextResponse.json({ status: 'expired' });

    const uid: string = link.uid;
    let user;
    try {
      user = await auth.getUser(uid);
    } catch {
      return NextResponse.json({ status: 'invalid' }, { status: 404 });
    }
    // The account changed its email (or was deleted and remade): this link
    // proved the old inbox, not the new one.
    if (!uid.startsWith('gc_') || user.disabled || (user.email || '').toLowerCase() !== link.email) {
      return NextResponse.json({ status: 'invalid' }, { status: 404 });
    }

    const claimRef = db.collection('guestCheckoutClaims').doc(uid);
    const first = await db.runTransaction(async (tx) => {
      if ((await tx.get(claimRef)).exists) return false;
      tx.set(claimRef, { claimedAt: new Date().toISOString(), provider: 'emailLink' });
      return true;
    });
    try {
      if (first) {
        const others = user.providerData.map((p) => p.providerId);
        await auth.updateUser(uid, { emailVerified: true, ...(others.length ? { providersToUnlink: others } : {}) });
        await auth.revokeRefreshTokens(uid);
      } else if (!user.emailVerified) {
        await auth.updateUser(uid, { emailVerified: true });
      }
    } catch (err) {
      if (first) await claimRef.delete().catch(() => {});
      throw err;
    }
    const customToken = await auth.createCustomToken(uid);
    return NextResponse.json({ status: 'sign_in', customToken, uid });
  } catch (err) {
    console.error('Guest sign-in link failed:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
