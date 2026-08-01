// app/api/schools/[schoolId]/billing/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireSchoolAdmin } from "@/lib/server/school-auth";

const TIERS = {
  starter: {
    name: "TigerTest School — Starter (10 seats)",
    description: "Up to 10 reusable student seats, admin dashboard, progress tracking",
    unit_amount: 14900, // $149.00
    seats: 10,
  },
  growth: {
    name: "TigerTest School — Growth (30 seats)",
    description: "Up to 30 reusable student seats, bulk invites, priority support",
    unit_amount: 34900, // $349.00
    seats: 30,
  },
  school: {
    name: "TigerTest School — School (Unlimited seats)",
    description: "Unlimited student seats, dedicated account manager, custom reporting",
    unit_amount: 69900, // $699.00
    seats: null,
  },
} as const;

type Tier = keyof typeof TIERS;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  if (!schoolId) {
    return NextResponse.json({ error: "schoolId required" }, { status: 400 });
  }

  const gate = await requireSchoolAdmin(req, schoolId);
  if (!gate.ok) return gate.response;

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

  let body: { successUrl?: string; cancelUrl?: string; tier?: string } = {};
  try {
    body = await req.json();
  } catch {
    // ignore
  }

  const tier: Tier = (body.tier as Tier) in TIERS ? (body.tier as Tier) : "starter";
  const tierConfig = TIERS[tier];

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
            name: tierConfig.name,
            description: tierConfig.description,
          },
          unit_amount: tierConfig.unit_amount,
          recurring: { interval: "year" },
        },
        quantity: 1,
      },
    ],
    metadata: { schoolId, tier },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return NextResponse.json({ url: session.url });
}
