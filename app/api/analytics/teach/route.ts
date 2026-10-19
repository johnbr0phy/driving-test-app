import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { isClassCode, normalizeClassCode } from '@/lib/classes';

// Teacher funnel aggregate (see lib/teachTracking.ts). One counter per step,
// total and per UTC day, in analytics/teach. Landing views are also split by
// source and referrer host; class link views are also counted on the class
// doc (joinViews, joinReferrers) so /admin/teach can show views against joins.
const STEPS = new Set(['landing_view', 'new_open', 'new_form', 'join_view']);
// Mirrors VISIT_SOURCES in lib/funnel.ts (that module imports the client SDK).
const VISIT_SOURCES = new Set(['chatgpt', 'perplexity', 'gemini', 'copilot', 'claude', 'ai_other', 'search', 'direct', 'other']);

/** A referrer hostname as a map key: Firestore keys can't hold dots in update paths, so they become "_". */
function hostKey(host: unknown): string | null {
  if (typeof host !== 'string' || !/^[a-z0-9.-]{1,80}$/.test(host)) return null;
  return host.replace(/\./g, '_');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const step = typeof body.step === 'string' ? body.step : '';
    if (!STEPS.has(step)) return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    const today = new Date().toISOString().split('T')[0];
    const db = getAdminDb();
    const bump = { total: FieldValue.increment(1), daily: { [today]: FieldValue.increment(1) } };
    const referrer = hostKey(body.referrer);

    if (step === 'join_view') {
      const code = typeof body.code === 'string' ? normalizeClassCode(body.code) : '';
      if (!isClassCode(code)) return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
      const ref = db.collection('classes').doc(code);
      // Only real classes count, so random codes can't inflate anything.
      const counted = await db.runTransaction(async (tx) => {
        if (!(await tx.get(ref)).exists) return false;
        tx.set(
          ref,
          {
            joinViews: FieldValue.increment(1),
            lastJoinViewAt: new Date().toISOString(),
            ...(referrer && { joinReferrers: { [referrer]: FieldValue.increment(1) } }),
          },
          { merge: true },
        );
        return true;
      });
      if (!counted) return NextResponse.json({ ok: true });
      await db.doc('analytics/teach').set({ steps: { join_view: bump } }, { merge: true });
      return NextResponse.json({ ok: true });
    }

    const doc: Record<string, unknown> = { steps: { [step]: bump } };
    if (step === 'landing_view') {
      if (typeof body.source === 'string' && VISIT_SOURCES.has(body.source)) doc.landingSources = { [body.source]: FieldValue.increment(1) };
      if (referrer) doc.landingReferrers = { [referrer]: FieldValue.increment(1) };
    }
    await db.doc('analytics/teach').set(doc, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking teach step:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
