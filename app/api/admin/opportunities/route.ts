import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildOpportunities, type OpportunitiesPayload } from '@/lib/server/opportunities';
import { getStripe } from '@/lib/stripe';

// Data for /admin/opportunities (lib/server/opportunities). Read-only; cached
// in memory for five minutes because each miss lists Stripe checkouts.
export const maxDuration = 60;

const CACHE_TTL_MS = 5 * 60_000;
let cached: { payload: OpportunitiesPayload; at: number } | null = null;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let email: string | undefined;
  try {
    email = (await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1])).email;
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const refresh = request.nextUrl.searchParams.get('refresh') === 'true';
    if (!refresh && cached && Date.now() - cached.at < CACHE_TTL_MS) {
      return NextResponse.json(cached.payload, { headers: { 'Cache-Control': 'no-store', 'X-Cache': 'HIT' } });
    }
    let stripe = null;
    try {
      stripe = getStripe();
    } catch {
      // Not configured: the page shows Firestore data and says Stripe is missing.
    }
    const payload = await buildOpportunities(getAdminDb(), stripe, await getInternalUids());
    cached = { payload, at: Date.now() };
    return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store', 'X-Cache': 'MISS' } });
  } catch (error) {
    console.error('[admin/opportunities]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
