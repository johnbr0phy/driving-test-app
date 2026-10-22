"use client";

// "Your quizzes" on /create: the signed-in account's quizzes from
// GET /api/quizzes, each with Play, Edit and Who played, plus the plan line.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { quizFetch } from "@/lib/quizClient";
import { QUIZ_LIMITS, quizPath, type QuizSummary, type QuizVisibility } from "@/lib/quizzes";

const VISIBILITY_LABEL: Record<QuizVisibility, string> = { private: "Private", link: "Link", public: "Public" };

interface MyQuizzesResponse {
  quizzes: QuizSummary[];
  limits: { quizzes: number; questions: number; generationsPerDay: number };
  isPremium: boolean;
}

export function MyQuizzes({ refreshKey = 0 }: { refreshKey?: number }) {
  const { user } = useAuth();
  const [data, setData] = useState<MyQuizzesResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    quizFetch<MyQuizzesResponse>(user, "/api/quizzes")
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Couldn't load your quizzes.");
      });
    return () => {
      cancelled = true;
    };
  }, [user, refreshKey]);

  if (!user) return null;

  const quizzes = data?.quizzes ?? [];
  const limit = data?.limits.quizzes ?? QUIZ_LIMITS.free.quizzes;
  const isPremium = data?.isPremium ?? false;
  const atLimit = quizzes.length >= limit;

  return (
    <section aria-labelledby="my-quizzes-heading">
      <h2 id="my-quizzes-heading" className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-3">
        Your quizzes
      </h2>
      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400 mb-3">
          {error}
        </p>
      )}
      {data && quizzes.length === 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-300 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
          Nothing yet. Your first quiz shows up here with its link, its plays and who played it.
        </p>
      )}
      {quizzes.length > 0 && (
        <ul className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
          {quizzes.map((q) => (
            <li key={q.code} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={quizPath(q.code)} className="font-semibold text-gray-900 dark:text-gray-50 hover:underline break-words">
                    {q.title}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {q.questionCount} {q.questionCount === 1 ? "question" : "questions"} · {VISIBILITY_LABEL[q.visibility]} · {q.plays}{" "}
                    {q.plays === 1 ? "play" : "plays"} · {q.memberCount} {q.memberCount === 1 ? "player" : "players"}
                    {q.reports > 0 && (
                      <>
                        {" "}
                        · <span className="text-amber-700 dark:text-amber-300">{q.reports} {q.reports === 1 ? "report" : "reports"}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <Link href={quizPath(q.code)} className="underline text-gray-700 dark:text-gray-200">
                  Play
                </Link>
                <Link href={`${quizPath(q.code)}/edit`} className="underline text-gray-700 dark:text-gray-200">
                  Edit
                </Link>
                <Link href={`${quizPath(q.code)}/report`} className="underline text-gray-700 dark:text-gray-200">
                  Who played
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      {data && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {quizzes.length} of {limit} {isPremium ? "" : "free "}
          {limit === 1 ? "quiz" : "quizzes"} used.
          {!isPremium && atLimit && (
            <>
              {" "}
              <Link href="/upgrade" className="underline font-medium text-gray-900 dark:text-gray-50">
                Get Premium
              </Link>{" "}
              for up to {QUIZ_LIMITS.premium.quizzes}.
            </>
          )}
        </p>
      )}
    </section>
  );
}
