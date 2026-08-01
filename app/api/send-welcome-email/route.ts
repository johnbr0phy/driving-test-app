import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { sendEmail } from "@/lib/resend";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

const welcomeTemplate = EMAIL_TEMPLATES.welcome;

export async function POST(request: NextRequest) {
  try {
    const { userId, email, displayName, emailConsent } = await request.json();

    // Respect consent
    if (!emailConsent) {
      return NextResponse.json({ success: false, reason: "no_consent" });
    }

    if (!userId || !email) {
      return NextResponse.json(
        { success: false, error: "Missing userId or email" },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const userRef = db.collection("users").doc(userId);

    // Atomic check-and-set to prevent race conditions
    let alreadySent = false;
    await db.runTransaction(async (tx) => {
      const doc = await tx.get(userRef);
      const data = doc.data();
      if (data?.emailsSent?.includes("welcome")) {
        alreadySent = true;
        return;
      }
      const updates: Record<string, unknown> = {
        lastEmailSent: new Date().toISOString(),
        emailsSent: FieldValue.arrayUnion("welcome"),
      };
      // First-time stamp so admin conversion stats can compute time-to-purchase.
      if (!data?.createdAt) {
        updates.createdAt = new Date().toISOString();
      }
      tx.set(userRef, updates, { merge: true });
    });

    if (alreadySent) {
      return NextResponse.json({ success: false, reason: "already_sent" });
    }

    const greeting = displayName ? `Hey ${displayName},` : "Hey there,";
    const unsubscribeToken = Buffer.from(userId).toString("base64");

    const html = welcomeTemplate
      .replace(/{{greeting}}/g, greeting)
      .replace(/{{unsubscribeToken}}/g, unsubscribeToken);

    // The "welcome" marker was claimed above to win the race against a second
    // request. If the send doesn't actually go out, release the claim so the
    // user can still get a welcome email later.
    const releaseClaim = async () => {
      await userRef.set(
        { emailsSent: FieldValue.arrayRemove("welcome") },
        { merge: true }
      );
    };

    const result = await sendEmail({
      to: email,
      subject: "Welcome to TigerTest",
      html,
      kind: "transactional",
    });

    if (!result.ok) {
      await releaseClaim();
      console.error("[welcome] send failed:", result.error);
      return NextResponse.json(
        {
          success: false,
          reason: result.quotaExhausted ? "quota_exhausted" : undefined,
          error: result.error,
        },
        { status: result.quotaExhausted ? 503 : 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Welcome email error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
