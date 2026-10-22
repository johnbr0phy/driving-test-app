"use client";

// "Recently played": the quizzes this browser opened, from useQuizStore's
// `recent`. Needs no account, so it works for signed-out visitors too.

import { useEffect, useState } from "react";
import Link from "next/link";
import { quizPath } from "@/lib/quizzes";
import { useQuizStore } from "@/store/useQuizStore";

export function RecentQuizzes({ limit = 8 }: { limit?: number }) {
  const recent = useQuizStore((s) => s.recent);
  // The store rehydrates from localStorage after mount; render nothing until then so SSR and the first client paint agree.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  if (!hydrated || recent.length === 0) return null;

  return (
    <section aria-labelledby="recent-quizzes-heading">
      <h2 id="recent-quizzes-heading" className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-3">
        Recently played
      </h2>
      <ul className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
        {recent.slice(0, limit).map((r) => (
          <li key={r.code}>
            <Link href={quizPath(r.code)} className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="block font-semibold text-gray-900 dark:text-gray-50 break-words">{r.title}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                by {r.ownerName} · {r.questionCount} {r.questionCount === 1 ? "question" : "questions"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
