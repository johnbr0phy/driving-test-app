import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const VALID_EVENTS = ['paywall_hit', 'checkout_start', 'purchase'] as const;
const VALID_PAYWALLS = ['training_set_4', 'practice_test_4', 'full_stats', 'cdl_training', 'cdl_test'] as const;

export async function POST(request: NextRequest) {
  try {
    const { event, paywall } = await request.json();

    if (!VALID_EVENTS.includes(event)) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
    }

    const db = getAdminDb();
    const today = new Date().toISOString().split('T')[0];

    const updates: Record<string, unknown> = {
      [`daily.${today}.${event}`]: FieldValue.increment(1),
    };

    // For paywall_hit, also track which specific paywall
    if (event === 'paywall_hit' && paywall && VALID_PAYWALLS.includes(paywall)) {
      updates[`daily.${today}.paywall_${paywall}`] = FieldValue.increment(1);
    }

    await db.doc('analytics/paywall').set(updates, { merge: true });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking paywall event:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
