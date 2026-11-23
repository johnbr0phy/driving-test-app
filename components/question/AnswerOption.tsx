import type { ButtonHTMLAttributes, ReactNode } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

/**
 * One answer choice in v1's training look (TrainingCard), shared so v2 draws
 * the same thing. v1 is the reference: change the look in TrainingCard's
 * terms, never the other way round.
 *
 * - idle: not picked, question open (`interactive` adds hover and press)
 * - selected: picked, not yet revealed (v2 multi-select and exams)
 * - correct / wrong: revealed key / revealed wrong pick
 * - dim: revealed, neither
 */
export type AnswerOptionState = "idle" | "selected" | "correct" | "wrong" | "dim";

const BOX: Record<AnswerOptionState, string> = {
  idle: "border-gray-300 dark:border-gray-700",
  selected: "border-brand bg-brand-light ring-1 ring-brand",
  correct: "border-green-500 bg-green-50 dark:bg-green-950",
  wrong: "border-red-500 bg-red-50 dark:bg-red-950",
  dim: "border-gray-300 dark:border-gray-700 opacity-50",
};

const HOVER = " [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:bg-brand-light active:border-brand active:bg-brand-light cursor-pointer";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  letter: string;
  state: AnswerOptionState;
  children: ReactNode;
  interactive?: boolean;
  /** Screen-reader text for the revealed state. */
  srLabel?: string;
}

export function AnswerOption({ letter, state, children, interactive = false, srLabel, className = "", ...button }: Props) {
  return (
    <button
      type="button"
      {...button}
      className={`w-full text-left border-2 rounded-lg p-3 md:p-4 transition-all ${BOX[state]}${interactive && state === "idle" ? HOVER : ""}${className ? ` ${className}` : ""}`}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <span className="font-bold text-base md:text-lg w-6 shrink-0">{letter})</span>
        <span className="flex-1 text-sm md:text-base">{children}</span>
        {srLabel && <span className="sr-only">{srLabel}</span>}
        {state === "correct" && <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400 flex-shrink-0" />}
        {state === "wrong" && <XCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600 dark:text-red-400 flex-shrink-0" />}
      </div>
    </button>
  );
}
