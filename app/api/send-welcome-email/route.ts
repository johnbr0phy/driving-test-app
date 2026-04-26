import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { normalizeReferralCode } from "@/lib/referral";

const resend = new Resend(process.env.RESEND_API_KEY || "re_ZABm3to6_GzdZQQ58cj5DYftGbtr9ub1a");

// First-name extractor for friendly copy: "John B" -> "John"; falls back to null.
function firstName(displayName: string | null | undefined): string | null {
  if (!displayName) return null;
  const trimmed = displayName.trim();
  if (!trimmed) return null;
  return trimmed.split(/\s+/)[0];
}

async function lookupReferrerName(rawCode: string | null | undefined): Promise<string | null> {
  if (!rawCode) return null;
  const code = normalizeReferralCode(rawCode);
  if (!code) return null;
  try {
    const db = getAdminDb();
    const codeDoc = await db.collection("referrals").doc(code).get();
    if (!codeDoc.exists) return null;
    const ownerUid = codeDoc.data()?.ownerUid as string | undefined;
    if (!ownerUid) return null;
    // Auth's displayName is more reliably populated than the user doc
    const authUser = await getAdminAuth().getUser(ownerUid).catch(() => null);
    return firstName(authUser?.displayName);
  } catch (err) {
    console.error("Referrer lookup failed:", err);
    return null;
  }
}

// Body copy injected into the welcome template. Two variants: standard and
// "you were invited by a friend" (gets a different lead, mentions the bonus,
// and sticks to the same testing-focused advice).
function welcomeBody(opts: { greeting: string; referrerFirstName: string | null; isReferred: boolean }): string {
  const { greeting, referrerFirstName, isReferred } = opts;
  if (isReferred) {
    const inviter = referrerFirstName ? `${referrerFirstName} sent you a link` : "A friend sent you a link";
    return `
      <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
        ${greeting}
      </p>
      <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
        <strong style="font-weight: 600;">${inviter} — and that just unlocked your "Safety &amp; Emergencies" training set for free.</strong> It's the one most people miss questions on, so you've already got a head start.
      </p>
      <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
        Here's the move: take one full 50-question practice test before you start drilling. No instant feedback, just like the real DMV. After 50 questions you'll know exactly where you stand — and which sections to grind in training mode.
      </p>
      <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
        <tr>
          <td align="center">
            <a href="https://tigertest.io/dashboard?utm_source=tigertest&utm_medium=email&utm_campaign=welcome_referred" style="display: inline-block; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 15px;">Claim your bonus &amp; start →</a>
          </td>
        </tr>
      </table>
      <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
        Want the rest of the premium content too? Invite 3 of your own friends and we'll keep unlocking sets — no payment needed.
      </p>
      <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
        Good luck,<br>
        John @ TigerTest.io
      </p>
    `;
  }
  return `
    <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
      ${greeting}
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
  `;
}

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
              {{body}}
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
    const { userId, email, displayName, emailConsent, referralCode } = await request.json();

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
      tx.set(userRef, {
        lastEmailSent: new Date().toISOString(),
        emailsSent: FieldValue.arrayUnion("welcome"),
      }, { merge: true });
    });

    if (alreadySent) {
      return NextResponse.json({ success: false, reason: "already_sent" });
    }

    const referrerFirstName = await lookupReferrerName(referralCode);
    const isReferred = referrerFirstName !== null || Boolean(referralCode);

    const greetingName = firstName(displayName);
    const greeting = greetingName ? `Hey ${greetingName},` : "Hey there,";
    const unsubscribeToken = Buffer.from(userId).toString("base64");

    const body = welcomeBody({ greeting, referrerFirstName, isReferred });

    const html = welcomeTemplate
      .replace(/{{body}}/g, body)
      .replace(/{{unsubscribeToken}}/g, unsubscribeToken);

    const subject = isReferred
      ? referrerFirstName
        ? `${referrerFirstName} sent you TigerTest — bonus unlocked`
        : "A friend sent you TigerTest — bonus unlocked"
      : "Welcome to TigerTest";

    await resend.emails.send({
      from: "TigerTest <noreply@tigertest.io>",
      to: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Welcome email error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
