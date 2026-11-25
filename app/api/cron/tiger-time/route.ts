/**
 * Cron: Tiger Time winner
 * Schedule: daily 05:15 UTC (vercel.json), just after midnight Eastern time
 * (00:15 in winter, 01:15 in summer), so the day that just ended is final.
 *
 * Picks the day's winner (lib/dailyRank.ts pickTigerTimeWinner): the
 * signed-in account with the most first-try correct answers, at least
 * TIGER_TIME_MIN_TO_WIN, ties to whoever got there first. Internal accounts
 * can win like anyone else (John, Nov 25 2026). Writes tigerTimeWinners/{day} once and emails the winner a
 * congratulations (tigerTimeEmail, transactional, once: `emailed` on the doc
 * and the Resend idempotency key; skipped for anyone unsubscribed). Every run,
 * winner or not, writes globalStats/tigerTime.updatedAt for the watchdog.
 * `?day=YYYY-MM-DD` reruns a day: it never replaces a winner, and retries the
 * email only if it was not sent.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { pickTigerTimeWinner, tigerDay } from '@/lib/dailyRank';
import { TIGER_WINNERS, topOfDay } from '@/lib/server/dailyRank';
import { sendEmail } from '@/lib/resend';
import { TIGER_TIME_SUBJECT, tigerTimeEmail } from '@/lib/email-templates';
import { voiceFor } from '@/lib/email-voice';

/** Emails the day's winner once. Returns whether it was sent (or already had been). */
async function emailWinner(db: FirebaseFirestore.Firestore, day: string, uid: string, correct: number): Promise<boolean> {
  const ref = db.collection(TIGER_WINNERS).doc(day);
  if ((await ref.get()).get('emailed')) return true;
  const user = (await db.collection('users').doc(uid).get()).data() ?? {};
  if (user.unsubscribed === true) {
    await ref.update({ emailed: false, emailSkipped: 'unsubscribed' });
    return false;
  }
  const record = await getAdminAuth().getUser(uid);
  if (!record.email) return false;
  const sent = await sendEmail({
    to: record.email,
    from: 'John from Tigertest <john@tigertest.io>',
    subject: TIGER_TIME_SUBJECT,
    html: tigerTimeEmail(voiceFor(typeof user.primaryExam === 'string' ? user.primaryExam : undefined), {
      firstName: record.displayName?.trim().split(/\s+/)[0] || null,
      correct,
      day,
    }),
    replyTo: process.env.EMAIL_REPLY_TO ?? 'john@tigertest.io',
    kind: 'transactional',
    idempotencyKey: `tiger-time-${day}`,
  });
  // sendEmail reports failure in its result; only a real send is marked done.
  if (!sent.ok) throw new Error(sent.error ?? 'send failed');
  await ref.update({ emailed: true, emailedAt: new Date().toISOString() });
  return true;
}

export const maxDuration = 60;

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // No secret means no auth locally only: in production an unset CRON_SECRET
  // must not open the route to everyone.
  if (!secret) return process.env.NODE_ENV !== 'production';
  return req.headers.get('authorization') === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getAdminDb();
  const asked = req.nextUrl.searchParams.get('day');
  // Three hours back from 05:15 UTC is the previous day in Eastern time.
  const day = asked && /^\d{4}-\d{2}-\d{2}$/.test(asked) ? asked : tigerDay(new Date(Date.now() - 3 * 3_600_000));
  try {
    const ref = db.collection(TIGER_WINNERS).doc(day);
    let result: Record<string, unknown>;
    const existing = await ref.get();
    if (existing.exists) {
      // A rerun: retry the email if the first run could not send it.
      let emailed = existing.get('emailed') === true;
      if (!emailed) {
        try {
          emailed = await emailWinner(db, day, existing.get('uid'), Number(existing.get('correct')) || 0);
        } catch (error) {
          console.error('[cron/tiger-time] email retry failed', day, error);
        }
      }
      result = { day, status: 'already_written', emailed };
    } else {
      const candidates = await topOfDay(db, day);
      const winner = pickTigerTimeWinner(candidates);
      if (winner?.uid) {
        await ref.create({ uid: winner.uid, correct: winner.correct, reachedAt: winner.reachedAt, at: new Date().toISOString(), emailed: false });
        let emailed = false;
        try {
          emailed = await emailWinner(db, day, winner.uid, winner.correct);
        } catch (error) {
          // The winner is recorded; a rerun with ?day= sends the email.
          console.error('[cron/tiger-time] email failed', day, error);
        }
        result = { day, status: 'winner', correct: winner.correct, emailed };
      } else {
        result = { day, status: 'no_winner' };
      }
    }
    await db.doc('globalStats/tigerTime').set({ updatedAt: new Date().toISOString(), lastDay: day, lastStatus: result.status }, { merge: true });
    return NextResponse.json(result);
  } catch (error) {
    console.error('[cron/tiger-time]', day, error);
    return NextResponse.json({ error: 'failed', day }, { status: 500 });
  }
}
