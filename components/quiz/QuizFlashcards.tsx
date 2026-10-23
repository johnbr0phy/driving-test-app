"use client";

// Flashcards on a quiz, phone first: the question on the front, the answer
// and explanation on the back, "Got it" or "Still learning" under it. Cards
// marked known stay out of later passes until "Start over".

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestPageHeader } from "@/components/TestPageHeader";
import { useHydration } from "@/hooks/useHydration";
import { recordQuizPlayOnce } from "@/lib/quizProgress";
import { quizDashboardPath, quizQuestionId, type QuizQuestion } from "@/lib/quizzes";
import { codeProgress, useQuizStore } from "@/store/useQuizStore";
import { QuizStates, useQuiz } from "@/components/quiz/QuizLoader";

function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function QuizFlashcards({ code }: { code: string }) {
  const state = useQuiz(code);
  const quiz = state.quiz;
  const hydrated = useHydration();
  const progress = useQuizStore((s) => codeProgress(s, code));
  const setKnown = useQuizStore((s) => s.setKnown);
  const resetKnown = useQuizStore((s) => s.resetKnown);

  const [shuffle, setShuffle] = useState(false);
  const [seed, setSeed] = useState(0);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const flippedOnce = useRef(false);

  const cards: QuizQuestion[] = useMemo(() => {
    if (!quiz) return [];
    return shuffle ? shuffled(quiz.questions) : quiz.questions;
  }, [quiz, shuffle, seed]); // eslint-disable-line react-hooks/exhaustive-deps

  const known = new Set(progress.known);
  const engineId = (q: QuizQuestion) => quizQuestionId(code, q.id);
  const total = cards.length;
  const knownCount = cards.filter((q) => known.has(engineId(q))).length;

  // The card at `pos`, or the next one not yet known (wrapping once).
  const unknownFrom = (from: number, skip: Set<string>): number => {
    for (let step = 0; step < total; step++) {
      const i = (from + step) % total;
      if (!skip.has(engineId(cards[i]))) return i;
    }
    return -1;
  };
  const index = hydrated && total ? unknownFrom(pos, known) : -1;
  const card = index >= 0 ? cards[index] : null;

  useEffect(() => {
    if (index >= 0 && index !== pos) setPos(index);
  }, [index, pos]);

  if (!quiz) return <QuizStates code={code} state={state} />;
  const home = quizDashboardPath(code);

  const flip = () => {
    setFlipped((f) => !f);
    if (!flippedOnce.current) {
      flippedOnce.current = true;
      recordQuizPlayOnce(code);
    }
  };

  const mark = (gotIt: boolean) => {
    if (!card) return;
    const id = engineId(card);
    setKnown(code, id, gotIt);
    const skip = new Set(known);
    if (gotIt) skip.add(id);
    else skip.delete(id);
    // Move on even when this card stays unknown: it comes back on the next pass.
    const next = unknownFrom((index + 1) % total, skip);
    setFlipped(false);
    setPos(next === -1 ? 0 : next);
  };

  const startOver = () => {
    resetKnown(code);
    setFlipped(false);
    setPos(0);
  };

  const toggleShuffle = () => {
    setShuffle((s) => !s);
    setSeed((n) => n + 1);
    setFlipped(false);
    setPos(0);
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <TestPageHeader
        backHref={home}
        right={
          <button
            type="button"
            onClick={toggleShuffle}
            aria-pressed={shuffle}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm ${
              shuffle
                ? "border-brand bg-brand-light text-brand-darker"
                : "border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100"
            }`}
          >
            <Shuffle className="w-4 h-4" aria-hidden="true" /> Shuffle
          </button>
        }
      />
      <div className="container mx-auto px-4 py-6 max-w-lg md:max-w-2xl lg:max-w-4xl">
        <div className="flex items-baseline justify-between mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{quiz.title}</p>
          <p className="text-sm tabular-nums text-gray-600 dark:text-gray-300 shrink-0">
            <span className="font-bold text-brand-dark">{knownCount}</span>/{total} known
          </p>
        </div>
        <div className="w-full bg-brand-border-light rounded-full h-1.5 mb-5">
          <div className="bg-brand h-1.5 rounded-full transition-all" style={{ width: `${total ? (knownCount / total) * 100 : 0}%` }} />
        </div>

        {!hydrated ? null : card ? (
          <>
            <div className="[perspective:1200px]">
              <button
                type="button"
                onClick={flip}
                aria-pressed={flipped}
                aria-label={flipped ? "Showing the answer. Flip back to the question." : "Showing the question. Flip to see the answer."}
                className={`relative block w-full min-h-[18rem] md:min-h-[22rem] text-left rounded-2xl transition-transform duration-500 motion-reduce:transition-none [transform-style:preserve-3d] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  flipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                <div
                  aria-hidden={flipped}
                  className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col [backface-visibility:hidden]"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    {card.topic ? (
                      <span className="rounded-full bg-brand-light text-brand-darker px-2.5 py-0.5 text-xs font-medium">{card.topic}</span>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                      {index + 1} of {total}
                    </span>
                  </div>
                  <p className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-gray-50 flex-1">{card.question}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Tap to see the answer</p>
                </div>
                <div
                  aria-hidden={!flipped}
                  className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-900 border border-brand p-6 flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Answer</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-50">{card.options[card.correctIndex]}</p>
                  {card.explanation && <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-3 flex-1">{card.explanation}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Tap to flip back</p>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <Button type="button" variant="outline" onClick={() => mark(false)} className="h-12 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50">
                <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" /> Still learning
              </Button>
              <Button type="button" onClick={() => mark(true)} className="h-12 bg-green-600 hover:bg-green-700 text-white">
                <Check className="w-4 h-4 mr-2" aria-hidden="true" /> Got it
              </Button>
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-1">You know all {total}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">Every card is marked known. Start over to run through them again.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button type="button" onClick={startOver} className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
                Start over
              </Button>
              <Button asChild variant="outline" className="border-gray-300 dark:border-gray-700">
                <Link href={home}>Back to quiz</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
