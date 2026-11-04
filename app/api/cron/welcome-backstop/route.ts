/**
 * Cron: Welcome email backstop
 * Schedule: hourly at :25 (vercel.json)
 *
 * The welcome is sent by the browser calling /api/send-welcome-email right
 * after signup. That call is fire-and-forget, so a closed tab, a dropped
 * network or a sign-in path that never makes it leaves the account with no
 * welcome. This finds every account created between 15 minutes and 24 hours
 * ago with no "welcome" in users/{uid}.emailsSent and sends it.
 *
 * The 15-minute floor leaves the browser's own call time to land first; the
 * shared sender claims the key in a transaction, so both can never send.
 * The copy follows the account's primaryExam (else the DMV); a teacher with a
 * class gets the teacher welcome. Opted-out accounts are skipped.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { verifyCronSecret } from "@/lib/cron-email";
import { isKnownExamId } from "@/lib/email-voice";
import { sendWelcomeEmail, WELCOME_KEY, WELCOME_MAX_AGE_MS } from "@/lib/server/welcomeEmail";

export const maxDuration = 120;

const MIN_AGE_MS = 15 * 60 * 1000;
// Stop short of the sender's 24-hour limit so a slow run never races it.
const MAX_AGE_MS = WELCOME_MAX_AGE_MS - 10 * 60 * 1000;
const MAX_PER_RUN = 100;

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const auth = getAdminAuth();
    const db = getAdminDb();

    // Accounts with an email made in the window.
    const recent: string[] = [];
    let pageToken: string | undefined;
    do {
      const page = await auth.listUsers(1000, pageToken);
      for (const u of page.users) {
        if (!u.email) continue;
        const age = now - new Date(u.metadata.creationTime).getTime();
        if (age >= MIN_AGE_MS && age <= MAX_AGE_MS) recent.push(u.uid);
      }
      pageToken = page.pageToken;
    } while (pageToken);

    const refs = recent.map((uid) => db.collection("users").doc(uid));
    const docs = refs.length ? await db.getAll(...refs) : [];

    let sent = 0;
    let failed = 0;
    let stoppedForQuota = false;
    const missing: { uid: string; examId?: string }[] = [];
    for (const doc of docs) {
      const data = doc.data();
      if (data?.emailsSent?.includes(WELCOME_KEY)) continue;
      if (data?.unsubscribed === true) continue;
      missing.push({ uid: doc.id, examId: isKnownExamId(data?.primaryExam) ? data?.primaryExam : undefined });
    }

    for (const { uid, examId } of missing.slice(0, MAX_PER_RUN)) {
      const taught = await db.collection("classes").where("teacherUid", "==", uid).limit(1).get();
      const result = await sendWelcomeEmail(uid, { examId, teacher: !examId && !taught.empty });
      if (result.ok) {
        sent++;
      } else if (result.reason === "send_failed") {
        failed++;
        console.error("[welcome-backstop] send failed:", uid, result.error);
        if (result.quotaExhausted) {
          stoppedForQuota = true;
          break;
        }
      }
    }

    const summary = { recent: recent.length, missing: missing.length, sent, failed, stoppedForQuota };
    console.log("[welcome-backstop]", JSON.stringify(summary));
    return NextResponse.json({ success: true, ...summary });
  } catch (error: any) {
    console.error("[welcome-backstop] error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
