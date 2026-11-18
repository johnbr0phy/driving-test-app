// The 1,000,000th question (Nov 2026). Once the all-time count passes
// MILLIONTH_TARGET, the first signed-in (non-internal) account to send an
// answer batch gets Premium free and an email; guests are passed over, so
// the winner may have answered just after the millionth, and the email says
// so. The count is the figure the /admin Growth tab shows: the sum of
// analytics/questions.daily (backfilled days included), seeded once and then
// advanced by every batch in a transaction on a small doc of its own.
// John is emailed when it happens.
import type { Firestore } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { sendEmail } from '@/lib/resend';
import { SITE_URL } from '@/lib/siteUrl';

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
async function grantPremium(uid: string, at: string): Promise<boolean> {
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
    return already;
  });
}

function winnerEmail(firstName: string | null, alreadyPremium: boolean): string {
  const hello = firstName ? `Hi ${firstName},` : 'Hi there,';
  const prize = alreadyPremium
    ? 'You already have Premium, so instead of a prize we owe you a very big thank you. Reply and tell me what test you are studying for.'
    : 'To say thank you, Premium is now on your account, free, for good. Every locked set, test and stat on Tigertest is open to you.';
  return `<!doctype html><html><body style="margin:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
<p style="font-size:40px;margin:0 0 8px">🎉🐯</p>
<h1 style="font-size:24px;margin:0 0 16px">We just hit 1,000,000 questions, and you were there</h1>
<p style="font-size:16px;line-height:1.6">${hello}</p>
<p style="font-size:16px;line-height:1.6">People have now answered one million questions on Tigertest. You were the first person with an account to answer one after we got there.</p>
<p style="font-size:16px;line-height:1.6">${prize}</p>
<p style="margin:28px 0"><a href="${SITE_URL}/" style="background:#111827;color:#fff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600;display:inline-block">Keep practicing</a></p>
<p style="font-size:16px;line-height:1.6">Good luck on the real thing. Just hit reply if you ever want to tell me how it went.</p>
<p style="font-size:16px;line-height:1.6">John<br>Tigertest</p>
</div></body></html>`;
}

/** Give the winner the prize and the email. */
export async function awardMillionth(uid: string, winner: MillionthWinner): Promise<void> {
  const alreadyPremium = await grantPremium(uid, winner.at);
  let email: string | undefined;
  let name: string | null = null;
  try {
    const record = await getAdminAuth().getUser(uid);
    email = record.email ?? undefined;
    name = record.displayName?.trim().split(/\s+/)[0]?.replace(/[<>&"]/g, '') || null;
  } catch {
    email = undefined;
  }
  if (email) {
    await sendEmail({
      to: email,
      subject: 'We just hit 1,000,000 questions, and you were there 🎉',
      html: winnerEmail(name, alreadyPremium),
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
