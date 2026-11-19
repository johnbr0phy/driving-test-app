import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getAdminAuth } from '@/lib/firebase-admin';
import {
  GUEST_SIGN_IN_WINDOW_MS,
  isGuestSession,
  maskEmail,
  resolveGuestBuyer,
} from '@/lib/server/guestCheckout';

/**
 * The success page of a guest checkout (no account when they paid). Finds or
 * makes the buyer's account (the webhook may not have run yet) and:
 *  - an account made for this checkout: returns a custom token so the page
 *    signs them straight in;
 *  - an account that already had that email: returns only a masked address,
 *    and they sign in the usual way. Paying with someone's email never signs
 *    you in to their account.
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
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ status: 'unpaid' });
    }

    const buyer = await resolveGuestBuyer(session);
    const fresh = Date.now() - session.created * 1000 < GUEST_SIGN_IN_WINDOW_MS;

    if (buyer.createdForGuest && fresh) {
      // Still nobody has set a password or linked Google on it: once they
      // have, signing in from a payment link is not ours to do any more.
      const user = await getAdminAuth().getUser(buyer.uid);
      if (user.providerData.length === 0) {
        const customToken = await getAdminAuth().createCustomToken(buyer.uid, { guestCheckout: true });
        return NextResponse.json({ status: 'sign_in', customToken, email: buyer.email });
      }
    }

    return NextResponse.json({ status: 'existing_account', email: maskEmail(buyer.email) });
  } catch (error) {
    console.error('Guest checkout return error:', error);
    return NextResponse.json({ error: 'Failed to load purchase' }, { status: 500 });
  }
}
