import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { isBotRequest } from '@/lib/botUserAgent';
import { GUEST_PROMPT_TEST_ID, isGuestPromptAction, isGuestPromptVariant } from '@/lib/guestPromptTest';

// One action in the sign-up step's message test (lib/guestPromptTest.ts):
// counts per design in analytics/guestPromptTest, overall, by day and for a
// browser's first showing only (`first`, the clean between-browser split).
export async function POST(request: NextRequest) {
  // Bots never count in /admin (lib/botUserAgent.ts).
  if (isBotRequest(request)) return NextResponse.json({ ok: true });
  try {
    const body = await request.json().catch(() => ({}));
    const { variant, action } = body;
    const position = Number(body.position);
    if (body.test !== GUEST_PROMPT_TEST_ID || !isGuestPromptVariant(variant) || !isGuestPromptAction(action) || !(position >= 1)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }
    const now = new Date().toISOString();
    const today = now.slice(0, 10);
    const ref = getAdminDb().doc('analytics/guestPromptTest');
    const snap = await ref.get();
    const sameTest = snap.exists && snap.get('test') === GUEST_PROMPT_TEST_ID;
    const inc = FieldValue.increment(1);
    await ref.set(
      {
        test: GUEST_PROMPT_TEST_ID,
        ...(!sameTest && { since: now }),
        variants: {
          [variant]: {
            [action]: inc,
            daily: { [today]: { [action]: inc } },
            ...(position === 1 && { first: { [action]: inc } }),
          },
        },
      },
      { merge: true }
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking guest prompt test:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
