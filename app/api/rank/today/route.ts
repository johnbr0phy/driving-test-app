import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { isBotRequest } from '@/lib/botUserAgent';
import { grantAnswers, requestIp } from '@/lib/server/answerRateLimit';
import { personCorrect, questionKey, recordRankAnswers, statusFor } from '@/lib/server/dailyRank';
import { rankCaller } from '@/lib/server/dailyRankRequest';
import { rankStatus, type RankAnswer } from '@/lib/dailyRank';

// Daily rank (lib/dailyRank.ts, lib/server/dailyRank.ts).
//   GET  ?tz=<IANA zone>&b=<browser id>     -> today's status
//   POST { tz, browserId, answers: [{ e, q, ok }] } -> records, then status
// The response is only ever the caller's own count, their top percent, their
// "N more" line and percentile cutoffs. Never anyone's identity, never a head
// count or a raw rank.

/** Most answers one request may carry (a full ACT plus a burst of training). */
const MAX_BATCH = 300;
const EXAM_RE = /^[a-z0-9][a-z0-9:_-]{0,59}$/i;
const QUESTION_RE = /^[A-Za-z0-9_.:\-]{1,100}$/;

const empty = (day: string) => NextResponse.json(rankStatus(day, {}, 0), { headers: { 'Cache-Control': 'private, no-store' } });

export async function GET(request: NextRequest) {
  const caller = await rankCaller(request);
  if (!caller.personId || caller.internal) return empty(caller.day);
  try {
    const db = getAdminDb();
    const correct = await personCorrect(db, caller.day, caller.personId);
    return NextResponse.json(await statusFor(db, caller.day, correct), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('[rank/today] GET failed:', error);
    return NextResponse.json({ error: 'unavailable' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const caller = await rankCaller(request, body);
  // Bots, internal accounts and callers with no identity never count.
  if (isBotRequest(request) || caller.internal || !caller.personId) return empty(caller.day);

  const raw = Array.isArray(body.answers) ? body.answers.slice(0, MAX_BATCH) : [];
  const answers: RankAnswer[] = [];
  for (const a of raw as Record<string, unknown>[]) {
    if (typeof a?.e !== 'string' || typeof a?.q !== 'string' || typeof a?.ok !== 'boolean') continue;
    if (!EXAM_RE.test(a.e) || !QUESTION_RE.test(a.q)) continue;
    answers.push({ key: questionKey(a.e, a.q), ok: a.ok });
  }

  try {
    const db = getAdminDb();
    let correct: number;
    if (answers.length) {
      // Same per-IP budget as the answer counter, on its own scope. Answers
      // over it are dropped, never counted (and tallied for /admin).
      const granted = await grantAnswers(db, requestIp(request), answers.length, new Date(), 'rank');
      if (granted < answers.length) {
        const today = new Date().toISOString().slice(0, 10);
        const dropped = answers.length - granted;
        await db
          .doc('analytics/dailyRank')
          .set({ rateLimited: { total: FieldValue.increment(dropped), daily: { [today]: FieldValue.increment(dropped) } } }, { merge: true })
          .catch(() => {});
      }
      correct = await recordRankAnswers(db, caller.day, caller.personId, answers.slice(0, granted));
    } else {
      correct = await personCorrect(db, caller.day, caller.personId);
    }
    return NextResponse.json(await statusFor(db, caller.day, correct), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('[rank/today] POST failed:', error);
    return NextResponse.json({ error: 'unavailable' }, { status: 500 });
  }
}
