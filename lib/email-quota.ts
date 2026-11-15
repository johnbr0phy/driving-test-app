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

import { createHash, randomUUID } from 'crypto';
import { getAdminDb } from "@/lib/firebase-admin";

function nonNegativeInteger(value: string | undefined, fallback: number, invalid = 0): number {
  if (value === undefined) return fallback;
  const n = Number(value);
  return Number.isSafeInteger(n) && n >= 0 ? n : invalid;
}
export const DAILY_SEND_LIMIT = nonNegativeInteger(process.env.RESEND_DAILY_LIMIT, 100);
export const TRANSACTIONAL_RESERVE = process.env.RESEND_TRANSACTIONAL_RESERVE === undefined
  ? 40
  : nonNegativeInteger(process.env.RESEND_TRANSACTIONAL_RESERVE, DAILY_SEND_LIMIT, DAILY_SEND_LIMIT);

/** What campaign crons are collectively allowed to spend per day. */
export const CAMPAIGN_BUDGET = Math.max(0, DAILY_SEND_LIMIT - TRANSACTIONAL_RESERVE);

/** Number of campaign crons in vercel.json that share CAMPAIGN_BUDGET. */
export const CAMPAIGN_CRON_COUNT = 10;

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
export interface SendReservation { day: string; id: string; owner: string }
export async function reserveSend(kind: SendKind, idempotencyKey?: string, previousUncertain = false): Promise<SendReservation | false> {
  const db = getAdminDb();
  const ref = db.doc(QUOTA_DOC);
  const day = utcDay();
  const id = createHash('sha256').update(`${day}:${idempotencyKey ?? randomUUID()}`).digest('hex');
  const reservation = db.doc(`emailQuotaReservations/${id}`);
  const owner = randomUUID();
  try {
    return await db.runTransaction(async tx => {
      const [budget, prior] = await Promise.all([tx.get(ref), tx.get(reservation)]);
      const data = budget.data();
      const old = prior.data();
      if (data?.date > day) return false; // never roll a newer day backwards
      if (old?.status === 'reserved') {
        tx.set(reservation, { uses: (old.uses ?? 1) + 1, uncertain: old.uncertain === true || previousUncertain }, { merge: true });
        return { day, id, owner }; // same key/day already charged, even at ceiling
      }
      const used = data?.date === day && typeof data.count === 'number' ? data.count : 0;
      if ((data?.date === day && data.exhausted === true) || used >= ceilingFor(kind)) return false;
      tx.set(ref, { date: day, count: used + 1, exhausted: false }, { merge: true });
      tx.set(reservation, { day, status: 'reserved', owner, uses: 1, uncertain: previousUncertain });
      return { day, id, owner };
    });
  } catch { return false; } // database failure must never bypass the budget
}

/** Release only the original, unambiguous, unshared reservation's actual day. */
export async function releaseSend(claim: SendReservation): Promise<void> {
  const db = getAdminDb();
  const ref = db.doc(QUOTA_DOC);
  const reservation = db.doc(`emailQuotaReservations/${claim.id}`);
  try {
    await db.runTransaction(async tx => {
      const [budget, prior] = await Promise.all([tx.get(ref), tx.get(reservation)]);
      const data = budget.data(); const old = prior.data();
      if (old?.status !== 'reserved' || old.owner !== claim.owner || old.uses !== 1 || old.uncertain === true) return;
      tx.set(reservation, { status: 'released' }, { merge: true });
      if (data?.date === claim.day) tx.set(ref, { count: Math.max(0, (data.count ?? 0) - 1) }, { merge: true });
    });
  } catch { /* Conservatively retain the charge. */ }
}

export async function markQuotaExhausted(claim: SendReservation): Promise<void> {
  const db = getAdminDb(); const ref = db.doc(QUOTA_DOC);
  try {
    await db.runTransaction(async tx => {
      const data = (await tx.get(ref)).data();
      if (data?.date !== claim.day) return; // late response cannot latch a new day
      tx.set(ref, { count: DAILY_SEND_LIMIT, exhausted: true }, { merge: true });
    });
  } catch { /* Do not risk modifying another day's budget. */ }
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
