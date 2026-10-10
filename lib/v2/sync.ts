import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EMPTY_V2, V2Data } from "@/store/useV2Store";

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
