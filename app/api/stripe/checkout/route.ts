import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PREMIUM_PRICE_ID, PREMIUM_PRODUCT } from '@/lib/stripe';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

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
    const { email, returnUrl, location } = body;
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
    const baseUrl = returnUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        PREMIUM_PRICE_ID
          ? { price: PREMIUM_PRICE_ID, quantity: 1 }
          : {
              price_data: {
                currency: 'usd',
                unit_amount: PREMIUM_PRODUCT.price,
                product_data: {
                  name: PREMIUM_PRODUCT.name,
                  description: PREMIUM_PRODUCT.description,
                },
              },
              quantity: 1,
            },
      ],
      success_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${baseUrl}/dashboard?canceled=true`,
      metadata: {
        userId,
        email,
        ...(location && { location }),
      },
    });

    // Track checkout_start event in Firestore
    const today = new Date().toISOString().split('T')[0];
    adminDb.doc('analytics/paywall').set({
      [`daily.${today}.checkout_start`]: FieldValue.increment(1),
    }, { merge: true }).catch(() => {});

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
