import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const KEY_RE = /^[a-zA-Z0-9_]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const itemId = typeof body.itemId === 'string' ? body.itemId : '';
    const location = typeof body.location === 'string' ? body.location : '';
    const label = (typeof body.itemName === 'string' ? body.itemName : '').slice(0, 80) || itemId;

    if (!KEY_RE.test(itemId) || !KEY_RE.test(location)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }

    const key = `${location}:${itemId}`;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const db = getAdminDb();

    // Aggregate counters (includes guests). Nested-object merge avoids the
    // dotted-field-path ambiguity in set({ merge: true }).
    await db.doc('analytics/paywalls').set(
      {
        total: FieldValue.increment(1),
        daily: { [today]: FieldValue.increment(1) },
        byPaywall: {
          [key]: {
            total: FieldValue.increment(1),
            daily: { [today]: FieldValue.increment(1) },
            label,
            location,
            itemId,
          },
        },
      },
      { merge: true }
    );

    // Per-user attribution (logged-in users only) so the admin dashboard can
    // compute which paywall converts users to premium.
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const decoded = await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1]);
        await db.doc(`users/${decoded.uid}`).set(
          {
            paywallHits: {
              [key]: {
                count: FieldValue.increment(1),
                lastAt: new Date().toISOString(),
                label,
                location,
                itemId,
              },
            },
          },
          { merge: true }
        );
      } catch {
        // Invalid token: aggregate count is still recorded, skip attribution.
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking paywall hit:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
