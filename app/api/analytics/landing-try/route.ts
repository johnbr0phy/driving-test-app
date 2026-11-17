import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { isBotRequest } from '@/lib/botUserAgent';
import {
  LANDING_TRY_ANSWER_CAP,
  LANDING_TRY_MILESTONES,
  LANDING_TRY_TEST_ID,
  isLandingTryArm,
  isLandingTryStep,
} from '@/lib/landingTryTest';

// One step of the "Try one now" A/B test (lib/landingTryTest.ts): browsers per
// arm and step in analytics/landingTryTest, overall, by day and, for
// enrolment and first answers, by exam. Each browser sends each step once.
export async function POST(request: NextRequest) {
  if (isBotRequest(request)) return NextResponse.json({ ok: true });
  try {
    const body = await request.json().catch(() => ({}));
    const { arm, step } = body;
    if (body.test === LANDING_TRY_TEST_ID && isLandingTryArm(arm) && step === 'answers') return addAnswers(arm, body);
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
        ...(step === 'enrolled' && body.ac === true && !snap.get('answersSince') && { answersSince: now }),
        arms: { [arm]: { [step]: inc } },
        daily: { [today]: { [arm]: { [step]: inc } } },
        // Enrolments from the answer-count cohort (every enrolment since Nov 17 2026).
        ...(step === 'enrolled' && body.ac === true && { answers: { [arm]: { enrolled: inc } } }),
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

// A browser's answers so far: adds the new ones to its arm's total and the
// matching change to the sum of squares (now^2 - prev^2), and counts a
// milestone once when one was reached.
async function addAnswers(arm: string, body: Record<string, unknown>) {
  const int = (v: unknown) => (typeof v === 'number' && Number.isInteger(v) ? v : NaN);
  const prev = int(body.prev);
  const now = int(body.now);
  const reached = body.reached === undefined ? undefined : int(body.reached);
  if (!(prev >= 0 && now >= prev && now <= LANDING_TRY_ANSWER_CAP)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  if (reached !== undefined && !(LANDING_TRY_MILESTONES as readonly number[]).includes(reached)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  try {
    const add = FieldValue.increment;
    await getAdminDb()
      .doc('analytics/landingTryTest')
      .set(
        {
          answers: {
            [arm]: {
              ...(now > prev && { total: add(now - prev), sq: add(now * now - prev * prev) }),
              ...(reached !== undefined && { reached: { [String(reached)]: add(1) } }),
            },
          },
        },
        { merge: true },
      );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking landing try answers:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
