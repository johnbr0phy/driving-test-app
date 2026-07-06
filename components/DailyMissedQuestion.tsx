"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QuizRow } from "@/components/QuizRow";
import { useCommunityStats } from "@/hooks/useCommunityStats";
import { useStore } from "@/store/useStore";
import { getQuestionsData } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackDailyQuizAnswer, trackStatsEntry } from "@/lib/analytics";

// questionId -> { d: local day number answered, k: quiz kind }
const STORAGE_KEY = "dailyQuizAnswers";
// total recorded answers at the moment the nemesis quiz was last answered;
// another nemesis unlocks after 50 more answers, even on the same day
const BASELINE_KEY = "nemesisAnswerBaseline";
const NEMESIS_REFRESH_EVERY = 50;

type PastAnswer = { d: number; k: "c" | "n" };

function loadPastAnswers(): Record<string, PastAnswer> {
  if (typeof window === "undefined") return {};
  try {
    const raw: Record<string, number | PastAnswer> = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );
    // Migrate pre-nemesis entries, which stored a bare day number
    const normalized: Record<string, PastAnswer> = {};
    for (const [id, v] of Object.entries(raw)) {
      normalized[id] = typeof v === "number" ? { d: v, k: "c" } : v;
    }
    return normalized;
  } catch {
    return {};
  }
}

function loadNemesisBaseline(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(BASELINE_KEY);
  const n = raw === null ? NaN : Number(raw);
  return Number.isFinite(n) ? n : null;
}

function localDayNumber(): number {
  const now = new Date();
  return Math.floor((now.getTime() - now.getTimezoneOffset() * 60_000) / 86_400_000);
}

function optionText(q: Question, letter: string): string {
  const map: Record<string, string> = {
    A: q.optionA,
    B: q.optionB,
    C: q.optionC,
    D: q.optionD,
  };
  return map[letter] ?? "";
}

// One day's quiz for the strip, in either mode
interface StripQuiz {
  kind: "community" | "nemesis";
  id: string;
  chipValue: string;
  chipLabel: string;
  question: string;
  options: string[];
  correctAnswer: string;
  ctaHref: string;
  ctaTab: "yours" | "community";
  ctaLabel: (correct: boolean | null) => string;
}

