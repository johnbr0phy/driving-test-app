import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { EXAM_ANALYTICS_KEYS } from '@/lib/exams';
import { EXAMS_V2 } from '@/lib/v2/registry';
import { isInternalEmail } from '@/lib/internal';
import { grantAnswers, requestIp } from '@/lib/server/answerRateLimit';
import { BROWSER_ID_RE, recordAnswerActivity } from '@/lib/server/weeklyActiveLearners';

// Largest batch a client can legitimately accumulate: a full test completion
// (171 questions on the ACT) plus a burst of training answers.
const MAX_BATCH = 300;

// v1 keys plus the v2 exam ids (sat, act...), which useV2Store files under.
const KNOWN_EXAM_KEYS = new Set<string>([...EXAM_ANALYTICS_KEYS, ...EXAMS_V2.map((e) => e.id)]);

function toCount(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const raw = typeof body.count === 'number' && Number.isFinite(body.count) ? Math.floor(body.count) : 1;
    if (raw < 1) {
      return NextResponse.json({ ok: true });
    }
    const requested = Math.min(raw, MAX_BATCH);

    const db = getAdminDb();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD (UTC)

    // Per-IP budget (lib/server/answerRateLimit): anything over it is dropped
    // here and tallied under rateLimited so a capped spike still shows up.
    const count = await grantAnswers(db, requestIp(request), requested);
    if (count < requested) {
      const dropped = requested - count;
      await db.doc('analytics/questions').set(
        { rateLimited: { total: FieldValue.increment(dropped), daily: { [today]: FieldValue.increment(dropped) } } },
        { merge: true }
      );
      if (count <= 0) return NextResponse.json({ ok: true, limited: true });
    }

    // Optional per-exam split ({ dmv: 3, cdl: 2 }). Unknown keys are dropped
    // and the split can never exceed the (capped) total it accompanies.
    const byExam: Record<string, number> = {};
    let splitTotal = 0;
    if (body.byExam && typeof body.byExam === 'object') {
      for (const [key, value] of Object.entries(body.byExam as Record<string, unknown>)) {
        if (!KNOWN_EXAM_KEYS.has(key)) continue;
        const n = Math.min(toCount(value), count - splitTotal);
        if (n <= 0) continue;
        byExam[key] = n;
        splitTotal += n;
        if (splitTotal >= count) break;
      }
    }

    // Nested-object merge avoids the dotted-field-path ambiguity in
    // set({ merge: true }) — same pattern as analytics/paywalls.
    const update: Record<string, unknown> = {
      total: FieldValue.increment(count),
      daily: { [today]: FieldValue.increment(count) },
    };
    if (splitTotal > 0) {
      update.byExam = Object.fromEntries(
        Object.entries(byExam).map(([key, n]) => [
          key,
          { total: FieldValue.increment(n), daily: { [today]: FieldValue.increment(n) } },
        ])
      );
    }
    await db.doc('analytics/questions').set(update, { merge: true });

    // Distinct learner for WAL. Counts stay on analytics/questions; the id
    // goes to learnerDays. A bad token still counts the answers.
    let learner = false;
    const browserId = typeof body.browserId === 'string' && BROWSER_ID_RE.test(body.browserId) ? body.browserId : null;
    let uid: string | null = null;
    let internal = false;
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const decoded = await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1]);
        if (isInternalEmail(decoded.email)) internal = true;
        else uid = decoded.uid;
      } catch {
        uid = null;
      }
    }
    if (!internal && (uid || browserId)) {
      try {
        learner = await recordAnswerActivity(db, { uid, browserId });
      } catch (err) {
        console.error('Error recording learner activity:', err);
      }
    }

    return NextResponse.json({ ok: true, learner });
  } catch (error) {
    console.error('Error tracking answered questions:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
