import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PREMIUM_PRICE_ID, PREMIUM_PRODUCT } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { recipientEmail, recipientName, senderName, note, returnUrl } = body;

    if (!recipientEmail || !recipientName || !senderName) {
      return NextResponse.json(
        { error: 'Missing required fields: recipientEmail, recipientName, senderName' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      return NextResponse.json(
        { error: 'Invalid recipient email address' },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Base URL for redirects
    const baseUrl = returnUrl
      ? returnUrl.replace(/\/gift\/success$/, '')
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
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
                  name: `TigerTest Premium — Gift for ${recipientName}`,
                  description: `Sent by ${senderName}. Unlocks all practice tests & training for ${recipientName}.`,
                },
              },
              quantity: 1,
            },
      ],
      // Pre-fill buyer email if supplied (from auth header — optional)
      customer_creation: 'always',
      success_url: `${baseUrl}/gift/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/gift`,
      metadata: {
        gift: 'true',
        recipientEmail,
        recipientName,
        senderName,
        ...(note ? { note: note.slice(0, 500) } : {}),
      },
      // Show recipient info in Stripe dashboard
      payment_intent_data: {
        description: `Gift premium for ${recipientName} (${recipientEmail}) from ${senderName}`,
        metadata: {
          gift: 'true',
          recipientEmail,
          recipientName,
          senderName,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Gift checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create gift checkout: ${errorMessage}` },
      { status: 500 }
    );
  }
}
