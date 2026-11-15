import { getAdminDb } from '@/lib/firebase-admin';
import { getInternalUids } from '@/lib/server/internalUsers';
import { TEST_REQUEST_PICKS } from '@/lib/test-requests';

// "What should we build next?" answers (lib/test-requests), for the Searches
// tab on /admin: counts per category plus every free-text answer, newest
// first. The text is what names an exam to build, next to the searches that
// found nothing. Internal accounts never count.

export interface TestRequestsSummary {
  total: number;
  byPick: { id: string; label: string; clicks: number; withDetails: number }[];
  details: { pick: string; details: string; examId: string | null; source: string; email: string | null; at: string }[];
}

export async function buildTestRequests(): Promise<TestRequestsSummary> {
  const [snap, internalUids] = await Promise.all([getAdminDb().collection('testRequests').get(), getInternalUids()]);
  const counts = new Map<string, { clicks: number; withDetails: number }>();
  const details: TestRequestsSummary['details'] = [];
  let total = 0;
  snap.forEach((doc) => {
    const d = doc.data();
    if (typeof d.uid === 'string' && internalUids.has(d.uid)) return;
    total += 1;
    const pick = typeof d.pick === 'string' ? d.pick : 'other';
    const entry = counts.get(pick) ?? { clicks: 0, withDetails: 0 };
    entry.clicks += 1;
    if (typeof d.details === 'string' && d.details.trim()) {
      entry.withDetails += 1;
      details.push({
        pick,
        details: d.details.trim(),
        examId: typeof d.examId === 'string' ? d.examId : null,
        source: typeof d.source === 'string' ? d.source : 'page',
        email: typeof d.email === 'string' ? d.email : null,
        at: typeof d.updatedAt === 'string' ? d.updatedAt : typeof d.createdAt === 'string' ? d.createdAt : '',
      });
    }
    counts.set(pick, entry);
  });
  return {
    total,
    byPick: TEST_REQUEST_PICKS.map((p) => ({
      id: p.id,
      label: p.label,
      clicks: counts.get(p.id)?.clicks ?? 0,
      withDetails: counts.get(p.id)?.withDetails ?? 0,
    })).sort((a, b) => b.clicks - a.clicks),
    details: details.sort((a, b) => b.at.localeCompare(a.at)).slice(0, 50),
  };
}
