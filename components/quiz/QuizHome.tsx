"use client";

// A quiz's dashboard (/q/<code>/dashboard), laid out like an exam dashboard
// (components/exam/ExamDashboard.tsx): the tiger hero with an N/M step count,
// numbered practice sets (quizPracticeSets: one per topic, or about 25
// questions each), then the practice test as the last step. Flashcards and
// the share link sit below as entry cards; the owner gets See who played and
// Edit in the hero; a player gives their name so the owner can see them.

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, Check, ChevronRight, Copy, Layers, Pencil, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { useHydration } from "@/hooks/useHydration";
import { getSiteTigerAsset } from "@/lib/tigerAssets";
import { QUIZ_TEST_MAX_QUESTIONS, quizLink, quizPath, quizPracticeSets, quizQuestionId, quizUrl, type QuizPublic } from "@/lib/quizzes";
import { joinQuiz, quizMembership } from "@/lib/quizProgress";
import { leaveClass, type ClassMembership } from "@/lib/classProgress";
import { codeProgress, useQuizStore } from "@/store/useQuizStore";
import { QuizStates, useQuiz } from "@/components/quiz/QuizLoader";

type Stamp = { label: string; color: "green" | "amber" | "red" };

const card = "rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800";
const anonKey = (code: string) => `tigertest-quiz-anon-${code}`;

function heroSub(done: number, total: number): string {
  const frac = total > 0 ? done / total : 0;
  if (done === 0) return "Start with step 1. Misses come back until you get them right.";
  if (frac >= 1) return "Every step done. You know this quiz.";
  if (frac < 0.4) return "Good start. Keep working down the list.";
  if (frac < 0.7) return "Halfway there. Keep it going.";
  return "Nearly there. Pass the practice test to finish.";
}

function getTigerFace(complete: number, total: number): string {
  const pct = Math.round((complete / total) * 100);
  if (pct >= 100) return getSiteTigerAsset(1);
  if (pct >= 75) return getSiteTigerAsset(2);
  if (pct >= 50) return getSiteTigerAsset(4);
  if (pct >= 25) return getSiteTigerAsset(6);
  return getSiteTigerAsset(8);
}

