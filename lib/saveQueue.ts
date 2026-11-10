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
}

export function createSaveQueue<T>(write: (snapshot: T) => Promise<void>): SaveQueue<T> {
  let chain: Promise<void> = Promise.resolve();
  let queued = false;
  let pending: T | null = null;

  return {
    push(snapshot) {
      pending = snapshot;
      if (!queued) {
        queued = true;
        chain = chain.then(async () => {
          queued = false;
          const next = pending;
          pending = null;
          if (next === null) return;
          try {
            await write(next);
          } catch (error) {
            // A failed save must not stop the ones after it.
            console.error("Save failed:", error);
          }
        });
      }
      return chain;
    },
    idle: () => chain,
  };
}
