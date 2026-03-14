import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PREMIUM_PRODUCT } from '@/lib/stripe';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';

// Pass Pack bundle: $14.99 — premium access + road signs cheat sheet + priority support
const BUNDLE_PRODUCT = {
  name: 'TigerTest Pass Pack',
  description: 'Premium tests + State Road Signs Cheat Sheet + Priority email support',
  price: 1499, // $14.99 in cents
};

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured.' },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(token);

    const body = await request.json();
    const { email, returnUrl } = body;
    const userId = decodedToken.uid;

    if (!email) {
      return NextResponse.json({ error: 'Missing required field: email' }, { status: 400 });
    }

    const adminDb = getAdminDb();
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData?.subscription?.isPremium) {
        return NextResponse.json({ error: 'User already has premium access' }, { status: 400 });
      }
    }

    const stripe = getStripe();

    let customerId: string;
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email,
        metadata: { firebaseUserId: userId },
      });
      customerId = customer.id;
    }

    const baseUrl = returnUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: BUNDLE_PRODUCT.price,
            product_data: {
              name: BUNDLE_PRODUCT.name,
              description: BUNDLE_PRODUCT.description,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true&bundle=pass_pack`,
      cancel_url: `${baseUrl}/pass-pack?canceled=true`,
      metadata: {
        userId,
        email,
        bundle: 'pass_pack',
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Bundle checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}
