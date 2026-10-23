import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EMPTY_CODE_PROGRESS, EMPTY_QUIZ_DATA, type QuizCodeProgress, type QuizData } from "@/store/useQuizStore";

// Firestore mirror for the quiz store, in one `quizProgress` field on
// users/{uid}, written whole with updateDoc so v1 and v2 fields are untouched
// (same pattern as lib/v2/sync.ts).

function clean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

const MAX_CODES = 100;

export async function loadQuizData(uid: string): Promise<QuizData | null> {
  const snap = await getDoc(doc(db, "users", uid));
  const data = snap.exists() ? (snap.data().quizProgress as Partial<QuizData> | undefined) : undefined;
  if (!data) return null;
  return { ...EMPTY_QUIZ_DATA, ...data };
}

export async function saveQuizData(uid: string, data: QuizData): Promise<void> {
  // Keep the most recently played quizzes so the document stays small.
  const codes = Object.entries(data.progress)
    .sort((a, b) => (b[1].lastPlayedAt ?? "").localeCompare(a[1].lastPlayedAt ?? ""))
    .slice(0, MAX_CODES);
  const payload = clean({ progress: Object.fromEntries(codes), recent: data.recent, updatedAt: new Date().toISOString() });
  const ref = doc(db, "users", uid);
  try {
    await updateDoc(ref, { quizProgress: payload });
  } catch {
    await setDoc(ref, { quizProgress: payload }, { merge: true });
  }
}

function union<T>(a: T[], b: T[]): T[] {
  return [...new Set([...a, ...b])];
}

function mergeCode(local: QuizCodeProgress, remote: QuizCodeProgress): QuizCodeProgress {
  const masteredIds = union(local.masteredIds, remote.masteredIds);
  const byTime = new Map<string, { q: string; ok: boolean; t: string }>();
  for (const a of [...remote.answers, ...local.answers]) byTime.set(`${a.t}|${a.q}`, a);
  const answers = [...byTime.values()].sort((a, b) => a.t.localeCompare(b.t)).slice(-600);
  const tests = new Map(remote.tests.map((t) => [t.at, t]));
  for (const t of local.tests) tests.set(t.at, t);
  const newerLocal = (local.lastPlayedAt ?? "") >= (remote.lastPlayedAt ?? "");
  return {
    masteredIds,
    wrongQueue: union(local.wrongQueue, remote.wrongQueue).filter((id) => !masteredIds.includes(id)),
    answers,
    tests: [...tests.values()].sort((a, b) => a.at.localeCompare(b.at)).slice(-30),
    known: union(local.known, remote.known),
    // The more recent device's in-progress test wins.
    ...((newerLocal ? local.current : remote.current) ? { current: newerLocal ? local.current : remote.current } : {}),
    lastPlayedAt: newerLocal ? local.lastPlayedAt : remote.lastPlayedAt,
  };
}

/** Pure: guest data on this browser merged into the account's copy. */
export function mergeQuizData(local: QuizData, remote: QuizData): QuizData {
  const codes = union(Object.keys(local.progress), Object.keys(remote.progress));
  const progress = Object.fromEntries(
    codes.map((code) => [code, mergeCode(local.progress[code] ?? EMPTY_CODE_PROGRESS, remote.progress[code] ?? EMPTY_CODE_PROGRESS)]),
  );
  const recent = new Map<string, QuizData["recent"][number]>();
  for (const r of [...remote.recent, ...local.recent]) {
    const prev = recent.get(r.code);
    if (!prev || prev.at < r.at) recent.set(r.code, r);
  }
  return { progress, recent: [...recent.values()].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 50) };
}
