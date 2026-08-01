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

export interface PaywallHit {
  key: string;
  label: string;
  location: string;
  itemId: string;
  at: Date;
}

export interface UserDoc {
  uid: string;
  email: string;
  creationTime: Date;
  completedTests: any[];
  emailsSent: string[];
  subscription: any;
  lastEmailSent: Date | null;
  lastUpdated: Date | null;
  /** Total questions answered across training and tests (denormalized _stats). */
  questionsAnswered: number;
  /** Most recent paywall the user bounced off, or null if never. */
  lastPaywallHit: PaywallHit | null;
  /** When they first reached 8/8. Latched, so it never moves once set. */
  superAmazingUnlockedAt: Date | null;
  /** Most recent sign of life: a save, a finished test, or signing up. */
  lastActiveAt: Date;
}

/**
 * Nobody hears from us after three quiet days. Someone who stopped using
 * TigerTest has almost always taken their DMV test and moved on, so a later
 * email reaches a person who no longer has the problem. Enforced centrally in
 * getEligibleUsers() so no campaign can opt itself out by accident.
 */
export const MAX_INACTIVE_MS = 3 * 24 * 60 * 60 * 1000;

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
  includeMissingConsent = false,
  /**
   * Skip the three-day activity rule. Only the two win-back campaigns set this,
   * because reaching someone who has drifted away is the entire point of them.
   * They impose their own staleness ceilings instead.
   */
  includeInactive = false
): Promise<UserDoc[]> {
  const db = getAdminDb();

  // NOTE: do NOT filter on `unsubscribed` here. Firestore's != operator only
  // matches documents where the field EXISTS, and nothing has written
  // `unsubscribed: false` to new users since 595bd4b (2026-05-02) removed it
  // from the client save. Every user created after that date was silently
  // excluded from every campaign. The opt-out is enforced in code below
  // instead, which treats a missing field as "not unsubscribed".
  const query = includeMissingConsent
    ? (db.collection("users") as FirebaseFirestore.Query)
    : db.collection("users").where("emailConsent", "==", true);

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

    const stats = d._stats || {};

    // Most recent sign of life. lastUpdated covers any save, completedTests
    // covers finishing a test, and creationTime keeps brand-new accounts in
    // play even if their first save has not landed yet.
    const lastTest = (Array.isArray(d.completedTests) ? d.completedTests : []).reduce(
      (latest: Date | null, t: any) => {
        const at = toDate(t?.completedAt);
        if (!at) return latest;
        return !latest || at > latest ? at : latest;
      },
      null as Date | null
    );
    const lastActiveAt = new Date(
      Math.max(
        toDate(d.lastUpdated)?.getTime() ?? 0,
        lastTest?.getTime() ?? 0,
        authRecord.creationTime.getTime()
      )
    );

    // The three-day rule. Everyone past it has almost certainly sat their test.
    if (!includeInactive && Date.now() - lastActiveAt.getTime() > MAX_INACTIVE_MS) continue;

    users.push({
      lastActiveAt,
      uid: doc.id,
      email: authRecord.email,
      creationTime: authRecord.creationTime,
      completedTests: Array.isArray(d.completedTests) ? d.completedTests : [],
      emailsSent: Array.isArray(d.emailsSent) ? d.emailsSent : [],
      subscription: d.subscription || {},
      lastEmailSent: toDate(d.lastEmailSent),
      lastUpdated: toDate(d.lastUpdated),
      questionsAnswered:
        (stats.trainingQuestionsAnswered || 0) + (stats.testQuestionsAnswered || 0),
      lastPaywallHit: latestPaywallHit(d.paywallHits),
      // The dedicated latch field if the client ever writes one; otherwise the
      // moment they first switched the mode on (written since PR #285), which
      // can also only happen at 8/8.
      superAmazingUnlockedAt:
        toDate(d.superAmazingUnlockedAt) ?? toDate(d.superAmazing?.firstEnabledAt),
    });
  }

  return users;
}

/**
 * Firestore date fields here are inconsistent: `lastEmailSent` is a real
 * Timestamp (serverTimestamp), while `lastUpdated` is an ISO string written by
 * the client store. The old `?.toDate?.()` call silently returned null for the
 * string case, which meant inactive-share-request could never see lastUpdated.
 */
function toDate(v: any): Date | null {
  if (!v) return null;
  if (typeof v.toDate === "function") return v.toDate();
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * The most recent entry in the user's `paywallHits` map, which is written by
 * /api/analytics/paywall on every logged-in paywall view.
 */
export function latestPaywallHit(hits: any): PaywallHit | null {
  if (!hits || typeof hits !== "object") return null;

  let best: PaywallHit | null = null;
  for (const [key, hit] of Object.entries<any>(hits)) {
    if (!hit?.lastAt) continue;
    const at = new Date(hit.lastAt);
    if (isNaN(at.getTime())) continue;
    if (!best || at > best.at) {
      best = {
        key,
        label: typeof hit.label === "string" ? hit.label : "",
        location: typeof hit.location === "string" ? hit.location : "",
        itemId: typeof hit.itemId === "string" ? hit.itemId : "",
        at,
      };
    }
  }
  return best;
}

/**
 * Global frequency cap. A user can now qualify for several campaigns within
 * hours of each other (welcome, stalled study, paywall abandon, upgrade
 * pitch), so every cron checks this before sending.
 */
export const MIN_EMAIL_GAP_MS = 24 * 60 * 60 * 1000;

/**
 * The gap is shorter for time-critical campaigns. /api/send-welcome-email also
 * stamps lastEmailSent, so a flat 24-hour cap would silently suppress the
 * paywall-abandon email for any user who signs up and hits a paywall the same
 * day, which is precisely the audience it exists for.
 */
export function emailedRecently(
  u: UserDoc,
  now = Date.now(),
  gapMs = MIN_EMAIL_GAP_MS
): boolean {
  if (!u.lastEmailSent) return false;
  return now - u.lastEmailSent.getTime() < gapMs;
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
  /** Fixed subject, or a per-user builder (paywall-abandon names the paywall). */
  subject: string | ((user: UserDoc) => string);
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
      const subject =
        typeof opts.subject === "function" ? opts.subject(user) : opts.subject;
      await sendCronEmail(user.uid, user.email, subject, html, opts.emailKey);
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
