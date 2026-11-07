import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { searchAllTests, searchIntentKey } from '@/lib/testSearch';
import { isRegion } from '@/lib/region';

// Admin read of test searches (the Searches tab on /admin), built to stay
// readable as searchQueries grows (thousands of one-off queries a year):
//
// - Every way of typing one search is one group (searchIntentKey: "cna exam"
//   and "CNA practice test" are both "cna"), counted over the last 7 days,
//   30 days and all time from each query's `daily` map.
// - "Found nothing" is checked again against today's search, not the result
//   logged at the time: once a test is built or an alias added, its misses
//   move to "Found now" on their own and leave the build list.
// - A group can be marked Planned or Ignored (searchTriage/{sha1 of key}),
//   so typos and junk are dealt with once and the list only holds what is new.
//
// Reads are bounded: queries active in the last 90 days plus the 300 most
// searched of all time. Cached 2 minutes (lib/server/adminCache); triage is
// read fresh on every call so a button press shows at once.

const WINDOW_DAYS = 90;
const TOP_ALL_TIME = 300;
const MAX_GROUPS = 400;
const RECENT = 100;

type Status = 'planned' | 'ignored';

interface Row {
  q: string;
  count: number;
  d7: number;
  d30: number;
  lastResults: number;
  lastAt: string;
  picks: Record<string, number>;
  byRegion: Record<string, number>;
}

interface Group {
  key: string;
  /** The variant typed most, shown as the group's name. */
  q: string;
  variants: { q: string; count: number }[];
  count: number;
  d7: number;
  d30: number;
  lastAt: string;
  picks: Record<string, number>;
  byRegion: Record<string, number>;
  /** Every variant's last logged search found nothing and nobody opened a test from it. */
  missedThen: boolean;
  /** Today's search finds a test for the main variant. */
  foundNow: boolean;
  /** What today's search shows first, when it finds something. */
  topHit: string | null;
}

interface Payload {
  totals: { total: number; misses: number; picks: number };
  daily: { day: string; total: number; misses: number; picks: number }[];
  groups: Group[];
  recent: Row[];
}

const days = (n: number) => Array.from({ length: n }, (_, i) => new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10));
const addInto = (into: Record<string, number>, from: Record<string, number>) => {
  for (const [k, v] of Object.entries(from)) into[k] = (into[k] ?? 0) + v;
};
const triageId = (key: string) => createHash('sha1').update(key).digest('hex').slice(0, 20);

