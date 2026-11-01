"use client";

// The /quizzes library list: public quizzes from the server, searched
// client-side by title, topic and maker.

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import { quizPath, type QuizSummary } from "@/lib/quizzes";

export function QuizLibrary({ quizzes }: { quizzes: QuizSummary[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = useMemo(() => {
    const list = q ? quizzes.filter((z) => `${z.title} ${z.description} ${z.topics.join(" ")} ${z.ownerName}`.toLowerCase().includes(q)) : quizzes;
    // The API already puts featured quizzes first; keep that order whatever the server sent.
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [quizzes, q]);

  if (quizzes.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 text-center">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">Nothing here yet</p>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          A quiz is listed as soon as its maker sets it to Public. Make one, set it to Public, and it will show up here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-5">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, topic or maker"
          aria-label="Search quizzes"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pl-9 pr-3 py-3 text-base md:text-sm text-gray-900 dark:text-gray-50 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {q ? `${shown.length} ${shown.length === 1 ? "quiz matches" : "quizzes match"}` : ""}
      </p>
      {shown.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">No quiz matches &quot;{query}&quot;.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {shown.map((z) => (
            <li key={z.code}>
              <Link
                href={quizPath(z.code)}
                className="block h-full rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 hover:border-gray-400 dark:hover:border-gray-600"
              >
                {z.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    <Star className="w-3 h-3" aria-hidden="true" /> Editor&apos;s pick
                  </span>
                )}
                <p className="font-semibold text-gray-900 dark:text-gray-50 break-words">{z.title}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  by {z.ownerName} · {z.questionCount} {z.questionCount === 1 ? "question" : "questions"} · {z.plays} {z.plays === 1 ? "play" : "plays"}
                </p>
                {z.description && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{z.description}</p>}
                {z.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {z.topics.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-700 dark:text-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                    {z.topics.length > 6 && <span className="text-xs text-gray-500 dark:text-gray-400">+{z.topics.length - 6}</span>}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
