"use client";

import { useMemo, useState } from "react";
import { Check, X, Eye, EyeOff } from "lucide-react";
import { AnswerValue, QuestionV2, Stimulus } from "@/lib/v2/types";
import { OPTION_LETTERS, isCorrect, parseNumeric } from "@/lib/v2/grading";
import { RichText } from "./RichText";
import { Figure } from "./Figure";

interface Props {
  question: QuestionV2;
  stimulus: Stimulus | null;
  /** Presented option order (indices into question.options). */
  optionOrder: number[];
  answer?: AnswerValue;
  onAnswer: (value: AnswerValue) => void;
  /** Original option indices struck out. */
  eliminated?: number[];
  onToggleEliminate?: (originalIndex: number) => void;
  eliminatorOn?: boolean;
  /** Reveal the key, mark the answer, show the explanation. */
  reveal?: boolean;
  /** Two columns on wide screens (exam mode) or always stacked (drill mode). */
  layout?: "split" | "stack";
  disabled?: boolean;
  /** Shown above the stem, e.g. "Question 4 of 27". */
  label?: string;
}

function wordCount(s: string) {
  return s.trim().split(/\s+/).length;
}

export function QuestionView({ question, stimulus, optionOrder, answer, onAnswer, eliminated = [], onToggleEliminate, eliminatorOn = false, reveal = false, layout = "split", disabled = false, label }: Props) {
  const [passageOpen, setPassageOpen] = useState(true);
  const longPassage = stimulus ? wordCount(stimulus.text) > 180 : false;
  const correct = reveal ? isCorrect(question, answer) : false;
  const numericValue = useMemo(() => (typeof answer === "string" ? parseNumeric(answer) : null), [answer]);

  const selected = (orig: number) => Array.isArray(answer) && answer.includes(orig);

  const pick = (orig: number) => {
    if (disabled) return;
    if (question.format === "multi") {
      const cur = Array.isArray(answer) ? answer : [];
      onAnswer(cur.includes(orig) ? cur.filter((i) => i !== orig) : [...cur, orig].sort((a, b) => a - b));
    } else {
      onAnswer([orig]);
    }
  };

  const optionClass = (orig: number) => {
    const isSel = selected(orig);
    const isKey = question.correct?.includes(orig);
    if (reveal) {
      if (isKey) return "border-green-500 bg-green-50";
      if (isSel && !isKey) return "border-red-400 bg-red-50";
      return "border-gray-200 opacity-60";
    }
    if (isSel) return "border-brand bg-brand-light ring-1 ring-brand";
    return "border-gray-300 bg-white active:bg-brand-light [@media(hover:hover)]:hover:border-brand";
  };

  const stimulusBlock = stimulus && (
    <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
      {stimulus.title && <div className="mb-2 text-sm font-semibold text-gray-600">{stimulus.title}</div>}
      {longPassage && (
        <button type="button" className="v2-tap mb-2 flex w-full items-center justify-between text-sm font-semibold text-brand lg:hidden" onClick={() => setPassageOpen((o) => !o)}>
          {passageOpen ? "Hide passage" : "Show passage"}
          {passageOpen ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
      <div className={longPassage && !passageOpen ? "hidden lg:block" : ""}>
        {stimulus.figure && (
          <div className="mb-3">
            <Figure figure={stimulus.figure} />
          </div>
        )}
        <RichText text={stimulus.text} className="text-[15px] md:text-base" />
      </div>
    </div>
  );

  const questionBlock = (
    <div>
      {label && <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</div>}
      <RichText text={question.stem} className="text-[17px] font-medium md:text-lg" />
      {question.figure && (
        <div className="mt-3">
          <Figure figure={question.figure} />
        </div>
      )}

      {question.format === "numeric" ? (
        <div className="mt-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500" htmlFor={`num-${question.id}`}>
            Your answer
          </label>
          <input
            id={`num-${question.id}`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={disabled}
            value={typeof answer === "string" ? answer : ""}
            onChange={(e) => onAnswer(e.target.value.replace(/[^0-9./-]/g, "").slice(0, 7))}
            placeholder="e.g. 12, 3/4, -0.5"
            className={`v2-tap mt-1 w-full max-w-xs rounded-lg border-2 px-4 text-xl font-semibold tabular-nums outline-none focus:border-brand ${
              reveal ? (correct ? "border-green-500 bg-green-50" : "border-red-400 bg-red-50") : "border-gray-300 bg-white"
            }`}
          />
          <div className="mt-1 text-xs text-gray-500">
            {typeof answer === "string" && answer.trim() !== "" && numericValue === null ? (
              <span className="text-red-600">Enter a number, decimal, or fraction like 3/4.</span>
            ) : (
              "Digits, a decimal point, a slash for fractions, and a leading minus sign."
            )}
          </div>
          {reveal && !correct && question.numeric && (
            <div className="mt-2 text-sm font-semibold text-green-700">Correct answer: {question.numeric.answers[0]}</div>
          )}
        </div>
      ) : (
        <div className="mt-4 space-y-2.5">
          {optionOrder.map((orig, pos) => {
            const struck = eliminated.includes(orig);
            return (
              <div key={orig} className="flex items-stretch gap-2">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => pick(orig)}
                  aria-pressed={selected(orig)}
                  className={`v2-tap flex flex-1 items-start gap-3 rounded-xl border-2 px-3 py-3 text-left transition-colors ${optionClass(orig)} ${struck && !reveal ? "v2-struck" : ""}`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                      selected(orig) && !reveal ? "border-brand bg-brand text-white" : "border-gray-400 text-gray-700"
                    } ${reveal && question.correct?.includes(orig) ? "border-green-600 bg-green-600 text-white" : ""}`}
                  >
                    {question.format === "multi" && selected(orig) ? <Check className="h-4 w-4" /> : OPTION_LETTERS[pos]}
                  </span>
                  <span className="flex-1 pt-0.5">
                    <RichText text={question.options?.[orig] ?? ""} className="text-[15px] md:text-base" />
                  </span>
                  {reveal && question.correct?.includes(orig) && <Check className="mt-1 h-5 w-5 shrink-0 text-green-600" />}
                  {reveal && selected(orig) && !question.correct?.includes(orig) && <X className="mt-1 h-5 w-5 shrink-0 text-red-500" />}
                </button>
                {eliminatorOn && !reveal && onToggleEliminate && (
                  <button
                    type="button"
                    onClick={() => onToggleEliminate(orig)}
                    aria-label={struck ? `Restore choice ${OPTION_LETTERS[pos]}` : `Eliminate choice ${OPTION_LETTERS[pos]}`}
                    className={`v2-tap w-11 shrink-0 rounded-lg border text-xs font-bold ${struck ? "border-gray-400 bg-gray-100 text-gray-600" : "border-gray-300 bg-white text-gray-500"}`}
                  >
                    {struck ? "Undo" : <span className="line-through">{OPTION_LETTERS[pos]}</span>}
                  </button>
                )}
              </div>
            );
          })}
          {question.format === "multi" && !reveal && <div className="text-xs text-gray-500">Select every answer that applies.</div>}
        </div>
      )}

      {reveal && (
        <div className={`v2-pop mt-5 rounded-xl border p-4 ${correct ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
          <div className={`mb-1 text-sm font-bold ${correct ? "text-green-800" : "text-amber-900"}`}>{correct ? "Correct" : "Not quite"}</div>
          <RichText text={question.explanation} className="text-[15px] text-gray-800" />
          {question.skill && <div className="mt-2 text-xs text-gray-500">Skill: {question.skill}</div>}
        </div>
      )}
    </div>
  );

  if (layout === "split" && stimulus) {
    return (
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100dvh-9rem)] lg:overflow-y-auto">{stimulusBlock}</div>
        <div>{questionBlock}</div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {stimulusBlock}
      {questionBlock}
    </div>
  );
}
