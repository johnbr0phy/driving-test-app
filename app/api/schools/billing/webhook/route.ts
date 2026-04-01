// app/api/schools/billing/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey, { apiVersion: "2025-12-15.clover" });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: import("stripe").Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook error: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "customer.subscription.created"
  ) {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;
    const schoolId = session.metadata?.schoolId;
    const customerId =
      typeof session.customer === "string" ? session.customer : session.customer?.id;
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id;

    if (schoolId) {
      try {
        const adminDb = getAdminDb();
        await adminDb
          .collection("school_accounts")
          .doc(schoolId)
          .update({
            plan: "starter",
            paidSeats: 20,
            stripeCustomerId: customerId ?? null,
            stripeSubscriptionId: subscriptionId ?? null,
            updatedAt: new Date().toISOString(),
          });
      } catch (err) {
        console.error("Failed to update school after payment:", err);
        return NextResponse.json({ error: "DB update failed" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
