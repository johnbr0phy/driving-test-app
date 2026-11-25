import type { NextRequest } from 'next/server';
import { getAdminAuth } from '@/lib/firebase-admin';
import { BROWSER_ID_RE } from '@/lib/server/weeklyActiveLearners';
import { tigerDay } from '@/lib/dailyRank';
import { personIdForBrowser, personIdForUid } from '@/lib/server/dailyRank';

/** Who is asking, and the Tiger Time day, for the /api/rank routes. */
export type RankCaller = {
  uid: string | null;
  browserId: string | null;
  personId: string | null;
  day: string;
};

export async function rankCaller(request: NextRequest, body: { browserId?: unknown } = {}): Promise<RankCaller> {
  const params = request.nextUrl.searchParams;
  // Tiger Time: one day for everyone, Eastern time (lib/dailyRank.ts).
  const day = tigerDay();

  const bRaw = typeof body.browserId === 'string' ? body.browserId : params.get('b');
  const browserId = bRaw && BROWSER_ID_RE.test(bRaw) ? bRaw : null;

  let uid: string | null = null;
  const header = request.headers.get('authorization');
  if (header?.startsWith('Bearer ')) {
    try {
      const decoded = await getAdminAuth().verifyIdToken(header.slice(7));
      uid = decoded.uid;
    } catch {
      uid = null;
    }
  }
  const personId = uid ? personIdForUid(uid) : browserId ? personIdForBrowser(browserId) : null;
  return { uid, browserId, personId, day };
}
