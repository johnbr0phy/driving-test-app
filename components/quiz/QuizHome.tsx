"use client";

// A quiz's dashboard (/q/<code>/dashboard): what it is, who made it, the three ways to play
// it, the link to share, and the name a player gives so the creator can see
// how they did.

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, Check, Copy, Layers, ListChecks, Pencil, Share2, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHydration } from "@/hooks/useHydration";
import { quizLink, quizPath, quizTopics, quizUrl, type QuizPublic } from "@/lib/quizzes";
import { joinQuiz, quizMembership } from "@/lib/quizProgress";
import { leaveClass, type ClassMembership } from "@/lib/classProgress";
import { codeProgress, useQuizStore } from "@/store/useQuizStore";
import { QuizStates, useQuiz } from "@/components/quiz/QuizLoader";

const card = "rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800";
const anonKey = (code: string) => `tigertest-quiz-anon-${code}`;

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
  const topics = quizTopics(quiz.questions);
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
      await navigator.share({ title: quiz.title, text: `${quiz.title}: ${total} practice questions on TigerTest`, url: quizUrl(code) });
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

  const modes: { href: string; icon: React.ReactNode; title: string; line: string; pct: number | null; extra?: string }[] = [
    {
      href: `${quizPath(code)}/practice`,
      icon: <Target className="w-5 h-5 text-brand-dark" aria-hidden="true" />,
      title: "Practice",
      line: `${mastered}/${total} mastered`,
      pct: total ? (mastered / total) * 100 : 0,
      extra: "Answer, see why, and misses come back until you get them right.",
    },
    {
      href: `${quizPath(code)}/test`,
      icon: <ListChecks className="w-5 h-5 text-brand-dark" aria-hidden="true" />,
      title: inProgress ? "Resume your test" : "Test",
      line: best === null ? "Not taken yet" : `Best ${best}%`,
      pct: best,
      extra: `${Math.min(total, 50)} questions, no feedback until the end. Pass line ${quiz.passPct}%.`,
    },
    {
      href: `${quizPath(code)}/flashcards`,
      icon: <Layers className="w-5 h-5 text-brand-dark" aria-hidden="true" />,
      title: "Flashcards",
      line: `${known}/${total} known`,
      pct: total ? (known / total) * 100 : 0,
      extra: "Flip, then mark what you know.",
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-lg md:max-w-2xl space-y-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Your quiz dashboard</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">{quiz.title}</h1>
          {quiz.description && <p className="text-gray-600 dark:text-gray-300 mt-2">{quiz.description}</p>}
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            by {quiz.ownerName} · {total} {total === 1 ? "question" : "questions"} · {quiz.plays} {quiz.plays === 1 ? "play" : "plays"} · {quiz.memberCount}{" "}
            {quiz.memberCount === 1 ? "player" : "players"}
          </p>
          {topics.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 mt-3" aria-label="Topics">
              {topics.map((t) => (
                <li key={t} className="rounded-full bg-brand-light text-brand-darker px-2.5 py-0.5 text-xs font-medium">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        {mine && (
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="border-gray-300 dark:border-gray-700">
              <Link href={`${quizPath(code)}/edit`}>
                <Pencil className="w-4 h-4 mr-2" aria-hidden="true" /> Edit
              </Link>
            </Button>
            <Button asChild className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              <Link href={`${quizPath(code)}/report`}>
                <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" /> See who played
              </Link>
            </Button>
          </div>
        )}

        <Link href={quizPath(code)} className="inline-block text-sm underline text-gray-600 dark:text-gray-300">View share page</Link>

        <div className="grid gap-3">
          {modes.map((m) => (
            <Link key={m.href} href={m.href} className={`${card} p-4 flex items-center gap-4 hover:border-brand transition-colors`}>
              <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center shrink-0">{m.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-gray-900 dark:text-gray-50">{m.title}</span>
                  <span className="text-sm tabular-nums text-gray-600 dark:text-gray-300 shrink-0">{m.line}</span>
                </div>
                {m.extra && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{m.extra}</p>}
                <div className="w-full bg-brand-border-light rounded-full h-1.5 mt-2">
                  <div className="bg-brand h-1.5 rounded-full transition-all" style={{ width: `${Math.min(100, m.pct ?? 0)}%` }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!mine && hydrated && !anonymous && (
          <div className={`${card} p-5`}>
            {membership ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Users className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-gray-900 dark:text-gray-50 truncate">
                    Playing as <span className="font-semibold">{membership.name}</span>
                  </p>
                </div>
                <button type="button" onClick={leave} className="text-sm underline text-gray-600 dark:text-gray-300 shrink-0">
                  Leave
                </button>
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

        <div className={`${card} p-5`}>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{quiz.visibility === "private" ? "Private quiz: only you can open this link" : "Share this quiz"}</p>
          <p className="font-mono text-sm text-gray-900 dark:text-gray-50 mb-3 break-all">{quizLink(code)}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-100"
            >
              {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
            </button>
            {canShare && (
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-100"
              >
                <Share2 className="w-4 h-4" aria-hidden="true" /> Share
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Free to play, no account needed. Made with TigerTest; <Link href="/create" className="underline">make your own quiz</Link>.
        </p>
      </div>
    </div>
  );
}
