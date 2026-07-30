import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { sendEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const { schoolName, contactName, email, phone, city, state, studentsPerYear, hearAbout } =
      await request.json();

    if (!schoolName || !contactName || !email) {
      return NextResponse.json(
        { error: "Missing required fields: schoolName, contactName, email" },
        { status: 400 }
      );
    }

    // Save to Firestore
    const db = getAdminDb();
    await db.collection("school_leads").add({
      schoolName,
      contactName,
      email,
      phone: phone || "",
      city: city || "",
      state: state || "",
      estimatedStudentsPerYear: studentsPerYear || "",
      howHeard: hearAbout || "",
      submittedAt: new Date().toISOString(),
    });

    // Send confirmation email to the school. The lead is already saved above,
    // so a failed email must not fail the request — just log it.
    const confirmation = await sendEmail({
      kind: "transactional",
      to: email,
      subject: "Thanks for your interest in TigerTest",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Thanks for reaching out!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Hey ${contactName},
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Thanks for your interest in bringing TigerTest to ${schoolName}. We&rsquo;ll put together a custom quote and send it your way within one business day.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                In the meantime, feel free to try TigerTest yourself &mdash; it&rsquo;s the same experience your students will get.
              </p>
              <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/?utm_source=tigertest&utm_medium=email&utm_campaign=school_lead" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Try TigerTest</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Talk soon,<br>
                John at TigerTest
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    if (!confirmation.ok) {
      console.error("[school-lead] confirmation email failed:", confirmation.error);
    }

    // Send notification email to John
    const notification = await sendEmail({
      kind: "transactional",
      to: "john@johnbrophy.net",
      subject: `New school lead: ${schoolName}`,
      html: `<p>New school lead: <strong>${schoolName}</strong>, ${city} ${state}, ${studentsPerYear || "unknown"} students/yr.</p>
<p>Contact: ${contactName} &lt;${email}&gt; ${phone || "(no phone)"}</p>
<p>Heard about us via: ${hearAbout || "not specified"}</p>`,
    });

    if (!notification.ok) {
      console.error("[school-lead] lead notification failed:", notification.error);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("School lead error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
