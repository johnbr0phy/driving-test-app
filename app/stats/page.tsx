"use client";

import { useEffect, useState, useMemo, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BarChart3, Lock, Users } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import {
  trackBeginCheckout,
  trackDailyQuizAnswer,
  trackPaywallDismissed,
  trackPaywallHit,
  trackViewItem,
} from "@/lib/analytics";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { auth } from "@/lib/firebase";
import { PaywallModal } from "@/components/PaywallModal";
import { Question } from "@/types";
import { getQuestionsData } from "@/lib/testGenerator";
import { CommunityWrongQuestions } from "@/components/CommunityWrongQuestions";
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
  const map: Record<string, string> = {
    A: q.optionA,
    B: q.optionB,
    C: q.optionC,
    D: q.optionD,
  };
  return map[letter] ?? "";
}

function StatsContent() {
  const router = useRouter();
  const hydrated = useHydration();
  const { t, language } = useTranslation();

  const selectedState = useStore((state) => state.selectedState);
  const isGuest = useStore((state) => state.isGuest);
  const getQuestionPerformance = useStore((state) => state.getQuestionPerformance);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);

  const { user } = useAuth();
  const isPremium = hydrated ? hasPremiumAccess() : false;
  const FREE_QUESTION_LIMIT = 5;
  const FREE_QUESTION_LIMIT_MOBILE = 2;

  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"yours" | "community">(
    searchParams.get("tab") === "community" ? "community" : "yours"
  );

  // Users with no answers recorded see an empty "Your Stats" grid — default
  // them to the community tab instead (unless a tab was explicitly requested).
  const autoTabbed = useRef(false);
  useEffect(() => {
    if (!hydrated || autoTabbed.current) return;
    autoTabbed.current = true;
    if (searchParams.get("tab")) return;
    const totalAnswered = getQuestionPerformance().reduce((sum, p) => sum + p.timesAnswered, 0);
    if (totalAnswered === 0) setActiveTab("community");
  }, [hydrated, searchParams, getQuestionPerformance]);

  const [sortField, setSortField] = useState<SortField>("wrong");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [paywallOpen, setPaywallOpen] = useState(false);

  const handleUpgrade = async () => {
    if (!user?.email || !user?.uid) {
      router.push("/signup");
      return;
    }

    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        alert("Authentication error. Please sign in again.");
        return;
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          email: user.email,
          returnUrl: window.location.origin,
          location: "stats_page",
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Checkout error:", data.error);
        alert(`Error: ${data.error}`);
        return;
      }

      if (data.checkoutUrl) {
        trackBeginCheckout("stats_page");
        window.location.href = data.checkoutUrl;
      } else {
        console.error("No checkout URL returned:", data);
        alert("Failed to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please check your connection and try again.");
    }
  };

  // Redirect guests to signup
  useEffect(() => {
    if (hydrated && isGuest) {
      router.push("/signup");
    }
  }, [hydrated, isGuest, router]);

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  // Get all questions for the current state
  const stateQuestions = useMemo(() => {
    if (!selectedState) return [];
    const allQuestions = getQuestionsData(language);
    return allQuestions.filter(
      (q) => q.state === "ALL" || q.state === selectedState
    );
  }, [selectedState, language]);

  // Get performance data and merge with questions
  const questionsWithPerformance = useMemo((): QuestionWithPerformance[] => {
    if (!hydrated) return [];

    const performance = getQuestionPerformance();
    const performanceMap = new Map(
      performance.map((p) => [p.questionId, p])
    );

    return stateQuestions.map((question) => {
      const perf = performanceMap.get(question.questionId);
      return {
        question,
        timesAnswered: perf?.timesAnswered || 0,
        correct: perf?.timesCorrect || 0,
        wrong: perf?.timesWrong || 0,
        accuracy: perf?.accuracy || 0,
      };
    });
  }, [stateQuestions, getQuestionPerformance, hydrated]);

  // Sort questions
  const sortedQuestions = useMemo(() => {
    const sorted = [...questionsWithPerformance].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "timesAnswered":
          comparison = a.timesAnswered - b.timesAnswered;
          break;
        case "correct":
          comparison = a.correct - b.correct;
          break;
        case "wrong":
          comparison = a.wrong - b.wrong;
          break;
        case "accuracy":
          comparison = a.accuracy - b.accuracy;
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
    return sorted;
  }, [questionsWithPerformance, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const chipFor = (item: QuestionWithPerformance, field: SortField = sortField) => {
    if (field === "wrong") {
      return {
        value: `${item.wrong}`,
        label: t("stats.wrongLabel"),
        color: item.wrong > 0 ? "text-red-600" : "text-gray-300",
      };
    }
    if (field === "correct") {
      return {
        value: `${item.correct}`,
        label: t("stats.correctLabel"),
        color: item.correct > 0 ? "text-green-600" : "text-gray-300",
      };
    }
    if (field === "timesAnswered") {
      return {
        value: `${item.timesAnswered}`,
        label: t("stats.answered"),
        color: item.timesAnswered > 0 ? "text-gray-700" : "text-gray-300",
      };
    }
    if (item.timesAnswered === 0) {
      return { value: "–", label: t("stats.accuracy"), color: "text-gray-300" };
    }
    return {
      value: `${item.accuracy}%`,
      label: t("stats.accuracy"),
      color:
        item.accuracy === 100
          ? "text-green-600"
          : item.accuracy >= 50
            ? "text-yellow-600"
            : "text-red-500",
    };
  };

  const statsRow = (item: QuestionWithPerformance) => {
    const chip = chipFor(item);
    return (
      <QuizRow
        key={item.question.questionId}
        chipValue={chip.value}
        chipLabel={chip.label}
        chipColorClass={chip.color}
        question={item.question.question}
        subtitle={t(`categories.${item.question.category}`)}
        options={[
          item.question.optionA,
          item.question.optionB,
          item.question.optionC,
          item.question.optionD,
        ].filter(Boolean)}
        correctAnswer={optionText(item.question, item.question.correctAnswer)}
        onAnswer={(correct) => trackDailyQuizAnswer(correct, "stats_yours")}
        renderFooter={() => (
          <div className="flex items-center gap-4 pt-1 px-1 text-xs text-gray-500">
            <span>
              {t("stats.answered")}:{" "}
              <span className="font-semibold text-gray-700">{item.timesAnswered}</span>
            </span>
            <span>
              {t("stats.correctLabel")}:{" "}
              <span className="font-semibold text-green-600">{item.correct}</span>
            </span>
            <span>
              {t("stats.wrongLabel")}:{" "}
              <span className="font-semibold text-red-600">{item.wrong}</span>
            </span>
          </div>
        )}
      />
    );
  };

  if (!hydrated || !selectedState || isGuest) {
    return null;
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 py-6 max-w-3xl">
        {/* Paywall Modal */}
        <PaywallModal
          open={paywallOpen}
          onOpenChange={(open) => {
            if (open) trackPaywallHit("full_stats", "Full Stats", "stats_page");
            if (!open && paywallOpen) trackPaywallDismissed("stats_page");
            setPaywallOpen(open);
          }}
          feature="full_stats"
          onUpgrade={handleUpgrade}
          isGuest={isGuest}
          onSignUp={() => router.push("/signup")}
        />

        {/* Tab Navigation */}
        <div className="flex gap-1.5 mb-6 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm">
          <button
            onClick={() => setActiveTab("yours")}
            aria-pressed={activeTab === "yours"}
            className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all ${
              activeTab === "yours"
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            {t("stats.yourStats")}
          </button>
          <button
            onClick={() => setActiveTab("community")}
            aria-pressed={activeTab === "community"}
            className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all ${
              activeTab === "community"
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Users className="h-4 w-4" />
            {t("stats.commonMistakes")}
          </button>
        </div>

        {/* Community Tab */}
        {activeTab === "community" && (
          <CommunityWrongQuestions
            isPremium={isPremium}
            onUpgradeClick={() => { trackPaywallHit("community_wrong_questions", "Community Wrong Questions", "stats_page"); trackViewItem("stats_page"); setPaywallOpen(true); }}
          />
        )}

        {/* Your Stats Tab */}
        {activeTab === "yours" && (
          <div>
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
                      ? "bg-gray-900 border-gray-900 text-white font-medium"
                      : "bg-white border-gray-200 text-gray-600"
                  }`}
                >
                  {label}
                  {sortField === field && (
                    <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              ))}
              <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
                {sortedQuestions.length} {t("stats.questions")}
              </span>
            </div>

            {sortedQuestions.length === 0 ? (
              <div className="rounded-xl bg-white border border-gray-100 p-6 text-center text-gray-500">
                {t("stats.noQuestionsAvailable")}
              </div>
            ) : (
              <div className="space-y-2">
                {isPremium
                  ? sortedQuestions.map(statsRow)
                  : sortedQuestions.slice(0, FREE_QUESTION_LIMIT).map((item, idx) => (
                      <div key={item.question.questionId} className={idx >= FREE_QUESTION_LIMIT_MOBILE ? "hidden md:block" : undefined}>
                        {statsRow(item)}
                      </div>
                    ))}

                {/* Paywall for free users */}
                {!isPremium && sortedQuestions.length > FREE_QUESTION_LIMIT && (
                  <div className="relative">
                    {/* Faint preview */}
                    {/* Gradually-fading stack tall enough for the overlaid unlock CTA
                        to breathe — on mobile this pushes the footer below the fold,
                        which is fine. The CTA is overlaid on top of it rather than
                        stacked below, so there's no dead space. */}
                    <div
                      className="space-y-2 overflow-hidden h-60 blur-[2px] opacity-40 pointer-events-none select-none [mask-image:linear-gradient(to_bottom,black,transparent)]"
                      aria-hidden="true"
                    >
                      {sortedQuestions.slice(FREE_QUESTION_LIMIT, FREE_QUESTION_LIMIT + 4).map((item) => {
                        const chip = chipFor(item);
                        return (
                          <div
                            key={item.question.questionId}
                            className="rounded-xl bg-white border border-gray-100 px-4 py-3 flex items-center gap-4"
                          >
                            <div className="shrink-0 text-center min-w-[3rem]">
                              <div className={`text-base font-bold tabular-nums leading-none ${chip.color}`}>
                                {chip.value}
                              </div>
                              <div className="text-[9px] uppercase tracking-wide text-gray-400 mt-0.5">
                                {chip.label}
                              </div>
                            </div>
                            <p className="flex-1 min-w-0 text-sm leading-snug font-medium text-gray-900 line-clamp-2">
                              {item.question.question}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Lock UI, overlaid on top of the faded cards */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                      <div className="rounded-2xl bg-white/80 backdrop-blur-sm px-6 py-4 flex flex-col items-center shadow-sm border border-gray-200">
                        <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-light mb-2">
                          <Lock className="h-4 w-4 text-brand" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {sortedQuestions.length - FREE_QUESTION_LIMIT} {t("stats.moreQuestions")}
                        </p>
                        <p className="text-xs text-gray-500 mb-2.5">
                          {t("stats.unlockPremiumStats")}
                        </p>
                        <button
                          onClick={() => { trackPaywallHit("stats_question_list", "Stats Question List", "stats_page"); trackViewItem("stats_page"); setPaywallOpen(true); }}
                          className="inline-flex items-center px-4 py-2 bg-brand text-white text-sm font-medium rounded-full hover:bg-brand-hover transition-colors shadow-lg"
                        >
                          Unlock Premium — $9.99
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default function StatsPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50" />}>
      <StatsContent />
    </Suspense>
  );
}
