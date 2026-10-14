"use client";

import { useId, useLayoutEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { AnswerValue, QuestionV2 } from "@/lib/v2/types";
import { bowtieStarts } from "@/lib/v2/grading";
import { RichText, Slot } from "./RichText";

/**
 * Answer inputs for the formats beyond single, multi and numeric (see
 * data/v2/SCHEMA.md). Each one is phone-first: taps only, no dragging, and
 * every target at least as tall as an option row. With `reveal` they show
 * the key against the student's answer.
 */

interface InputProps {
  question: QuestionV2;
  answer?: AnswerValue;
  onAnswer: (value: AnswerValue) => void;
  reveal: boolean;
  disabled: boolean;
}

const list = (answer?: AnswerValue): number[] => (Array.isArray(answer) ? answer : []);
const filled = (answer: AnswerValue | undefined, n: number): number[] => {
  const cur = list(answer);
  return Array.from({ length: n }, (_, i) => (cur[i] ?? -1));
};

const chipBase = "v2-tap rounded-xl border-2 px-3 py-2.5 text-left text-[15px] md:text-base transition-colors";
const chipIdle = "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 active:bg-brand-light [@media(hover:hover)]:hover:border-brand";
const chipOn = "border-brand bg-brand-light ring-1 ring-brand";
const chipRight = "border-green-500 bg-green-50 dark:bg-green-950";
const chipWrong = "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950";
const chipDim = "border-gray-200 dark:border-gray-800 opacity-60";

/** Order: tap the steps in sequence; tap a placed step to take it back. */
export function OrderInput({ question, optionOrder, answer, onAnswer, reveal, disabled }: InputProps & { optionOrder: number[] }) {
  const container = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<number | null>(null);
  useLayoutEffect(() => {
    if (pendingFocus.current !== null) {
      container.current?.querySelector<HTMLButtonElement>(`[data-step="${pendingFocus.current}"]`)?.focus();
      pendingFocus.current = null;
    }
  }, [answer]);
  const options = question.options ?? [];
  const seq = list(answer);
  const key = question.correct ?? [];
  const remaining = optionOrder.filter((o) => !seq.includes(o));
  const add = (o: number) => { if (disabled || reveal) return; pendingFocus.current = remaining.find(x => x !== o) ?? o; onAnswer([...seq, o]); };
  const remove = (o: number) => { if (disabled || reveal) return; pendingFocus.current = o; onAnswer(seq.filter((x) => x !== o)); };

  return (
    <div ref={container} className="mt-4 space-y-4">
      <div role="status" className="sr-only">{seq.length} of {options.length} steps placed.</div>
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Your order</div>
        <ol className="space-y-2">
          {options.map((_, pos) => {
            const o = seq[pos];
            if (o === undefined) {
              return (
                <li key={pos} className="flex min-h-[3rem] items-center gap-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 px-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 font-bold">{pos + 1}</span>
                  {pos === seq.length && !reveal ? "Tap the next step below" : ""}
                </li>
              );
            }
            const ok = key[pos] === o;
            return (
              <li key={pos}>
                <button data-step={o} aria-label={reveal ? `Step ${pos + 1}: ${options[o]}. ${ok ? "Correct position" : "Incorrect position"}` : `Remove step ${pos + 1}: ${options[o]}`} type="button" disabled={disabled || reveal} onClick={() => remove(o)} className={`flex w-full items-start gap-3 ${chipBase} ${reveal ? (ok ? chipRight : chipWrong) : chipOn}`}>
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{pos + 1}</span>
                  <span className="flex-1 pt-0.5"><RichText text={options[o]} /></span>
                  {reveal && <span className="sr-only">{ok ? "Correct position" : "Incorrect position"}</span>}
                  {reveal && (ok ? <Check className="mt-1 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" /> : <X className="mt-1 h-5 w-5 shrink-0 text-red-500 dark:text-red-400" />)}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      {!reveal && remaining.length > 0 && (
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Steps</div>
          <div className="space-y-2">
            {remaining.map((o) => (
              <button key={o} data-step={o} type="button" disabled={disabled} onClick={() => add(o)} className={`block w-full ${chipBase} ${chipIdle}`}>
                <RichText text={options[o]} />
              </button>
            ))}
          </div>
        </div>
      )}
      {!reveal && seq.length > 0 && <div className="text-xs text-gray-500 dark:text-gray-400">Tap a placed step to take it back.</div>}
      {reveal && (seq.length !== key.length || seq.some((o, i) => key[i] !== o)) && (
        <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 p-3 text-sm">
          <div className="mb-1 font-semibold text-green-800 dark:text-green-300">Correct order</div>
          <ol className="list-decimal space-y-0.5 pl-5 text-gray-800 dark:text-gray-100">
            {key.map((o) => (
              <li key={o}>{options[o]}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/** Matrix: one choice per row, as a row of column buttons (a table that also fits a phone). */
export function MatrixInput({ question, answer, onAnswer, reveal, disabled }: InputProps) {
  const id = useId();
  const rows = question.rows ?? [];
  const cols = question.columns ?? [];
  const cur = filled(answer, rows.length);
  const key = question.correct ?? [];
  const set = (r: number, c: number) => {
    if (disabled || reveal) return;
    const next = [...cur];
    next[r] = c;
    onAnswer(next);
  };
  return (
    <div className="mt-4 space-y-3">
      {rows.map((row, r) => (
        <div key={r} role="group" aria-labelledby={`${id}-${r}`} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 md:flex md:items-center md:gap-4">
          <div className="mb-2 flex items-start gap-2 md:mb-0 md:flex-1">
            <div id={`${id}-${r}`} className="flex-1"><RichText text={row} className="text-[15px] font-medium md:text-base" /></div>
            {reveal && (cur[r] === key[r] ? <Check className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" /> : <X className="h-5 w-5 shrink-0 text-red-500 dark:text-red-400" />)}
          </div>
          <div className={`grid gap-2 md:shrink-0 ${cols.length >= 3 ? "grid-cols-1 sm:grid-cols-3 md:w-[30rem]" : "grid-cols-2 md:w-[20rem]"}`}>
            {cols.map((col, c) => {
              const on = cur[r] === c;
              const cls = reveal ? (key[r] === c ? chipRight : on ? chipWrong : chipDim) : on ? chipOn : chipIdle;
              return (
                <button key={c} type="button" disabled={disabled || reveal} aria-pressed={on} onClick={() => set(r, c)} className={`${chipBase} py-2 text-center text-sm md:text-[15px] ${cls}`}>
                  {col}
                  {reveal && <span className="sr-only">{key[r] === c ? ". Correct answer" : on ? ". Incorrect answer" : ""}</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Bowtie: three groups; on wide screens the condition sits in the middle like the knot. */
export function BowtieInput({ question, answer, onAnswer, reveal, disabled }: InputProps) {
  const id = useId();
  const groups = question.groups ?? [];
  const starts = bowtieStarts(question);
  const cur = list(answer);
  const key = question.correct ?? [];
  const toggle = (gi: number, flat: number) => {
    if (disabled || reveal) return;
    if (cur.includes(flat)) return onAnswer(cur.filter((x) => x !== flat));
    const g = groups[gi];
    const inGroup = cur.filter((x) => x >= starts[gi] && x < starts[gi] + g.options.length);
    // A full group swaps out its earliest pick, so a tap always does something.
    const kept = inGroup.length >= g.pick ? cur.filter((x) => x !== inGroup[0]) : cur;
    onAnswer([...kept, flat].sort((a, b) => a - b));
  };
  const order = [0, 1, 2];
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-3 md:items-center">
      {order.map((gi) => {
        const g = groups[gi];
        if (!g) return null;
        return (
          <div key={gi} role="group" aria-labelledby={`${id}-${gi}`} className={`rounded-xl border-2 p-3 ${gi === 1 ? "border-brand bg-brand-light" : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"} ${gi === 1 ? "md:order-2" : gi === 0 ? "md:order-1" : "md:order-3"}`}>
            <div id={`${id}-${gi}`} className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
              {g.label} <span className="font-normal text-gray-600 dark:text-gray-300">(choose {g.pick})</span>
            </div>
            <div className="space-y-2">
              {g.options.map((opt, oi) => {
                const flat = starts[gi] + oi;
                const on = cur.includes(flat);
                const isKey = key.includes(flat);
                const cls = reveal ? (isKey ? chipRight : on ? chipWrong : chipDim) : on ? chipOn : chipIdle;
                return (
                  <button key={oi} type="button" disabled={disabled || reveal} aria-pressed={on} onClick={() => toggle(gi, flat)} className={`flex w-full items-start gap-2 ${chipBase} py-2 text-sm md:text-[15px] ${cls}`}>
                    <span className="flex-1"><RichText text={opt} /></span>
                    {reveal && <span className="sr-only">{isKey ? "Correct answer" : on ? "Incorrect answer" : ""}</span>}
                    {on && !reveal && <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Slot renderer for highlight markers and cloze blanks inside RichText.
 * Highlight answers are marker indices; cloze answers hold one choice per blank.
 */
export function slotRenderer({ question, answer, onAnswer, reveal, disabled }: InputProps) {
  const key = question.correct ?? [];
  if (question.format === "highlight") {
    const cur = list(answer);
    return function renderMark(slot: Slot) {
      if (slot.kind !== "mark") return null;
      const i = slot.index;
      const on = cur.includes(i);
      const isKey = key.includes(i);
      const cls = reveal
        ? isKey
          ? on
            ? "bg-green-200 dark:bg-green-800 ring-2 ring-green-500"
            : "bg-green-50 dark:bg-green-950 outline-dashed outline-2 outline-green-500"
          : on
            ? "bg-red-100 dark:bg-red-950 ring-2 ring-red-400 line-through"
            : ""
        : on
          ? "bg-yellow-200 dark:bg-yellow-700 ring-2 ring-yellow-500"
          : "underline decoration-dotted decoration-2 underline-offset-4 decoration-gray-400 [@media(hover:hover)]:hover:bg-yellow-50 dark:[@media(hover:hover)]:hover:bg-yellow-950";
      return (
        <button
          type="button"
          disabled={disabled || reveal}
          aria-pressed={on}
          onClick={() => onAnswer(on ? cur.filter((x) => x !== i) : [...cur, i].sort((a, b) => a - b))}
          className={`inline rounded px-0.5 text-left font-[inherit] text-inherit ${cls}`}
        >
          {slot.text}
          {reveal && <span className="sr-only">{isKey ? ". Correct answer" : on ? ". Incorrect answer" : ""}</span>}
        </button>
      );
    };
  }
  if (question.format === "cloze") {
    const blanks = question.blanks ?? [];
    const cur = filled(answer, blanks.length);
    return function renderBlank(slot: Slot) {
      if (slot.kind !== "blank") return null;
      const b = slot.n - 1;
      const choices = blanks[b] ?? [];
      const ok = cur[b] === key[b];
      const cls = reveal ? (ok ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950") : cur[b] >= 0 ? "border-brand bg-brand-light" : "border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900";
      return (
        <span className="inline-block align-baseline">
          <select
            aria-label={`Blank ${slot.n}`}
            disabled={disabled || reveal}
            value={cur[b]}
            onChange={(e) => {
              const next = [...cur];
              next[b] = Number(e.target.value);
              onAnswer(next);
            }}
            className={`mx-0.5 max-w-[16rem] rounded-lg border-2 px-2 py-1 text-[15px] font-semibold text-gray-900 dark:text-gray-50 md:text-base ${cls}`}
          >
            <option value={-1} disabled>
              Select...
            </option>
            {choices.map((c, i) => (
              <option key={i} value={i}>
                {c}
              </option>
            ))}
          </select>
          {reveal && !ok && <span className="ml-1 text-sm font-semibold text-green-700 dark:text-green-300">({choices[key[b]]})</span>}
        </span>
      );
    };
  }
  return undefined;
}
