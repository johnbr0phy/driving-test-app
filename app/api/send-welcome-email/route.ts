import { NextRequest, NextResponse } from "next/server";
import { isKnownExamId } from "@/lib/email-voice";
import { sendWelcomeEmail } from "@/lib/server/welcomeEmail";

// Called by the browser right after signup. Anything this misses (the call
// never arrives, the send fails) is picked up by /api/cron/welcome-backstop.
export async function POST(request: NextRequest) {
  try {
    const { userId, emailConsent, examId: rawExamId, teacher: rawTeacher } = await request.json();

    if (!emailConsent) {
      return NextResponse.json({ success: false, reason: "no_consent" });
    }
    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ success: false, error: "Missing userId" }, { status: 400 });
    }

    // Which exam the signup came from (the client reads it off the signup
    // page's ?redirect= param). Drives the copy and links, and is stored so
    // the lifecycle crons talk about the same exam. A /teach signup gets the
    // teacher welcome and no exam is guessed for them.
    const result = await sendWelcomeEmail(userId, {
      examId: isKnownExamId(rawExamId) ? rawExamId : "dmv",
      setPrimaryExam: true,
      teacher: rawTeacher === true,
    });

    if (result.ok) return NextResponse.json({ success: true });

    switch (result.reason) {
      case "not_new":
      case "already_sent":
        return NextResponse.json({ success: false, reason: result.reason });
      case "unknown_user":
        return NextResponse.json({ success: false, error: "Unknown user" }, { status: 400 });
      case "no_email":
        return NextResponse.json({ success: false, error: "No email on account" }, { status: 400 });
      default:
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
  } catch (error: any) {
    console.error("Welcome email error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
