"use client";

// Practice a quiz the way a training set works: every question until it is
// mastered, misses queued to come back, options reshuffled on the way back.
// ?ids=q1,q2 narrows it to those questions (the results page links here with
// the misses); progress still lives on the whole quiz.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrainingCard } from "@/components/TrainingCard";
import { TestPageHeader } from "@/components/TestPageHeader";
import { Fireworks } from "@/components/Fireworks";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { shuffleQuestionOptions } from "@/lib/shuffleOptions";
import { recordClassAnswer } from "@/lib/classProgress";
import { recordQuizPlayOnce, reportQuizQuestion } from "@/lib/quizProgress";
import { quizEngineQuestions, quizExamId, quizPath, quizQuestionId, type QuizPublic } from "@/lib/quizzes";
import { codeProgress, useQuizStore } from "@/store/useQuizStore";
import { QuizStates, useQuiz } from "@/components/quiz/QuizLoader";
import type { Question } from "@/types";

/**
 * The next question to show: unmastered ones in quiz order, skipping the one
 * on screen, fresh (never missed) first, then the wrong queue in order. The
 * same rule as lib/examTestGenerator.ts getNextExamTrainingSetQuestion.
 */
export function nextPracticeQuestion(questions: Question[], masteredIds: string[], wrongQueue: string[], currentId: string | null): Question | null {
  let unmastered = questions.filter((q) => !masteredIds.includes(q.questionId));
  if (unmastered.length === 0) return null;
  if (currentId && unmastered.length > 1) unmastered = unmastered.filter((q) => q.questionId !== currentId);
  const fresh = unmastered.filter((q) => !wrongQueue.includes(q.questionId));
  if (fresh.length > 0) return fresh[0];
  for (const id of wrongQueue) {
    const q = unmastered.find((x) => x.questionId === id);
    if (q) return q;
  }
  return unmastered[0];
}

/** The quiz question ids from ?ids=, as engine ids, keeping only ones the quiz has. */
function scopedQuestions(quiz: QuizPublic, idsParam: string | null): Question[] {
  const all = quizEngineQuestions(quiz);
  if (!idsParam) return all;
  const wanted = new Set(idsParam.split(",").map((id) => quizQuestionId(quiz.code, id.trim())));
  const scoped = all.filter((q) => wanted.has(q.questionId));
  return scoped.length ? scoped : all;
}

