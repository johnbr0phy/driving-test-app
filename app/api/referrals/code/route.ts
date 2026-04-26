import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { generateReferralCode } from '@/lib/referral';

// Returns the current user's referral code, generating one if they don't have one yet.
// Also returns the live counts so the modal can render progress without an extra round-trip.
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decoded = await getAdminAuth().verifyIdToken(token);
    const userId = decoded.uid;

    const db = getAdminDb();
    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    const userData = userSnap.exists ? userSnap.data() : {};

    let code: string | undefined = userData?.referralCode;

    if (!code) {
      // Generate a unique code with a small retry loop for collisions
      for (let i = 0; i < 8; i++) {
        const candidate = generateReferralCode();
        const taken = await db.collection('referrals').doc(candidate).get();
        if (!taken.exists) {
          code = candidate;
          break;
        }
      }
      if (!code) {
        return NextResponse.json({ error: 'Could not generate referral code' }, { status: 500 });
      }

      // Reserve the code and stamp it on the user (idempotent on retry)
      await db.collection('referrals').doc(code).set({
        ownerUid: userId,
        createdAt: FieldValue.serverTimestamp(),
      });
      await userRef.set({ referralCode: code }, { merge: true });
    }

    return NextResponse.json({
      code,
      referralCount: userData?.referralCount ?? 0,
      qualifiedReferralCount: userData?.qualifiedReferralCount ?? 0,
    });
  } catch (error) {
    console.error('Referral code error:', error);
    return NextResponse.json({ error: 'Failed to load referral code' }, { status: 500 });
  }
}
