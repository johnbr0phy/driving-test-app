import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { isInternalEmail } from '@/lib/internal';
import { LOCK_TEST_ID, isLockArm } from '@/lib/lockTestIds';
import { isBotRequest } from '@/lib/botUserAgent';

// One view of a v1 exam page by a browser that is not Premium, in the lock
// share test (lib/lockTest.ts): views and distinct browsers per arm in
// analytics/lockTest, and the account's arm on users/{uid}.lockTest when
// signed in.
export async function POST(request: NextRequest) {
  // Bots never count in /admin (lib/botUserAgent.ts).
  if (isBotRequest(request)) return NextResponse.json({ ok: true });
  try {
    const body = await request.json().catch(() => ({}));
    const arm = body.arm;
    if (body.test !== LOCK_TEST_ID || !isLockArm(arm)) {
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

    const ref = db.doc('analytics/lockTest');
    const snap = await ref.get();
    const sameTest = snap.exists && snap.get('test') === LOCK_TEST_ID;
    const inc = FieldValue.increment(1);
    await ref.set(
      {
        test: LOCK_TEST_ID,
        ...(!sameTest && { since: now }),
        arms: {
          [arm]: {
            views: inc,
            daily: { [today]: inc },
            ...(first && { browsers: inc, browsersDaily: { [today]: inc } }),
          },
        },
      },
      { merge: true }
    );

    if (uid) {
      await db.doc(`users/${uid}`).set({ lockTest: { test: LOCK_TEST_ID, arm, lastAt: now } }, { merge: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking lock test view:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
