import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { computeAnswersByExamByDay } from '@/lib/server/answersByDay';
import { getInternalUids } from '@/lib/server/internalUsers';
import { enrolledExamKeys, enrollmentDocId } from '@/lib/server/enrollments';

// Seeds the analytics/questions aggregate's history from every user's stored
// answer data. Runs as its own endpoint (triggered by the admin dashboard when
// the aggregate has no backfilledAt marker) rather than inline in the admin
// data request, so a slow scan can't blow up the dashboard load.
//
// Resumable: one call scans users for at most CHUNK_BUDGET_MS, then saves its
// cursor and running per-day sums in analytics/questionsBackfillRun and
// returns { done: false }. The admin page calls again until { done: true }
// (lib/questionsBackfillClient). A single scan of every account used to hit
// the 60s function limit and die before writing anything, leaving the
// per-exam table with no history. A lease on the run doc stops two admin tabs
// from scanning the same users twice; a chunk that dies before saving is
// simply scanned again, because its sums were never stored.
//
// Idempotent by design: per-day values are written as max(existing, computed),
// never incremented, so a re-run after a timeout or crash can only fill gaps —
// it can never double count. Days from the run's start day onward are owned by
// the live increment counters and are never touched here.

export const maxDuration = 60;

const PAGE_SIZE = 100;
const CHUNK_BUDGET_MS = 35_000;
const LEASE_MS = 75_000;

type DayCounts = Record<string, number>;
type RunState = {
  today: string;
  cursor: string | null;
  usersScanned: number;
  enrollmentsWritten: number;
  computed: DayCounts;
  computedByExam: Record<string, DayCounts>;
  leaseId?: string;
  leaseUntil?: number;
  startedAt: string;
};

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

    const started = Date.now();
    const db = getAdminDb();
    const runRef = db.doc('analytics/questionsBackfillRun');

    // Take the lease, starting a fresh run if none is in progress.
    const leaseId = randomUUID();
    const run = await db.runTransaction(async (tx): Promise<RunState | null> => {
      const snap = await tx.get(runRef);
      const existing = snap.exists ? (snap.data() as RunState) : null;
      if (existing?.leaseUntil && existing.leaseUntil > Date.now()) return null;
      const state: RunState = existing ?? {
        today: new Date().toISOString().split('T')[0],
        cursor: null,
        usersScanned: 0,
        enrollmentsWritten: 0,
        computed: {},
        computedByExam: {},
        startedAt: new Date().toISOString(),
      };
      tx.set(runRef, { ...state, leaseId, leaseUntil: Date.now() + LEASE_MS });
      return state;
    });
    if (!run) {
      return NextResponse.json({ ok: true, done: false, busy: true });
    }

    // Scan users in pages, projecting only the history fields, until the
    // chunk's time budget runs out or the collection ends.
    const { computed, computedByExam } = run;
    let { cursor, usersScanned, enrollmentsWritten } = run;
    // Internal accounts (lib/internal) never count toward the answered totals.
    const internalUids = await getInternalUids();
    // Seeds the enrollments collection (lib/enrollment) for accounts that
    // answered before live tracking: idempotent sets, one doc per (exam, uid).
    const writer = db.bulkWriter();
    const enrollments = db.collection('enrollments');
    let finished = false;
    while (Date.now() - started < CHUNK_BUDGET_MS) {
      let query = db
        .collection('users')
        .orderBy('__name__')
        .select('trainingAnswerHistory', 'completedTests', 'v2')
        .limit(PAGE_SIZE);
      if (cursor) query = query.startAfter(db.collection('users').doc(cursor));
      const snap = await query.get();

      for (const doc of snap.docs) {
        if (internalUids.has(doc.id)) continue;
        usersScanned++;
        const data = doc.data() as Record<string, unknown>;
        for (const exam of enrolledExamKeys(data)) {
          void writer.set(enrollments.doc(enrollmentDocId(exam, 'u', doc.id)), { exam, uid: doc.id }, { merge: true });
          enrollmentsWritten++;
        }
        const byExam = computeAnswersByExamByDay(data);
        for (const [examKey, byDay] of Object.entries(byExam)) {
          const examDays = (computedByExam[examKey] ||= {});
          for (const [day, count] of Object.entries(byDay)) {
            if (day >= run.today) continue;
            computed[day] = (computed[day] || 0) + count;
            examDays[day] = (examDays[day] || 0) + count;
          }
        }
      }

      if (snap.size > 0) cursor = snap.docs[snap.docs.length - 1].id;
      if (snap.size < PAGE_SIZE) {
        finished = true;
        break;
      }
    }

    await writer.close();

    if (!finished) {
      // Save progress only while the lease is still ours; otherwise another
      // call took over and this chunk's sums are discarded (it rescans them).
      const saved = await db.runTransaction(async (tx) => {
        const snap = await tx.get(runRef);
        if (snap.data()?.leaseId !== leaseId) return false;
        tx.set(runRef, {
          ...run,
          cursor,
          usersScanned,
          enrollmentsWritten,
          computed,
          computedByExam,
          leaseId: null,
          leaseUntil: 0,
        });
        return true;
      });
      return NextResponse.json({ ok: true, done: false, busy: !saved, usersScanned });
    }

    const ref = db.doc('analytics/questions');
    const existingDoc = (await ref.get()).data() || {};
    const existing = (existingDoc.daily as DayCounts) || {};
    const daily: DayCounts = {};
    for (const [day, count] of Object.entries(computed)) {
      if (count > (existing[day] || 0)) daily[day] = count;
    }

    const existingByExam = (existingDoc.byExam as Record<string, { daily?: DayCounts }>) || {};
    const byExam: Record<string, { daily: DayCounts }> = {};
    let examDaysWritten = 0;
    for (const [examKey, byDay] of Object.entries(computedByExam)) {
      const existingDays = existingByExam[examKey]?.daily || {};
      const examDaily: DayCounts = {};
      for (const [day, count] of Object.entries(byDay)) {
        if (count > (existingDays[day] || 0)) examDaily[day] = count;
      }
      if (Object.keys(examDaily).length > 0) {
        byExam[examKey] = { daily: examDaily };
        examDaysWritten += Object.keys(examDaily).length;
      }
    }

    // Nested merge updates only the listed days; live counters and days the
    // aggregate already knows more about are left untouched.
    const stamp = new Date().toISOString();
    await ref.set({ daily, byExam, backfilledAt: stamp, byExamBackfilledAt: stamp, v2BackfilledAt: stamp, enrollmentsBackfilledAt: stamp }, { merge: true });
    await runRef.delete();

    return NextResponse.json({
      ok: true,
      done: true,
      usersScanned,
      daysWritten: Object.keys(daily).length,
      examDaysWritten,
      enrollmentsWritten,
    });
  } catch (error) {
    console.error('[admin/backfill-questions]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
