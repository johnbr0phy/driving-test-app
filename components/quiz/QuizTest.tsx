"use client";

// A test on a quiz: up to QUIZ_TEST_MAX_QUESTIONS of its questions in a random
// order, options shuffled, one at a time with no feedback until the end. The
// sitting (order and option orders) is kept in the quiz store so a reload
// picks up where it left off.

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { QuestionCard } from "@/components/QuestionCard";
import { FocusBar } from "@/components/FocusBar";
import { useHydration } from "@/hooks/useHydration";
import { shuffleQuestionOptions } from "@/lib/shuffleOptions";
import { recordClassAnswer, recordClassTest } from "@/lib/classProgress";
import { recordQuizPlayOnce } from "@/lib/quizProgress";
import { QUIZ_TEST_MAX_QUESTIONS, quizEngineQuestions, quizExamId, quizDashboardPath, quizPath, type QuizPublic } from "@/lib/quizzes";
import { codeProgress, useQuizStore, type QuizTestAttempt } from "@/store/useQuizStore";
import { QuizStates, useQuiz } from "@/components/quiz/QuizLoader";
import type { Question } from "@/types";

const LETTERS = ["A", "B", "C", "D"];

/**
 * Show a question's options in a saved order: `order` is the bank letter at
 * each slot ("CADB" puts the bank's C first), as shuffleQuestionOptions
 * records it in `optionOrder`, so a resumed test looks exactly as it did.
 */
export function applyOptionOrder(question: Question, order: string): Question {
  if (!/^[ABCD]{4}$/.test(order) || new Set(order).size !== 4) return { ...question, optionOrder: "ABCD" };
  const bank = [question.optionA, question.optionB, question.optionC, question.optionD];
  const texts = order.split("").map((letter) => bank[LETTERS.indexOf(letter)]);
  const correctIndex = order.indexOf(question.correctAnswer);
  return {
    ...question,
    optionA: texts[0],
    optionB: texts[1],
    optionC: texts[2],
    optionD: texts[3],
    correctAnswer: LETTERS[correctIndex],
    correctIndex,
    optionOrder: order,
  };
}

function pickRandom<T>(items: T[], n: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function elapsed(startedAt: string, now: number): string {
  const s = Math.max(0, Math.floor((now - Date.parse(startedAt)) / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** Rebuild a saved sitting from the quiz; null when a question has since been removed. */
function resumeQuestions(quiz: QuizPublic, current: NonNullable<ReturnType<typeof codeProgress>["current"]>): Question[] | null {
  const byId = new Map(quizEngineQuestions(quiz).map((q) => [q.questionId, q]));
  const out: Question[] = [];
  for (const id of current.questionIds) {
    const q = byId.get(id);
    if (!q) return null;
    out.push(applyOptionOrder(q, current.optionOrders[id] ?? "ABCD"));
  }
  return out.length ? out : null;
}

export function QuizTest({ code }: { code: string }) {
  const state = useQuiz(code);
  const quiz = state.quiz;
  const router = useRouter();
  const hydrated = useHydration();
  const initialized = useRef(false);

  const startTest = useQuizStore((s) => s.startTest);
  const answerTest = useQuizStore((s) => s.answerTest);
  const finishTest = useQuizStore((s) => s.finishTest);
  const abandonTest = useQuizStore((s) => s.abandonTest);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState<string>("");
  const [now, setNow] = useState(() => Date.now());
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    if (!hydrated || !quiz || initialized.current) return;
    initialized.current = true;
    const progress = codeProgress(useQuizStore.getState(), code);
    const resumed = progress.current ? resumeQuestions(quiz, progress.current) : null;
    if (progress.current && resumed) {
      setQuestions(resumed);
      setAnswers(progress.current.answers);
      setStartedAt(progress.current.startedAt);
      const first = resumed.findIndex((q) => !progress.current!.answers[q.questionId]);
      setIndex(first === -1 ? resumed.length - 1 : first);
      return;
    }
    if (progress.current) abandonTest(code);
    const fresh = pickRandom(quizEngineQuestions(quiz), QUIZ_TEST_MAX_QUESTIONS).map(shuffleQuestionOptions);
    const orders = Object.fromEntries(fresh.map((q) => [q.questionId, q.optionOrder ?? "ABCD"]));
    startTest(
      code,
      fresh.map((q) => q.questionId),
      orders,
    );
    setQuestions(fresh);
    setAnswers({});
    setStartedAt(new Date().toISOString());
    setIndex(0);
  }, [hydrated, quiz, code, startTest, abandonTest]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!quiz) return <QuizStates code={code} state={state} />;

  const current = questions[index];
  const total = questions.length;

  const answer = (letter: string) => {
    if (!current || answers[current.questionId] || finishing) return;
    const updated = { ...answers, [current.questionId]: letter };
    setAnswers(updated);
    answerTest(code, current.questionId, letter);
    recordQuizPlayOnce(code);
    recordClassAnswer(quizExamId(code), current, letter === current.correctAnswer, letter);

    setTimeout(() => {
      if (index < total - 1) {
        setIndex(index + 1);
        return;
      }
      setFinishing(true);
      const missedIds = questions.filter((q) => updated[q.questionId] !== q.correctAnswer).map((q) => q.questionId);
      const correct = total - missedIds.length;
      const attempt: QuizTestAttempt = {
        at: new Date().toISOString(),
        correct,
        total,
        missedIds,
        questionIds: questions.map((q) => q.questionId),
        answers: updated,
      };
      finishTest(code, attempt);
      recordClassTest(quizExamId(code), 1, correct, total);
      router.push(`${quizPath(code)}/test/results`);
    }, 300);
  };

  if (!current) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Setting up your test</div>
          <div className="text-gray-600 dark:text-gray-300">Shuffling the questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <FocusBar
        exitHref={quizDashboardPath(code)}
        title={quiz.title}
        subtitle={`Question ${index + 1} of ${total}`}
        progress={Object.keys(answers).length / total}
        confirmExit
        right={
          <span className="inline-flex items-center gap-1.5 text-sm tabular-nums text-gray-700 dark:text-gray-200" aria-label="Time elapsed">
            <Clock className="w-4 h-4" aria-hidden="true" />
            {startedAt ? elapsed(startedAt, now) : "00:00"}
          </span>
        }
      />
      <div className="relative container mx-auto px-4 py-8 max-w-lg md:max-w-2xl lg:max-w-4xl">
        <div className="mb-6">
          <QuestionCard key={current.questionId} question={current} selectedAnswer={answers[current.questionId]} onAnswerChange={answer} />
        </div>

        <div className="mt-8">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-3">Progress</div>
          <div className="grid grid-cols-10 gap-1">
            {questions.map((q, i) => (
              <div
                key={q.questionId}
                className={`h-7 rounded border text-xs font-semibold transition-colors flex items-center justify-center ${
                  i === index
                    ? "border-brand bg-brand text-white"
                    : answers[q.questionId]
                      ? "border-brand bg-brand-light text-brand-dark"
                      : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Pick an answer to move on. You cannot go back.</div>
        </div>
      </div>
    </div>
  );
}
