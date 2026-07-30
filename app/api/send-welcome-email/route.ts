import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { sendEmail } from "@/lib/resend";

const welcomeTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TigerTest</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Welcome to TigerTest</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                {{greeting}}
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Fear not. Thousands of people have used TigerTest to pass their DMV test, and the ones who pass on their first try all have one thing in common: they actually tested themselves.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                <strong style="font-weight: 600;">The best way to prep is to spend 30 minutes doing practice tests.</strong> Answer questions one after the other, without instant feedback. That's exactly what the real test feels like.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                After 50 questions, you'll have a really accurate picture of how ready you are.
              </p>
              <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/dashboard?utm_source=tigertest&utm_medium=email&utm_campaign=welcome" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Take Your First Practice Test</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                You can use our training mode later to drill down on the stuff you got wrong. But start with a full test first - it's the fastest way to see where you actually stand.
              </p>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Good luck,<br>
                John @ TigerTest.io
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #FFF9F5; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                <a href="https://tigertest.io/unsubscribe?token={{unsubscribeToken}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="https://tigertest.io/privacy" style="color: #FF6B35; text-decoration: none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

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
