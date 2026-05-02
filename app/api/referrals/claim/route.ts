import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { normalizeReferralCode } from '@/lib/referral';

// Called once per new user (right after first auth) when a `?ref=` code was
// captured on the landing page. Stamps `referredBy` on the new user and
// increments `referralCount` on the referrer. Idempotent: a user can only be
// referred once, and self-referrals are rejected.
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decoded = await getAdminAuth().verifyIdToken(token);
    const refereeUid = decoded.uid;

    const body = await request.json().catch(() => ({}));
    const code = normalizeReferralCode(String(body?.code ?? ''));
    if (!code) {
      return NextResponse.json({ error: 'Missing referral code' }, { status: 400 });
    }

    const db = getAdminDb();
    const codeRef = db.collection('referrals').doc(code);
    const codeSnap = await codeRef.get();
    if (!codeSnap.exists) {
      return NextResponse.json({ ok: false, reason: 'invalid_code' }, { status: 404 });
    }
    const ownerUid = codeSnap.data()?.ownerUid as string | undefined;
    if (!ownerUid) {
      return NextResponse.json({ ok: false, reason: 'invalid_code' }, { status: 404 });
    }

    if (ownerUid === refereeUid) {
      return NextResponse.json({ ok: false, reason: 'self_referral' }, { status: 400 });
    }

    const refereeRef = db.collection('users').doc(refereeUid);
    const refereeSnap = await refereeRef.get();
    const existingReferredBy = refereeSnap.exists ? refereeSnap.data()?.referredBy : null;
    if (existingReferredBy) {
      // Already credited - return current state without double-counting
      const existingReferredAtRaw = refereeSnap.data()?.referredAt;
      const existingReferredAt =
        existingReferredAtRaw && typeof existingReferredAtRaw.toDate === 'function'
          ? existingReferredAtRaw.toDate().toISOString()
          : (typeof existingReferredAtRaw === 'string' ? existingReferredAtRaw : null);
      return NextResponse.json({
        ok: true,
        alreadyClaimed: true,
        referredBy: existingReferredBy,
        referredAt: existingReferredAt,
      });
    }

    // Use a transaction so the referrer's counter and the referee's stamp move together
    await db.runTransaction(async (tx) => {
      const referrerRef = db.collection('users').doc(ownerUid);
      tx.set(refereeRef, { referredBy: ownerUid, referredAt: FieldValue.serverTimestamp() }, { merge: true });
      tx.set(referrerRef, { referralCount: FieldValue.increment(1) }, { merge: true });
    });

    // Echo a client-side timestamp back so the store can persist it through
    // the next saveToFirestore. The server's serverTimestamp resolves
    // post-commit and isn't available here without an extra read; using
    // ISO-now is close enough — loadUserData will reconcile on next session.
    const referredAt = new Date().toISOString();
    return NextResponse.json({ ok: true, referredBy: ownerUid, referredAt });
  } catch (error) {
    console.error('Referral claim error:', error);
    return NextResponse.json({ error: 'Failed to claim referral' }, { status: 500 });
  }
}
