"use client";

// Shared by every /q/<code> play page: load the quiz for the signed-in
// account (or a guest) and render the loading, missing and private states
// the same way everywhere.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { loadQuiz } from "@/lib/quizClient";
import { isQuizCode, type QuizPublic } from "@/lib/quizzes";

export type QuizLoadStatus = "loading" | "ready" | "missing" | "private" | "error";

export interface QuizLoadState {
  quiz: QuizPublic | null;
  status: QuizLoadStatus;
  error?: string;
}

/** The quiz behind a play page, fetched once auth has settled. */
export function useQuiz(code: string, initial: QuizPublic | null = null): QuizLoadState {
  const { user, loading } = useAuth();
  const uid = user?.uid ?? null;
  const [state, setState] = useState<QuizLoadState>(initial ? { quiz: initial, status: "ready" } : { quiz: null, status: "loading" });

  useEffect(() => {
    if (loading) return;
    if (!isQuizCode(code)) {
      setState({ quiz: null, status: "missing" });
      return;
    }
    // A server-rendered quiz is already on screen; only an account needs the
    // fresh copy, which says whether the quiz is theirs.
    if (initial && !uid) return;
    let alive = true;
    loadQuiz(user, code)
      .then((quiz) => {
        if (!alive) return;
        setState(quiz ? { quiz, status: "ready" } : { quiz: null, status: "missing" });
      })
      .catch((e: Error & { private?: boolean }) => {
        if (!alive) return;
        if (initial) return; // keep what the server gave us
        setState({ quiz: null, status: e.private ? "private" : "error", error: e.message });
      });
    return () => {
      alive = false;
    };
  }, [code, uid, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}

const shell = "flex-1 bg-gray-50 dark:bg-gray-950 px-4 py-12";
const card = "mx-auto w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6";

/** What a play page shows until the quiz is ready: a loading line, or why it cannot be shown. */
export function QuizStates({ code, state }: { code: string; state: QuizLoadState }) {
  if (state.status === "loading") {
    return (
      <div className={shell}>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Loading the quiz...</p>
      </div>
    );
  }
  if (state.status === "private") {
    return (
      <div className={shell}>
        <div className={card}>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">This quiz is private</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Only the person who made it can open it. If that is you, sign in.</p>
          <Link
            href={`/login?redirect=${encodeURIComponent(`/q/${code}`)}`}
            className="inline-flex items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-4 py-2 text-sm font-semibold"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div className={shell}>
        <div className={card}>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">Couldn&apos;t load this quiz</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{state.error ?? "Something went wrong. Try again."}</p>
          <Link href={`/q/${code}`} className="text-sm underline text-gray-900 dark:text-gray-50">Try again</Link>
        </div>
      </div>
    );
  }
  return (
    <div className={shell}>
      <div className={card}>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">No quiz with code {code}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Check the link with whoever shared it. The code is the 6 letters and numbers after /q/.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/quizzes" className="underline text-gray-900 dark:text-gray-50">Browse quizzes</Link>
          <Link href="/create" className="underline text-gray-900 dark:text-gray-50">Make your own</Link>
        </div>
      </div>
    </div>
  );
}
