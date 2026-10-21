import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildOpportunities } from '@/lib/server/opportunities';
import { getStripe } from '@/lib/stripe';
import { latestBrief } from '@/lib/server/dailyBrief';

// Data for the /admin Today tab (lib/server/opportunities). Read-only; the
// payload is kept in lib/server/adminCache for five minutes because each
// rebuild lists Stripe checkouts, and an older copy is served at once while
// a rebuild runs after the response.
export const maxDuration = 60;

async function build() {
  let stripe = null;
  try {
    stripe = getStripe();
  } catch {
    // Not configured: the page shows Firestore data and says Stripe is missing.
  }
  return buildOpportunities(getAdminDb(), stripe, await getInternalUids());
}

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    // The daily update is read fresh every time, so a new one shows at once.
    const [brief, { payload, cache, at }] = await Promise.all([
      latestBrief(getAdminDb()).catch(() => null),
      cachedAdminPayload({
        key: 'opportunities',
        ttlMs: 5 * 60_000,
        staleMs: 24 * 3_600_000,
        refresh: wantsRefresh(request),
        build,
      }),
    ]);
    return cachedJson({ ...payload, brief }, cache, at);
  } catch (error) {
    console.error('[admin/opportunities]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
