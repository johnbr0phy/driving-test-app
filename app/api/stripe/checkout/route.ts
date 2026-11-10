import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PREMIUM_PRICE_ID, PREMIUM_PRODUCT } from '@/lib/stripe';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isPaywallVariant } from '@/lib/paywallTestIds';
import { premiumPriceFor, stripeUnitAmount } from '@/lib/pricing';
import { visitorCountry } from '@/lib/server/visitorCountry';
import { SITE_URL } from '@/lib/siteUrl';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      );
    }

    // Verify Firebase auth token
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(token);

    const body = await request.json();
    const { email: bodyEmail, returnUrl, returnPath: rawReturnPath, location, paywallVariant, source: bodySource, landing: bodyLanding } = body;
    // The account's own address when it has one: an address from the body
    // would attach this checkout to someone else's Stripe customer.
    const email = decodedToken.email || bodyEmail;
    // Where the buyer lands afterwards (and where the purchase is verified).
    // Same-site paths only: "/sat", never "//evil.com" or a full URL.
    const returnPath =
      typeof rawReturnPath === 'string' && /^\/[A-Za-z0-9/_-]*$/.test(rawReturnPath) && !rawReturnPath.startsWith('//')
        ? rawReturnPath
        : '/dmv/dashboard';
    const userId = decodedToken.uid;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Missing required field: email' },
        { status: 400 }
      );
    }

    // Check if user already has premium
    const adminDb = getAdminDb();
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData?.subscription?.isPremium) {
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
    if (!source || !landing) {
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

    // Create or retrieve Stripe customer
    let customerId: string;
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

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      line_items: [
        PREMIUM_PRICE_ID && price.currency === 'usd'
          ? { price: PREMIUM_PRICE_ID, quantity: 1 }
          : {
              price_data: {
                currency: price.currency,
                unit_amount: stripeUnitAmount(price),
                product_data: {
                  name: PREMIUM_PRODUCT.name,
                  description: PREMIUM_PRODUCT.description,
                },
              },
              quantity: 1,
            },
      ],
      success_url: `${baseUrl}${returnPath}?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${baseUrl}${returnPath}?canceled=true`,
      metadata: {
        userId,
        email,
        ...(location && { location }),
        ...(country && { country }),
        ...(source && { source }),
        ...(landing && { landing }),
        // Which side of the English paywall test (lib/paywallTest.ts) the buyer saw.
        ...(isPaywallVariant(paywallVariant) && { paywallVariant }),
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}
