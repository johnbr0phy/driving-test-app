import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { gunzipSync, gzipSync } from 'node:zlib';
import { getAdminDb } from '@/lib/firebase-admin';

// The /admin tabs are built from full collection scans and Stripe listings,
// which take seconds. Each route used to keep its last payload in memory,
// but a serverless instance keeps nothing between cold starts, so most opens
// of the page rebuilt everything. This keeps the last payload in Firestore
// too (adminCache/{key}, gzipped JSON) and serves it at once:
//
//   HIT    younger than ttlMs, served as is
//   STALE  older than ttlMs but younger than staleMs: served as is, and a
//          rebuild runs after the response (next/server after()); the client
//          (useAdminFetch) polls until it lands, so the numbers go live
//          without a spinner
//   MISS   nothing usable, or ?refresh=true: built before answering
//
// Keys are one per route; every admin shares the same payload.

export type CacheState = 'HIT' | 'STALE' | 'MISS';

interface Entry<T> {
  payload: T;
  at: number;
}

interface Options<T> {
  key: string;
  /** Served without a rebuild while younger than this. */
  ttlMs: number;
  /** Served while a rebuild runs after the response, up to this age. */
  staleMs: number;
  refresh: boolean;
  build: () => Promise<T>;
}

const COLLECTION = 'adminCache';
// Firestore documents top out at 1 MiB; leave room for the metadata.
const MAX_STORED_BYTES = 950_000;

const memory = new Map<string, Entry<unknown>>();
const inFlight = new Map<string, Promise<Entry<unknown>>>();

async function readStore<T>(key: string): Promise<Entry<T> | null> {
  const snap = await getAdminDb().collection(COLLECTION).doc(key).get();
  const at = snap.get('at');
  const gz = snap.get('gz');
  if (typeof at !== 'number' || !gz) return null;
  const bytes = Buffer.isBuffer(gz) ? gz : Buffer.from(gz as Uint8Array);
  return { payload: JSON.parse(gunzipSync(bytes).toString('utf8')) as T, at };
}

async function writeStore(key: string, entry: Entry<unknown>): Promise<void> {
  const gz = gzipSync(Buffer.from(JSON.stringify(entry.payload), 'utf8'));
  if (gz.byteLength > MAX_STORED_BYTES) {
    console.warn(`[adminCache] ${key}: ${gz.byteLength} bytes gzipped, too big to store; serving from memory only`);
    return;
  }
  await getAdminDb().collection(COLLECTION).doc(key).set({ at: entry.at, gz, bytes: gz.byteLength });
}

// One rebuild per key per instance: a STALE hit and a Refresh click in the
// same second share the same scan.
function rebuild<T>(key: string, build: () => Promise<T>): Promise<Entry<T>> {
  const running = inFlight.get(key) as Promise<Entry<T>> | undefined;
  if (running) return running;
  const job = (async () => {
    const payload = await build();
    const entry: Entry<T> = { payload, at: Date.now() };
    memory.set(key, entry);
    try {
      await writeStore(key, entry);
    } catch (error) {
      console.error(`[adminCache] ${key}: could not store`, error);
    }
    return entry;
  })();
  inFlight.set(key, job as Promise<Entry<unknown>>);
  job.finally(() => inFlight.delete(key)).catch(() => {});
  return job;
}

function revalidateLater<T>(key: string, build: () => Promise<T>): void {
  const run = () => rebuild(key, build).catch((error) => console.error(`[adminCache] ${key}: rebuild failed`, error));
  try {
    after(run);
  } catch {
    // Outside a request scope (a script): nothing keeps the process alive
    // for us, so just start it.
    void run();
  }
}

export async function cachedAdminPayload<T>(opts: Options<T>): Promise<{ payload: T; cache: CacheState; at: number }> {
  const { key, ttlMs, staleMs, refresh, build } = opts;
  if (!refresh) {
    const now = Date.now();
    const inMemory = memory.get(key) as Entry<T> | undefined;
    let entry = inMemory && now - inMemory.at < ttlMs ? inMemory : null;
    if (!entry) {
      let stored: Entry<T> | null = null;
      try {
        stored = await readStore<T>(key);
      } catch (error) {
        console.error(`[adminCache] ${key}: could not read`, error);
      }
      // Whichever copy is newer; memory still wins when Firestore is behind.
      entry = stored && (!inMemory || stored.at > inMemory.at) ? stored : inMemory ?? null;
      if (entry) memory.set(key, entry);
    }
    if (entry) {
      const age = now - entry.at;
      if (age < ttlMs) return { payload: entry.payload, cache: 'HIT', at: entry.at };
      if (age < staleMs) {
        revalidateLater(key, build);
        return { payload: entry.payload, cache: 'STALE', at: entry.at };
      }
    }
  }
  const built = await rebuild(key, build);
  return { payload: built.payload, cache: 'MISS', at: built.at };
}

/** `?refresh=true` on an admin route: skip every cache and rebuild now. */
export function wantsRefresh(request: NextRequest): boolean {
  return request.nextUrl.searchParams.get('refresh') === 'true';
}

/** The JSON response every cached admin route sends, with the cache state in X-Cache. */
export function cachedJson(body: unknown, cache: CacheState, at: number): NextResponse {
  return NextResponse.json(body, {
    headers: {
      // Never let the browser keep a payload: its shape changes with each
      // deploy, and Refresh must mean refresh. The server cache does the saving.
      'Cache-Control': 'no-store',
      'X-Cache': cache,
      'X-Cache-Age': String(Math.round((Date.now() - at) / 1000)),
    },
  });
}
