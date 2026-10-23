"use client";

// "Your quizzes" on /teach, under the teacher's classes: the account's own
// quizzes, each linking to its report, or an empty state when there are none
// yet. The page fetches them with the classes so this section loads with it.

import Link from "next/link";
import { ChevronRight, FileText, Plus, Sparkles } from "lucide-react";
import { quizAudienceLabel, quizPath, type QuizSummary } from "@/lib/quizzes";

export function TeachQuizzes({ quizzes }: { quizzes: QuizSummary[] }) {
  return (
    <section aria-labelledby="teach-quizzes-heading" className="mt-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 id="teach-quizzes-heading" className="text-xl font-bold text-gray-900 dark:text-gray-50">
          Your quizzes
        </h2>
        <Link
          href="/create"
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50 hover:border-gray-900 dark:hover:border-gray-50 px-4 py-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" aria-hidden="true" /> Create a quiz
        </Link>
      </div>
      {quizzes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 px-6 py-8 text-center">
          <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5 text-brand-dark" aria-hidden="true" />
          </div>
          <p className="font-semibold text-gray-900 dark:text-gray-50 mt-3">No quizzes yet</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-md mx-auto">
            Turn your notes, a study guide or a Quizlet set into a practice quiz and share it with just one of your classes. You see who played and what
            they missed, like a class.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {quizzes.map((q) => (
            <li key={q.code}>
              <Link
                href={`${quizPath(q.code)}/report`}
                className="flex items-center gap-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-5 py-4 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-50 truncate">{q.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {q.questionCount} {q.questionCount === 1 ? "question" : "questions"} · {quizAudienceLabel(q)}
                  </p>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 flex-shrink-0">
                  {q.memberCount} {q.memberCount === 1 ? "player" : "players"}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
