import type { User } from "firebase/auth";
import { CLASS_PROOF_HEADER, type QuizClassLocked, type QuizPublic } from "@/lib/quizzes";
import { classProofHeader } from "@/lib/classProgress";

// Client helpers for the /api/quizzes routes.

export type QuizFetchError = Error & { status?: number; private?: boolean; classLocked?: QuizClassLocked; reason?: string };

/** Fetch a quiz route, with the signed-in account's token when there is one. Throws a readable message. */
export async function quizFetch<T>(user: User | null, path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { ...(init.headers as Record<string, string> | undefined), "Content-Type": "application/json" };
  if (user) headers.Authorization = `Bearer ${await user.getIdToken()}`;
  const res = await fetch(path, { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error ?? "Something went wrong. Try again.") as QuizFetchError;
    err.status = res.status;
    err.private = !!data.private;
    if (data.classOnly) err.classLocked = data as QuizClassLocked;
    if (data.reason) err.reason = data.reason;
    throw err;
  }
  return data as T;
}

/**
 * The quiz for the play pages (null when it does not exist; throws when
 * private and not ours, or class-only and this browser is not in the class).
 */
export async function loadQuiz(user: User | null, code: string): Promise<QuizPublic | null> {
  const proof = typeof window === "undefined" ? "" : classProofHeader();
  try {
    return await quizFetch<QuizPublic>(user, `/api/quizzes/${code}`, proof ? { headers: { [CLASS_PROOF_HEADER]: proof } } : {});
  } catch (e) {
    if ((e as { status?: number }).status === 404) return null;
    throw e;
  }
}
