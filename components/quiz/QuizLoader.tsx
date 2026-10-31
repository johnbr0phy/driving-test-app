"use client";

// Shared by every /q/<code> play page: load the quiz for the signed-in
// account (or a guest) and render the loading, missing, private and
// class-only states the same way everywhere.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { loadQuiz, type QuizFetchError } from "@/lib/quizClient";
import { joinQuizClass } from "@/lib/classProgress";
import { autoJoinClassQuiz } from "@/lib/quizProgress";
import { isQuizCode, type QuizClassLocked, type QuizPublic } from "@/lib/quizzes";

export type QuizLoadStatus = "loading" | "ready" | "missing" | "private" | "class" | "error";

export interface QuizLoadState {
  quiz: QuizPublic | null;
  status: QuizLoadStatus;
  error?: string;
  /** status "class": who the quiz is for. */
  locked?: QuizClassLocked;
  /** Fetch again (after joining the class). */
  reload?: () => void;
  /** Set once a class student was joined to the quiz under this name. */
  joinedAs?: string | null;
}

/** The quiz behind a play page, fetched once auth has settled. */
export function useQuiz(code: string, initial: QuizPublic | null = null): QuizLoadState {
  const { user, loading } = useAuth();
  const uid = user?.uid ?? null;
  const [state, setState] = useState<QuizLoadState>(initial ? { quiz: initial, status: "ready" } : { quiz: null, status: "loading" });
  const [attempt, setAttempt] = useState(0);
  // Bumped when a class student is joined to the quiz automatically, so pages re-read their membership.
  const [joinedAs, setJoinedAs] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!isQuizCode(code)) {
      setState({ quiz: null, status: "missing" });
      return;
    }
    // A server-rendered quiz is already on screen; only an account needs the
    // fresh copy, which says whether the quiz is theirs.
    if (initial && !uid && !attempt) return;
    let alive = true;
    loadQuiz(user, code)
      .then((quiz) => {
        if (!alive) return;
        setState(quiz ? { quiz, status: "ready" } : { quiz: null, status: "missing" });
        if (quiz) void autoJoinClassQuiz(quiz).then((m) => m && alive && setJoinedAs(m.name));
      })
      .catch((e: QuizFetchError) => {
        if (!alive) return;
        if (initial) return; // keep what the server gave us
        if (e.classLocked) return setState({ quiz: null, status: "class", locked: e.classLocked });
        setState({ quiz: null, status: e.private ? "private" : "error", error: e.message });
      });
    return () => {
      alive = false;
    };
  }, [code, uid, loading, attempt]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, joinedAs, reload: () => setAttempt((n) => n + 1) };
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
  if (state.status === "class" && state.locked) {
    return <ClassQuizGate code={code} locked={state.locked} onJoined={() => state.reload?.()} />;
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

/**
 * A class-only quiz opened by someone not (yet) in the class: who it is for,
 * and the class code and name a student types to join (the class code is
 * never shown here; the teacher gives it out).
 */
function ClassQuizGate({ code, locked, onJoined }: { code: string; locked: QuizClassLocked; onJoined: () => void }) {
  const [classCode, setClassCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const join = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (!classCode.trim()) return setError("Enter the class code your teacher gave you");
    if (!name.trim()) return setError("Enter your name");
    setBusy(true);
    try {
      await joinQuizClass(code, classCode, name);
      onJoined();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't join. Try again.");
      setBusy(false);
    }
  };

  return (
    <div className={shell}>
      <div className={card}>
        <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Users className="w-5 h-5 text-gray-700 dark:text-gray-200" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-1 break-words">{locked.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
          This quiz is for {locked.teacherName}&apos;s class. Enter the class code from your teacher and your name to start. No account needed.
        </p>
        <form onSubmit={join} className="space-y-3" noValidate>
          <div>
            <label htmlFor="quiz-class-code" className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1.5">Class code</label>
            <Input
              id="quiz-class-code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5))}
              placeholder="K7QF2"
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              className="font-mono tracking-widest uppercase"
            />
          </div>
          <div>
            <label htmlFor="quiz-class-name" className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1.5">Your name <span className="font-normal text-gray-500 dark:text-gray-400">(as your teacher knows you)</span></label>
            <Input
              id="quiz-class-name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 40))}
              placeholder="Barney B."
              autoComplete="name"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <Button type="submit" disabled={busy} className="w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
            {busy ? "Joining..." : "Join and start"}
          </Button>
        </form>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Made this quiz?{" "}
          <Link href={`/login?redirect=${encodeURIComponent(`/q/${code}`)}`} className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
