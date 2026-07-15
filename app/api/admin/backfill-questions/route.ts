import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { computeAnswersByDay } from '@/lib/server/answersByDay';

// Seeds the analytics/questions aggregate's history from every user's stored
// answer data. Runs as its own endpoint (triggered by the admin dashboard when
// the aggregate has no backfilledAt marker) rather than inline in the admin
// data request, so a slow scan can't blow up the dashboard load.
//
// Idempotent by design: per-day values are written as max(existing, computed),
// never incremented, so a re-run after a timeout or crash can only fill gaps —
// it can never double count. Days from today onward are owned by the live
// increment counters and are never touched here.

export const maxDuration = 60;

const PAGE_SIZE = 100;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1]);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!isAdminEmail(decodedToken.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = getAdminDb();
    const today = new Date().toISOString().split('T')[0];

    // Scan all users in pages, projecting only the two history fields, so no
    // single fetch is larger than the 100-doc query the dashboard already runs.
    const computed: Record<string, number> = {};
    let usersScanned = 0;
    let cursor: FirebaseFirestore.QueryDocumentSnapshot | null = null;
    for (;;) {
      let query = db
        .collection('users')
        .orderBy('__name__')
        .select('trainingAnswerHistory', 'completedTests')
        .limit(PAGE_SIZE);
      if (cursor) query = query.startAfter(cursor);
      const snap = await query.get();
      if (snap.empty) break;

      for (const doc of snap.docs) {
        usersScanned++;
        const byDay = computeAnswersByDay(doc.data() as Record<string, unknown>);
        for (const [day, count] of Object.entries(byDay)) {
          if (day >= today) continue;
          computed[day] = (computed[day] || 0) + count;
        }
      }

      if (snap.size < PAGE_SIZE) break;
      cursor = snap.docs[snap.docs.length - 1];
    }

    const ref = db.doc('analytics/questions');
    const existing = ((await ref.get()).data()?.daily as Record<string, number>) || {};
    const daily: Record<string, number> = {};
    for (const [day, count] of Object.entries(computed)) {
      if (count > (existing[day] || 0)) daily[day] = count;
    }

    // Nested merge updates only the listed days; live counters and days the
    // aggregate already knows more about are left untouched.
    await ref.set({ daily, backfilledAt: new Date().toISOString() }, { merge: true });

    return NextResponse.json({
      ok: true,
      usersScanned,
      daysWritten: Object.keys(daily).length,
    });
  } catch (error) {
    console.error('[admin/backfill-questions]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
