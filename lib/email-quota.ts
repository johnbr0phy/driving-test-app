/**
 * Account-wide daily send budget.
 *
 * The Resend plan has a hard daily send limit. Nothing in the app used to know
 * that: five campaign crons each sent up to MAX_BATCH emails independently, so
 * the theoretical daily volume was 5 × MAX_BATCH with no ceiling anywhere. Once
 * the account hit 100%, every later send — including password resets and
 * welcome emails — was rejected by Resend.
 *
 * This module keeps one counter in Firestore (`system/emailQuota`) that every
 * send path decrements, and reserves headroom so marketing campaigns can never
 * eat the transactional budget.
 *
 * Tuning (all optional env vars):
 *   RESEND_DAILY_LIMIT            total sends/day the plan allows (default 100)
 *   RESEND_TRANSACTIONAL_RESERVE  sends/day kept for transactional mail (default 40)
 */

import { getAdminDb } from "@/lib/firebase-admin";

export const DAILY_SEND_LIMIT = Number(process.env.RESEND_DAILY_LIMIT ?? 100);
export const TRANSACTIONAL_RESERVE = Number(
  process.env.RESEND_TRANSACTIONAL_RESERVE ?? 40
);

/** What campaign crons are collectively allowed to spend per day. */
export const CAMPAIGN_BUDGET = Math.max(0, DAILY_SEND_LIMIT - TRANSACTIONAL_RESERVE);

/** Number of campaign crons in vercel.json that share CAMPAIGN_BUDGET. */
export const CAMPAIGN_CRON_COUNT = 7;

export type SendKind = "campaign" | "transactional";

const QUOTA_DOC = "system/emailQuota";

/** Thrown when a cron run must stop because the daily budget is gone. */
export class QuotaExhaustedError extends Error {
  constructor(message = "Daily email quota exhausted") {
    super(message);
    this.name = "QuotaExhaustedError";
  }
}

/**
 * Resend's daily quota resets on a UTC day boundary, so the counter keys off
 * the UTC date.
 */
function utcDay(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function ceilingFor(kind: SendKind): number {
  // Transactional mail may use the whole plan limit; campaigns stop early so
  // the reserve stays available for password resets, welcomes and invites.
  return kind === "campaign" ? CAMPAIGN_BUDGET : DAILY_SEND_LIMIT;
}

/**
 * Claim one send against today's budget.
 * Returns false when the budget for this kind of mail is spent — the caller
 * must NOT send in that case.
 */
export async function reserveSend(kind: SendKind): Promise<boolean> {
  const db = getAdminDb();
  const ref = db.doc(QUOTA_DOC);
  const day = utcDay();
  const ceiling = ceilingFor(kind);

  try {
    return await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.data();
      const sameDay = data?.date === day;
      const used: number = sameDay && typeof data?.count === "number" ? data.count : 0;
      const exhausted: boolean = sameDay ? data?.exhausted === true : false;

      if (exhausted || used >= ceiling) return false;

      tx.set(ref, { date: day, count: used + 1, exhausted: false }, { merge: true });
      return true;
    });
  } catch (err) {
    // A Firestore hiccup must not silently disable email. Log and allow the
    // send — Resend's own limit is still the backstop.
    console.error("[email-quota] reserveSend failed, allowing send:", err);
    return true;
  }
}

/** Give a reserved slot back after a send failed for a non-quota reason. */
export async function releaseSend(): Promise<void> {
  const db = getAdminDb();
  const ref = db.doc(QUOTA_DOC);
  const day = utcDay();

  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.data();
      if (data?.date !== day) return;
      const used: number = typeof data?.count === "number" ? data.count : 0;
      tx.set(ref, { count: Math.max(0, used - 1) }, { merge: true });
    });
  } catch (err) {
    console.error("[email-quota] releaseSend failed:", err);
  }
}

/**
 * Resend told us the account is out of quota. Latch it for the rest of the UTC
 * day so the remaining crons skip their sends instead of hammering a
 * guaranteed-failing API.
 */
export async function markQuotaExhausted(): Promise<void> {
  const db = getAdminDb();
  try {
    await db.doc(QUOTA_DOC).set(
      { date: utcDay(), count: DAILY_SEND_LIMIT, exhausted: true },
      { merge: true }
    );
  } catch (err) {
    console.error("[email-quota] markQuotaExhausted failed:", err);
  }
}

/** Current usage, for logging and the admin view. */
export async function getQuotaUsage(): Promise<{
  date: string;
  count: number;
  exhausted: boolean;
  dailyLimit: number;
  campaignBudget: number;
}> {
  const db = getAdminDb();
  const snap = await db.doc(QUOTA_DOC).get();
  const data = snap.data();
  const day = utcDay();
  const sameDay = data?.date === day;

  return {
    date: day,
    count: sameDay && typeof data?.count === "number" ? data.count : 0,
    exhausted: sameDay ? data?.exhausted === true : false,
    dailyLimit: DAILY_SEND_LIMIT,
    campaignBudget: CAMPAIGN_BUDGET,
  };
}
