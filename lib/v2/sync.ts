import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EMPTY_V2, V2Data, useV2Store } from "@/store/useV2Store";
import { mergeV2, withoutExamV2 } from "./merge";

export { mergeV2 } from "./merge";

/**
 * Firestore mirror for the v2 store. Everything lives in one `v2` field on
 * users/{uid}, written with updateDoc so the field is replaced as a whole
 * (deleted sessions really go away) and v1 fields are never touched.
 */

/** Firestore rejects undefined values; JSON drops them. */
function clean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/** Keep the newest results so the document stays far below Firestore's 1 MB cap. */
const MAX_RESULTS = 40;

export async function loadV2(uid: string): Promise<V2Data | null> {
  const snap = await getDoc(doc(db, "users", uid));
  const v2 = snap.exists() ? (snap.data().v2 as Partial<V2Data> | undefined) : undefined;
  if (!v2) return null;
  return { ...EMPTY_V2, ...v2 };
}

export async function saveV2(uid: string, data: V2Data): Promise<void> {
  const payload = clean({
    ...data,
    results: [...data.results].sort((a, b) => b.completedAt.localeCompare(a.completedAt)).slice(0, MAX_RESULTS),
    updatedAt: new Date().toISOString(),
  });
  const ref = doc(db, "users", uid);
  try {
    await updateDoc(ref, { v2: payload });
  } catch {
    // updateDoc needs the document to exist; a brand-new account may not have one yet.
    await setDoc(ref, { v2: payload }, { merge: true });
  }
}

/**
 * Delete one exam's v2 progress from this device and the account. V2Sync only
 * runs on v2 pages and merges as a union, so a local-only delete made anywhere
 * else would come back on the next v2 page; this removes it on both sides.
 */
export async function deleteV2Exam(uid: string, examId: string): Promise<void> {
  const state = useV2Store.getState();
  const local: V2Data = state.syncedUid && state.syncedUid !== uid ? EMPTY_V2 : state;
  const remote = await loadV2(uid);
  const merged = withoutExamV2(remote ? mergeV2(local, remote) : local, examId);
  const { sessions, results, drills, goals } = merged;
  useV2Store.getState().replaceData({ sessions, results, drills, goals }, uid);
  await saveV2(uid, { sessions, results, drills, goals });
}
