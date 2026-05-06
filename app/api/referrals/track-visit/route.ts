import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { normalizeReferralCode } from '@/lib/referral';

// Top-of-funnel counter: fired by ReferralCapture when a visitor lands with
// `?ref=XXX`. Public, unauthenticated, fire-and-forget. Mirrors the share
// tracking pattern at /api/analytics/share. Counts both total visits and the
// subset whose code resolves to a real referrer, so we can spot junk traffic.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const code = normalizeReferralCode(String(body?.code ?? ''));
    if (!code) {
      return NextResponse.json({ ok: false, reason: 'missing_code' }, { status: 400 });
    }

    const db = getAdminDb();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Resolve the code outside the increment so an invalid code doesn't pollute
    // the "valid" counter. We still record it under total/daily so we can see
    // crawlers and stale links.
    const codeSnap = await db.collection('referrals').doc(code).get();
    const isValid = codeSnap.exists && Boolean(codeSnap.data()?.ownerUid);

    const update: Record<string, unknown> = {
      total: FieldValue.increment(1),
      [`daily.${today}`]: FieldValue.increment(1),
    };
    if (isValid) {
      update.validTotal = FieldValue.increment(1);
      update[`validDaily.${today}`] = FieldValue.increment(1);
    }

    await db.doc('analytics/referralVisits').set(update, { merge: true });

    return NextResponse.json({ ok: true, valid: isValid });
  } catch (error) {
    console.error('Error tracking referral visit:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
