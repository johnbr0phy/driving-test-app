import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { isBotRequest } from '@/lib/botUserAgent';
import { RANK_MAX_REPORT, RANK_TEST_DOC, RANK_TEST_ID, isRankArm, isRankStep } from '@/lib/dailyRankTest';

// One event of the daily rank A/B test (lib/dailyRankTest.ts): browsers per
// arm and step in RANK_TEST_DOC, overall and by UTC day, plus answers and
// sessions per arm for questions per session. Each browser sends each step once.
export async function POST(request: NextRequest) {
  if (isBotRequest(request)) return NextResponse.json({ ok: true });
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const { arm, step } = body;
    if (body.test !== RANK_TEST_ID || !isRankArm(arm)) return NextResponse.json({ ok: false }, { status: 400 });
    const now = new Date().toISOString();
    const today = now.slice(0, 10);
    const ref = getAdminDb().doc(RANK_TEST_DOC);
    const inc = FieldValue.increment;

    if (step === 'activity') {
      const n = (v: unknown) => (typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= RANK_MAX_REPORT ? v : -1);
      const answers = n(body.answers);
      const sessions = n(body.sessions);
      if (answers < 0 || sessions < 0) return NextResponse.json({ ok: false }, { status: 400 });
      await ref.set({ arms: { [arm]: { answers: inc(answers), sessions: inc(sessions) } } }, { merge: true });
      return NextResponse.json({ ok: true });
    }
    if (!isRankStep(step)) return NextResponse.json({ ok: false }, { status: 400 });
    const snap = await ref.get();
    await ref.set(
      {
        test: RANK_TEST_ID,
        ...(!(snap.exists && snap.get('test') === RANK_TEST_ID) && { since: now }),
        arms: { [arm]: { [step]: inc(1) } },
        daily: { [today]: { [arm]: { [step]: inc(1) } } },
      },
      { merge: true },
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking rank test:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
