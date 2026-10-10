import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { EXAM_ANALYTICS_KEYS } from '@/lib/exams';

// Largest batch a client can legitimately accumulate: a full 50-question test
// completion plus a burst of training answers.
const MAX_BATCH = 200;

const KNOWN_EXAM_KEYS = new Set<string>(EXAM_ANALYTICS_KEYS);

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
    const count = Math.min(raw, MAX_BATCH);

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

    const db = getAdminDb();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD (UTC)

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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking answered questions:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
