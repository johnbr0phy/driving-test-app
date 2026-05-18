import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getAdminDb } from '@/lib/firebase-admin';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Parent-pay flow: the buyer is the parent, the user to upgrade is the
      // teen identified by metadata.teenUid (with metadata.parentPayToken so
      // we can mark the request doc paid). Self-checkout uses metadata.userId.
      const parentPayToken = session.metadata?.parentPayToken;
      const teenUid = session.metadata?.teenUid;
      const selfUserId = session.metadata?.userId;
      const userId = parentPayToken && teenUid ? teenUid : selfUserId;

      if (!userId) {
        console.error('No userId in session metadata');
        return NextResponse.json(
          { error: 'No userId in metadata' },
          { status: 400 }
        );
      }

      // Update the (teen or self) user's premium status in Firestore.
      const adminDb = getAdminDb();
      const userRef = adminDb.collection('users').doc(userId);
      const userDoc = await userRef.get();
      const existingData = userDoc.exists ? userDoc.data() || {} : {};

      await userRef.set({
        ...existingData,
        subscription: {
          isPremium: true,
          purchasedAt: new Date().toISOString(),
          stripeCustomerId: session.customer as string,
          stripePaymentId: session.payment_intent as string,
          ...(parentPayToken ? { paidVia: 'parent_pay' } : {}),
        },
        lastUpdated: new Date().toISOString(),
      });

      // Mark the parent-pay request as paid so the landing page reflects it
      // and we can build follow-up analytics later.
      if (parentPayToken) {
        await adminDb.collection('parentPayRequests').doc(parentPayToken).set(
          {
            status: 'paid',
            paidAt: new Date().toISOString(),
            paidStripeCustomerId: session.customer as string,
            paidStripePaymentIntentId: session.payment_intent as string,
          },
          { merge: true },
        );
      }

      // Create payment record for audit trail
      const paymentRef = adminDb.collection('payments').doc(session.payment_intent as string);
      await paymentRef.set({
        userId,
        stripeCustomerId: session.customer,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
        amount: session.amount_total,
        currency: session.currency,
        status: 'succeeded',
        email: session.metadata?.email || session.customer_email,
        createdAt: new Date().toISOString(),
        ...(parentPayToken ? { flow: 'parent_pay', parentPayToken } : {}),
      });

      console.log(`Premium activated for user ${userId}${parentPayToken ? ' (parent-pay)' : ''}`);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error('Payment failed:', paymentIntent.id);
      // Could send notification email here
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
