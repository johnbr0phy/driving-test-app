import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_ZABm3to6_GzdZQQ58cj5DYftGbtr9ub1a");

const reminderEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your DMV test is coming up</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Your test is {{daysUntilTest}} days away 🐯</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Hey {{name}},
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Your DMV test is coming up on <strong>{{testDate}}</strong>. Are you ready?
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Students who unlock Premium pass at a <strong>92% rate</strong> vs 67% for free users. At $9.99, it costs less than a single retest fee — and a lot less than the embarrassment of having to book again.
              </p>
              <table role="presentation" style="margin: 32px auto; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/dashboard?utm_source=reminder&utm_medium=email&promo=READY10" style="display: inline-block; padding: 14px 32px; background-color: #FF6B35; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px;">Unlock Premium — $9.99</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Good luck,<br>
                John @ TigerTest.io
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #FFF9F5; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                You asked us to remind you. <a href="https://tigertest.io/unsubscribe?email={{email}}" style="color: #FF6B35; text-decoration: none;">Unsubscribe</a>
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
    const { email, testDate, name, userId } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email required" }, { status: 400 });
    }

    const db = getAdminDb();

    // Save lead to Firestore
    const leadData: Record<string, unknown> = {
      email,
      capturedAt: new Date().toISOString(),
      source: "paywall_exit",
    };
    if (testDate) leadData.testDate = testDate;
    if (name) leadData.name = name;
    if (userId) leadData.userId = userId;

    await db.collection("leads").add(leadData);

    // Send an immediate confirmation + reminder email if test date is set
    if (testDate) {
      const testDateObj = new Date(testDate);
      const today = new Date();
      const daysUntilTest = Math.ceil(
        (testDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      const displayName = name || "there";
      const formattedDate = testDateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      const html = reminderEmailTemplate
        .replace(/{{name}}/g, displayName)
        .replace(/{{testDate}}/g, formattedDate)
        .replace(/{{daysUntilTest}}/g, String(daysUntilTest))
        .replace(/{{email}}/g, encodeURIComponent(email));

      await resend.emails.send({
        from: "TigerTest <noreply@tigertest.io>",
        to: email,
        subject: `Your DMV test is ${daysUntilTest} days away — are you ready?`,
        html,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Lead capture error:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
