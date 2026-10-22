import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildTeachAdmin } from '@/lib/server/teachAdmin';

// Data for the /admin Teachers tab (lib/server/teachAdmin). Read-only. A
// teacher's first students should show soon, so the payload is fresh for
// only a minute; an older copy is served at once while a rebuild runs after
// the response (lib/server/adminCache).
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'teach',
      ttlMs: 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: async () => buildTeachAdmin(getAdminDb(), await getInternalUids()),
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/teach]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
