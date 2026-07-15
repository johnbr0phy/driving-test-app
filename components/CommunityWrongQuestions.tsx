"use client";

import { Lock } from "lucide-react";
import { QuizRow } from "@/components/QuizRow";
import { useTranslation } from "@/contexts/LanguageContext";
import { useCommunityStats } from "@/hooks/useCommunityStats";
import { trackDailyQuizAnswer } from "@/lib/analytics";

const FREE_LIMIT = 2;

interface Props {
  isPremium: boolean;
  onUpgradeClick: () => void;
}

export function CommunityWrongQuestions({ isPremium, onUpgradeClick }: Props) {
  const { t } = useTranslation();
  const { data, loading } = useCommunityStats();

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data || data.questions.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center py-8">
        {t("stats.notEnoughData")}
      </p>
    );
  }

  const visibleQuestions = isPremium
    ? data.questions
    : data.questions.slice(0, FREE_LIMIT);
  const lockedCount = data.questions.length - FREE_LIMIT;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        {t("stats.basedOnAnswers")}{" "}
        <span className="font-medium text-gray-700">
          {data.totalUsers.toLocaleString()} {t("stats.realTestTakers")}
        </span>
      </p>

      <div className="space-y-2">
        {visibleQuestions.map((q) => (
          <QuizRow
            key={q.questionId}
            chipValue={`${q.errorRate}%`}
            chipLabel={t("dashboard.dailyMissedGetWrong")}
            question={q.question}
            options={q.options ?? []}
            correctAnswer={q.correctAnswer}
            onAnswer={(correct) => trackDailyQuizAnswer(correct, "stats_community")}
            renderFooter={({ answered }) => (
              <div className="pt-1 px-1">
                <p className="text-xs text-gray-400">
                  {q.wrong} {t("stats.outOf")} {q.total} {t("stats.peopleGotWrong")}
                </p>
                {answered && q.explanation && (
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed animate-in fade-in duration-300">
                    {q.explanation}
                  </p>
                )}
              </div>
            )}
          />
        ))}
      </div>

      {/* Paywall for free users */}
      {!isPremium && lockedCount > 0 && (
        <div>
          {/* Blurred preview */}
          <div className="relative">
            <div className="space-y-2 overflow-hidden max-h-24 blur-sm pointer-events-none select-none" aria-hidden="true">
              {data.questions.slice(FREE_LIMIT, FREE_LIMIT + 2).map((q) => (
                <div key={q.questionId} className="rounded-xl bg-white border border-gray-100 px-4 py-3 flex items-center gap-4">
                  <div className="shrink-0 text-center min-w-[3rem]">
                    <div className="text-base font-bold text-red-500 tabular-nums leading-none">
                      {q.errorRate}%
                    </div>
                    <div className="text-[9px] uppercase tracking-wide text-gray-400 mt-0.5">
                      {t("dashboard.dailyMissedGetWrong")}
                    </div>
                  </div>
                  <p className="flex-1 min-w-0 text-sm leading-snug font-medium text-gray-900 line-clamp-2">
                    {q.question}
                  </p>
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>

          {/* Lock UI */}
          <div className="flex flex-col items-center pt-2 pb-2 text-center">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-light mb-2">
              <Lock className="h-4 w-4 text-brand" />
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {lockedCount} {t("stats.questionsLocked")}
            </p>
            <p className="text-xs text-gray-500 mb-2.5">
              {t("stats.upgradeToSeeFullList")}
            </p>
            <button
              onClick={onUpgradeClick}
              className="inline-flex items-center px-4 py-2 bg-brand text-white text-sm font-medium rounded-full hover:bg-brand-hover transition-colors"
            >
              {t("common.unlockWithPremium")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
