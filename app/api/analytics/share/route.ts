import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST() {
  try {
    const db = getAdminDb();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    await db.doc('analytics/shares').set(
      {
        total: FieldValue.increment(1),
        // A nested map, not a dotted key: set() with merge stores "daily.<date>"
        // as one literal field name, which is how counts before Oct 2026 were
        // stored (lib/shareCounts reads both).
        daily: { [today]: FieldValue.increment(1) },
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking share click:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
