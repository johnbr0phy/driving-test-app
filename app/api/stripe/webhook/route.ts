import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { sendDurableEmail } from '@/lib/server/durableEmail';
import { EMAIL_INBOX } from '@/lib/email-inbox';
import { EMAIL_TEMPLATES } from '@/lib/email-templates';
import { voiceFor, isKnownExamId } from '@/lib/email-voice';
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
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.payment_status !== 'paid') return NextResponse.json({ received: true, skipped: 'unpaid' });

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
      const checkoutRef = adminDb.collection('fulfilledCheckouts').doc(session.id);
      const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
      const paymentRef = adminDb.collection('payments').doc(paymentIntentId ?? session.id);
      const location = session.metadata?.location;
      // purchaseExam historically defaults unknown locations to DMV. Accept DMV
      // only for explicit legacy DMV paywalls; never guess from a missing field.
      const attributed = purchaseExam(location);
      const knownDmv = !!location && ['training_set_4', 'practice_test_4', 'stats_page', 'full_stats', 'results_page', 'test_hub', 'drill'].includes(location);
      const checkoutExam = attributed !== 'dmv' || knownDmv ? attributed : null;
      const fulfillmentStatus = await adminDb.runTransaction(async tx => {
        const [fulfilled, user, payment] = await Promise.all([tx.get(checkoutRef), tx.get(userRef), tx.get(paymentRef)]);
        if (fulfilled.exists) {
          if (fulfilled.data()?.userId !== userId) throw new Error('Checkout ownership mismatch');
          return fulfilled.data()?.legacyProcessed === true ? 'legacy' : 'current';
        }
        const data = user.data() ?? {};
        const paymentData = payment.data();
        if (payment.exists && paymentData?.userId !== userId) throw new Error('Payment ownership mismatch');
        const priorPayment = payment.exists && ['succeeded', 'refunded', 'partially_refunded'].includes(paymentData?.status);
        const priorEntitlement = !!paymentIntentId && data.subscription?.stripePaymentId === paymentIntentId;
        if (priorPayment || priorEntitlement) {
          // Migration fence: the old webhook already handled this payment.
          // Do not regrant revoked Premium, rewrite purchasedAt, or backfill a
          // receipt whose old provider outcome cannot be established safely.
          tx.set(checkoutRef, { userId, eventId: event.id, legacyProcessed: true,
            stripePaymentIntentId: paymentIntentId ?? null,
            receiptDisposition: data.emailsSent?.includes('purchaseWelcome') ? 'legacy_receipt_marked' : 'legacy_outcome_unknown_no_backfill',
            reconciledAt: new Date().toISOString() });
          return 'legacy';
        }
        const receiptExam = checkoutExam ?? (isKnownExamId(data.firstSignupExamId) ? data.firstSignupExamId : null);
        tx.set(userRef, {
          subscription: { isPremium: true, purchasedAt: new Date().toISOString(),
            stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
            stripePaymentId: typeof session.payment_intent === 'string' ? session.payment_intent : null },
          lastUpdated: new Date().toISOString(),
        }, { merge: true });
        tx.set(checkoutRef, { userId, eventId: event.id, examId: receiptExam, checkoutExamId: checkoutExam,
          examSource: checkoutExam ? 'stripe_checkout_location' : receiptExam ? 'first_signup' : 'unknown',
          fulfilledAt: new Date().toISOString() });
        return 'current';
      });
      if (fulfillmentStatus === 'legacy') return NextResponse.json({ received: true, skipped: 'legacy_processed' });

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
      await adminDb.runTransaction(async tx => {
        if ((await tx.get(paymentRef)).exists) return;
        tx.set(paymentRef, {
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
        exam: checkoutExam,
        // The English paywall test's variant (lib/paywallTest.ts), when the buyer saw it.
        paywallVariant: session.metadata?.paywallVariant || null,
        createdAt: new Date().toISOString(),
        });
      });

      console.log(
        `Premium activated for user ${userId} (location ${session.metadata?.location || 'none'}, paywall ${session.metadata?.paywallVariant || 'none'})`
      );

      // This receipt is service mail: consent, campaign spacing and campaign
      // budget do not apply. Retries keep the session's immutable payload.
      try {
        const buyer = await getAdminAuth().getUser(userId);
        if (!buyer.email) throw new Error('Buyer account has no email');
        const fulfillment = (await checkoutRef.get()).data();
        const outcome = await sendDurableEmail({
          uid: userId, dedupeKey: `purchase/${session.id}`, emailKey: `purchaseWelcome:${session.id}`,
          payload: { to: buyer.email, subject: EMAIL_INBOX.purchaseWelcome(voiceFor(fulfillment?.examId)).subject,
            replyTo: process.env.EMAIL_REPLY_TO ?? 'john@johnbrophy.net',
            html: EMAIL_TEMPLATES.purchaseWelcome(voiceFor(fulfillment?.examId)), kind: 'transactional' },
          eligible: data => data.subscription?.isPremium === true,
        });
        if (!['sent', 'already_sent'].includes(outcome)) {
          throw new Error(`Receipt pending reconciliation: ${outcome}`);
        }
      } catch (mailErr) {
        console.error(`[webhook] receipt pending for ${session.id}:`, mailErr);
        return NextResponse.json({ error: 'Receipt pending; retry required' }, { status: 503 });
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
