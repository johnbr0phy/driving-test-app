import type { ReactNode } from "react";

/** The Correct / Incorrect box under an answered question, in v1's training look (TrainingCard). */
export function AnswerFeedback({ correct, title, children, className = "" }: { correct: boolean; title: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div
      className={`p-3 md:p-4 rounded-lg ${
        correct ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"
      }${className ? ` ${className}` : ""}`}
    >
      <div
        className={`font-bold mb-1 md:mb-2 text-sm md:text-base ${
          correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
        }`}
      >
        {title}
      </div>
      <div className="text-gray-700 dark:text-gray-200 text-sm md:text-base">{children}</div>
    </div>
  );
}
