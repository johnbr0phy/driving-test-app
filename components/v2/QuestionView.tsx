"use client";

import { useMemo, useState, useId, useRef, useEffect } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { AnswerOption, type AnswerOptionState } from "@/components/question/AnswerOption";
import { AnswerFeedback } from "@/components/question/AnswerFeedback";
import { AnswerValue, QuestionV2, Stimulus } from "@/lib/v2/types";
import { OPTION_LETTERS, isCorrect, parseNumeric, relabelChoices } from "@/lib/v2/grading";
import { RichText } from "./RichText";
import { BowtieInput, MatrixInput, OrderInput, slotRenderer } from "./FormatInputs";
import { Figure } from "./Figure";
import { useV2Ui } from "@/lib/v2/ui";

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
  focusOnChange?: boolean;
}

export function QuestionView({ question, stimulus, optionOrder, answer, onAnswer, eliminated = [], onToggleEliminate, eliminatorOn = false, reveal = false, layout = "split", disabled = false, label, focusOnChange = false }: Props) {
  const id = useId();
  const t = useV2Ui().runner;
  const stem = useRef<HTMLDivElement>(null);
  useEffect(() => { if (focusOnChange) stem.current?.focus({ preventScroll: true }); }, [question.id, focusOnChange]);
  const [passageOpen, setPassageOpen] = useState(true);
  const correct = reveal ? isCorrect(question, answer) : false;
  const wholeNumber = !!question.numeric?.wholeNumber;
  const numericValue = useMemo(() => (typeof answer === "string" ? parseNumeric(answer) : null), [answer]);

  const selected = (orig: number) => Array.isArray(answer) && answer.includes(orig);
  const atCap = question.format === "multi" && !!question.select && Array.isArray(answer) && answer.length >= question.select;
  const inputProps = { question, answer, onAnswer, reveal, disabled };
  const renderSlot = slotRenderer(inputProps, t);

  const pick = (orig: number) => {
    if (disabled || reveal) return;
    if (question.format === "multi") {
      const cur = Array.isArray(answer) ? answer : [];
      if (!cur.includes(orig) && atCap) return;
      onAnswer(cur.includes(orig) ? cur.filter((i) => i !== orig) : [...cur, orig].sort((a, b) => a - b));
    } else {
      onAnswer([orig]);
    }
  };

  const stateOf = (orig: number): AnswerOptionState => {
    const isKey = !!question.correct?.includes(orig);
    if (reveal) return isKey ? "correct" : selected(orig) ? "wrong" : "dim";
    return selected(orig) ? "selected" : "idle";
  };

  const stimulusBlock = stimulus && (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-5">
      <div className={`flex items-start justify-between gap-3 ${passageOpen ? "mb-2" : ""}`}>
        <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{stimulus.title || t.passage}</div>
        <button
          type="button"
          className="v2-tap -m-2 shrink-0 rounded-md p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand"
          onClick={() => setPassageOpen((o) => !o)}
          aria-label={passageOpen ? t.hidePassage : t.showPassage}
          aria-expanded={passageOpen}
          aria-controls={`${id}-passage`}
          title={passageOpen ? t.hidePassage : t.showPassage}
        >
          {passageOpen ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {passageOpen && (
        <div id={`${id}-passage`}>
          {stimulus.figure && (
            <div className="mb-3">
              <Figure figure={stimulus.figure} />
            </div>
          )}
          <RichText text={stimulus.text} className="text-[15px] md:text-base" renderSlot={renderSlot} />
        </div>
      )}
    </div>
  );

  const questionBlock = (
    <div>
      {label && <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</div>}
      <div id={`${id}-stem`} ref={stem} tabIndex={-1}><RichText text={question.stem} className="text-[17px] font-medium md:text-lg" renderSlot={renderSlot} /></div>
      {question.figure && (
        <div className="mt-3">
          <Figure figure={question.figure} />
        </div>
      )}

      {question.format === "order" ? (
        <OrderInput {...inputProps} optionOrder={optionOrder} />
      ) : question.format === "matrix" ? (
        <MatrixInput {...inputProps} />
      ) : question.format === "bowtie" ? (
        <BowtieInput {...inputProps} />
      ) : question.format === "highlight" || question.format === "cloze" ? (
        !reveal && (
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {question.format === "highlight" ? t.highlightHint : t.clozeHint}
          </div>
        )
      ) : question.format === "numeric" ? (
        <div className="mt-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400" htmlFor={`num-${question.id}`}>
            {t.yourAnswer}
          </label>
          <input
            id={`num-${question.id}`}
            aria-describedby={`${id}-numeric-help`}
            aria-invalid={typeof answer === "string" && answer.trim() !== "" && numericValue === null}
            type="text"
            inputMode={wholeNumber ? "numeric" : "decimal"}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={disabled || reveal}
            value={typeof answer === "string" ? answer : ""}
            onChange={(e) => onAnswer(e.target.value.replace(wholeNumber ? /[^0-9]/g : /[^0-9./-]/g, "").slice(0, 7))}
            placeholder={wholeNumber ? t.numericPlaceholderWhole : t.numericPlaceholder}
            className={`v2-tap mt-1 w-full max-w-xs rounded-lg border-2 px-4 text-xl font-semibold tabular-nums outline-none focus:border-brand ${
              reveal ? (correct ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950") : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            }`}
          />
          <div id={`${id}-numeric-help`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {typeof answer === "string" && answer.trim() !== "" && numericValue === null ? (
              <span className="text-red-600 dark:text-red-400">{t.numericInvalid}</span>
            ) : wholeNumber ? null : (
              t.numericHelp
            )}
          </div>
          {reveal && !correct && question.numeric && (
            <div className="mt-2 text-sm font-semibold text-green-700 dark:text-green-300">{t.correctAnswerIs(question.numeric.answers[0])}</div>
          )}
        </div>
      ) : (
        <div role="group" aria-labelledby={`${id}-stem`} className="mt-4 space-y-2.5">
          {optionOrder.map((orig, pos) => {
            const struck = eliminated.includes(orig);
            return (
              <div key={orig} className="flex items-stretch gap-2">
                <AnswerOption
                  letter={OPTION_LETTERS[pos]}
                  state={stateOf(orig)}
                  interactive={!disabled && !reveal}
                  disabled={disabled || reveal}
                  onClick={() => pick(orig)}
                  aria-pressed={selected(orig)}
                  aria-disabled={disabled || reveal || (atCap && !selected(orig))}
                  className={`v2-tap flex-1 ${struck && !reveal ? "v2-struck" : ""}`}
                  badge={question.format === "multi" && selected(orig) && !reveal ? <><span className="sr-only">{OPTION_LETTERS[pos]}</span><Check className="h-4 w-4" /></> : undefined}
                  srLabel={struck && !reveal ? t.srEliminated : reveal ? (question.correct?.includes(orig) ? `${t.srCorrectAnswer}. ` : selected(orig) ? `${t.srIncorrectAnswer}. ` : undefined) : undefined}
                >
                  <RichText text={question.options?.[orig] ?? ""} />
                </AnswerOption>
                {eliminatorOn && !reveal && onToggleEliminate && (
                  <button
                    type="button"
                    onClick={() => onToggleEliminate(orig)}
                    aria-label={struck ? t.restoreChoice(OPTION_LETTERS[pos]) : t.eliminateChoice(OPTION_LETTERS[pos])}
                    className={`v2-tap w-11 shrink-0 rounded-lg border text-xs font-bold ${struck ? "border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300" : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400"}`}
                  >
                    {struck ? t.undo : <span className="line-through">{OPTION_LETTERS[pos]}</span>}
                  </button>
                )}
              </div>
            );
          })}
          {question.format === "multi" && !reveal && (
            <div role="status" className={`text-xs ${atCap ? "font-semibold text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"}`}>
              {question.select ? (atCap ? t.selectedCap(question.select) : t.selectN(question.select)) : t.selectAll}
            </div>
          )}
        </div>
      )}

      <div role="status" aria-atomic="true" className="sr-only">{reveal ? (correct ? t.srCorrect : t.srNotQuite) + relabelChoices(question.explanation, optionOrder) : ""}</div>
      {reveal && (
        <AnswerFeedback className="v2-pop mt-5" correct={correct} title={correct ? t.correct : t.notQuite}>
          <RichText text={relabelChoices(question.explanation, optionOrder)} />
        </AnswerFeedback>
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
