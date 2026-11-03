/**
 * The signup welcome email, shared by /api/send-welcome-email (called by the
 * browser right after signup) and /api/cron/welcome-backstop (hourly, catches
 * every account whose browser call never arrived: a closed tab, a dropped
 * network, a sign-in path that forgot to call it).
 *
 * Address and name always come from Firebase Auth, never from a request, and
 * only an account created in the last 24 hours gets one. The "welcome" key in
 * users/{uid}.emailsSent is claimed in a transaction before sending, so the
 * route and the cron can never both send it.
 */

import { FieldValue } from "firebase-admin/firestore";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { sendEmail } from "@/lib/resend";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";
import { voiceFor } from "@/lib/email-voice";

export const WELCOME_KEY = "welcome";
export const WELCOME_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export type WelcomeResult =
  | { ok: true }
  | {
      ok: false;
      reason: "not_new" | "unknown_user" | "no_email" | "already_sent" | "send_failed";
      quotaExhausted?: boolean;
      error?: string;
    };

export interface WelcomeOptions {
  /**
   * The exam the copy is about. When `setPrimaryExam` is true it also becomes
   * the account's current test if it has none. Defaults to the DMV copy.
   */
  examId?: string;
  setPrimaryExam?: boolean;
  /** Signed up from /teach: the teacher welcome. */
  teacher?: boolean;
}

export async function sendWelcomeEmail(uid: string, opts: WelcomeOptions = {}): Promise<WelcomeResult> {
  let email: string | undefined;
  let displayName: string | undefined;
  try {
    const record = await getAdminAuth().getUser(uid);
    const createdMs = new Date(record.metadata.creationTime).getTime();
    if (Date.now() - createdMs > WELCOME_MAX_AGE_MS) return { ok: false, reason: "not_new" };
    email = record.email;
    displayName = record.displayName;
  } catch {
    return { ok: false, reason: "unknown_user" };
  }
  if (!email) return { ok: false, reason: "no_email" };

  const teacher = opts.teacher === true;
  const examId = opts.examId ?? "dmv";
  const db = getAdminDb();
  const userRef = db.collection("users").doc(uid);

  // Atomic check-and-set so two callers never both send.
  let alreadySent = false;
  await db.runTransaction(async (tx) => {
    const doc = await tx.get(userRef);
    const data = doc.data();
    if (data?.emailsSent?.includes(WELCOME_KEY)) {
      alreadySent = true;
      return;
    }
    const updates: Record<string, unknown> = {
      lastEmailSent: new Date().toISOString(),
      emailsSent: FieldValue.arrayUnion(WELCOME_KEY),
    };
    // First exam wins here; the client overwrites it whenever the person
    // opens another exam's dashboard.
    if (opts.setPrimaryExam && !teacher && !data?.primaryExam) {
      updates.primaryExam = examId;
    }
    // First-time stamp so admin conversion stats can compute time-to-purchase.
    if (!data?.createdAt) {
      updates.createdAt = new Date().toISOString();
    }
    tx.set(userRef, updates, { merge: true });
  });
  if (alreadySent) return { ok: false, reason: "already_sent" };

  const firstName = displayName?.trim().split(/\s+/)[0]?.replace(/[<>&"]/g, "");
  const greeting = firstName ? `Hey ${firstName},` : "Hey there,";
  const unsubscribeToken = Buffer.from(uid).toString("base64");

  const html = EMAIL_TEMPLATES[teacher ? "welcomeTeacher" : "welcome"](voiceFor(examId))
    .replace(/{{greeting}}/g, greeting)
    .replace(/{{unsubscribeToken}}/g, unsubscribeToken);

  const result = await sendEmail({
    to: email,
    subject: "Welcome to Tigertest",
    html,
    kind: "transactional",
  });

  if (!result.ok) {
    // Release the claim so the backstop cron can try again later.
    await userRef.set({ emailsSent: FieldValue.arrayRemove(WELCOME_KEY) }, { merge: true });
    return { ok: false, reason: "send_failed", quotaExhausted: result.quotaExhausted, error: result.error };
  }
  return { ok: true };
}
