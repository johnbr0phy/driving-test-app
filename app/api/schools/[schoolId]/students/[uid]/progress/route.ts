import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

import { sendEmail } from "@/lib/resend";

const TOTAL_SECTIONS = 8;

// ── Pass notification email ───────────────────────────────────────────────
function buildPassEmail(studentName: string, studentEmail: string, schoolName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student passed all 8 sections</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #FFF9F5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <img src="https://tigertest.io/tiger.png" alt="TigerTest" style="width: 48px; height: auto; margin-bottom: 16px;" />
              <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">A student just passed all 8 sections!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Great news from <strong style="font-weight: 600;">${schoolName}</strong>:
              </p>
              <table role="presentation" style="width: 100%; background: #FFF9F5; border-radius: 8px; padding: 20px; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 4px 0;">
                    <span style="color: #999; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Student</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <span style="color: #1a1a1a; font-size: 17px; font-weight: 600;">${studentName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0 4px;">
                    <span style="color: #999; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <span style="color: #4a4a4a; font-size: 15px;">${studentEmail}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0 4px;">
                    <span style="color: #999; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Sections Completed</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <span style="color: #22c55e; font-size: 17px; font-weight: 600;">8 / 8 ✓</span>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                They've completed every practice section on TigerTest — they should be ready for the real DMV exam.
              </p>
              <table role="presentation" style="margin: 24px 0; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://tigertest.io/schools/dashboard" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 15px;">View Dashboard</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
                Keep up the great work,<br>
                John @ TigerTest.io
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #FFF9F5; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6; text-align: center;">
                You're receiving this because you're the admin of ${schoolName} on TigerTest.
                &nbsp;|&nbsp;
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

// ── POST /api/schools/[schoolId]/students/[uid]/progress ──────────────────
// Body: { sectionsCompleted: number, studentName?: string, studentEmail?: string }
// Updates the student's sectionsCompleted in Firestore.
// If sectionsCompleted == TOTAL_SECTIONS and not already notified, sends a
// pass-notification email to the school admin.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ schoolId: string; uid: string }> }
) {
  const { schoolId, uid } = await params;
  if (!schoolId || !uid) {
    return NextResponse.json({ error: "schoolId and uid required" }, { status: 400 });
  }

  let body: {
    sectionsCompleted?: number;
    studentName?: string;
    studentEmail?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { sectionsCompleted, studentName, studentEmail } = body;

  if (typeof sectionsCompleted !== "number" || sectionsCompleted < 0 || sectionsCompleted > TOTAL_SECTIONS) {
    return NextResponse.json(
      { error: `sectionsCompleted must be a number between 0 and ${TOTAL_SECTIONS}` },
      { status: 400 }
    );
  }

  try {
    const db = getAdminDb();
    const schoolRef = db.collection("school_accounts").doc(schoolId);
    const studentRef = schoolRef.collection("students").doc(uid);

    // Fetch existing student doc + school doc in parallel
    const [studentSnap, schoolSnap] = await Promise.all([
      studentRef.get(),
      schoolRef.get(),
    ]);

    if (!studentSnap.exists) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    if (!schoolSnap.exists) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    const studentData = studentSnap.data()!;
    const schoolData = schoolSnap.data()!;

    const prevSections: number = studentData.sectionsCompleted ?? 0;
    const alreadyNotified: boolean = studentData.passNotificationSent === true;
    const today = new Date().toISOString().split("T")[0];

    // Update student doc
    await studentRef.update({
      sectionsCompleted,
      lastActive: today,
      ...(sectionsCompleted === TOTAL_SECTIONS && !alreadyNotified
        ? { passNotificationSent: true, passedAt: today }
        : {}),
    });

    // Send pass notification if just hit 8 sections and not already sent
    let notificationSent = false;
    if (
      sectionsCompleted === TOTAL_SECTIONS &&
      prevSections < TOTAL_SECTIONS &&
      !alreadyNotified
    ) {
      const adminEmail: string = schoolData.adminEmail ?? "";
      const schoolName: string = schoolData.schoolName ?? "Your school";
      const resolvedStudentName: string =
        studentName ?? studentData.name ?? studentData.email?.split("@")[0] ?? "A student";
      const resolvedStudentEmail: string =
        studentEmail ?? studentData.email ?? "";

      if (adminEmail) {
        // Non-fatal — log failures but don't fail the progress update.
        const result = await sendEmail({
          kind: "transactional",
          to: adminEmail,
          subject: `🎉 ${resolvedStudentName} passed all 8 sections on TigerTest!`,
          html: buildPassEmail(resolvedStudentName, resolvedStudentEmail, schoolName),
        });
        if (result.ok) {
          notificationSent = true;
        } else {
          console.error(
            "[schools progress] Failed to send pass notification:",
            result.error
          );
        }
      }
    }

    return NextResponse.json({
      ok: true,
      sectionsCompleted,
      notificationSent,
    });
  } catch (err) {
    console.error("[schools students progress POST]", err);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}

// ── GET /api/schools/[schoolId]/students/[uid]/progress ───────────────────
// Returns the current sectionsCompleted + passedAt for a student.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ schoolId: string; uid: string }> }
) {
  const { schoolId, uid } = await params;
  if (!schoolId || !uid) {
    return NextResponse.json({ error: "schoolId and uid required" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const studentSnap = await db
      .collection("school_accounts")
      .doc(schoolId)
      .collection("students")
      .doc(uid)
      .get();

    if (!studentSnap.exists) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const data = studentSnap.data()!;
    return NextResponse.json({
      sectionsCompleted: data.sectionsCompleted ?? 0,
      passedAt: data.passedAt ?? null,
      passNotificationSent: data.passNotificationSent ?? false,
    });
  } catch (err) {
    console.error("[schools students progress GET]", err);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
