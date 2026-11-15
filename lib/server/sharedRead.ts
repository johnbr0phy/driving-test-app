// Firestore reads shared by the ~30 country homepages. At build each
// static-generation worker renders many homepages in a row, and each one read
// the same documents again with no time limit; on Nov 15 2026 builds stalled
// there until Vercel killed them. A read is now made once per process per
// `ttlMs` and gives up after `timeoutMs`, so a slow Firestore costs a fallback
// (the page revalidates within the hour), never a build.

const memo = new Map<string, { at: number; value: Promise<unknown> }>();

export function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label}: no answer after ${ms} ms`)), ms);
  });
  return Promise.race([p, timeout]).finally(() => clearTimeout(timer));
}

/** One in-flight or recent read per key; a failed read is not kept. */
export function sharedRead<T>(key: string, read: () => Promise<T>, { ttlMs = 5 * 60_000, timeoutMs = 10_000 } = {}): Promise<T> {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < ttlMs) return hit.value as Promise<T>;
  const value = withTimeout(read(), timeoutMs, key);
  memo.set(key, { at: Date.now(), value });
  value.catch(() => {
    if (memo.get(key)?.value === value) memo.delete(key);
  });
  return value;
}
