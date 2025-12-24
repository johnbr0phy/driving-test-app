import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const { referralCode, newUserId } = await request.json();

    if (!referralCode || !newUserId) {
      return NextResponse.json(
        { error: 'Referral code and new user ID are required' },
        { status: 400 }
      );
    }

    // Find the user with this referral code
    const adminDb = getAdminDb();
    const usersRef = adminDb.collection('users');
    const snapshot = await usersRef.where('referralCode', '==', referralCode).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      );
    }

    const referrerDoc = snapshot.docs[0];
    const referrerId = referrerDoc.id;

    // Don't allow self-referral
    if (referrerId === newUserId) {
      return NextResponse.json(
        { error: 'Cannot use your own referral code' },
        { status: 400 }
      );
    }

    // Increment the referrer's referral count
    await referrerDoc.ref.update({
      referralCount: FieldValue.increment(1),
    });

    return NextResponse.json({
      success: true,
      referrerId,
      message: 'Referral tracked successfully',
    });
  } catch (error) {
    console.error('Error tracking referral:', error);
    return NextResponse.json(
      { error: 'Failed to track referral' },
      { status: 500 }
    );
  }
}
