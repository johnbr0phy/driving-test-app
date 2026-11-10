// One save at a time, in order, newest state last.
//
// Every answer saves the account, and each save is a transaction carrying the
// whole document. Fired side by side they could commit out of order and leave
// an older copy as the stored one. Here a save asked for while another is
// running waits for it, and several asked for in that time become one save of
// the latest snapshot: nothing newer is ever overwritten by something older.

export interface SaveQueue<T> {
  /** Ask for `snapshot` to be saved. Resolves once a save that includes it has finished. */
  push(snapshot: T): Promise<void>;
  /** Resolves once every save asked for so far has finished. */
  idle(): Promise<void>;
  /** Start the waiting save now, without waiting for the one in flight: for
   *  when the page is about to go away and there may be no "after". */
  kick(): void;
}

// A write that has not settled after this long no longer holds the queue. It
// may still finish; the next save simply stops waiting for it, which is what
// every save did before there was a queue. Then, and after kick(), two writes
// can be in flight at once: the writer itself must refuse to land an older
// snapshot over a newer one (the store numbers its snapshots for this).
export const SAVE_STALL_MS = 20_000;

export function createSaveQueue<T>(write: (snapshot: T) => Promise<void>, stallMs: number = SAVE_STALL_MS): SaveQueue<T> {
  let chain: Promise<void> = Promise.resolve();
  let queued = false;
  let pending: { snapshot: T } | null = null;

  // Starts the write now (not a tick later: the page may be closing). Never
  // rejects, and never waits longer than stallMs.
  const run = (snapshot: T): Promise<void> => {
    let started: Promise<void>;
    try {
      started = Promise.resolve(write(snapshot));
    } catch (error) {
      started = Promise.reject(error);
    }
    const done = started.catch((error) => {
      // A failed save must not stop the ones after it.
      console.error("Save failed:", error);
    });
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stalled = new Promise<void>((resolve) => {
      timer = setTimeout(resolve, stallMs);
    });
    return Promise.race([done, stalled]).finally(() => clearTimeout(timer));
  };

  return {
    push(snapshot) {
      pending = { snapshot };
      if (!queued) {
        queued = true;
        chain = chain.then(async () => {
          queued = false;
          const next = pending;
          pending = null;
          if (next) await run(next.snapshot);
        });
      }
      return chain;
    },
    idle: () => chain,
    kick() {
      const next = pending;
      pending = null;
      if (!next) return;
      const kicked = run(next.snapshot);
      // Anyone waiting on the queue waits for this write too.
      chain = Promise.all([chain, kicked]).then(() => undefined);
    },
  };
}