async function build(): Promise<Payload> {
  const db = getAdminDb();
  const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000).toISOString();
  const [totals, active, top] = await Promise.all([
    db.doc('analytics/search').get(),
    db.collection('searchQueries').where('lastAt', '>=', since).get(),
    db.collection('searchQueries').orderBy('count', 'desc').limit(TOP_ALL_TIME).get(),
  ]);
  const last7 = days(7);
  const last30 = days(30);
  const byQ = new Map<string, Row>();
  for (const d of [...active.docs, ...top.docs]) {
    const v = d.data();
    const q = String(v.q ?? '');
    if (!q || byQ.has(q)) continue;
    const daily = (v.daily ?? {}) as Record<string, number>;
    byQ.set(q, {
      q,
      count: v.count ?? 0,
      d7: last7.reduce((s, day) => s + (daily[day] ?? 0), 0),
      d30: last30.reduce((s, day) => s + (daily[day] ?? 0), 0),
      lastResults: v.lastResults ?? 0,
      lastAt: v.lastAt ?? '',
      picks: v.picks ?? {},
      byRegion: v.byRegion ?? {},
    });
  }

  // Before Nov 2 2026 every pause while typing was logged, so one search left
  // "written clin", "written clinical", "written clinical exam co"... Drop a
  // row nobody opened a test from when a longer query that starts with it was
  // logged within a few minutes of it: that was the same search, still typing.
  const PREFIX_WINDOW_MS = 5 * 60_000;
  const rows = [...byQ.values()];
  const byStart = new Map<string, Row[]>();
  for (const r of rows) {
    const k = r.q.slice(0, 2);
    const list = byStart.get(k);
    if (list) list.push(r);
    else byStart.set(k, [r]);
  }
  const partial = new Set<string>();
  for (const r of rows) {
    if (Object.keys(r.picks).length > 0) continue;
    const t = Date.parse(r.lastAt);
    const continued = (byStart.get(r.q.slice(0, 2)) ?? []).some(
      (o) => o.q.length > r.q.length && o.q.startsWith(r.q) && Math.abs(Date.parse(o.lastAt) - t) < PREFIX_WINDOW_MS,
    );
    if (continued) partial.add(r.q);
  }
  const kept = rows.filter((r) => !partial.has(r.q));

  const groups = new Map<string, { group: Group; rows: Row[] }>();
  for (const r of kept) {
    const key = searchIntentKey(r.q) || r.q;
    let entry = groups.get(key);
    if (!entry) {
      entry = {
        group: { key, q: r.q, variants: [], count: 0, d7: 0, d30: 0, lastAt: '', picks: {}, byRegion: {}, missedThen: true, foundNow: false, topHit: null },
        rows: [],
      };
      groups.set(key, entry);
    }
    const g = entry.group;
    entry.rows.push(r);
    g.count += r.count;
    g.d7 += r.d7;
    g.d30 += r.d30;
    if (r.lastAt > g.lastAt) g.lastAt = r.lastAt;
    addInto(g.picks, r.picks);
    addInto(g.byRegion, r.byRegion);
    if (r.lastResults > 0 || Object.keys(r.picks).length > 0) g.missedThen = false;
  }

  const out: Group[] = [];
  for (const { group: g, rows: list } of groups.values()) {
    list.sort((a, b) => b.count - a.count || b.lastAt.localeCompare(a.lastAt));
    g.q = list[0].q;
    g.variants = list.map((r) => ({ q: r.q, count: r.count }));
    const region = Object.entries(g.byRegion).sort((a, b) => b[1] - a[1])[0]?.[0];
    const res = searchAllTests(g.q, isRegion(region) ? region : 'US');
    g.foundNow = res.hits.length > 0 && !res.partial;
    g.topHit = res.hits[0]?.title ?? null;
    out.push(g);
  }
  out.sort((a, b) => b.d30 - a.d30 || b.count - a.count || b.lastAt.localeCompare(a.lastAt));

  const t = totals.data() ?? {};
  const daily = (t.daily ?? {}) as Record<string, { total?: number; misses?: number; picks?: number }>;
  return {
    totals: { total: t.total ?? 0, misses: t.misses ?? 0, picks: t.picks ?? 0 },
    daily: [...last30]
      .reverse()
      .map((day) => ({ day, total: daily[day]?.total ?? 0, misses: daily[day]?.misses ?? 0, picks: daily[day]?.picks ?? 0 })),
    groups: out.slice(0, MAX_GROUPS),
    recent: kept.sort((a, b) => b.lastAt.localeCompare(a.lastAt)).slice(0, RECENT),
  };
}

async function readTriage(): Promise<Record<string, Status>> {
  const snap = await getAdminDb().collection('searchTriage').get();
  const out: Record<string, Status> = {};
  for (const d of snap.docs) {
    const v = d.data();
    if (typeof v.key === 'string' && (v.status === 'planned' || v.status === 'ignored')) out[v.key] = v.status;
  }
  return out;
}

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const [triage, { payload, cache, at }] = await Promise.all([
      readTriage(),
      cachedAdminPayload({ key: 'searches', ttlMs: 2 * 60_000, staleMs: 24 * 3_600_000, refresh: wantsRefresh(request), build }),
    ]);
    return cachedJson({ ...payload, triage, builtAt: new Date(at).toISOString() }, cache, at);
  } catch (error) {
    console.error('[admin/searches]', error);
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
  }
}

// Mark a search group Planned or Ignored, or clear it ({ key, status: null }).
export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = await request.json().catch(() => ({}));
  const key = typeof body.key === 'string' ? body.key.slice(0, 120) : '';
  const status: Status | null = body.status === 'planned' || body.status === 'ignored' ? body.status : null;
  if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 });
  const ref = getAdminDb().doc(`searchTriage/${triageId(key)}`);
  if (status) await ref.set({ key, status, at: new Date().toISOString() });
  else await ref.delete();
  return NextResponse.json({ ok: true });
}
