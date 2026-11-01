import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { isInternalEmail } from '@/lib/internal';
import { regionFromCountry } from '@/lib/region';

// Visitor funnel aggregate (see lib/funnel.ts). One counter per step, total
// and per UTC day; signups are also split by whether the browser practiced
// before signing up.
const STEPS = new Set(['visit', 'answered', 'signup_view', 'dmv_picker', 'dmv_state', 'signup']);
// Mirrors VISIT_SOURCES in lib/funnel.ts (that module imports the client SDK).
const VISIT_SOURCES = new Set(['chatgpt', 'perplexity', 'gemini', 'copilot', 'claude', 'ai_other', 'search', 'friend', 'direct', 'other']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const step = typeof body.step === 'string' ? body.step : '';
    if (!STEPS.has(step)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }
    const triedFirst = body.triedFirst === true;
    // The visitor's country from Vercel's geo header (absent in local dev).
    // First visits are also counted by Tigertest country (visit_region_UK...,
    // visit_region_OTHER for countries with no tests of their own) for the
    // By country card on the /admin Today tab.
    const ipCountry = (request.headers.get('x-vercel-ip-country') || '').toUpperCase().slice(0, 2);
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
    if (step === 'visit' && ipCountry) steps[`visit_region_${regionFromCountry(ipCountry) ?? 'OTHER'}`] = bump;

    // Nested-object merge, same pattern as analytics/paywalls.
    await db.doc('analytics/funnel').set({ steps }, { merge: true });

    // Record the account's origin so purchases can be split by it. Kept out of
    // users/{uid}: a stub doc written here before the client's first save
    // would be read back as the account's data.
    if (signupUid) {
      try {
        // Where this browser's first visit came from, for signups and
        // purchases by source on the /admin Today tab. Absent for browsers
        // whose first visit predates it (or was made signed in).
        const source = typeof body.source === 'string' && VISIT_SOURCES.has(body.source) ? body.source : null;
        const landing = typeof body.landing === 'string' && /^\/[\w\-/.]{0,119}$/.test(body.landing) ? body.landing : null;
        await db.doc(`signupOrigins/${signupUid}`).create({
          origin: triedFirst ? 'tried' : 'cold',
          at: new Date().toISOString(),
          ...(source && { source }),
          ...(landing && { landing }),
          ...(/^[A-Z]{2}$/.test(ipCountry) && { country: ipCountry }),
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
