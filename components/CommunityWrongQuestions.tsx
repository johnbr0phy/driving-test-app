"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ChevronDown, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

interface WrongQuestion {
  questionId: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  errorRate: number; // 0-100
  wrong: number;
  total: number;
}

interface CommunityData {
  questions: WrongQuestion[];
  totalUsers: number;
  updatedAt: string;
}

const FREE_LIMIT = 2;

// Three stages: collapsed → options visible → answer revealed
type RevealStage = "collapsed" | "options" | "answer";

interface Props {
  isPremium: boolean;
  onUpgradeClick: () => void;
}

export function CommunityWrongQuestions({ isPremium, onUpgradeClick }: Props) {
  const { t, language } = useTranslation();
  const [data, setData] = useState<CommunityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [revealState, setRevealState] = useState<Record<string, RevealStage>>({});

  const getStage = (id: string): RevealStage => revealState[id] || "collapsed";

  const cycleStage = (id: string) => {
    setRevealState((prev) => {
      const current = prev[id] || "collapsed";
      const next: RevealStage =
        current === "collapsed" ? "options" : current === "options" ? "answer" : "collapsed";
      return { ...prev, [id]: next };
    });
  };

  useEffect(() => {
    async function load() {
      try {
        const url = language === "es" ? "/api/community-stats?lang=es" : "/api/community-stats";
        const res = await fetch(url);
        const json = await res.json();
        if (json.questions?.length > 0) setData(json as CommunityData);
      } catch (e) {
        console.error("Failed to load community stats:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [language]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
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
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t("stats.basedOnAnswers")}{" "}
        <span className="font-medium text-gray-700 dark:text-gray-300">{data.totalUsers.toLocaleString()} {t("stats.realTestTakers")}</span>
      </p>

      <div className="space-y-3">
        {visibleQuestions.map((q, i) => {
          const stage = getStage(q.questionId);
          return (
            <Card
              key={q.questionId}
              className="border-gray-100 dark:border-gray-700 cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => cycleStage(q.questionId)}
            >
              <CardContent className="p-4">
                {/* Question + error rate — always visible */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-sm font-bold text-gray-400 mt-0.5 shrink-0">
                      #{i + 1}
                    </span>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug">
                      {q.question}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-red-500">
                      {q.errorRate}%
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        stage !== "collapsed" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Error rate bar — always visible */}
                <div className="mt-3 ml-7">
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full"
                      style={{ width: `${q.errorRate}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {q.wrong} {t("stats.outOf")} {q.total} {t("stats.peopleGotWrong")}
                  </p>
                </div>

                {/* Hint text when collapsed */}
                {stage === "collapsed" && (
                  <p className="text-xs text-brand mt-3 ml-7 font-medium">
                    {t("stats.tapShowOptions")}
                  </p>
                )}

                {/* Stage 2: Show options without revealing correct answer */}
                {stage === "options" && (
                  <div className="mt-3 ml-7 space-y-1.5">
                    {q.options && q.options.length > 0 ? (
                      <>
                        {q.options.map((opt, idx) => {
                          const letter = ["A", "B", "C", "D"][idx];
                          return (
                            <div
                              key={idx}
                              className="flex items-start gap-2 rounded-lg px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            >
                              <span className="font-semibold shrink-0 text-gray-500 dark:text-gray-400">
                                {letter}
                              </span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                        <p className="text-xs text-brand mt-2 font-medium flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {t("stats.tapShowAnswer")}
                        </p>
                      </>
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <EyeOff className="h-4 w-4 text-gray-400" />
                          {t("stats.tapShowAnswer")}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Stage 3: Show options with correct answer highlighted */}
                {stage === "answer" && (
                  <div className="mt-3 ml-7 space-y-1.5">
                    {q.options && q.options.length > 0 ? (
                      <>
                        {q.options.map((opt, idx) => {
                          const letter = ["A", "B", "C", "D"][idx];
                          const isCorrect = opt === q.correctAnswer;
                          return (
                            <div
                              key={idx}
                              className={`flex items-start gap-2 rounded-lg px-3 py-1.5 text-sm ${
                                isCorrect
                                  ? "bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 text-green-900 dark:text-green-300"
                                  : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              <span className={`font-semibold shrink-0 ${isCorrect ? "text-green-700 dark:text-green-400" : "text-gray-400"}`}>
                                {letter}
                              </span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                        {q.explanation && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 pt-1 leading-relaxed px-1">
                            {q.explanation}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-lg px-3 py-2">
                        <p className="text-xs text-green-700 dark:text-green-400 font-medium mb-0.5">
                          {t("stats.correctAnswer")}
                        </p>
                        <p className="text-sm text-green-900 dark:text-green-300">{q.correctAnswer}</p>
                        {q.explanation && (
                          <p className="text-xs text-green-700 dark:text-green-400 mt-1 leading-relaxed">
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                      {t("stats.tapToCollapse")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Paywall for free users */}
      {!isPremium && lockedCount > 0 && (
        <div>
          {/* Blurred preview */}
          <div className="relative">
            <div className="space-y-3 overflow-hidden max-h-36 blur-sm pointer-events-none select-none">
              {data.questions.slice(FREE_LIMIT, FREE_LIMIT + 1).map((q, i) => (
                <Card key={q.questionId} className="border-gray-100 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-sm font-bold text-gray-400 mt-0.5 shrink-0">
                          #{FREE_LIMIT + i + 1}
                        </span>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug">{q.question}</p>
                      </div>
                      <span className="shrink-0 text-sm font-bold text-red-500">{q.errorRate}%</span>
                    </div>
                    <div className="mb-3 ml-7">
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full" style={{ width: `${q.errorRate}%` }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-background to-transparent pointer-events-none" />
          </div>

          {/* Lock UI */}
          <div className="flex flex-col items-center pt-3 pb-2 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-light mb-3">
              <Lock className="h-4 w-4 text-brand" />
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {lockedCount} {t("stats.questionsLocked")}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
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
