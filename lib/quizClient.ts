import type { User } from "firebase/auth";
import type { QuizPublic } from "@/lib/quizzes";

// Client helpers for the /api/quizzes routes.

/** Fetch a quiz route, with the signed-in account's token when there is one. Throws a readable message. */
export async function quizFetch<T>(user: User | null, path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { ...(init.headers as Record<string, string> | undefined), "Content-Type": "application/json" };
  if (user) headers.Authorization = `Bearer ${await user.getIdToken()}`;
  const res = await fetch(path, { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error ?? "Something went wrong. Try again.") as Error & { status?: number; private?: boolean };
    err.status = res.status;
    err.private = !!data.private;
    throw err;
  }
  return data as T;
}

/** The quiz for the play pages (null when it does not exist; throws when private and not ours). */
export async function loadQuiz(user: User | null, code: string): Promise<QuizPublic | null> {
  try {
    return await quizFetch<QuizPublic>(user, `/api/quizzes/${code}`);
  } catch (e) {
    if ((e as { status?: number }).status === 404) return null;
    throw e;
  }
}
