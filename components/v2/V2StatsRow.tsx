"use client";

// The v2 twin of components/QuizRow for the stats page: the same collapsed
// strip (stat chip, question, chevron) that unfolds into the question, here
// the full QuestionView so every v2 format (multi, numeric, matrix, cloze,
// passages, KaTeX) can be re-answered. A single-choice tap checks at once;
// other formats wait for Check. Practice here never changes progress.

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { AnswerValue, QuestionV2 } from "@/lib/v2/types";
import { getStimulus } from "@/lib/v2/bank";
import { isComplete, isCorrect } from "@/lib/v2/grading";
import { QuestionView } from "./QuestionView";
import type { StatsChip } from "@/components/stats/StatsParts";

export function V2StatsRow({ examId, question, chip, subtitle, footer, onAnswer }: {
  examId: string;
  question: QuestionV2;
  chip: StatsChip;
  subtitle?: ReactNode;
  footer?: ReactNode;
  onAnswer?: (correct: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [answer, setAnswer] = useState<AnswerValue | undefined>(undefined);
  const [revealed, setRevealed] = useState(false);
  const order = (question.options ?? []).map((_, k) => k);

  const check = (value: AnswerValue | undefined) => {
    if (revealed || !isComplete(question, value)) return;
    setRevealed(true);
    onAnswer?.(isCorrect(question, value));
  };

  const toggle = () => setExpanded((e) => !e);

  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-3 hover:shadow-md transition-shadow">
      <div
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="flex items-center gap-4 cursor-pointer"
        aria-expanded={expanded}
      >
        <div className="shrink-0 text-center min-w-[3rem]">
          <div className={`text-base font-bold tabular-nums leading-none ${chip.color}`}>{chip.value}</div>
          <div className="text-[9px] uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-0.5 whitespace-nowrap">{chip.label}</div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-snug font-medium text-gray-900 dark:text-gray-50 line-clamp-2">{plainStem(question)}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
        />
      </div>

      {expanded && (
        <div className="pt-3 animate-in fade-in duration-300">
          <QuestionView
            question={question}
            stimulus={getStimulus(examId, question)}
            optionOrder={order}
            answer={answer}
            onAnswer={(value) => {
              if (revealed) return;
              setAnswer(value);
              if (question.format === "single") check(value);
            }}
            reveal={revealed}
            layout="stack"
          />
          {question.format !== "single" && !revealed && (
            <button
              type="button"
              onClick={() => check(answer)}
              disabled={!isComplete(question, answer)}
              className="v2-tap mt-3 w-full rounded-xl bg-brand text-sm font-bold text-white disabled:opacity-40"
            >
              Check
            </button>
          )}
          {revealed && (
            <button
              type="button"
              onClick={() => {
                setAnswer(undefined);
                setRevealed(false);
              }}
              className="mt-2 text-xs font-semibold text-brand-dark hover:underline"
            >
              Try it again
            </button>
          )}
        </div>
      )}

      {footer && <div className="pt-1 px-1">{footer}</div>}
    </div>
  );
}

/** A one-line preview (its own passage when it has one, since stems like "Which choice completes the text" repeat), markup, KaTeX dollars and slots stripped. */
export function plainStem(q: QuestionV2): string {
  return (q.passage || q.stem || "")
    .replace(/\{\{([^}]*)\}\}/g, "$1")
    .replace(/\[\[\d+\]\]/g, "___")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*\*?([^*]+)\*\*?/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
