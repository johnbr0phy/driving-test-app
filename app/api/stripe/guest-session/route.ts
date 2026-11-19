import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import {
  GUEST_SIGN_IN_WINDOW_MS,
  guestKeyCookie,
  guestKeyMatches,
  isGuestSession,
  maskEmail,
  resolveGuestBuyer,
} from '@/lib/server/guestCheckout';

/**
 * The success page of a guest checkout (no account when they paid). Finds or
 * makes the buyer's account (the webhook may not have run yet) and:
 *  - an account made by this checkout, asked for from the browser that
 *    started it: returns a custom token so the page signs them straight in
 *    (again, if a sign-in failed on the way);
 *  - an account that already had that email: returns only a masked address,
 *    and they sign in the usual way;
 *  - anyone else holding the URL: nothing about the purchase.
 */
export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    if (typeof sessionId !== 'string' || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (!isGuestSession(session)) {
      return NextResponse.json({ status: 'not_guest' });
    }
    // A leaked success URL opened anywhere else is worth nothing.
    if (!guestKeyMatches(session, request.cookies.get(guestKeyCookie(session.id))?.value)) {
      return NextResponse.json({ status: 'other_browser' });
    }
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ status: 'unpaid' });
    }

    const buyer = await resolveGuestBuyer(session);
    const fresh = Date.now() - session.created * 1000 < GUEST_SIGN_IN_WINDOW_MS;

    if (buyer.createdForGuest && fresh) {
      // Once its owner has set a password or linked Google, signing in from a
      // payment is not ours to do any more.
      const user = await getAdminAuth().getUser(buyer.uid);
      if (user.providerData.length === 0) {
        const customToken = await getAdminAuth().createCustomToken(buyer.uid, { guestCheckout: true });
        return NextResponse.json({ status: 'sign_in', customToken, uid: buyer.uid, email: buyer.email });
      }
    }

    // Paid for an account that already had Premium: the webhook refunded it.
    const fulfilled = await getAdminDb().collection('fulfilledCheckouts').doc(session.id).get();
    if (fulfilled.data()?.duplicateGuestPurchase === true) {
      return NextResponse.json({ status: 'already_premium', email: maskEmail(buyer.email) });
    }
    // Made by this checkout but past the window, or a password or Google is on
    // it now: theirs, so tell them how to sign in to it.
    if (buyer.createdForGuest) {
      return NextResponse.json({ status: 'sign_in_used', email: maskEmail(buyer.email) });
    }
    return NextResponse.json({ status: 'existing_account', email: maskEmail(buyer.email) });
  } catch (error) {
    console.error('Guest checkout return error:', error);
    return NextResponse.json({ error: 'Failed to load purchase' }, { status: 500 });
  }
}
