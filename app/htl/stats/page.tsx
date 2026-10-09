"use client";

// HTL stats — the DMV "Your Stats" tab: every question in the bank as a
// re-answerable QuizRow, sortable by what you keep missing. No premium gate
// and no community tab (community miss rates are aggregated for DMV only).

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackDailyQuizAnswer } from "@/lib/analytics";
import { Question } from "@/types";
import { getHTLQuestionsData } from "@/lib/htlTestGenerator";
import { HTL_ROUTES } from "@/lib/examRoutes";
import { HTL_STATE_CODE } from "@/lib/htlConfig";
import { QuizRow } from "@/components/QuizRow";

type SortField = "timesAnswered" | "correct" | "wrong" | "accuracy";
type SortDirection = "asc" | "desc";

interface QuestionWithPerformance {
  question: Question;
  timesAnswered: number;
  correct: number;
  wrong: number;
  accuracy: number;
}

function optionText(q: Question, letter: string): string {
  const map: Record<string, string> = { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD };
  return map[letter] ?? "";
}

export default function HTLStatsPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { t } = useTranslation();

  const isGuest = useStore((state) => state.isGuest);
  const getQuestionPerformance = useStore((state) => state.getQuestionPerformance);

  const [sortField, setSortField] = useState<SortField>("wrong");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Redirect guests to signup
  useEffect(() => {
    if (hydrated && isGuest) router.push("/signup");
  }, [hydrated, isGuest, router]);

  const htlQuestions = useMemo(() => getHTLQuestionsData(), []);

  const questionsWithPerformance = useMemo((): QuestionWithPerformance[] => {
    if (!hydrated) return [];
    const performanceMap = new Map(
      getQuestionPerformance(HTL_STATE_CODE).map((p) => [p.questionId, p])
    );
    return htlQuestions.map((question) => {
      const perf = performanceMap.get(question.questionId);
      return {
        question,
        timesAnswered: perf?.timesAnswered || 0,
        correct: perf?.timesCorrect || 0,
        wrong: perf?.timesWrong || 0,
        accuracy: perf?.accuracy || 0,
      };
    });
  }, [htlQuestions, getQuestionPerformance, hydrated]);

  const sortedQuestions = useMemo(() => {
    return [...questionsWithPerformance].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "timesAnswered": comparison = a.timesAnswered - b.timesAnswered; break;
        case "correct": comparison = a.correct - b.correct; break;
        case "wrong": comparison = a.wrong - b.wrong; break;
        case "accuracy": comparison = a.accuracy - b.accuracy; break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [questionsWithPerformance, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const chipFor = (item: QuestionWithPerformance) => {
    if (sortField === "wrong") {
      return { value: `${item.wrong}`, label: t("stats.wrongLabel"), color: item.wrong > 0 ? "text-red-600" : "text-gray-300" };
    }
    if (sortField === "correct") {
      return { value: `${item.correct}`, label: t("stats.correctLabel"), color: item.correct > 0 ? "text-green-600" : "text-gray-300" };
    }
    if (sortField === "timesAnswered") {
      return { value: `${item.timesAnswered}`, label: t("stats.answered"), color: item.timesAnswered > 0 ? "text-gray-700" : "text-gray-300" };
    }
    if (item.timesAnswered === 0) {
      return { value: "–", label: t("stats.accuracy"), color: "text-gray-300" };
    }
    return {
      value: `${item.accuracy}%`,
      label: t("stats.accuracy"),
      color: item.accuracy === 100 ? "text-green-600" : item.accuracy >= 50 ? "text-yellow-600" : "text-red-500",
    };
  };

  if (!hydrated || isGuest) return null;

  const answeredCount = questionsWithPerformance.filter((q) => q.timesAnswered > 0).length;

  return (
    <div className="flex-1 bg-gray-50">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 py-6 max-w-3xl">
          <Link
            href={HTL_ROUTES.dashboard}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> {t("common.back")}
          </Link>

          <div className="rounded-xl bg-white border border-gray-100 p-4 mb-6">
            <h1 className="text-lg font-bold text-gray-900">{t("stats.yourStats")}</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {answeredCount} of {htlQuestions.length} HTL questions seen. Tap any row to answer it again.
            </p>
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
            {[
              { field: "wrong" as SortField, label: t("stats.wrongLabel") },
              { field: "correct" as SortField, label: t("stats.correctLabel") },
              { field: "timesAnswered" as SortField, label: t("stats.answered") },
              { field: "accuracy" as SortField, label: t("stats.accuracy") },
            ].map(({ field, label }) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  sortField === field
                    ? "bg-brand-light border-brand-border text-brand-dark font-medium"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
              >
                {label}
                {sortField === field && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
              {sortedQuestions.length} {t("stats.questions")}
            </span>
          </div>

          <div className="space-y-2">
            {sortedQuestions.map((item) => {
              const chip = chipFor(item);
              return (
                <QuizRow
                  key={item.question.questionId}
                  chipValue={chip.value}
                  chipLabel={chip.label}
                  chipColorClass={chip.color}
                  question={item.question.question}
                  subtitle={t(`categories.${item.question.category}`)}
                  options={[item.question.optionA, item.question.optionB, item.question.optionC, item.question.optionD].filter(Boolean)}
                  correctAnswer={optionText(item.question, item.question.correctAnswer)}
                  onAnswer={(correct) => trackDailyQuizAnswer(correct, "stats_htl")}
                  renderFooter={({ answered }) => (
                    <div className="pt-1 px-1 space-y-1.5">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>
                          {t("stats.answered")}: <span className="font-semibold text-gray-700">{item.timesAnswered}</span>
                        </span>
                        <span>
                          {t("stats.correctLabel")}: <span className="font-semibold text-green-600">{item.correct}</span>
                        </span>
                        <span>
                          {t("stats.wrongLabel")}: <span className="font-semibold text-red-600">{item.wrong}</span>
                        </span>
                      </div>
                      {answered && item.question.explanation && (
                        <p className="text-xs text-gray-500 leading-relaxed animate-in fade-in duration-300">
                          {item.question.explanation}
                        </p>
                      )}
                    </div>
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
