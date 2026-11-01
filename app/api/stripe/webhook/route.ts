import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getAdminDb } from '@/lib/firebase-admin';
import { sendCronEmail, buildHtml } from '@/lib/cron-email';
import { EMAIL_TEMPLATES } from '@/lib/email-templates';
import { voiceFor } from '@/lib/email-voice';
import Stripe from 'stripe';
import { purchaseExam } from '@/lib/purchaseAttribution';

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

      // Get user ID from metadata
      const userId = session.metadata?.userId;
      if (!userId) {
        console.error('No userId in session metadata');
        return NextResponse.json(
          { error: 'No userId in metadata' },
          { status: 400 }
        );
      }

      // Update user's premium status in Firestore
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
        },
        lastUpdated: new Date().toISOString(),
      });

      // What Stripe settled in dollars, for /admin revenue when the buyer paid
      // in another currency (lib/pricing.ts). Best-effort: a failed lookup
      // must not fail a purchase we already granted.
      let amountUsdCents: number | null = session.currency === 'usd' ? session.amount_total : null;
      if (amountUsdCents === null && typeof session.payment_intent === 'string') {
        try {
          const pi = await stripe.paymentIntents.retrieve(session.payment_intent, {
            expand: ['latest_charge.balance_transaction'],
          });
          const charge = pi.latest_charge as Stripe.Charge | null;
          const tx = charge?.balance_transaction as Stripe.BalanceTransaction | null;
          if (tx && tx.currency === 'usd') amountUsdCents = tx.amount;
        } catch (err) {
          console.error(`[webhook] no settled amount for ${session.payment_intent}:`, err);
        }
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
        amountUsdCents,
        country: session.metadata?.country || null,
        status: 'succeeded',
        email: session.metadata?.email || session.customer_email,
        // What the buyer paid from, for revenue by exam and paywall on the /admin Today tab.
        location: session.metadata?.location || null,
        exam: purchaseExam(session.metadata?.location),
        // The English paywall test's variant (lib/paywallTest.ts), when the buyer saw it.
        paywallVariant: session.metadata?.paywallVariant || null,
        createdAt: new Date().toISOString(),
      });

      console.log(
        `Premium activated for user ${userId} (location ${session.metadata?.location || 'none'}, paywall ${session.metadata?.paywallVariant || 'none'})`
      );

      // Tell the buyer what they just unlocked. Best-effort: a mail failure must
      // never fail the webhook, or Stripe will retry a purchase we already
      // granted.
      try {
        const buyerEmail = session.metadata?.email || session.customer_email;
        if (buyerEmail) {
          await sendCronEmail(
            userId,
            buyerEmail,
            "You're in - here's what just unlocked",
            buildHtml(EMAIL_TEMPLATES.purchaseWelcome(voiceFor(purchaseExam(session.metadata?.location))), userId),
            "purchaseWelcome"
          );
        }
      } catch (mailErr) {
        console.error(`[webhook] purchase-welcome email failed for ${userId}:`, mailErr);
      }
      break;
    }

    case 'charge.refunded': {
      // Recorded for revenue and refund rate only. Premium is left on: taking
      // it away is a call made by hand in Stripe and Firestore, not here.
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
      if (paymentIntentId) {
        const paymentRef = getAdminDb().collection('payments').doc(paymentIntentId);
        const paymentDoc = await paymentRef.get();
        if (paymentDoc.exists) {
          await paymentRef.update({
            status: charge.amount_refunded >= charge.amount ? 'refunded' : 'partially_refunded',
            refundedCents: charge.amount_refunded,
            refundedAt: new Date().toISOString(),
          });
        }
      }
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
