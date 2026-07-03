"use client";

import { useEffect, useState, useMemo, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowUpDown, CheckCircle, XCircle, HelpCircle, Lock, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { trackBeginCheckout, trackPaywallDismissed, trackPaywallHit, trackViewItem } from "@/lib/analytics";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { auth } from "@/lib/firebase";
import { PaywallModal } from "@/components/PaywallModal";
import { states } from "@/data/states";
import { Question } from "@/types";
import { getQuestionsData } from "@/lib/testGenerator";
import { CommunityWrongQuestions } from "@/components/CommunityWrongQuestions";

type SortField = "question" | "timesAnswered" | "correct" | "wrong" | "accuracy";
type SortDirection = "asc" | "desc";

interface QuestionWithPerformance {
  question: Question;
  timesAnswered: number;
  correct: number;
  wrong: number;
  accuracy: number;
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
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

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

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

  // Get tiger face image based on percentage
  const getTigerFace = (percentage: number): string => {
    if (percentage >= 100) return "/tiger_face_01.png";
    if (percentage >= 85) return "/tiger_face_02.png";
    if (percentage >= 70) return "/tiger_face_03.png";
    if (percentage >= 55) return "/tiger_face_04.png";
    if (percentage >= 40) return "/tiger_face_05.png";
    if (percentage >= 25) return "/tiger_face_06.png";
    if (percentage >= 10) return "/tiger_face_07.png";
    return "/tiger_face_08.png";
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
        case "question":
          comparison = a.question.question.localeCompare(b.question.question);
          break;
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
      setSortDirection("asc");
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 font-semibold hover:text-brand transition-colors"
    >
      {children}
      <ArrowUpDown className={`h-4 w-4 ${sortField === field ? "text-brand" : "text-gray-400"}`} />
    </button>
  );

  // Status icon component
  const StatusIcon = ({ item }: { item: QuestionWithPerformance }) => {
    if (item.timesAnswered === 0) {
      return <HelpCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />;
    } else if (item.accuracy === 100) {
      return <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />;
    } else if (item.accuracy === 0) {
      return <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-yellow-500 flex-shrink-0" />;
    }
  };

  if (!hydrated || !selectedState || isGuest) {
    return null;
  }

  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">
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

        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("common.back")}
            </Button>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("yours")}
            className={`flex-1 text-sm font-medium py-2 px-4 rounded-lg transition-all ${
              activeTab === "yours"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("stats.yourStats")}
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`flex-1 text-sm font-medium py-2 px-4 rounded-lg transition-all ${
              activeTab === "community"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
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
        {activeTab === "yours" && <>

        {/* Mobile Sort Controls */}
        <div className="md:hidden flex items-center gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
          {[
            { field: "timesAnswered" as SortField, label: t("stats.answered") },
            { field: "correct" as SortField, label: t("stats.correctLabel") },
            { field: "wrong" as SortField, label: t("stats.wrongLabel") },
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
              {sortField === field && (
                <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Card View - HERES THE DATA */}
        <div className="md:hidden space-y-3">
          {sortedQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                {t("stats.noQuestionsAvailable")}
              </CardContent>
            </Card>
          ) : (
            <>
              {sortedQuestions.slice(0, FREE_QUESTION_LIMIT).map((item) => (
                <Card
                  key={item.question.questionId}
                  className="overflow-hidden cursor-pointer"
                  onClick={() => setExpandedQuestionId(
                    expandedQuestionId === item.question.questionId ? null : item.question.questionId
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <StatusIcon item={item} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug">{item.question.question}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {t(`categories.${item.question.category}`)}
                        </p>
                      </div>
                    </div>
                    {expandedQuestionId === item.question.questionId && (
                      <div className="mb-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-500 uppercase">{t("stats.answers")}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedQuestionId(null); }}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <X className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                        {["A", "B", "C", "D"].map((letter) => {
                          const optionKey = `option${letter}` as keyof Question;
                          const optionText = item.question[optionKey] as string;
                          const isCorrect = item.question.correctAnswer === letter;
                          return (
                            <div
                              key={letter}
                              className={`flex items-start gap-2 p-2 rounded text-sm ${
                                isCorrect
                                  ? "bg-green-50 border border-green-200"
                                  : "bg-gray-50 border border-gray-200"
                              }`}
                            >
                              <span className={`font-semibold ${isCorrect ? "text-green-600" : "text-gray-500"}`}>
                                {letter}.
                              </span>
                              <span className={isCorrect ? "text-green-700" : "text-gray-600"}>
                                {optionText}
                              </span>
                              {isCorrect && (
                                <CheckCircle className="h-4 w-4 text-green-600 ml-auto flex-shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3">
                      <div className="text-center">
                        <div className={`font-semibold ${item.timesAnswered > 0 ? "text-gray-900" : "text-gray-400"}`}>
                          {item.timesAnswered}
                        </div>
                        <div className="text-xs text-gray-500">{t("stats.answered")}</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${item.correct > 0 ? "text-green-600" : "text-gray-400"}`}>
                          {item.correct}
                        </div>
                        <div className="text-xs text-gray-500">{t("stats.correctLabel")}</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${item.wrong > 0 ? "text-red-600" : "text-gray-400"}`}>
                          {item.wrong}
                        </div>
                        <div className="text-xs text-gray-500">{t("stats.wrongLabel")}</div>
                      </div>
                      <div className="text-center">
                        {item.timesAnswered > 0 ? (
                          <div className={`font-semibold ${
                            item.accuracy === 100
                              ? "text-green-600"
                              : item.accuracy >= 50
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}>
                            {item.accuracy}%
                          </div>
                        ) : (
                          <div className="font-semibold text-gray-400">-</div>
                        )}
                        <div className="text-xs text-gray-500">{t("stats.accuracy")}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {!isPremium && sortedQuestions.length > FREE_QUESTION_LIMIT && (
                <>
                <div className="relative">
                  <div className="space-y-3 blur-sm pointer-events-none select-none" aria-hidden="true">
                    {sortedQuestions.slice(FREE_QUESTION_LIMIT, FREE_QUESTION_LIMIT + 3).map((item) => (
                      <Card key={item.question.questionId} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <StatusIcon item={item} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-snug">{item.question.question}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {t(`categories.${item.question.category}`)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3">
                            <div className="text-center">
                              <div className="font-semibold text-gray-400">{item.timesAnswered}</div>
                              <div className="text-xs text-gray-500">{t("stats.answered")}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-400">{item.correct}</div>
                              <div className="text-xs text-gray-500">{t("stats.correctLabel")}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-400">{item.wrong}</div>
                              <div className="text-xs text-gray-500">{t("stats.wrongLabel")}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-400">-</div>
                              <div className="text-xs text-gray-500">{t("stats.accuracy")}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* Gradient fade */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
                </div>

                {/* Lock UI — below the fade in clean white space */}
                <div className="flex flex-col items-center pt-3 pb-2 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-light mb-3">
                    <Lock className="h-4 w-4 text-brand" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {sortedQuestions.length - FREE_QUESTION_LIMIT} {t("stats.moreQuestions")}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {t("stats.unlockPremiumStats")}
                  </p>
                  <button
                    onClick={() => { trackPaywallHit("stats_question_list", "Stats Question List", "stats_page"); trackViewItem("stats_page"); setPaywallOpen(true); }}
                    className="inline-flex items-center px-4 py-2 bg-brand text-white text-sm font-medium rounded-full hover:bg-brand-hover transition-colors"
                  >
                    Unlock Premium — $9.99
                  </button>
                </div>
                </>
              )}
              {isPremium && sortedQuestions.slice(FREE_QUESTION_LIMIT).map((item) => (
                <Card
                  key={item.question.questionId}
                  className="overflow-hidden cursor-pointer"
                  onClick={() => setExpandedQuestionId(
                    expandedQuestionId === item.question.questionId ? null : item.question.questionId
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <StatusIcon item={item} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug">{item.question.question}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {t(`categories.${item.question.category}`)}
                        </p>
                      </div>
                    </div>
                    {expandedQuestionId === item.question.questionId && (
                      <div className="mb-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-500 uppercase">{t("stats.answers")}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedQuestionId(null); }}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <X className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                        {["A", "B", "C", "D"].map((letter) => {
                          const optionKey = `option${letter}` as keyof Question;
                          const optionText = item.question[optionKey] as string;
                          const isCorrect = item.question.correctAnswer === letter;
                          return (
                            <div
                              key={letter}
                              className={`flex items-start gap-2 p-2 rounded text-sm ${
                                isCorrect
                                  ? "bg-green-50 border border-green-200"
                                  : "bg-gray-50 border border-gray-200"
                              }`}
                            >
                              <span className={`font-semibold ${isCorrect ? "text-green-600" : "text-gray-500"}`}>
                                {letter}.
                              </span>
                              <span className={isCorrect ? "text-green-700" : "text-gray-600"}>
                                {optionText}
                              </span>
                              {isCorrect && (
                                <CheckCircle className="h-4 w-4 text-green-600 ml-auto flex-shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3">
                      <div className="text-center">
                        <div className={`font-semibold ${item.timesAnswered > 0 ? "text-gray-900" : "text-gray-400"}`}>
                          {item.timesAnswered}
                        </div>
                        <div className="text-xs text-gray-500">{t("stats.answered")}</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${item.correct > 0 ? "text-green-600" : "text-gray-400"}`}>
                          {item.correct}
                        </div>
                        <div className="text-xs text-gray-500">{t("stats.correctLabel")}</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${item.wrong > 0 ? "text-red-600" : "text-gray-400"}`}>
                          {item.wrong}
                        </div>
                        <div className="text-xs text-gray-500">{t("stats.wrongLabel")}</div>
                      </div>
                      <div className="text-center">
                        {item.timesAnswered > 0 ? (
                          <div className={`font-semibold ${
                            item.accuracy === 100
                              ? "text-green-600"
                              : item.accuracy >= 50
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}>
                            {item.accuracy}%
                          </div>
                        ) : (
                          <div className="font-semibold text-gray-400">-</div>
                        )}
                        <div className="text-xs text-gray-500">{t("stats.accuracy")}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Desktop Table View - HERES THE DATA */}
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>{t("stats.questionPerformance")} ({sortedQuestions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 w-1/2">
                      <SortButton field="question">{t("stats.question")}</SortButton>
                    </th>
                    <th className="text-center py-3 px-4">
                      <SortButton field="timesAnswered">{t("stats.answered")}</SortButton>
                    </th>
                    <th className="text-center py-3 px-4">
                      <SortButton field="correct">{t("stats.correctLabel")}</SortButton>
                    </th>
                    <th className="text-center py-3 px-4">
                      <SortButton field="wrong">{t("stats.wrongLabel")}</SortButton>
                    </th>
                    <th className="text-center py-3 px-4">
                      <SortButton field="accuracy">{t("stats.accuracy")}</SortButton>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedQuestions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">
                        {t("stats.noQuestionsAvailable")}
                      </td>
                    </tr>
                  ) : (
                    <>
                      {(isPremium ? sortedQuestions : sortedQuestions.slice(0, FREE_QUESTION_LIMIT)).map((item) => (
                        <tr
                          key={item.question.questionId}
                          className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setExpandedQuestionId(
                            expandedQuestionId === item.question.questionId ? null : item.question.questionId
                          )}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-start gap-2">
                              <StatusIcon item={item} />
                              <div>
                                <p className="text-sm line-clamp-2">{item.question.question}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {t(`categories.${item.question.category}`)}
                                </p>
                                {expandedQuestionId === item.question.questionId && (
                                  <div className="mt-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                      <p className="text-xs font-semibold text-gray-500 uppercase">{t("stats.answers")}</p>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); setExpandedQuestionId(null); }}
                                        className="p-1 rounded-full hover:bg-gray-200"
                                      >
                                        <X className="h-4 w-4 text-gray-400" />
                                      </button>
                                    </div>
                                    {["A", "B", "C", "D"].map((letter) => {
                                      const optionKey = `option${letter}` as keyof Question;
                                      const optionText = item.question[optionKey] as string;
                                      const isCorrect = item.question.correctAnswer === letter;
                                      return (
                                        <div
                                          key={letter}
                                          className={`flex items-start gap-2 p-2 rounded text-sm ${
                                            isCorrect
                                              ? "bg-green-50 border border-green-200"
                                              : "bg-gray-50 border border-gray-200"
                                          }`}
                                        >
                                          <span className={`font-semibold ${isCorrect ? "text-green-600" : "text-gray-500"}`}>
                                            {letter}.
                                          </span>
                                          <span className={isCorrect ? "text-green-700" : "text-gray-600"}>
                                            {optionText}
                                          </span>
                                          {isCorrect && (
                                            <CheckCircle className="h-4 w-4 text-green-600 ml-auto flex-shrink-0" />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4">
                            <span className={item.timesAnswered > 0 ? "font-semibold" : "text-gray-400"}>
                              {item.timesAnswered}
                            </span>
                          </td>
                          <td className="text-center py-3 px-4">
                            <span className={item.correct > 0 ? "font-semibold text-green-600" : "text-gray-400"}>
                              {item.correct}
                            </span>
                          </td>
                          <td className="text-center py-3 px-4">
                            <span className={item.wrong > 0 ? "font-semibold text-red-600" : "text-gray-400"}>
                              {item.wrong}
                            </span>
                          </td>
                          <td className="text-center py-3 px-4">
                            {item.timesAnswered > 0 ? (
                              <span
                                className={`font-semibold ${
                                  item.accuracy === 100
                                    ? "text-green-600"
                                    : item.accuracy >= 50
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }`}
                              >
                                {item.accuracy}%
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {!isPremium && sortedQuestions.length > FREE_QUESTION_LIMIT && (
              <div className="relative mt-0">
                <div className="overflow-hidden">
                  <table className="w-full blur-sm pointer-events-none select-none" aria-hidden="true">
                    <tbody>
                      {sortedQuestions.slice(FREE_QUESTION_LIMIT, FREE_QUESTION_LIMIT + 3).map((item) => (
                        <tr key={item.question.questionId} className="border-b">
                          <td className="py-3 px-4 w-1/2">
                            <div className="flex items-start gap-2">
                              <StatusIcon item={item} />
                              <div>
                                <p className="text-sm line-clamp-2">{item.question.question}</p>
                                <p className="text-xs text-gray-500 mt-1">{t(`categories.${item.question.category}`)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4"><span className="text-gray-400">{item.timesAnswered}</span></td>
                          <td className="text-center py-3 px-4"><span className="text-gray-400">{item.correct}</span></td>
                          <td className="text-center py-3 px-4"><span className="text-gray-400">{item.wrong}</span></td>
                          <td className="text-center py-3 px-4"><span className="text-gray-400">-</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-light mb-3">
                      <Lock className="h-4 w-4 text-brand" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {sortedQuestions.length - FREE_QUESTION_LIMIT} {t("stats.moreQuestions")}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      {t("stats.unlockPremiumStats")}
                    </p>
                    <button
                      onClick={() => { trackPaywallHit("stats_question_list", "Stats Question List", "stats_page"); trackViewItem("stats_page"); setPaywallOpen(true); }}
                      className="inline-flex items-center px-4 py-2 bg-brand text-white text-sm font-medium rounded-full hover:bg-brand-hover transition-colors"
                    >
                      Unlock Premium — $9.99
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        </>}
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
