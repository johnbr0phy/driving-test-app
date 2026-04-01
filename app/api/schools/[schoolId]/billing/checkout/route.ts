// app/api/schools/[schoolId]/billing/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  if (!schoolId) {
    return NextResponse.json({ error: "schoolId required" }, { status: 400 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  // Lazy import so build does not fail without Stripe key
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey, { apiVersion: "2025-12-15.clover" });

  let body: { successUrl?: string; cancelUrl?: string } = {};
  try {
    body = await req.json();
  } catch {
    // ignore
  }

  const successUrl =
    body.successUrl ??
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://tigertest.io"}/schools/dashboard?billing=success`;
  const cancelUrl =
    body.cancelUrl ??
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://tigertest.io"}/schools/dashboard`;

  // Look up school so we can pass admin email to Stripe
  let adminEmail: string | undefined;
  try {
    const adminDb = getAdminDb();
    const snap = await adminDb.collection("school_accounts").doc(schoolId).get();
    if (snap.exists) {
      adminEmail = (snap.data() as { adminEmail?: string }).adminEmail;
    }
  } catch {
    // non-fatal
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: adminEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "TigerTest School — 20 seats",
            description:
              "Up to 20 student seats, instructor dashboard, progress tracking",
          },
          unit_amount: 4900, // $49.00
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    metadata: { schoolId },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return NextResponse.json({ url: session.url });
}
