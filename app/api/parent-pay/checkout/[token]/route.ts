import { NextRequest, NextResponse } from "next/server";
import { getStripe, PREMIUM_PRICE_ID, PREMIUM_PRODUCT } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebase-admin";
import type { ParentPayRequest } from "@/lib/parent-pay";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 },
      );
    }

    const { token } = await params;
    if (!token || !/^[a-f0-9]{12}$/.test(token)) {
      return NextResponse.json({ error: "Invalid link." }, { status: 400 });
    }

    const db = getAdminDb();
    const reqSnap = await db.collection("parentPayRequests").doc(token).get();
    if (!reqSnap.exists) {
      return NextResponse.json({ error: "Link not found." }, { status: 404 });
    }
    const req = reqSnap.data() as ParentPayRequest;

    if (req.status === "paid") {
      return NextResponse.json({ error: "This link has already been used." }, { status: 400 });
    }
    if (new Date(req.expiresAt).getTime() < Date.now()) {
      return NextResponse.json({ error: "This link has expired." }, { status: 400 });
    }

    // Don't charge a parent for a teen who is already premium.
    const userSnap = await db.collection("users").doc(req.teenUid).get();
    if (userSnap.exists) {
      const userData = userSnap.data() as Record<string, unknown>;
      const sub = userData.subscription as Record<string, unknown> | undefined;
      if (sub?.isPremium === true) {
        return NextResponse.json(
          { error: "This account already has Premium." },
          { status: 400 },
        );
      }
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        PREMIUM_PRICE_ID
          ? { price: PREMIUM_PRICE_ID, quantity: 1 }
          : {
              price_data: {
                currency: "usd",
                unit_amount: PREMIUM_PRODUCT.price,
                product_data: {
                  name: PREMIUM_PRODUCT.name,
                  description: PREMIUM_PRODUCT.description,
                },
              },
              quantity: 1,
            },
      ],
      success_url: `${SITE_URL}/pay/${token}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/pay/${token}?canceled=true`,
      metadata: {
        parentPayToken: token,
        teenUid: req.teenUid,
        flow: "parent_pay",
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("[parent-pay/checkout]", error);
    return NextResponse.json(
      { error: "Failed to start checkout. Please try again." },
      { status: 500 },
    );
  }
}