export function QuizHome({ code, initial }: { code: string; initial: QuizPublic | null }) {
  const state = useQuiz(code, initial);
  const hydrated = useHydration();
  const quiz = state.quiz;
  const touchQuiz = useQuizStore((s) => s.touchQuiz);
  const progress = useQuizStore((s) => codeProgress(s, code));

  const [membership, setMembership] = useState<ClassMembership | undefined>(undefined);
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [joinError, setJoinError] = useState("");
  const [joining, setJoining] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (state.joinedAs) setMembership(quizMembership(code));
  }, [state.joinedAs, code]);

  useEffect(() => {
    setMembership(quizMembership(code));
    try {
      setAnonymous(sessionStorage.getItem(anonKey(code)) === "1");
    } catch {
      // Storage blocked: the name card shows; "Play anonymously" still hides it for this render.
    }
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, [code]);

  useEffect(() => {
    if (!quiz) return;
    touchQuiz({ code: quiz.code, title: quiz.title, ownerName: quiz.ownerName, questionCount: quiz.questions.length, at: "" });
  }, [quiz?.code]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!quiz) return <QuizStates code={code} state={state} />;

  const total = quiz.questions.length;
  const mastered = hydrated ? progress.masteredIds.length : 0;
  const known = hydrated ? progress.known.length : 0;
  const best = hydrated && progress.tests.length ? Math.max(...progress.tests.map((t) => Math.round((t.correct / t.total) * 100))) : null;
  const inProgress = hydrated && !!progress.current;
  const mine = !!quiz.mine;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(quizUrl(code));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the link is on screen to copy by hand.
    }
  };

  const share = async () => {
    try {
      await navigator.share({ title: quiz.title, text: `${quiz.title}: ${total} practice questions on Tigertest`, url: quizUrl(code) });
    } catch {
      // Cancelled or unsupported: nothing to do.
    }
  };

  const join = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setJoinError("Enter your name");
      return;
    }
    setJoining(true);
    setJoinError("");
    try {
      setMembership(await joinQuiz(quiz, name));
    } catch (err) {
      setJoinError(err instanceof Error ? err.message : "Couldn't join. Try again.");
    } finally {
      setJoining(false);
    }
  };

  const playAnonymously = () => {
    setAnonymous(true);
    try {
      sessionStorage.setItem(anonKey(code), "1");
    } catch {
      // Storage blocked: hidden for this render only.
    }
  };

  const leave = () => {
    leaveClass(code);
    setMembership(undefined);
  };

  const sets = quizPracticeSets(quiz.questions);
  const setProgress = sets.map((set) => {
    const ids = set.ids.map((id) => quizQuestionId(code, id));
    const correct = hydrated ? ids.filter((id) => progress.masteredIds.includes(id)).length : 0;
    return { correct, total: ids.length, complete: correct >= ids.length };
  });
  const testSize = Math.min(total, QUIZ_TEST_MAX_QUESTIONS);
  const testPassed = best !== null && best >= quiz.passPct;
  const answered = inProgress ? Object.keys(progress.current?.answers ?? {}).length : 0;
  const completedSteps = setProgress.filter((p) => p.complete).length + (testPassed ? 1 : 0);
  const totalSteps = sets.length + 1;
  const anyProgress = mastered > 0 || progress.tests.length > 0 || inProgress;

  let testSubtitle = `${testSize} questions, ${quiz.passPct}% to pass`;
  if (inProgress) testSubtitle = `${answered}/${progress.current?.questionIds.length ?? testSize} answered`;
  else if (best !== null) testSubtitle = testPassed ? `Best score: ${best}%` : `Best score: ${best}%. You need ${quiz.passPct}% to pass`;
  let testStamp: Stamp | undefined;
  if (inProgress) testStamp = { label: "Continue", color: "amber" };
  else if (best === 100) testStamp = { label: "Mastered", color: "green" };
  else if (testPassed) testStamp = { label: "Passed", color: "green" };
  else if (best !== null) testStamp = { label: "Keep going", color: "amber" };

  const playerLine = mine && (quiz.plays > 0 || quiz.memberCount > 0)
    ? ` · ${quiz.memberCount} ${quiz.memberCount === 1 ? "player" : "players"}`
    : "";

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
      <div className="relative container mx-auto px-4 sm:px-6 py-6 pb-10 max-w-lg md:max-w-2xl lg:max-w-4xl">

        {!mine && hydrated && !anonymous && (
          <div className={`${card} p-4 mb-4`}>
            {membership ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Users className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-gray-900 dark:text-gray-50 truncate">
                    Playing as <span className="font-semibold">{membership.name}</span>
                  </p>
                </div>
                {/* A class quiz's students are its players by being in the class. */}
                {quiz.visibility !== "class" && (
                  <button type="button" onClick={leave} className="text-sm underline text-gray-600 dark:text-gray-300 shrink-0">
                    Leave
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={join}>
                <label htmlFor="quiz-player-name" className="block text-sm text-gray-700 dark:text-gray-200 mb-1.5">
                  Your name (so {quiz.ownerName} can see how you did)
                </label>
                <div className="flex gap-2">
                  <Input
                    id="quiz-player-name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setJoinError("");
                    }}
                    placeholder="Maria G."
                    maxLength={40}
                    autoComplete="name"
                    aria-invalid={joinError ? true : undefined}
                    aria-describedby={joinError ? "quiz-player-name-error" : undefined}
                  />
                  <Button type="submit" disabled={joining} className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 shrink-0">
                    {joining ? "Joining..." : "Play with my name"}
                  </Button>
                </div>
                {joinError && (
                  <p id="quiz-player-name-error" role="alert" className="text-sm text-red-600 dark:text-red-400 mt-2">
                    {joinError}
                  </p>
                )}
                <button type="button" onClick={playAnonymously} className="mt-3 text-sm underline text-gray-600 dark:text-gray-300">
                  Play anonymously
                </button>
              </form>
            )}
          </div>
        )}

        {/* Hero card with progress */}
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src={getTigerFace(completedSteps, totalSteps)}
              alt="Tiger mascot"
              width={48}
              height={48}
              className="w-12 h-12 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">{quiz.title}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{heroSub(completedSteps, totalSteps)}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold tabular-nums text-gray-900 dark:text-gray-50">{completedSteps}/{totalSteps}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">complete</div>
            </div>
          </div>
          <p className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
            {mine ? "Your quiz" : `By ${quiz.ownerName}`} · {total} {total === 1 ? "question" : "questions"}{playerLine}
          </p>
          {mine && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`${quizPath(code)}/report`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-gray-900 font-bold text-sm px-3 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                <BarChart3 className="w-4 h-4" aria-hidden="true" /> See who played
              </Link>
              <Link
                href={`${quizPath(code)}/edit`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 font-bold text-sm px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Pencil className="w-4 h-4" aria-hidden="true" /> Edit quiz
              </Link>
            </div>
          )}
        </div>

        {/* Practice sets, one per topic (or about 25 questions) */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
          {sets.length === 1 ? "Practice" : "Practice sets"}
        </p>
        <div className="mb-6 space-y-1.5">
          {sets.map((set, i) => {
            const p = setProgress[i];
            return (
              <ProgressCard
                key={set.n}
                title={set.name}
                subtitle={`${p.correct}/${p.total} mastered`}
                completed={p.complete}
                stepNumber={i + 1}
                stamp={
                  p.complete
                    ? { label: "Complete", color: "green" }
                    : i === 0 && !anyProgress
                      ? { label: "Start here", color: "amber" }
                      : p.correct > 0
                        ? { label: "Continue", color: "amber" }
                        : undefined
                }
                href={sets.length === 1 ? `${quizPath(code)}/practice` : `${quizPath(code)}/practice?set=${set.n}`}
              />
            );
          })}
        </div>

        {/* The practice test */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Practice test</p>
        <div className="mb-6">
          <ProgressCard
            title="Practice test"
            subtitle={testSubtitle}
            completed={testPassed}
            stepNumber={totalSteps}
            stamp={testStamp}
            href={`${quizPath(code)}/test`}
          />
        </div>

        {/* Flashcards: a way to study, not a step */}
        <Link href={`${quizPath(code)}/flashcards`} className="block mb-3">
          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
              <Layers className="h-4 w-4 text-brand-dark" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-sm text-gray-900 dark:text-gray-50">Flashcards</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{known}/{total} known. Flip, then mark what you know.</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0" aria-hidden="true" />
          </div>
        </Link>

        {/* Share */}
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
            <Share2 className="h-4 w-4 text-brand-dark" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm text-gray-900 dark:text-gray-50">
              {quiz.visibility === "private" ? "Private quiz" : quiz.visibility === "class" ? `Shared with ${quiz.className || "your class"}` : "Share this quiz"}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono truncate">{quizLink(code)}</p>
            {mine && quiz.visibility === "class" && quiz.classCode && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                New students type the class code <span className="font-mono font-semibold">{quiz.classCode}</span> on the link.
              </p>
            )}
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 px-2.5 py-1.5 text-xs font-bold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
            {canShare && quiz.visibility !== "private" && (
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 px-2.5 py-1.5 text-xs font-bold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Share
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-gray-500 dark:text-gray-400">
          {mine ? "Made" : `Made by ${quiz.ownerName}`} with Tigertest.{" "}
          <Link href={quizPath(code)} className="underline hover:text-gray-600 dark:hover:text-gray-300">About this quiz</Link>
          {" · "}
          <Link href="/create" className="underline hover:text-gray-600 dark:hover:text-gray-300">Make your own quiz</Link>
        </p>
      </div>
      </div>
    </div>
  );
}
