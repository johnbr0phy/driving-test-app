"use client";

import { AccessibleOverlay } from "@/components/AccessibleOverlay";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BookOpen, X } from "lucide-react";
import { ExamV2Config } from "@/lib/v2/types";
import { BasicsSkill, WalkthroughStep, basicsOptionOrder } from "@/lib/v2/basics";
import { DataTable, Passage } from "./BasicsRuleCard";
import { getTigerAsset } from "@/lib/tigerAssets";
import { useSound } from "@/hooks/useSound";

/**
 * The click-through tutorial for one Basics skill: the board (an
 * expression, a passage, a table) stays pinned on top, and the student
 * works through one step at a time underneath. Most steps are a tiny
 * question with two or three options, so the student supplies each piece
 * of the solution instead of watching it; the pieces collect in a work
 * column under the board. A wrong tap shows a hint and lets them tap
 * again, with no score kept. No sound, no clock: it goes at their pace.
 */
export function BasicsWalkthrough({ exam, skill, doneLabel, onDone, onClose, onRead }: {
  exam: ExamV2Config;
  skill: BasicsSkill;
  /** The button on the last step: "Got it, try 2 questions", "Try it again"... */
  doneLabel: string;
  onDone: () => void;
  onClose: () => void;
  /** "Read it" in the header, when the text card is the alternative. */
  onRead?: () => void;
}) {
  const walk = skill.walkthrough!;
  const steps = walk.steps;
  const { playCorrectSound, playIncorrectSound } = useSound();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number[]>([]);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const stepRef = useRef<HTMLParagraphElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIndex(0);
    setPicked(null);
    setWrong([]);
  }, [skill.id]);

  // The control that had focus goes away (Next on a new ask step, the options
  // once solved), so hand focus on: to the new step, then to Next.
  useEffect(() => {
    if (index > 0 && steps[index]?.ask) stepRef.current?.focus({ preventScroll: true });
  }, [index, steps]);
  useEffect(() => {
    if (picked !== null) nextRef.current?.focus({ preventScroll: true });
  }, [picked]);

  // Keep the current step in view as the work column grows.
  useEffect(() => {
    cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [index, picked]);

  const step = steps[index];
  const isAsk = !!step.ask;
  const solved = !isAsk || (picked !== null && picked === step.answer);
  const last = index === steps.length - 1;
  const lastLineAt = steps.reduce((at, s, i) => (s.line ? i : at), -1);
  const doneLines = steps.slice(0, index + (solved ? 1 : 0)).map((s, i) => ({ line: s.line, i })).filter((x): x is { line: string; i: number } => !!x.line);
  const order = isAsk ? basicsOptionOrder(skill.id, 100 + index, step.options!.length) : [];

  const pick = (i: number) => {
    if (!isAsk || solved || wrong.includes(i)) return;
    if (i === step.answer) {
      setPicked(i);
      playCorrectSound();
    } else {
      setWrong((w) => [...w, i]);
      playIncorrectSound();
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(40);
    }
  };

  const next = () => {
    if (!solved) return;
    if (last) {
      onDone();
      return;
    }
    setIndex(index + 1);
    setPicked(null);
    setWrong([]);
  };

  const face = !isAsk ? 3 : solved ? 1 : wrong.length ? 5 : 4;

  return (
    <AccessibleOverlay onClose={onClose} className="fixed inset-0 z-[95] flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50" aria-label={`${skill.name} walkthrough`}>
      <div className="v2-safe-top shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pb-2">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onClose} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label="Close the walkthrough">
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold">{skill.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Walk through it · step {index + 1} of {steps.length}</div>
          </div>
          {onRead && (
            <button type="button" onClick={onRead} className="flex items-center gap-1.5 rounded-full border-2 border-gray-200 dark:border-gray-800 px-3 py-1.5 text-sm font-semibold text-brand-dark">
              <BookOpen className="h-4 w-4" /> Read it
            </button>
          )}
        </div>
        <div className="mt-2 flex gap-1" aria-hidden="true">
          {steps.map((_, k) => (
            <div key={k} className={`h-1.5 flex-1 rounded-full ${k < index || (k === index && solved) ? "bg-brand" : "bg-gray-200 dark:bg-gray-700"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-5 pb-16">
          <Board skill={skill} />

          {doneLines.length > 0 && (
            <ol className="flex flex-col gap-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
              {doneLines.map(({ line, i }) => {
                const answer = i === lastLineAt;
                return (
                  <li key={i} className={`v2-pop flex items-start gap-2.5 text-[16px] leading-snug tabular-nums ${answer ? "font-bold text-green-700 dark:text-green-300" : "text-gray-700 dark:text-gray-200"}`}>
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${answer ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300"}`} aria-hidden="true">
                      {answer ? "✓" : "·"}
                    </span>
                    <span>{line}</span>
                  </li>
                );
              })}
            </ol>
          )}

          <div ref={cardRef} key={index} className="flex flex-col items-center gap-3">
            <Image key={face} src={getTigerAsset(exam.id, face)} alt="" width={96} height={96} className="v2-pop h-24 w-24 object-contain" />
            <Bubble>
              {isAsk ? (
                <>
                  <p ref={stepRef} tabIndex={-1} className="text-[19px] font-medium leading-snug outline-none">{step.ask}</p>
                  <div className="mt-3 flex flex-col gap-2">
                    {order.map((i) => {
                      const o = step.options![i];
                      let cls = "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 active:bg-brand-light";
                      if (solved) cls = i === step.answer ? "border-green-500 bg-green-50 dark:bg-green-950 font-semibold" : "border-gray-200 dark:border-gray-800 opacity-50";
                      else if (wrong.includes(i)) cls = "border-amber-500 bg-amber-50 dark:bg-amber-950 opacity-70";
                      return (
                        <button key={i} type="button" disabled={solved} aria-disabled={wrong.includes(i) || undefined} onClick={() => pick(i)} className={`v2-tap flex min-h-[3.25rem] w-full items-center rounded-xl border-2 px-4 py-2.5 text-left text-[17px] leading-snug tabular-nums ${cls}`}>
                          {o}
                          {solved && i === step.answer && <span className="sr-only"> (right)</span>}
                          {!solved && wrong.includes(i) && <span className="sr-only"> (not this one)</span>}
                        </button>
                      );
                    })}
                  </div>
                  <div aria-live="polite">
                    {!solved && wrong.length > 0 && (
                      <p className="v2-pop mt-3 text-[15px] leading-snug text-amber-800 dark:text-amber-300">{step.hint ?? "Not that one. Try again."}</p>
                    )}
                    {solved && step.then && <p className="v2-pop mt-3 text-[16px] leading-snug text-green-800 dark:text-green-300">{step.then}</p>}
                  </div>
                </>
              ) : (
                <p ref={stepRef} tabIndex={-1} className="text-[19px] leading-snug outline-none">{step.say}</p>
              )}
            </Bubble>
          </div>
        </div>
      </div>

      <div className="v2-safe-bottom shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          {solved ? (
            <button ref={nextRef} type="button" onClick={next} className="v2-tap flex-1 rounded-xl bg-brand text-base font-bold text-white">
              {last ? doneLabel : "Next"}
            </button>
          ) : (
            <>
              <div className="flex-1 text-center text-sm text-gray-500 dark:text-gray-400">Tap an answer</div>
              <button type="button" onClick={onDone} className="v2-tap px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Skip
              </button>
            </>
          )}
        </div>
      </div>
    </AccessibleOverlay>
  );
}

/** What stays on top: the expression, the sentence, the skill's passage or table. */
function Board({ skill }: { skill: BasicsSkill }) {
  const walk = skill.walkthrough!;
  return (
    <div className="flex flex-col gap-3">
      {walk.board && walk.kind === "math" && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 text-center text-2xl font-bold tracking-wide tabular-nums">{walk.board}</div>
      )}
      {walk.board && walk.kind !== "math" && <Passage text={walk.board} />}
      {walk.passage && skill.passage && <Passage text={skill.passage} />}
      {walk.table && skill.table && <DataTable table={skill.table} />}
    </div>
  );
}

function Bubble({ children }: { children: ReactNode }) {
  return (
    <div className="v2-pop relative w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4 shadow-sm">
      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900" />
      {children}
    </div>
  );
}