export function DailyMissedQuestion({ className }: { className?: string }) {
  const { t, language } = useTranslation();
  const { data } = useCommunityStats();
  const selectedState = useStore((state) => state.selectedState);
  const getQuestionPerformance = useStore((state) => state.getQuestionPerformance);
  // Snapshot past answers once on mount so answering doesn't swap or hide the
  // strip mid-session — the next quiz appears on the next dashboard load
  const [pastAnswers] = useState<Record<string, PastAnswer>>(loadPastAnswers);
  const [nemesisBaseline] = useState<number | null>(loadNemesisBaseline);

  // Questions this user has gotten wrong more than once, worst first
  const { nemesisPool, totalAnswered } = useMemo(() => {
    const perf = getQuestionPerformance();
    const total = perf.reduce((sum, p) => sum + p.timesAnswered, 0);
    const repeatMisses = perf
      .filter((p) => p.timesWrong >= 2)
      .sort((a, b) => b.timesWrong - a.timesWrong);
    if (!selectedState || repeatMisses.length === 0) {
      return { nemesisPool: [], totalAnswered: total };
    }
    const byId = new Map(
      getQuestionsData(language)
        .filter((q) => q.state === "ALL" || q.state === selectedState)
        .map((q) => [q.questionId, q])
    );
    const pool = repeatMisses.flatMap((p) => {
      const question = byId.get(p.questionId);
      return question ? [{ perf: p, question }] : [];
    });
    return { nemesisPool: pool, totalAnswered: total };
  }, [selectedState, getQuestionPerformance, language]);

  const dayNumber = localDayNumber();

  const answeredCommunityToday = Object.values(pastAnswers).some(
    (a) => a.d === dayNumber && a.k === "c"
  );
  const answeredNemesisToday = Object.values(pastAnswers).some(
    (a) => a.d === dayNumber && a.k === "n"
  );
  // A heavy session earns another nemesis question the same day
  const nemesisRefreshEarned =
    answeredNemesisToday &&
    nemesisBaseline !== null &&
    totalAnswered - nemesisBaseline >= NEMESIS_REFRESH_EVERY;

  const pickNemesis = (allowRepeats: boolean): StripQuiz | null => {
    if (nemesisPool.length === 0) return null;
    const fresh = nemesisPool.find(
      ({ question }) => !(question.questionId in pastAnswers)
    );
    // Same-day refresh only serves questions not quizzed before; the daily
    // showing may cycle through the pool again once it's exhausted
    const entry =
      fresh ?? (allowRepeats ? nemesisPool[dayNumber % nemesisPool.length] : null);
    if (!entry) return null;
    const { perf, question } = entry;
    const others = nemesisPool.length - 1;
    return {
      kind: "nemesis",
      id: question.questionId,
      chipValue: `${perf.timesWrong}×`,
      chipLabel: t("dashboard.nemesisMissedByYou"),
      question: question.question,
      options: [question.optionA, question.optionB, question.optionC, question.optionD].filter(Boolean),
      correctAnswer: optionText(question, question.correctAnswer),
      ctaHref: "/stats",
      ctaTab: "yours",
      ctaLabel: (correct) => {
        if (others === 0) return t("dashboard.nemesisCtaLast");
        return (correct
          ? t("dashboard.nemesisCtaWin")
          : t("dashboard.nemesisCtaMore")
        ).replace("{{n}}", String(others));
      },
    };
  };

  const pickCommunity = (): StripQuiz | null => {
    const list = data?.questions ?? [];
    if (list.length === 0) return null;
    // Rotate daily, skipping questions answered on earlier days; once every
    // question is answered, cycle again
    const allAnswered = list.every((c) => c.questionId in pastAnswers);
    let q = list[dayNumber % list.length];
    if (!allAnswered) {
      for (let i = 0; i < list.length; i++) {
        const candidate = list[(dayNumber + i) % list.length];
        if (!(candidate.questionId in pastAnswers)) {
          q = candidate;
          break;
        }
      }
    }
    return {
      kind: "community",
      id: q.questionId,
      chipValue: `${q.errorRate}%`,
      chipLabel: t("dashboard.dailyMissedGetWrong"),
      question: q.question,
      options: q.options ?? [],
      correctAnswer: q.correctAnswer,
      ctaHref: "/stats?tab=community",
      ctaTab: "community",
      ctaLabel: () => t("dashboard.dailyMissedCta"),
    };
  };

  // One quiz at a time: the community question leads each day, and once it's
  // answered the user's own nemesis question takes the slot on the next
  // load. A heavy session (50+ more answers) unlocks another nemesis.
  let quiz: StripQuiz | null = null;
  if (!answeredCommunityToday) quiz = pickCommunity();
  if (!quiz && (!answeredNemesisToday || nemesisRefreshEarned)) {
    quiz = pickNemesis(!answeredNemesisToday);
  }

  if (!quiz) return null;
  const activeQuiz = quiz;

  const handleAnswer = (correct: boolean) => {
    trackDailyQuizAnswer(correct, activeQuiz.kind);
    try {
      const stored = loadPastAnswers();
      stored[activeQuiz.id] = { d: dayNumber, k: activeQuiz.kind === "nemesis" ? "n" : "c" };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      if (activeQuiz.kind === "nemesis") {
        localStorage.setItem(BASELINE_KEY, String(totalAnswered));
      }
    } catch {
      // localStorage unavailable — the quiz just reappears on reload
    }
  };

  return (
    <div className={className}>
      <QuizRow
        chipValue={activeQuiz.chipValue}
        chipLabel={activeQuiz.chipLabel}
        question={activeQuiz.question}
        options={activeQuiz.options}
        correctAnswer={activeQuiz.correctAnswer}
        onAnswer={handleAnswer}
        renderFooter={({ answered, correct }) =>
          answered ? (
            <div className="pt-1 animate-in fade-in duration-300">
              <Link
                href={activeQuiz.ctaHref}
                onClick={(e) => {
                  e.stopPropagation();
                  trackStatsEntry(
                    `dashboard_${activeQuiz.kind === "nemesis" ? "nemesis" : "daily_quiz"}_${
                      correct ? "correct" : "wrong"
                    }`,
                    activeQuiz.ctaTab
                  );
                }}
                className="block w-full rounded-full bg-gray-900 text-white hover:bg-gray-800 px-6 py-3 text-center transition-colors"
              >
                <span className="text-sm font-medium leading-snug [text-wrap:balance]">
                  {activeQuiz.ctaLabel(correct)}
                  <ArrowRight className="inline h-4 w-4 ml-1.5 -mt-0.5" />
                </span>
              </Link>
            </div>
          ) : null
        }
      />
    </div>
  );
}
