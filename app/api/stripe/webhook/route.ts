import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { sendDurableEmail } from '@/lib/server/durableEmail';
import { makePurchaseRetryPolicy } from '@/lib/server/emailRetryPolicy';
import { EMAIL_INBOX } from '@/lib/email-inbox';
import { purchaseWelcomeHtml } from '@/lib/email-templates';
import { voiceFor, isKnownExamId } from '@/lib/email-voice';
import Stripe from 'stripe';
import { FieldValue } from 'firebase-admin/firestore';
import { purchaseExam } from '@/lib/purchaseAttribution';
import { guestSignInLink, isGuestSession, resolveGuestBuyer, type GuestBuyer } from '@/lib/server/guestCheckout';
import { SITE_URL } from '@/lib/siteUrl';
import { checkoutRecoveryEmail } from '@/lib/email-templates';
import { buildHtml, sendCronEmail } from '@/lib/cron-email';
import { QuotaExhaustedError } from '@/lib/email-quota';
import { CHECKOUT_RECOVERY_GAP_MS, CHECKOUT_RECOVERY_KEY, recoveryEligible, recoveryUrl } from '@/lib/checkoutRecovery';

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

      // The buyer's account: in the metadata when they were signed in, or
      // found or made from the email they typed into Stripe as a guest.
      let userId = session.metadata?.userId;
      let guestBuyer: GuestBuyer | null = null;
      if (!userId && isGuestSession(session)) {
        try {
          guestBuyer = await resolveGuestBuyer(session);
          userId = guestBuyer.uid;
        } catch (err) {
          console.error(`[webhook] guest checkout ${session.id} has no account yet:`, err);
          return NextResponse.json({ error: 'Guest account pending; retry required' }, { status: 503 });
        }
      }
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
          if (fulfilled.data()?.duplicateGuestPurchase === true) return 'duplicate';
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
        // A guest who paid with the email of an account that already has
        // Premium bought nothing new: refunded below, never granted twice.
        if (guestBuyer && data.subscription?.isPremium === true) {
          tx.set(checkoutRef, { userId, eventId: event.id, duplicateGuestPurchase: true,
            stripePaymentIntentId: paymentIntentId ?? null, fulfilledAt: new Date().toISOString() });
          return 'duplicate';
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
      if (fulfillmentStatus === 'duplicate') {
        // Idempotent: a retried event refunds nothing twice.
        if (paymentIntentId) {
          try {
            await stripe.refunds.create({ payment_intent: paymentIntentId, reason: 'duplicate' }, { idempotencyKey: `guest-duplicate-${session.id}` });
          } catch (err) {
            const code = (err as { code?: string; type?: string })?.code;
            const type = (err as { type?: string })?.type;
            // Refunded by hand already: done.
            if (code !== 'charge_already_refunded') {
              // A request Stripe will always refuse (Stripe also replays it for
              // this idempotency key for a day) is recorded for a person to
              // refund by hand; retrying it would only loop for days.
              if (type === 'StripeInvalidRequestError') {
                console.error(`[webhook] duplicate guest purchase ${session.id} cannot be refunded:`, err);
                await adminDb.collection('guestCheckoutProblems').doc(session.id).set({
                  problem: 'duplicate_refund_failed', userId, paymentIntentId,
                  error: String((err as Error)?.message ?? err).slice(0, 300), at: new Date().toISOString(),
                }, { merge: true });
                return NextResponse.json({ received: true, skipped: 'duplicate_refund_failed' });
              }
              console.error(`[webhook] duplicate guest purchase ${session.id} not refunded yet:`, err);
              return NextResponse.json({ error: 'Refund pending; retry required' }, { status: 503 });
            }
          }
        }
        console.log(`Guest purchase ${session.id} refunded: account ${userId} already had Premium`);
        return NextResponse.json({ received: true, skipped: 'already_premium_refunded' });
      }

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
        email: session.metadata?.email || session.customer_email || session.customer_details?.email || null,
        // Paid without being signed in (lib/server/guestCheckout.ts).
        guestCheckout: guestBuyer ? (guestBuyer.createdForGuest ? 'new_account' : 'existing_account') : null,
        // What the buyer paid from, for revenue by exam and paywall on the /admin Today tab.
        location: session.metadata?.location || null,
        exam: checkoutExam,
        // The English paywall test's variant (lib/paywallTest.ts), when the buyer saw it.
        paywallVariant: session.metadata?.paywallVariant || null,
        // And which paywall message (1 first visit, 2 second, 3 third on).
        paywallHit: Number(session.metadata?.paywallHit) || null,
        paywallReturn: session.metadata?.paywallReturn || null,
        // The buyer's first visit (lib/funnel.ts): channel and landing page.
        source: session.metadata?.source || null,
        landing: session.metadata?.landing || null,
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
            replyTo: process.env.EMAIL_REPLY_TO ?? 'john@tigertest.io',
            html: purchaseWelcomeHtml(voiceFor(fulfillment?.examId), guestBuyer ? { guest: {
              ...guestBuyer,
              // One-tap sign-in on another device, for accounts made here.
              signInLink: guestBuyer.createdForGuest ? await guestSignInLink(session.id, guestBuyer, SITE_URL) : undefined,
            } } : undefined), kind: 'transactional' },
          retryPolicy: makePurchaseRetryPolicy((await userRef.get()).data()?.subscription),
          eligible: data => data.subscription?.isPremium === true,
        });
        if (!['sent', 'already_sent'].includes(outcome)) {
          throw new Error(`Receipt pending reconciliation: ${outcome}`);
        }
        // A guest-made account's receipt is its welcome: the hourly backstop
        // must not follow it with a "pick your test" signup email.
        if (guestBuyer?.createdForGuest) {
          await userRef.set({ emailsSent: FieldValue.arrayUnion('welcome'), emailConsent: (await userRef.get()).data()?.emailConsent ?? false }, { merge: true });
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

    case 'checkout.session.expired': {
      // Left checkout without paying: email Stripe's recovery link once
      // (lib/checkoutRecovery.ts). Never fails the webhook.
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const url = recoveryUrl(session);
      if (!userId || !url) break;
      try {
        const user = (await getAdminDb().collection('users').doc(userId).get()).data();
        const email = (await getAdminAuth().getUser(userId)).email ?? null;
        if (!email || !recoveryEligible(user, email)) break;
        const voice = voiceFor(purchaseExam(session.metadata?.location));
        const outcome = await sendCronEmail(
          userId,
          email,
          EMAIL_INBOX.checkoutRecovery(voice).subject,
          buildHtml(checkoutRecoveryEmail(voice, url), userId),
          CHECKOUT_RECOVERY_KEY,
          { checkoutRecovery: { sessionId: session.id, examId: voice.id, at: new Date().toISOString() } },
          undefined,
          {
            gapMs: CHECKOUT_RECOVERY_GAP_MS,
            eligible: (fresh) => recoveryEligible(fresh, email),
          }
        );
        console.log(`[webhook] checkout recovery for ${session.id}: ${outcome}`);
      } catch (err) {
        if (err instanceof QuotaExhaustedError) console.warn('[webhook] checkout recovery skipped: email budget used');
        else console.error(`[webhook] checkout recovery for ${session.id} failed:`, err);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
