import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { isBotRequest } from '@/lib/botUserAgent';
import { LANDING_TRY_TEST_ID, isLandingTryArm, isLandingTryStep } from '@/lib/landingTryTest';

// One step of the "Try one now" A/B test (lib/landingTryTest.ts): browsers per
// arm and step in analytics/landingTryTest, overall, by day and, for
// enrolment and first answers, by exam. Each browser sends each step once.
export async function POST(request: NextRequest) {
  if (isBotRequest(request)) return NextResponse.json({ ok: true });
  try {
    const body = await request.json().catch(() => ({}));
    const { arm, step } = body;
    if (body.test !== LANDING_TRY_TEST_ID || !isLandingTryArm(arm) || !isLandingTryStep(step)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }
    const exam = typeof body.exam === 'string' && /^[a-z0-9-]{1,40}$/.test(body.exam) ? body.exam : null;
    const now = new Date().toISOString();
    const today = now.slice(0, 10);
    const ref = getAdminDb().doc('analytics/landingTryTest');
    const snap = await ref.get();
    const sameTest = snap.exists && snap.get('test') === LANDING_TRY_TEST_ID;
    const inc = FieldValue.increment(1);
    await ref.set(
      {
        test: LANDING_TRY_TEST_ID,
        ...(!sameTest && { since: now }),
        arms: { [arm]: { [step]: inc } },
        daily: { [today]: { [arm]: { [step]: inc } } },
        ...(exam && (step === 'enrolled' || step === 'answered') && { byExam: { [exam]: { [arm]: { [step]: inc } } } }),
      },
      { merge: true },
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking landing try test:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
