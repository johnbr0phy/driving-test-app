import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { isInternalEmail } from '@/lib/internal';
import { PAYWALL_TEST_ID, isPaywallVariant } from '@/lib/paywallTestIds';

// One view of the English paywall test (lib/paywallTest.ts): views and
// distinct browsers per variant in analytics/paywallTest, and the account's
// variant on users/{uid}.paywallTest when signed in.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const variant = body.variant;
    if (body.test !== PAYWALL_TEST_ID || !isPaywallVariant(variant)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }
    const first = body.first === true;
    const now = new Date().toISOString();
    const today = now.slice(0, 10);
    const db = getAdminDb();

    let uid: string | null = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const decoded = await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1]);
        if (isInternalEmail(decoded.email)) return NextResponse.json({ ok: true });
        uid = decoded.uid;
      } catch {
        // Count it anonymously.
      }
    }

    const ref = db.doc('analytics/paywallTest');
    const snap = await ref.get();
    const sameTest = snap.exists && snap.get('test') === PAYWALL_TEST_ID;
    const inc = FieldValue.increment(1);
    await ref.set(
      {
        test: PAYWALL_TEST_ID,
        ...(!sameTest && { since: now }),
        variants: {
          [variant]: {
            views: inc,
            daily: { [today]: inc },
            ...(first && { browsers: inc, browsersDaily: { [today]: inc } }),
          },
        },
      },
      { merge: true }
    );

    if (uid) {
      await db.doc(`users/${uid}`).set(
        { paywallTest: { test: PAYWALL_TEST_ID, variant, lastAt: now } },
        { merge: true }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking paywall test view:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
