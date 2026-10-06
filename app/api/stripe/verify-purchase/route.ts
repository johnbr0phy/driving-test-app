import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';

// Cap runtime well below Vercel's 300s default so a hung upstream call cannot burn
// five minutes of Fluid Active CPU per invocation.
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase auth token
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json({
        isPremium: false,
        message: 'Payment not completed',
      });
    }

    // Check Firestore to confirm webhook processed
    const adminDb = getAdminDb();
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData?.subscription?.isPremium) {
        return NextResponse.json({
          isPremium: true,
          purchasedAt: userData.subscription.purchasedAt,
          message: 'Premium access confirmed',
        });
      }
    }

    // Payment succeeded but webhook might not have processed yet
    // Return success anyway since Stripe confirmed payment
    return NextResponse.json({
      isPremium: true,
      purchasedAt: new Date().toISOString(),
      message: 'Payment verified with Stripe',
      pendingWebhook: true,
    });
  } catch (error) {
    console.error('Verify purchase error:', error);
    return NextResponse.json(
      { error: 'Failed to verify purchase' },
      { status: 500 }
    );
  }
}
