// The 1,000,000th question (Nov 2026). Once the all-time count passes
// MILLIONTH_TARGET, the first signed-in (non-internal) account to send an
// answer batch gets Premium free and an email; guests are passed over, so
// the winner may have answered just after the millionth (John chose to call
// it the millionth in the email anyway). The count is the figure the /admin Growth tab shows: the sum of
// analytics/questions.daily (backfilled days included), seeded once and then
// advanced by every batch in a transaction on a small doc of its own.
// John is emailed when it happens.
import type { Firestore } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { sendEmail } from '@/lib/resend';
import { MILLIONTH_SUBJECT, millionthEmail } from '@/lib/email-templates';
import { voiceFor } from '@/lib/email-voice';

export const MILLIONTH_TARGET = 1_000_000;
export const MILLIONTH_DOC = 'analytics/millionthQuestion';
const OWNER = process.env.EMAIL_REPLY_TO ?? 'john@tigertest.io';

export interface MillionthWinner {
  uid: string;
  at: string;
  /** The all-time count after the winning batch. */
  count: number;
  batch: number;
}

interface MillionthState {
  count: number;
  /** The target was passed by a guest or internal batch; the next signed-in one wins. */
  pending?: boolean;
  /** Seeded already past the target: nobody can be crowned honestly. */
  missed?: boolean;
  winner?: MillionthWinner;
}

/** Lets each server instance stop reading the doc once it is decided. */
let decided = false;

function sumDaily(data: Record<string, unknown> | undefined): number {
  const daily = (data?.daily as Record<string, unknown>) || {};
  return Object.values(daily).reduce<number>((n, v) => n + (typeof v === 'number' && Number.isFinite(v) ? v : 0), 0);
}

/**
 * Advance the milestone count by a batch already added to analytics/questions.
 * Returns the winner when this batch wins.
 */
export async function advanceMillionth(
  db: Firestore,
  input: { count: number; uid: string | null; internal: boolean }
): Promise<MillionthWinner | null> {
  if (decided || input.count <= 0) return null;
  const ref = db.doc(MILLIONTH_DOC);
  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const state = snap.data() as MillionthState | undefined;
    if (state?.winner || state?.missed) return { done: true, winner: null };
    let prev: number;
    if (!state) {
      // The counter was incremented just before this call, so the sum already
      // holds this batch.
      prev = sumDaily((await tx.get(db.doc('analytics/questions'))).data()) - input.count;
      if (prev >= MILLIONTH_TARGET) {
        tx.set(ref, { count: prev + input.count, missed: true });
        return { done: true, winner: null };
      }
    } else {
      prev = state.count;
    }
    const next = prev + input.count;
    const crossed = next >= MILLIONTH_TARGET;
    if (crossed && !input.internal && input.uid) {
      const winner: MillionthWinner = { uid: input.uid, at: new Date().toISOString(), count: next, batch: input.count };
      tx.set(ref, { count: next, pending: false, winner });
      return { done: true, winner };
    }
    tx.set(ref, { count: next, pending: crossed }, { merge: true });
    return { done: false, winner: null };
  });
  if (result.done) decided = true;
  return result.winner;
}

/** Premium on the account, marked as a prize so /admin never counts it as revenue. */
async function grantPremium(uid: string, at: string): Promise<{ already: boolean; examId: string | undefined }> {
  const db = getAdminDb();
  const ref = db.collection('users').doc(uid);
  return db.runTransaction(async (tx) => {
    const data = (await tx.get(ref)).data() ?? {};
    const already = data.subscription?.isPremium === true;
    tx.set(
      ref,
      {
        ...(already ? {} : { subscription: { isPremium: true, purchasedAt: at, grantedBy: 'millionth' } }),
        millionthQuestion: { at },
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
    return { already, examId: typeof data.primaryExam === 'string' ? data.primaryExam : undefined };
  });
}

/** Give the winner the prize and the email. */
export async function awardMillionth(uid: string, winner: MillionthWinner): Promise<void> {
  const { already: alreadyPremium, examId } = await grantPremium(uid, winner.at);
  let email: string | undefined;
  let name: string | null = null;
  try {
    const record = await getAdminAuth().getUser(uid);
    email = record.email ?? undefined;
    name = record.displayName?.trim().split(/\s+/)[0] || null;
  } catch {
    email = undefined;
  }
  if (email) {
    await sendEmail({
      to: email,
      from: 'John from Tigertest <john@tigertest.io>',
      subject: MILLIONTH_SUBJECT,
      html: millionthEmail(voiceFor(examId), { firstName: name, alreadyPremium }),
      replyTo: OWNER,
      kind: 'transactional',
      idempotencyKey: `millionth-${uid}`,
    });
  }
  await notifyOwner(
    `Millionth question: prize given to ${email ?? uid}`,
    `<p>Premium ${alreadyPremium ? 'was already on' : 'is now on'} account ${uid} (${email ?? 'no email'}).</p><p>Answered ${winner.at}, count ${winner.count.toLocaleString('en-US')}.</p>`
  );
}

export async function notifyOwner(subject: string, html: string): Promise<void> {
  await sendEmail({ to: OWNER, subject, html, kind: 'transactional' });
}

/** Called once, right after a batch wins. */
export async function handleMillionthWin(winner: MillionthWinner): Promise<void> {
  await awardMillionth(winner.uid, winner);
}
