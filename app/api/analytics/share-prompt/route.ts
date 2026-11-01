import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// John's "tell a friend" prompt in training (components/SharePromptStep):
// each action counted in analytics/sharePrompt, total, daily and by page.
// Internal browsers never send (hooks/useSharePrompt).
const ACTIONS = new Set(['shown', 'skipped', 'share', 'copy']);
const WHERE = new Set(['dmv_training', 'training', 'drill']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const action = body.action;
    const where = body.where;
    if (!ACTIONS.has(action) || !WHERE.has(where)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }
    const now = new Date().toISOString();
    const today = now.slice(0, 10);
    const db = getAdminDb();
    const ref = db.doc('analytics/sharePrompt');
    const snap = await ref.get();
    const inc = FieldValue.increment(1);
    await ref.set(
      {
        ...(!snap.exists && { since: now }),
        actions: { [action]: { total: inc, daily: { [today]: inc } } },
        byWhere: { [where]: { [action]: inc } },
      },
      { merge: true }
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking share prompt:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
