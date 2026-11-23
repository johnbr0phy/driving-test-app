import type { ReactNode } from "react";

/** The "Correct" / "Incorrect" box under an answered question, shared by every engine. */
export function AnswerFeedback({ correct, title, children, className = "" }: { correct: boolean; title: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border p-3 md:p-4 ${correct ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"} ${className}`}>
      <div className={`mb-1 text-sm font-bold md:text-base ${correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>{title}</div>
      <div className="text-[15px] text-gray-800 dark:text-gray-100 md:text-base">{children}</div>
    </div>
  );
}
