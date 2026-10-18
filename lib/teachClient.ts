import type { User } from "firebase/auth";

/** Fetch an /api/classes route as the signed-in teacher. Throws a readable message. */
export async function teachFetch<T>(user: User, path: string, init: RequestInit = {}): Promise<T> {
  const token = await user.getIdToken();
  const res = await fetch(path, {
    ...init,
    headers: { ...(init.headers ?? {}), "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong. Try again.");
  return data as T;
}

export function classLink(code: string): string {
  const origin = typeof window === "undefined" ? "https://tigertest.io" : window.location.origin;
  return `${origin.replace(/^https?:\/\/(www\.)?/, "")}/c/${code}`;
}

export function classUrl(code: string): string {
  const origin = typeof window === "undefined" ? "https://tigertest.io" : window.location.origin;
  return `${origin}/c/${code}`;
}
