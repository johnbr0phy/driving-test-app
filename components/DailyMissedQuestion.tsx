"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
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
  const [expanded, setExpanded] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
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

  const hasOptions = quiz.options.length > 0;
  const answered = picked !== null;
  const pickedCorrect = answered && quiz.options[picked] === quiz.correctAnswer;

  const toggle = () => setExpanded((e) => !e);

  const pickOption = (idx: number) => {
    if (answered) return;
    setPicked(idx);
    trackDailyQuizAnswer(quiz.options[idx] === quiz.correctAnswer, quiz.kind);
    try {
      const stored = loadPastAnswers();
      stored[quiz.id] = { d: dayNumber, k: quiz.kind === "nemesis" ? "n" : "c" };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      if (quiz.kind === "nemesis") {
        localStorage.setItem(BASELINE_KEY, String(totalAnswered));
      }
    } catch {
      // localStorage unavailable — the quiz just reappears on reload
    }
  };

  const ctaSource = `dashboard_${quiz.kind === "nemesis" ? "nemesis" : "daily_quiz"}${
    answered ? (pickedCorrect ? "_correct" : "_wrong") : ""
  }`;

  return (
    <div className={className}>
      <div className="rounded-xl bg-white border border-gray-100 px-4 py-3 hover:shadow-md transition-shadow">
        {/* Header row — toggles the quiz open/closed */}
        <div
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          className="flex items-center gap-4 cursor-pointer"
          aria-expanded={expanded}
        >
          <div className="shrink-0 text-center">
            <div className="text-base font-bold text-red-500 tabular-nums leading-none">
              {quiz.chipValue}
            </div>
            <div className="text-[9px] uppercase tracking-wide text-gray-400 mt-0.5 whitespace-nowrap">
              {quiz.chipLabel}
            </div>
          </div>
          <p className="flex-1 min-w-0 text-sm leading-snug font-medium text-gray-900 line-clamp-2">
            {quiz.question}
          </p>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Expanding quiz panel */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            expanded ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-3 space-y-1.5">
              {hasOptions ? (
                quiz.options.map((opt, idx) => {
                  const isCorrect = opt === quiz.correctAnswer;
                  const isPicked = picked === idx;
                  const letter = ["A", "B", "C", "D"][idx];

                  let optionStyle = "bg-gray-50 border-gray-200 text-gray-700";
                  if (answered) {
                    if (isCorrect) {
                      optionStyle = "bg-green-50 border-green-200 text-green-900";
                    } else if (isPicked) {
                      optionStyle = "bg-red-50 border-red-200 text-red-700";
                    } else {
                      optionStyle = "bg-gray-50 border-gray-100 text-gray-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        pickOption(idx);
                      }}
                      disabled={answered}
                      style={{ transitionDelay: expanded && !answered ? `${idx * 50}ms` : "0ms" }}
                      className={`w-full flex items-start gap-2 rounded-lg border px-3 py-2 text-sm text-left transition-all duration-300 motion-reduce:transition-none ${
                        expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                      } ${optionStyle} ${!answered ? "hover:border-brand-border hover:bg-white cursor-pointer" : "cursor-default"}`}
                    >
                      <span
                        className={`font-semibold shrink-0 ${
                          answered && isCorrect
                            ? "text-green-700"
                            : answered && isPicked
                              ? "text-red-500"
                              : "text-gray-500"
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 min-w-0">{opt}</span>
                      {answered && isCorrect && (
                        <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" strokeWidth={3} />
                      )}
                      {answered && isPicked && !isCorrect && (
                        <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" strokeWidth={3} />
                      )}
                    </button>
                  );
                })
              ) : (
                // No option data for this question — fall back to showing the answer
                <p className="text-sm font-medium text-green-700 leading-snug flex items-start gap-1.5">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={3} />
                  <span>{quiz.correctAnswer}</span>
                </p>
              )}

              {/* Post-answer doorway */}
              {(answered || !hasOptions) && (
                <div className="pt-1 animate-in fade-in duration-300">
                  <Link
                    href={quiz.ctaHref}
                    onClick={(e) => {
                      e.stopPropagation();
                      trackStatsEntry(ctaSource, quiz.ctaTab);
                    }}
                    className="block w-full rounded-full bg-gray-900 text-white hover:bg-gray-800 px-6 py-3 text-center transition-colors"
                  >
                    <span className="text-sm font-medium leading-snug [text-wrap:balance]">
                      {quiz.ctaLabel(answered ? pickedCorrect : null)}
                      <ArrowRight className="inline h-4 w-4 ml-1.5 -mt-0.5" />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
