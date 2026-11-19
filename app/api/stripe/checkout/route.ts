import { NextRequest, NextResponse } from 'next/server';
import { getStripe, getPremiumProductId, PREMIUM_PRICE_ID, PREMIUM_PRODUCT } from '@/lib/stripe';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isPaywallHit, isPaywallReturnArm, isPaywallVariant } from '@/lib/paywallTestIds';
import { premiumPriceFor, stripeUnitAmount } from '@/lib/pricing';
import { visitorCountry } from '@/lib/server/visitorCountry';
import { SITE_URL } from '@/lib/siteUrl';
import { GUEST_KEY_COOKIE, GUEST_SIGN_IN_WINDOW_MS, newGuestKey } from '@/lib/server/guestCheckout';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      );
    }

    // A signed-in buyer sends their Firebase ID token. A guest sends none:
    // Stripe asks for their email and the webhook makes or finds the account
    // (lib/server/guestCheckout.ts).
    const authHeader = request.headers.get('authorization');
    let decodedToken: Awaited<ReturnType<ReturnType<typeof getAdminAuth>['verifyIdToken']>> | null = null;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        decodedToken = await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1]);
      } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
    const isGuest = decodedToken === null;

    const body = await request.json();
    const { email: bodyEmail, returnUrl, returnPath: rawReturnPath, location, paywallVariant, paywallHit, paywallReturn, source: bodySource, landing: bodyLanding } = body;
    // The account's own address when it has one: an address from the body
    // would attach this checkout to someone else's Stripe customer. A guest
    // types theirs into Stripe instead.
    const email: string | null = isGuest ? null : decodedToken!.email || bodyEmail || null;
    // Where the buyer lands afterwards (and where the purchase is verified).
    // Same-site paths only: "/sat", never "//evil.com" or a full URL.
    // A simple query may ride along ("/cdl/stats?tab=community") so a guest
    // comes back to the tab they paid from.
    const returnPath =
      typeof rawReturnPath === 'string' && /^\/[A-Za-z0-9/_-]*(\?[A-Za-z0-9=&_-]{1,80})?$/.test(rawReturnPath) && !rawReturnPath.startsWith('//')
        ? rawReturnPath
        : '/dmv/dashboard';
    const returnJoin = returnPath.includes('?') ? '&' : '?';
    const userId: string | null = decodedToken?.uid ?? null;

    // Validate required fields
    if (!isGuest && !email) {
      return NextResponse.json(
        { error: 'Missing required field: email' },
        { status: 400 }
      );
    }

    // Check if user already has premium
    const adminDb = getAdminDb();
    if (userId) {
      const userDoc = await adminDb.collection('users').doc(userId).get();
      if (userDoc.data()?.subscription?.isPremium) {
        return NextResponse.json(
          { error: 'User already has premium access' },
          { status: 400 }
        );
      }
    }

    // Where this buyer first came from (lib/funnel.ts): the browser's own
    // first visit, else the one saved with the account at signup. Stored on
    // the payment so revenue can be read by landing page and channel.
    let source: string | null = typeof bodySource === 'string' && /^[a-z_]{2,20}$/.test(bodySource) ? bodySource : null;
    let landing: string | null = typeof bodyLanding === 'string' && /^\/[A-Za-z0-9/_.-]{0,120}$/.test(bodyLanding) ? bodyLanding : null;
    if (userId && (!source || !landing)) {
      try {
        const origin = await adminDb.collection('signupOrigins').doc(userId).get();
        const o = origin.data();
        if (!source && typeof o?.source === 'string') source = o.source;
        if (!landing && typeof o?.landing === 'string') landing = o.landing.slice(0, 120);
      } catch {
        // Attribution is best-effort: never block a checkout on it.
      }
    }

    const stripe = getStripe();

    // A guest's browser gets a random key (httpOnly cookie, hash in the
    // metadata): only this browser can be signed in from the success page.
    const guestKey = isGuest ? newGuestKey() : null;

    // Create or retrieve Stripe customer (signed in). A guest's customer is
    // made by Checkout from the email they type there.
    let customerId: string | null = null;
    if (!isGuest && email && userId) {
      const existingCustomers = await stripe.customers.list({
        email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customerId = existingCustomers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email,
          metadata: {
            firebaseUserId: userId,
          },
        });
        customerId = customer.id;
      }
    }

    // Determine the base URL for redirects
    // Stripe sends the buyer back to the site they came from: this host or the
    // public one, never an address taken from the request body as it stands.
    const ownOrigin = request.nextUrl.origin;
    let returnOrigin = '';
    try {
      returnOrigin = typeof returnUrl === 'string' ? new URL(returnUrl).origin : '';
    } catch {
      returnOrigin = '';
    }
    const baseUrl = returnOrigin === ownOrigin || returnOrigin === new URL(SITE_URL).origin ? returnOrigin : ownOrigin;

    // Charge in the buyer's currency, the price the paywall showed them
    // (lib/pricing.ts, both from the IP country). Dollars keep the Stripe price.
    const country = visitorCountry(request);
    const price = premiumPriceFor(country);

    const productId = price.currency === 'usd' ? null : await getPremiumProductId();

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      ...(customerId ? { customer: customerId } : { customer_creation: 'always' as const }),
      mode: 'payment',
      // Dollars use the Stripe price; other currencies the same Stripe product,
      // so the description and image are set once, in the Stripe dashboard.
      line_items: [
        PREMIUM_PRICE_ID && price.currency === 'usd'
          ? { price: PREMIUM_PRICE_ID, quantity: 1 }
          : {
              price_data: {
                currency: price.currency,
                unit_amount: stripeUnitAmount(price),
                ...(productId ? { product: productId } : { product_data: PREMIUM_PRODUCT }),
              },
              quantity: 1,
            },
      ],
      success_url: `${baseUrl}${returnPath}${returnJoin}session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${baseUrl}${returnPath}${returnJoin}canceled=true`,
      metadata: {
        ...(userId && email ? { userId, email } : { guest: '1', guestKey: guestKey!.hash }),
        ...(location && { location }),
        ...(country && { country }),
        ...(source && { source }),
        ...(landing && { landing }),
        // Which side of the English paywall test (lib/paywallTest.ts) the buyer saw.
        ...(isPaywallVariant(paywallVariant) && { paywallVariant }),
        // Which paywall message they last saw: first, second or third visit.
        ...(isPaywallHit(paywallHit) && { paywallHit: String(paywallHit) }),
        // And whether return visits get the new message or the first one again.
        ...(isPaywallReturnArm(paywallReturn) && { paywallReturn }),
      },
    });

    const res = NextResponse.json({ checkoutUrl: session.url });
    if (guestKey) {
      res.cookies.set(GUEST_KEY_COOKIE, guestKey.key, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/api/stripe',
        maxAge: GUEST_SIGN_IN_WINDOW_MS / 1000,
      });
    }
    return res;
  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}
