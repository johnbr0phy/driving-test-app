/**
 * Shared helpers for Vercel cron email routes.
 *
 * Smart design:
 * - buildAuthMap() does ONE auth.listUsers() call → Map<uid, {email, creationTime}>
 *   instead of N individual auth.getUser() calls
 * - getEligibleUsers() queries only consented, non-unsubscribed users from Firestore
 * - processBatch() caps at MAX_BATCH emails per run → stays well inside Vercel timeout,
 *   and claims every send against the account-wide daily budget (lib/email-quota)
 */

import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { sendEmail } from "@/lib/resend";
import {
  QuotaExhaustedError,
  CAMPAIGN_BUDGET,
  CAMPAIGN_CRON_COUNT,
} from "@/lib/email-quota";

/**
 * Per-run cap. Defaults to this cron's fair share of the daily campaign budget
 * so the 09:00 job can't spend the whole day's allowance before the 15:00 one
 * runs. The global counter in lib/email-quota is the real ceiling.
 */
export const MAX_BATCH = Number(
  process.env.CRON_MAX_BATCH ??
    Math.max(1, Math.floor(CAMPAIGN_BUDGET / CAMPAIGN_CRON_COUNT))
);

// ── Auth helpers ──────────────────────────────────────────────────────────────

export interface AuthRecord {
  email: string;
  creationTime: Date;
}

/**
 * Build a UID → {email, creationTime} map in a single Auth list call.
 * Cached per request — call once and pass around.
 */
export async function buildAuthMap(): Promise<Map<string, AuthRecord>> {
  const auth = getAdminAuth();
  const map = new Map<string, AuthRecord>();
  let pageToken: string | undefined;

  do {
    const result = await auth.listUsers(1000, pageToken);
    for (const u of result.users) {
      if (u.email) {
        map.set(u.uid, {
          email: u.email,
          creationTime: new Date(u.metadata.creationTime),
        });
      }
    }
    pageToken = result.pageToken;
  } while (pageToken);

  return map;
}

// ── Firestore helpers ─────────────────────────────────────────────────────────

export interface UserDoc {
  uid: string;
  email: string;
  creationTime: Date;
  completedTests: any[];
  emailsSent: string[];
  subscription: any;
  lastEmailSent: Date | null;
  lastUpdated: Date | null;
}

/**
 * Query Firestore for users who have consented to email.
 * Cross-references with authMap to get email + creationTime.
 * Returns only users present in both (consented + have an email).
 *
 * includeMissingConsent: false (default) = strict, emailConsent === true only
 *                        true = include users where field is missing (opt-in legacy users)
 */
export async function getEligibleUsers(
  authMap: Map<string, AuthRecord>,
  includeMissingConsent = false
): Promise<UserDoc[]> {
  const db = getAdminDb();

  let query = db
    .collection("users")
    .where("unsubscribed", "!=", true) as FirebaseFirestore.Query;

  if (!includeMissingConsent) {
    query = db
      .collection("users")
      .where("emailConsent", "==", true)
      .where("unsubscribed", "!=", true);
  }

  const snap = await query.get();
  const users: UserDoc[] = [];

  for (const doc of snap.docs) {
    const authRecord = authMap.get(doc.id);
    if (!authRecord) continue; // not a real user

    const d = doc.data();

    // Skip explicit opt-outs even in permissive mode
    if (d.unsubscribed === true) continue;
    if (!includeMissingConsent && d.emailConsent !== true) continue;

    // Skip internal/test accounts
    const emailLower = authRecord.email.toLowerCase();
    if (emailLower.includes("@johnbrophy.net") || emailLower.includes("@stensul.com")) continue;

    users.push({
      uid: doc.id,
      email: authRecord.email,
      creationTime: authRecord.creationTime,
      completedTests: Array.isArray(d.completedTests) ? d.completedTests : [],
      emailsSent: Array.isArray(d.emailsSent) ? d.emailsSent : [],
      subscription: d.subscription || {},
      lastEmailSent: d.lastEmailSent?.toDate?.() ?? null,
      lastUpdated: d.lastUpdated?.toDate?.() ?? null,
    });
  }

  return users;
}

// ── Email sender ──────────────────────────────────────────────────────────────

/**
 * Send one campaign email and record it.
 *
 * The emailKey is a permanent "already sent this campaign" marker, so it is
 * only written after Resend actually accepted the message. Marking it on a
 * rejected send (which is what happened when the account hit its daily quota)
 * means the user never gets that email and is never retried.
 *
 * Throws QuotaExhaustedError when there is no budget left — callers should stop
 * the run rather than keep looping.
 */
export async function sendCronEmail(
  uid: string,
  email: string,
  subject: string,
  html: string,
  emailKey: string
): Promise<void> {
  const db = getAdminDb();

  const result = await sendEmail({ to: email, subject, html, kind: "campaign" });

  if (!result.ok) {
    if (result.quotaExhausted) throw new QuotaExhaustedError(result.error);
    throw new Error(result.error ?? "Resend rejected the message");
  }

  await db
    .collection("users")
    .doc(uid)
    .set(
      {
        lastEmailSent: FieldValue.serverTimestamp(),
        emailsSent: FieldValue.arrayUnion(emailKey),
      },
      { merge: true }
    );
}

// ── Batch runner ──────────────────────────────────────────────────────────────

export interface BatchOptions {
  /** Log prefix, e.g. "reengagement". */
  label: string;
  /** Permanent per-campaign marker written to the user doc on success. */
  emailKey: string;
  subject: string;
  template: string;
  users: UserDoc[];
  /** Extra {{placeholders}} for this user, merged into the template. */
  extras?: (user: UserDoc) => Record<string, string>;
}

export interface BatchResult {
  sent: number;
  failed: number;
  eligible: number;
  attempted: number;
  stoppedForQuota: boolean;
}

/**
 * Send up to MAX_BATCH emails, stopping immediately if the daily budget runs
 * out so the remaining users stay eligible for tomorrow's run.
 */
export async function processBatch(opts: BatchOptions): Promise<BatchResult> {
  const batch = opts.users.slice(0, MAX_BATCH);
  let sent = 0;
  let failed = 0;
  let attempted = 0;
  let stoppedForQuota = false;

  for (const user of batch) {
    attempted++;
    try {
      const html = buildHtml(opts.template, user.uid, opts.extras?.(user) ?? {});
      await sendCronEmail(user.uid, user.email, opts.subject, html, opts.emailKey);
      sent++;
    } catch (err) {
      if (err instanceof QuotaExhaustedError) {
        attempted--;
        stoppedForQuota = true;
        console.warn(
          `[${opts.label}] daily email budget exhausted — stopping after ${sent} sent`
        );
        break;
      }
      failed++;
      console.error(`[${opts.label}] Failed for ${user.uid}:`, err);
    }
  }

  console.log(
    `[${opts.label}] sent=${sent} failed=${failed} eligible=${opts.users.length}` +
      (stoppedForQuota ? " stoppedForQuota=true" : "")
  );

  return { sent, failed, eligible: opts.users.length, attempted, stoppedForQuota };
}

// ── Cron auth ─────────────────────────────────────────────────────────────────

export function verifyCronSecret(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // dev mode — no secret set
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

// ── Template helper ───────────────────────────────────────────────────────────

export function buildHtml(template: string, uid: string, extras: Record<string, string> = {}): string {
  const token = Buffer.from(uid).toString("base64");
  let html = template.replace(/\{\{unsubscribeToken\}\}/g, token);
  for (const [key, val] of Object.entries(extras)) {
    html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), val);
  }
  return html;
}
