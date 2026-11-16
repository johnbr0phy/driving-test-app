import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildNewTestsAdmin } from '@/lib/server/newTestsAdmin';

// Data for the /admin New tests tab (lib/server/newTestsAdmin): how each test
// launched in the last 90 days is bringing in new people. Read-only; fresh for
// 5 minutes, then served stale while it rebuilds (lib/server/adminCache).
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'newTests200',
      ttlMs: 5 * 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: async () => buildNewTestsAdmin(getAdminDb(), await getInternalUids()),
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/new-tests]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
