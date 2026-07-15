import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// Largest batch a client can legitimately accumulate: a full 50-question test
// completion plus a burst of training answers.
const MAX_BATCH = 200;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const raw = typeof body.count === 'number' && Number.isFinite(body.count) ? Math.floor(body.count) : 1;
    if (raw < 1) {
      return NextResponse.json({ ok: true });
    }
    const count = Math.min(raw, MAX_BATCH);

    const db = getAdminDb();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD (UTC)

    // Nested-object merge avoids the dotted-field-path ambiguity in
    // set({ merge: true }) — same pattern as analytics/paywalls.
    await db.doc('analytics/questions').set(
      {
        total: FieldValue.increment(count),
        daily: { [today]: FieldValue.increment(count) },
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking answered questions:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
