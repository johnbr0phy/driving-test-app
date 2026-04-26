import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { sendReferralProgressEmail } from '@/lib/referral-emails';

// Called when a referred user crosses the qualification bar (currently:
// selecting their state). Idempotent — only bumps the referrer's
// `qualifiedReferralCount` the first time, by setting `referralQualifiedAt`
// on the referee inside a transaction.
//
// On the first qualifying referral, fires a notification email to the inviter
// so they can watch their progress fill up. Capped at the unlock threshold
// inside `sendReferralProgressEmail` — additional referrals still credit the
// counter but no further emails go out.
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
    let newReferrerCount = 0;
    let referrerReferralCode: string | null = null;

    await db.runTransaction(async (tx) => {
      // ── All reads must happen before any writes in a Firestore transaction ──
      const refereeSnap = await tx.get(refereeRef);
      if (!refereeSnap.exists) return;
      const data = refereeSnap.data() || {};
      const referredBy = data.referredBy as string | undefined;
      if (!referredBy) return;
      if (data.referralQualifiedAt) return; // Already counted

      const referrerRef = db.collection('users').doc(referredBy);
      const referrerSnap = await tx.get(referrerRef);
      const currentCount = (referrerSnap.data()?.qualifiedReferralCount as number) || 0;
      referrerReferralCode = (referrerSnap.data()?.referralCode as string) || null;

      // ── Writes ──
      referrerUid = referredBy;
      qualified = true;
      newReferrerCount = currentCount + 1;

      tx.set(refereeRef, { referralQualifiedAt: FieldValue.serverTimestamp() }, { merge: true });
      tx.set(referrerRef, { qualifiedReferralCount: FieldValue.increment(1) }, { merge: true });
    });

    // Fire the email after the transaction commits. Don't await — the qualify
    // response shouldn't be blocked on Resend latency.
    if (qualified && referrerUid) {
      sendReferralProgressEmail({
        referrerUid,
        refereeUid,
        newCount: newReferrerCount,
        referrerReferralCode,
      }).catch((err) => console.error('Referral notify failed:', err));
    }

    return NextResponse.json({ ok: true, qualified, referrerUid });
  } catch (error) {
    console.error('Referral qualify error:', error);
    return NextResponse.json({ error: 'Failed to qualify referral' }, { status: 500 });
  }
}
