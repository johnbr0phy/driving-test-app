import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getAdminDb } from "@/lib/firebase-admin";
import type { SchoolStudent } from "@/lib/school-types";

const resend = new Resend(process.env.RESEND_API_KEY || "re_ZABm3to6_GzdZQQ58cj5DYftGbtr9ub1a");

// ── GET /api/schools/[schoolId]/students ──────────────────────────────────
// Returns all students (active + inactive) for the given school account.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  if (!schoolId) {
    return NextResponse.json({ error: "schoolId required" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const snap = await db
      .collection("school_accounts")
      .doc(schoolId)
      .collection("students")
      .orderBy("createdAt", "asc")
      .get();

    const students: SchoolStudent[] = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        uid: doc.id,
        name: d.name ?? d.email.split("@")[0],
        email: d.email,
        testsTaken: d.sectionsCompleted ?? 0,
        lastActive: d.lastActive ?? d.createdAt ?? new Date().toISOString().split("T")[0],
        active: d.active ?? true,
      };
    });

    return NextResponse.json({ students });
  } catch (err) {
    console.error("[schools students GET]", err);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

// ── School invite email template ──────────────────────────────────────────
function buildInviteEmail(schoolName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You've been invited to TigerTest</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Your instructor invited you to TigerTest</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                <strong style="font-weight: 600;">${schoolName}</strong> has set you up on TigerTest to help you prepare for your DMV written test.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                TigerTest gives you 8 practice sections that cover everything on the real exam. Work through them at your own pace. The goal is simple: pass all 8.
              </p>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                <strong style="font-weight: 600;">Sign up with this email address</strong> and your progress will be tracked automatically.
              </p>
              <table role="presentation" style="margin: 32px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/signup?utm_source=school-invite&utm_medium=email&utm_campaign=school-invite" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">Start Practising</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Good luck,<br>
                John @ TigerTest.io
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #FFF9F5; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
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
}

// ── POST /api/schools/[schoolId]/students ─────────────────────────────────
// Body: { emails: string[] }  — adds new students, writes to Firestore, sends invite emails.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const { schoolId } = await params;
  if (!schoolId) {
    return NextResponse.json({ error: "schoolId required" }, { status: 400 });
  }

  let body: { emails?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const emails = (body.emails ?? [])
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.includes("@"));

  if (!emails.length) {
    return NextResponse.json({ error: "No valid emails provided" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const schoolRef = db.collection("school_accounts").doc(schoolId);
    const studentsRef = schoolRef.collection("students");

    // Fetch school name for the invite email
    const schoolDoc = await schoolRef.get();
    const schoolName = schoolDoc.data()?.schoolName ?? "Your driving school";

    // Fetch existing active emails to check duplicates
    const existing = await studentsRef.where("active", "==", true).get();
    const activeEmails = new Set(existing.docs.map((d) => d.data().email?.toLowerCase()));

    const newEmails = emails.filter((e) => !activeEmails.has(e));
    if (!newEmails.length) {
      return NextResponse.json({ added: 0, skipped: emails.length, emailsSent: 0 });
    }

    // Write to Firestore
    const today = new Date().toISOString().split("T")[0];
    const batch = db.batch();

    for (const email of newEmails) {
      const ref = studentsRef.doc(); // auto-id
      batch.set(ref, {
        email,
        name: email.split("@")[0],
        sectionsCompleted: 0,
        active: true,
        createdAt: today,
        lastActive: today,
        inviteStatus: "invited",
        invitedAt: today,
      });
    }

    await batch.commit();

    // Send invite emails (fire-and-forget per email, collect results)
    const htmlBody = buildInviteEmail(schoolName);
    const emailResults = await Promise.allSettled(
      newEmails.map((email) =>
        resend.emails.send({
          from: "TigerTest <noreply@tigertest.io>",
          to: email,
          subject: `${schoolName} invited you to TigerTest`,
          html: htmlBody,
        })
      )
    );

    const emailsSent = emailResults.filter((r) => r.status === "fulfilled").length;
    const emailsFailed = emailResults.filter((r) => r.status === "rejected").length;

    if (emailsFailed > 0) {
      console.warn(`[school invite] ${emailsFailed}/${newEmails.length} emails failed to send for school ${schoolId}`);
    }

    return NextResponse.json({
      added: newEmails.length,
      skipped: emails.length - newEmails.length,
      emailsSent,
    });
  } catch (err) {
    console.error("[schools students POST]", err);
    return NextResponse.json({ error: "Failed to add students" }, { status: 500 });
  }
}
