"use client";

// Results of a quiz test: the score against the quiz's pass line, how each
// topic went, every missed question with its answer, and the way back into
// practice on exactly those misses.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, RotateCcw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Fireworks } from "@/components/Fireworks";
import { QuizRow } from "@/components/QuizRow";
import { TestPageHeader } from "@/components/TestPageHeader";
import { useHydration } from "@/hooks/useHydration";
import { quizDashboardPath, quizPath, quizQuestionId, type QuizPublic, type QuizQuestion } from "@/lib/quizzes";
import { codeProgress, useQuizStore, type QuizTestAttempt } from "@/store/useQuizStore";
import { QuizStates, useQuiz } from "@/components/quiz/QuizLoader";

const card = "rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800";

function pct(correct: number, total: number): number {
  return total ? Math.round((correct / total) * 100) : 0;
}

function when(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

/** Quiz questions of an attempt, in the attempt's order, with each one's quiz id. */
function attemptQuestions(quiz: QuizPublic, attempt: QuizTestAttempt): { id: string; engineId: string; q: QuizQuestion }[] {
  const byEngineId = new Map(quiz.questions.map((q) => [quizQuestionId(quiz.code, q.id), q]));
  return attempt.questionIds.flatMap((engineId) => {
    const q = byEngineId.get(engineId);
    return q ? [{ id: q.id, engineId, q }] : [];
  });
}

export function QuizResults({ code }: { code: string }) {
  const state = useQuiz(code);
  const quiz = state.quiz;
  const router = useRouter();
  const searchParams = useSearchParams();
  const at = searchParams.get("at");
  const hydrated = useHydration();
  const progress = useQuizStore((s) => codeProgress(s, code));
  const abandonTest = useQuizStore((s) => s.abandonTest);
  const [fireworks, setFireworks] = useState(false);

  const tests = progress.tests;
  const attempt = (at ? tests.find((t) => t.at === at) : undefined) ?? tests[tests.length - 1];
  const passed = !!quiz && !!attempt && pct(attempt.correct, attempt.total) >= quiz.passPct;

  useEffect(() => {
    if (hydrated && passed && !at) setFireworks(true);
  }, [hydrated, passed, at]);

  if (!quiz) return <QuizStates code={code} state={state} />;
  const home = quizDashboardPath(code);

  if (!hydrated) return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  if (!attempt) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-950">
        <TestPageHeader backHref={home} />
        <div className="container mx-auto px-4 py-12 max-w-lg text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">No test yet</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Take the test and your score will show here.</p>
          <Button asChild className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
            <Link href={`${quizPath(code)}/test`}>Take the test</Link>
          </Button>
        </div>
      </div>
    );
  }

  const percentage = pct(attempt.correct, attempt.total);
  const rows = attemptQuestions(quiz, attempt);
  const missedSet = new Set(attempt.missedIds);
  const missed = rows.filter((r) => missedSet.has(r.engineId));
  const missedQuizIds = missed.map((r) => r.id);

  const topics = new Map<string, { correct: number; answered: number }>();
  for (const r of rows) {
    const key = r.q.topic ?? "General";
    const t = topics.get(key) ?? { correct: 0, answered: 0 };
    t.answered += 1;
    if (!missedSet.has(r.engineId)) t.correct += 1;
    topics.set(key, t);
  }
  const topicRows = [...topics.entries()].sort((a, b) => pct(a[1].correct, a[1].answered) - pct(b[1].correct, b[1].answered));

  const takeAgain = () => {
    abandonTest(code);
    router.push(`${quizPath(code)}/test`);
  };

  const previous = [...tests].filter((t) => t.at !== attempt.at).reverse();
  const tone = passed
    ? { ring: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950", big: "text-green-600 dark:text-green-400", label: "Passed" }
    : { ring: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950", big: "text-red-600 dark:text-red-400", label: "Not yet" };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      {fireworks && <Fireworks duration={3000} onComplete={() => setFireworks(false)} />}
      <TestPageHeader backHref={home} sticky />
      <div className="container mx-auto px-4 py-8 max-w-lg md:max-w-2xl space-y-5">
        <div className={`rounded-2xl border p-6 text-center ${tone.ring}`}>
          <p className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-300 mb-2">{quiz.title}</p>
          <div className={`text-6xl md:text-7xl font-black leading-none ${tone.big}`}>{percentage}%</div>
          <p className={`mt-3 text-lg font-bold ${tone.big}`}>{tone.label}</p>
          <p className="text-gray-700 dark:text-gray-200 mt-1">
            {attempt.correct} of {attempt.total} right · pass line {quiz.passPct}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{when(attempt.at)}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {missedQuizIds.length > 0 && (
            <Button asChild className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 sm:col-span-3">
              <Link href={`${quizPath(code)}/practice?ids=${encodeURIComponent(missedQuizIds.join(","))}`}>
                <Target className="w-4 h-4 mr-2" aria-hidden="true" /> Practice what you missed ({missedQuizIds.length})
              </Link>
            </Button>
          )}
          <Button type="button" variant="outline" onClick={takeAgain} className="border-gray-300 dark:border-gray-700 sm:col-span-2">
            <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" /> Take it again
          </Button>
          <Button asChild variant="ghost">
            <Link href={home}>
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Back to quiz
            </Link>
          </Button>
        </div>

        {topicRows.length > 1 && (
          <div className={`${card} p-5`}>
            <h2 className="font-semibold text-gray-900 dark:text-gray-50 mb-3">By topic</h2>
            <div className="space-y-2.5">
              {topicRows.map(([label, t]) => {
                const p = pct(t.correct, t.answered);
                const good = p >= quiz.passPct;
                return (
                  <div key={label} className="grid grid-cols-[minmax(0,9rem)_1fr_4rem] sm:grid-cols-[minmax(0,13rem)_1fr_4rem] items-center gap-3 text-sm">
                    <span className="truncate text-gray-800 dark:text-gray-100" title={label}>
                      {label}
                    </span>
                    <div className="h-2.5 rounded-sm bg-gray-200 dark:bg-gray-800">
                      <div className={`h-2.5 rounded-sm ${good ? "bg-green-500" : "bg-red-500"}`} style={{ width: `${p}%` }} />
                    </div>
                    <span className="text-right tabular-nums text-gray-800 dark:text-gray-100">
                      {t.correct}/{t.answered}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-50 mb-3">
            {missed.length === 0 ? "Nothing missed" : `Missed ${missed.length === 1 ? "question" : "questions"} (${missed.length})`}
          </h2>
          {missed.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-300">Every answer was right. Try the practice mode to keep it that way.</p>
          ) : (
            <div className="space-y-2">
              {missed.map((r) => (
                <QuizRow
                  key={r.engineId}
                  chipValue={`${rows.findIndex((x) => x.engineId === r.engineId) + 1}`}
                  chipLabel="question"
                  chipColorClass="text-red-600 dark:text-red-400"
                  question={r.q.question}
                  subtitle={r.q.topic}
                  options={r.q.options}
                  correctAnswer={r.q.options[r.q.correctIndex]}
                  revealAnswer
                  renderFooter={() =>
                    r.q.explanation ? <p className="pt-1 px-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{r.q.explanation}</p> : null
                  }
                />
              ))}
            </div>
          )}
        </div>

        {previous.length > 0 && (
          <div className={`${card} p-5`}>
            <h2 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">Previous attempts</h2>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {previous.map((t) => {
                const p = pct(t.correct, t.total);
                return (
                  <li key={t.at} className="flex items-center justify-between py-2 text-sm">
                    <Link href={`${quizPath(code)}/test/results?at=${encodeURIComponent(t.at)}`} className="underline text-gray-700 dark:text-gray-200">
                      {when(t.at)}
                    </Link>
                    <span className={`font-semibold tabular-nums ${p >= quiz.passPct ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {p}% · {t.correct}/{t.total}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
