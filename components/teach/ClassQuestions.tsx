"use client";

import { useState } from "react";
import { QuizRow } from "@/components/QuizRow";
import type { ClassQuestionRow } from "@/lib/classes";
import { scoreText } from "@/components/teach/scoreColors";

function pct(correct: number, answered: number): number {
  return answered ? Math.round((correct / answered) * 100) : 0;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/** "Most picked wrong: B" for a row's subtitle, when any wrong pick was recorded. */
export function topWrongPick(picks: number[]): string | null {
  const top = picks.reduce((best, n, i) => (n > (picks[best] ?? 0) ? i : best), 0);
  return picks[top] > 0 ? `Most picked wrong: ${LETTERS[top]}` : null;
}

/** Misses from before wrong picks were recorded, said once under the options. */
export function untrackedNote(picks: number[], missed: number): string | null {
  const untracked = missed - picks.reduce((s, n) => s + n, 0);
  return untracked > 0 ? `${untracked} ${untracked === 1 ? "miss" : "misses"} from before we recorded which answer was picked.` : null;
}

// Every question the class answered, as the /stats rows: tap one to see the
// options with the right answer marked, the wrong ones the class picked (with
// counts), the class's counts and the explanation.
const QUESTIONS_SHOWN = 10;

export function ClassQuestions({ questions }: { questions: ClassQuestionRow[] }) {
  const [sort, setSort] = useState<"missed" | "accuracy">("missed");
  const [showAll, setShowAll] = useState(false);
  const sorted = [...questions].sort((a, b) =>
    sort === "missed"
      ? b.missed - a.missed || a.answered - b.answered
      : pct(a.answered - a.missed, a.answered) - pct(b.answered - b.missed, b.answered) || b.answered - a.answered,
  );
  const shown = showAll ? sorted : sorted.slice(0, QUESTIONS_SHOWN);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <h2 className="font-semibold text-gray-900 dark:text-gray-50 mr-2">Questions</h2>
        {([["missed", "Most missed"], ["accuracy", "Lowest accuracy"]] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setSort(key)}
            aria-pressed={sort === key}
            className={`text-sm px-3 py-1 rounded-full border ${
              sort === key
                ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{questions.length} answered by your class</span>
      </div>
      <div className="space-y-2">
        {shown.map((q) => {
          const accuracy = pct(q.answered - q.missed, q.answered);
          const chip =
            sort === "missed"
              ? { value: `${q.missed}`, label: "missed", color: q.missed > 0 ? scoreText("low") : "text-gray-500 dark:text-gray-400" }
              : { value: `${accuracy}%`, label: "right", color: scoreText(accuracy >= 70 ? "good" : accuracy >= 50 ? "near" : "low") };
          return (
            <QuizRow
              key={q.questionId}
              chipValue={chip.value}
              chipLabel={chip.label}
              chipColorClass={chip.color}
              question={q.question}
              subtitle={[q.topic, topWrongPick(q.picks)].filter(Boolean).join(" · ")}
              options={q.options}
              correctAnswer={q.answer}
              revealAnswer
              optionPicks={q.picks}
              renderFooter={() => (
                <div className="pt-1 px-1 space-y-1.5">
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>Answered: <span className="font-semibold text-gray-700 dark:text-gray-200">{q.answered}</span></span>
                    <span>Right: <span className={`font-semibold ${scoreText("good")}`}>{q.answered - q.missed}</span></span>
                    <span>Missed: <span className={`font-semibold ${scoreText("low")}`}>{q.missed}</span></span>
                  </div>
                  {untrackedNote(q.picks, q.missed) && <p className="text-xs text-gray-500 dark:text-gray-400">{untrackedNote(q.picks, q.missed)}</p>}
                  {q.explanation && <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{q.explanation}</p>}
                </div>
              )}
            />
          );
        })}
      </div>
      {sorted.length > QUESTIONS_SHOWN && (
        <button type="button" onClick={() => setShowAll((s) => !s)} className="mt-3 text-sm underline text-gray-700 dark:text-gray-200">
          {showAll ? "Show fewer" : `Show all ${sorted.length}`}
        </button>
      )}
    </div>
  );
}
