import type { ButtonHTMLAttributes, ReactNode } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { OptionLetter } from "./OptionLetter";

/**
 * One answer choice, shared by every engine (v1 training and tests, DMV,
 * quizzes, v2 drills and exams) so they all look the same.
 *
 * - idle: not picked, question still open
 * - selected: picked, not yet revealed
 * - correct: the key, revealed
 * - wrong: picked but not the key, revealed
 * - dim: revealed, neither picked nor the key
 */
export type AnswerOptionState = "idle" | "selected" | "correct" | "wrong" | "dim";

const BOX: Record<AnswerOptionState, string> = {
  idle: "border-gray-300 dark:border-gray-700",
  selected: "border-brand bg-brand-light ring-1 ring-brand",
  correct: "border-green-500 bg-green-50 dark:bg-green-950",
  wrong: "border-red-500 bg-red-50 dark:bg-red-950",
  dim: "border-gray-300 dark:border-gray-700 opacity-50",
};

const HOVER = "cursor-pointer active:border-brand active:bg-brand-light [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:bg-brand-light";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  letter: string;
  state: AnswerOptionState;
  children: ReactNode;
  /** Hover and press feedback (off while the question is not ready or once answered). */
  interactive?: boolean;
  /** Replaces the letter inside the badge, e.g. a tick on a picked multi-select choice. */
  badge?: ReactNode;
  /** Screen-reader text for the revealed state ("Correct answer", "Incorrect answer"). */
  srLabel?: string;
}

export function AnswerOption({ letter, state, children, interactive = false, badge, srLabel, className = "", ...button }: Props) {
  return (
    <button
      type="button"
      {...button}
      className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-colors md:p-4 ${BOX[state]} ${interactive && state === "idle" ? HOVER : ""} ${className}`}
    >
      <OptionLetter letter={letter} selected={state === "selected"} correct={state === "correct"}>{badge}</OptionLetter>
      <span className="flex-1 text-[15px] md:text-base">{children}</span>
      {srLabel && <span className="sr-only">{srLabel}</span>}
      {state === "correct" && <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400 md:h-6 md:w-6" />}
      {state === "wrong" && <XCircle aria-hidden className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400 md:h-6 md:w-6" />}
    </button>
  );
}
