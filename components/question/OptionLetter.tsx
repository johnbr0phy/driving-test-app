import type { ReactNode } from "react";

/** Circled answer letter used by AnswerOption. */
export function OptionLetter({ letter, selected = false, correct = false, children }: { letter: string; selected?: boolean; correct?: boolean; children?: ReactNode }) {
  const tone = correct
    ? "border-green-600 bg-green-600 text-white"
    : selected
      ? "border-brand bg-brand text-white"
      : "border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200";
  return (
    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${tone}`}>
      {children ?? letter}
    </span>
  );
}
