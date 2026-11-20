import type { Firestore } from "firebase-admin/firestore";
import { lastRunFields, mergeSent, runRecord, RUNS_COLLECTION, SENT_COLLECTION, SENT_DOC } from "@/lib/indexNowSent.mjs";

// Writes one IndexNow submission to Firestore in the shape lib/indexNowSent.mjs
// describes (the deploy script writes the same). Pages are only marked sent
// when Bing accepted the list; a failed submission is still logged as a run.

type SentMap = Record<string, { first: string; last: string; n: number }>;

export async function recordIndexNowRun(
  db: Firestore,
  r: { source: string; urls: string[]; status: number; ok: boolean; days?: number | null; sha?: string | null },
): Promise<void> {
  const at = new Date().toISOString();
  const sentRef = db.collection(SENT_COLLECTION).doc(SENT_DOC);
  if (r.ok && r.urls.length) {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(sentRef);
      const existing = (snap.get("urls") ?? {}) as SentMap;
      tx.set(sentRef, { urls: mergeSent(existing, r.urls, at), updatedAt: at }, { merge: true });
    });
  }
  const run = runRecord({ ...r, at });
  await db.collection(RUNS_COLLECTION).add(run);
  await sentRef.set(lastRunFields(r.source, run), { merge: true });
}

/** The stored per-page send log (indexNow/sent urls), empty when none. */
export async function readSentMap(db: Firestore): Promise<SentMap> {
  const snap = await db.collection(SENT_COLLECTION).doc(SENT_DOC).get();
  return (snap.get("urls") ?? {}) as SentMap;
}
