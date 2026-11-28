import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { isInternalEmail } from "@/lib/internal";
import { checkoutExamId } from "@/lib/checkoutSteps";
import { checkoutDimensions } from "@/lib/server/checkoutDimensions";
import { priceFromStripe } from "@/lib/pricing";
import { guestKeyCookie, guestKeyMatches, isGuestSession } from "@/lib/server/guestCheckout";
import { getStripe } from "@/lib/stripe";

// Read only the settled ledger. Keep analytics independent of granting Premium.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const id = body?.sessionId;
  if (typeof id !== "string" || !/^cs_[a-zA-Z0-9_]{1,240}$/.test(id)) {
    return new Response(null, { status: 400 });
  }
  const authorization = request.headers.get("authorization");
  const guestKey = request.cookies.get(guestKeyCookie(id))?.value;
  let uid: string | undefined;
  if (authorization) {
    try {
      if (!authorization.startsWith("Bearer ")) return new Response(null, { status: 401 });
      uid = (await getAdminAuth().verifyIdToken(authorization.slice(7))).uid;
    } catch {
      return new Response(null, { status: 401 });
    }
  }
  if (!uid && !guestKey) return new Response(null, { status: 401 });

  const payments = await getAdminDb().collection("payments").where("stripeSessionId", "==", id).limit(1).get();
  const payment = payments.docs[0]?.data();
  // Missing, ineligible and inaccessible receipts all give the same empty
  // response. A session ID alone must reveal nothing about another buyer.
  const pending = () => new Response(null, { status: 202 });
  if (!payment || isInternalEmail(payment.email) || (uid && payment.userId !== uid)) return pending();
  const { checkoutDevice, checkoutItem } = checkoutDimensions(payment);
  if (!checkoutDevice || payment.status !== "succeeded" || !Number.isSafeInteger(payment.amount) ||
      payment.amount <= 0 || typeof payment.currency !== "string" || !/^[a-z]{3}$/i.test(payment.currency)) return pending();
  if (!uid) {
    if (!payment.guestCheckout) return pending();
    const session = await getStripe().checkout.sessions.retrieve(id);
    if (!isGuestSession(session) || !guestKeyMatches(session, guestKey)) return pending();
  }
  const location = typeof payment.location === "string" && checkoutExamId(payment.location) === payment.exam
    ? payment.location : undefined;
  const price = priceFromStripe(payment.currency, payment.amount);
  return NextResponse.json({
    transactionId: id,
    value: price.amount,
    currency: price.currency.toUpperCase(),
    ...(location && { examId: payment.exam, paywallLocation: location }),
    ...(checkoutItem && { checkoutItem }),
    checkoutDevice,
    buyerState: payment.guestCheckout ? "guest" : "signed_in",
  }, { headers: { "Cache-Control": "private, no-store" } });
}