export function QuizPractice({ code }: { code: string }) {
  const state = useQuiz(code);
  const quiz = state.quiz;
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids");
  const hydrated = useHydration();
  const { playCorrectSound, playIncorrectSound } = useSound();

  const progress = useQuizStore((s) => codeProgress(s, code));
  const answerPractice = useQuizStore((s) => s.answerPractice);
  const resetPractice = useQuizStore((s) => s.resetPractice);

  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const currentIdRef = useRef<string | null>(null);

  const questions = quiz ? scopedQuestions(quiz, idsParam) : [];
  const scopedIds = questions.map((q) => q.questionId);
  const mastered = progress.masteredIds.filter((id) => scopedIds.includes(id)).length;

  const loadNext = () => {
    if (!quiz) return;
    const fresh = codeProgress(useQuizStore.getState(), code);
    let next = nextPracticeQuestion(questions, fresh.masteredIds, fresh.wrongQueue, currentIdRef.current);
    if (!next) {
      setComplete(true);
      setFireworks(true);
      return;
    }
    // Back from the wrong queue: reshuffle so the slot cannot be memorised.
    // Otherwise mark the bank order so a wrong pick is reported by option.
    next = fresh.wrongQueue.includes(next.questionId) ? shuffleQuestionOptions(next) : { ...next, optionOrder: "ABCD" };
    setCurrent(next);
    currentIdRef.current = next.questionId;
    setSelected(null);
  };

  useEffect(() => {
    if (hydrated && quiz && !current && !complete) loadNext();
  }, [hydrated, quiz, current, complete]); // eslint-disable-line react-hooks/exhaustive-deps

  // A different ?ids= while mounted starts that scope fresh.
  const firstScope = useRef(true);
  useEffect(() => {
    if (firstScope.current) {
      firstScope.current = false;
      return;
    }
    currentIdRef.current = null;
    setCurrent(null);
    setComplete(false);
    setFireworks(false);
  }, [idsParam]);

  if (!quiz) return <QuizStates code={code} state={state} />;

  const answer = (letter: string) => {
    if (!current || selected) return;
    setSelected(letter);
    const correct = letter === current.correctAnswer;
    if (correct) playCorrectSound();
    else playIncorrectSound();
    answerPractice(code, current.questionId, correct);
    recordQuizPlayOnce(code);
    recordClassAnswer(quizExamId(code), current, correct, letter);
  };

  const practiceAgain = () => {
    resetPractice(code, idsParam ? scopedIds : undefined);
    setComplete(false);
    setResetConfirm(false);
    currentIdRef.current = null;
    setCurrent(null);
  };

  const home = quizPath(code);
  const total = questions.length;

  return (
    <div className="flex-1 bg-gradient-to-br from-brand-light to-brand-gradient-to">
      {fireworks && <Fireworks duration={3000} onComplete={() => setFireworks(false)} />}

      {complete && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-300">
          <div className="min-h-screen bg-gradient-to-b from-gray-950 to-green-950">
            <div className="relative max-w-6xl mx-auto px-4 pt-4">
              <Button asChild variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 -ml-2">
                <Link href={home}>
                  <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                  Back
                </Link>
              </Button>
            </div>
            <div className="relative text-center px-6 pt-4 pb-10 max-w-lg mx-auto">
              <div className="mb-6">
                <div className="text-gray-300 text-lg font-bold tracking-widest">tigertest.io</div>
                <div className="text-gray-400 text-xs uppercase tracking-widest mt-1">Quiz practice</div>
              </div>
              <div className="flex justify-center mb-5">
                <Image src="/tiger_face_01.png" alt="Tiger mascot" width={160} height={160} className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]" />
              </div>
              <div className="text-base md:text-lg font-extrabold uppercase tracking-widest mb-4 text-green-300">
                {idsParam ? "Misses cleared" : "Every question mastered"}
              </div>
              <div className="text-7xl md:text-8xl font-black mb-3 leading-none text-green-500 dark:text-green-400">100%</div>
              <div className="text-xl md:text-2xl text-gray-400 mb-5">
                {total} out of {total} mastered
              </div>
              <Badge className="text-lg px-6 py-2 mb-5 bg-green-600 hover:bg-green-700">Mastered</Badge>
              <div className="text-gray-400 text-base mb-2">{quiz.title}</div>
              <div className="text-gray-400 text-sm tracking-wider mb-8">by {quiz.ownerName}</div>
              <div className="flex gap-3 max-w-xs mx-auto">
                <Button asChild className="flex-1 bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase tracking-wide h-12 text-base">
                  <Link href={home}>Back to quiz</Link>
                </Button>
                <Button
                  type="button"
                  onClick={() => setResetConfirm(true)}
                  className="flex-1 bg-transparent text-white hover:bg-white/10 border border-white/30 font-bold uppercase tracking-wide h-12 text-base"
                >
                  Practice again
                </Button>
              </div>
              {resetConfirm && (
                <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-xs mx-auto animate-in fade-in duration-200">
                  <p className="text-gray-200 text-sm mb-3">Start these {total} questions over from zero?</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold h-10 text-sm" onClick={practiceAgain}>
                      Yes, start over
                    </Button>
                    <Button className="flex-1 bg-transparent text-white hover:bg-white/10 border border-white/30 font-semibold h-10 text-sm" onClick={() => setResetConfirm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <TestPageHeader backHref={home} right={<span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[12rem]">{quiz.title}</span>} />
      <div className="relative container mx-auto px-4 py-4 max-w-lg md:max-w-2xl">
        {current ? (
          <TrainingCard key={current.questionId} question={current} selectedAnswer={selected} onAnswerSelect={answer} onNext={loadNext} />
        ) : (
          <Card className="w-full">
            <CardContent className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">Loading...</CardContent>
          </Card>
        )}

        <div className="mt-4 md:mt-6 text-center">
          <div className="flex items-center justify-center gap-1 text-sm md:text-lg text-gray-700 dark:text-gray-200">
            <span className="font-bold text-xl md:text-2xl text-brand-dark">{hydrated ? mastered : 0}</span>
            <span className="text-gray-500 dark:text-gray-400">/{total}</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs md:text-base ml-1">mastered</span>
          </div>
          <div className="w-full bg-brand-border-light rounded-full h-2 mt-2 max-w-md mx-auto">
            <div className="bg-brand h-2 rounded-full transition-all" style={{ width: `${total ? (mastered / total) * 100 : 0}%` }} />
          </div>
          {idsParam && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Practicing {total} of {quiz.questions.length}. <Link href={`${home}/practice`} className="underline">Practice the whole quiz</Link>
            </p>
          )}
        </div>

        {current && <ReportQuestion key={current.questionId} code={code} questionId={current.questionId.slice(code.length + 1)} />}
      </div>
    </div>
  );
}

const REASONS: { value: string; label: string }[] = [
  { value: "wrong_answer", label: "The marked answer is wrong" },
  { value: "unclear", label: "The question is unclear" },
  { value: "typo", label: "There is a typo" },
  { value: "other", label: "Something else" },
];

/** "Report this question": a tiny inline form that tells the creator a question looks wrong. */
export function ReportQuestion({ code, questionId }: { code: string; questionId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("wrong_answer");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await reportQuizQuestion(code, questionId, reason, note);
    } finally {
      setBusy(false);
      setSent(true);
    }
  };

  if (sent) return <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">Thanks, the creator will see this.</p>;

  return (
    <div className="mt-6 text-center">
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 underline">
          <Flag className="w-3 h-3" aria-hidden="true" /> Report this question
        </button>
      ) : (
        <form onSubmit={send} className="mx-auto max-w-sm rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 text-left space-y-3">
          <label className="block text-xs text-gray-600 dark:text-gray-300">
            What is wrong?
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-2 py-1.5 text-sm"
            >
              {REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-gray-600 dark:text-gray-300">
            Note (optional)
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={300}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-2 py-1.5 text-sm"
            />
          </label>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={busy} className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              {busy ? "Sending..." : "Send"}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
