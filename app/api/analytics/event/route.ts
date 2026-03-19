import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const ALLOWED_EVENTS = ['paywall_view', 'homepage_visit'] as const;
type EventName = (typeof ALLOWED_EVENTS)[number];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = body.event as string;

    if (!ALLOWED_EVENTS.includes(event as EventName)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const db = getAdminDb();
    const today = new Date().toISOString().split('T')[0];

    await db.doc(`analytics/${event}`).set(
      {
        total: FieldValue.increment(1),
        [`daily.${today}`]: FieldValue.increment(1),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
