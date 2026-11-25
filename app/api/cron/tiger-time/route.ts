/**
 * Cron: Tiger Time winner
 * Schedule: daily 05:15 UTC (vercel.json), just after midnight Eastern time
 * (00:15 in winter, 01:15 in summer), so the day that just ended is final.
 *
 * Picks the day's winner (lib/dailyRank.ts pickCheckedWinner): the
 * signed-in account with the most first-try correct answers, at least
 * TIGER_TIME_MIN_TO_WIN, ties to whoever got there first. Internal accounts
 * can win like anyone else (John, Nov 25 2026). Writes tigerTimeWinners/{day} once and emails the winner a
 * congratulations (tigerTimeEmail, transactional, once: `emailed` on the doc
 * and the Resend idempotency key; skipped for anyone unsubscribed). Every run,
 * winner or not, writes globalStats/tigerTime.updatedAt for the watchdog.
 * The cheat check (suspiciousDay) passes over days faster than 6 correct a
 * minute or 200+ correct with none wrong, and emails John about them. Each run
 * also deletes rank days older than three days (deleteOldDays).
 * `?day=YYYY-MM-DD` reruns a day: it never replaces a winner, and retries the
 * email only if it was not sent.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { pickCheckedWinner, tigerDay } from '@/lib/dailyRank';
import { TIGER_WINNERS, deleteOldDays, topOfDay } from '@/lib/server/dailyRank';
import { sendEmail } from '@/lib/resend';
import { tigerTimeEmail, tigerTimeSubject } from '@/lib/email-templates';
import { voiceFor } from '@/lib/email-voice';
import { isLanguage } from '@/i18n';
import { SITE_URL } from '@/lib/siteUrl';

type Flag = { uid: string | null; correct: number; reason: string; perMinute: number | null };

/** Tells John when the cheat check passed someone over (never the person). */
async function notifyFlagged(day: string, flagged: Flag[], winnerCorrect: number | null) {
  const rows = flagged
    .map((f) => `<li>${f.correct} correct, ${f.reason === 'fast' ? `${f.perMinute} a minute` : 'not one wrong'} (uid ${f.uid})</li>`)
    .join('');
  const sent = await sendEmail({
    to: process.env.EMAIL_REPLY_TO ?? 'john@tigertest.io',
    from: 'Tigertest <john@tigertest.io>',
    subject: `Tiger Time ${day}: ${flagged.length} passed over by the cheat check`,
    html: `<p>The Tiger Time cheat check passed over these accounts for ${day}:</p><ul>${rows}</ul><p>${winnerCorrect === null ? 'Nobody else qualified, so there was no winner.' : `The winner instead had ${winnerCorrect} correct.`}</p><p>Look them up in <a href="${SITE_URL}/admin">/admin</a>. Nothing else needs doing.</p>`,
    kind: 'transactional',
    idempotencyKey: `tiger-time-flags-${day}`,
  });
  if (!sent.ok) console.error('[cron/tiger-time] flag email failed', day, sent.error);
}

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
  // The account's interface language (the same field the other emails read).
  const lang = typeof user.language === 'string' && isLanguage(user.language) ? user.language : 'en';
  const sent = await sendEmail({
    to: record.email,
    from: 'John from Tigertest <john@tigertest.io>',
    subject: tigerTimeSubject(lang),
    html: tigerTimeEmail(voiceFor(typeof user.primaryExam === 'string' ? user.primaryExam : undefined), {
      firstName: record.displayName?.trim().split(/\s+/)[0] || null,
      correct,
      day,
      lang,
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
      // Days that look scripted are passed over; John hears about them.
      const { winner, flagged } = pickCheckedWinner(candidates);
      const flags: Flag[] = flagged.map((f) => ({ uid: f.uid, correct: f.correct, reason: f.reason, perMinute: f.perMinute }));
      if (flags.length) await notifyFlagged(day, flags, winner?.correct ?? null);
      if (winner?.uid) {
        await ref.create({
          uid: winner.uid,
          correct: winner.correct,
          reachedAt: winner.reachedAt,
          at: new Date().toISOString(),
          emailed: false,
          ...(flags.length ? { passedOver: flags } : {}),
        });
        let emailed = false;
        try {
          emailed = await emailWinner(db, day, winner.uid, winner.correct);
        } catch (error) {
          // The winner is recorded; a rerun with ?day= sends the email.
          console.error('[cron/tiger-time] email failed', day, error);
        }
        result = { day, status: 'winner', correct: winner.correct, emailed, flagged: flags.length };
      } else {
        result = { day, status: 'no_winner', flagged: flags.length };
      }
    }
    // Rank days past three are deleted here (the /privacy promise), so no
    // Firestore TTL policy is needed. A failure never blocks the winner.
    try {
      result.deletedDays = await deleteOldDays(db, tigerDay());
    } catch (error) {
      console.error('[cron/tiger-time] cleanup failed', error);
    }
    await db.doc('globalStats/tigerTime').set({ updatedAt: new Date().toISOString(), lastDay: day, lastStatus: result.status }, { merge: true });
    return NextResponse.json(result);
  } catch (error) {
    console.error('[cron/tiger-time]', day, error);
    return NextResponse.json({ error: 'failed', day }, { status: 500 });
  }
}
