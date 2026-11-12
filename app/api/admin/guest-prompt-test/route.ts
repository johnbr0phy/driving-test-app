import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';

// The sign-up step's message test card on the /admin Conversion tab
// (lib/guestPromptTest.ts): the raw counts per design from analytics/guestPromptTest.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'guest-prompt-test',
      ttlMs: 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: async () => {
        const snap = await getAdminDb().doc('analytics/guestPromptTest').get();
        const d = snap.data() ?? {};
        return { test: d.test ?? null, since: d.since ?? null, variants: d.variants ?? {} };
      },
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/guest-prompt-test]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
