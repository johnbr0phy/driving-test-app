import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';

// Called when a referred user crosses the qualification bar (currently:
// selecting their state). Idempotent — only bumps the referrer's
// `qualifiedReferralCount` the first time, by setting `referralQualifiedAt`
// on the referee inside a transaction.
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decoded = await getAdminAuth().verifyIdToken(token);
    const refereeUid = decoded.uid;

    const db = getAdminDb();
    const refereeRef = db.collection('users').doc(refereeUid);

    let qualified = false;
    let referrerUid: string | null = null;

    await db.runTransaction(async (tx) => {
      const refereeSnap = await tx.get(refereeRef);
      if (!refereeSnap.exists) return;
      const data = refereeSnap.data() || {};
      const referredBy = data.referredBy as string | undefined;
      if (!referredBy) return;
      if (data.referralQualifiedAt) return; // Already counted

      referrerUid = referredBy;
      qualified = true;

      const referrerRef = db.collection('users').doc(referredBy);
      tx.set(refereeRef, { referralQualifiedAt: FieldValue.serverTimestamp() }, { merge: true });
      tx.set(referrerRef, { qualifiedReferralCount: FieldValue.increment(1) }, { merge: true });
    });

    return NextResponse.json({ ok: true, qualified, referrerUid });
  } catch (error) {
    console.error('Referral qualify error:', error);
    return NextResponse.json({ error: 'Failed to qualify referral' }, { status: 500 });
  }
}
