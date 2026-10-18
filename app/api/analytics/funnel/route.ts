import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { isInternalEmail } from '@/lib/internal';

// Visitor funnel aggregate (see lib/funnel.ts). One counter per step, total
// and per UTC day; signups are also split by whether the browser practiced
// before signing up.
const STEPS = new Set(['visit', 'answered', 'signup_view', 'signup']);
// Mirrors VISIT_SOURCES in lib/funnel.ts (that module imports the client SDK).
const VISIT_SOURCES = new Set(['chatgpt', 'perplexity', 'gemini', 'copilot', 'claude', 'ai_other', 'search', 'direct', 'other']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const step = typeof body.step === 'string' ? body.step : '';
    if (!STEPS.has(step)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }
    const triedFirst = body.triedFirst === true;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD (UTC)
    const db = getAdminDb();

    // A signup carries the new account's token. Internal accounts (lib/internal) count nowhere.
    let signupUid: string | null = null;
    if (step === 'signup') {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        try {
          const decoded = await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1]);
          if (isInternalEmail(decoded.email)) return NextResponse.json({ ok: true });
          signupUid = decoded.uid;
        } catch {
          // Invalid token: the aggregate still counts, without the per-account stamp.
        }
      }
    }

    const bump = { total: FieldValue.increment(1), daily: { [today]: FieldValue.increment(1) } };
    const steps: Record<string, unknown> = { [step]: bump };
    if (step === 'signup') steps[triedFirst ? 'signup_tried' : 'signup_cold'] = bump;
    if (step === 'visit' && typeof body.source === 'string' && VISIT_SOURCES.has(body.source)) {
      steps[`visit_${body.source}`] = bump;
      // Sub-count of direct: no referrer, landed on a deep page (likely AI apps).
      if (body.source === 'direct' && body.deep === true) steps.visit_direct_deep = bump;
    }

    // Nested-object merge, same pattern as analytics/paywalls.
    await db.doc('analytics/funnel').set({ steps }, { merge: true });

    // Record the account's origin so purchases can be split by it. Kept out of
    // users/{uid}: a stub doc written here before the client's first save
    // would be read back as the account's data.
    if (signupUid) {
      try {
        await db.doc(`signupOrigins/${signupUid}`).create({
          origin: triedFirst ? 'tried' : 'cold',
          at: new Date().toISOString(),
        });
      } catch {
        // Already recorded: the aggregate still counted.
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking funnel step:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
