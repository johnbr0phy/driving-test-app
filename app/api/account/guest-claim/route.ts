import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';

/**
 * The first time the owner of an account a guest checkout made (uid "gc_...",
 * lib/server/guestCheckout.ts) signs in in a way that proves they own the
 * inbox, they take it over completely.
 *
 * Why: anyone can pay with an email that has no account yet, and the browser
 * that paid is signed in to the new account. If that was not the inbox's
 * owner, they could keep that session, or link a Google account or password
 * of their own, and read whatever the real owner later saves. So once someone
 * signs in with the email verified (Google for that address, or a password
 * set through the reset email), every other sign-in method is unlinked and
 * every other session is signed out. The caller gets a fresh token so their
 * own session survives.
 */
export async function POST(request: NextRequest) {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const auth = getAdminAuth();
  let decoded;
  try {
    decoded = await auth.verifyIdToken(header.slice(7), true);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const uid = decoded.uid;
  const provider = decoded.firebase?.sign_in_provider;
  if (!uid.startsWith('gc_') || decoded.email_verified !== true || !provider || provider === 'custom' || provider === 'anonymous') {
    return NextResponse.json({ claimed: false });
  }

  const db = getAdminDb();
  const ref = db.collection('guestCheckoutClaims').doc(uid);
  const first = await db.runTransaction(async (tx) => {
    if ((await tx.get(ref)).exists) return false;
    tx.set(ref, { claimedAt: new Date().toISOString(), provider });
    return true;
  });
  if (!first) return NextResponse.json({ claimed: false });

  try {
    const user = await auth.getUser(uid);
    const others = user.providerData.map((p) => p.providerId).filter((id) => id !== provider);
    if (others.length) await auth.updateUser(uid, { providersToUnlink: others });
    await auth.revokeRefreshTokens(uid);
    const customToken = await auth.createCustomToken(uid);
    return NextResponse.json({ claimed: true, unlinked: others, customToken });
  } catch (err) {
    // Let the next sign-in try again.
    await ref.delete().catch(() => {});
    console.error(`Guest account claim failed for ${uid}:`, err);
    return NextResponse.json({ error: 'Claim failed' }, { status: 500 });
  }
}
