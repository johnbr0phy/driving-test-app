"use client";

// Shared stats page for registry exams: the DMV "Your Stats" tab, every
// question in the bank as a re-answerable QuizRow sortable by what you keep
// missing. On US exams it is Premium-gated like the DMV page (the first few
// rows free, the rest behind the paywall), except for students in a class on
// this exam; other countries' exams stay free (checkout is US dollars). A
// Common Mistakes tab joins it once the exam has enough answers
// (lib/communityStats.ts); ?tab=community opens it, guests included.

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, BarChart3, Lock, Users } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { trackBeginCheckout, trackDailyQuizAnswer, trackPaywallDismissed, trackPaywallHit, trackViewItem } from "@/lib/analytics";
import { paywallVariantForCheckout } from "@/lib/paywallTest";
import { isClassStudent } from "@/lib/classProgress";
import { regionOfTest } from "@/lib/region";
import { usePurchaseReturn } from "@/hooks/usePurchaseReturn";
import { PaywallModal } from "@/components/PaywallModal";
import { Question } from "@/types";
import { getExamQuestions } from "@/lib/examData";
import { ExamConfig } from "@/lib/exams";
import { QuizRow } from "@/components/QuizRow";
import { QuestionImage } from "@/components/QuestionImage";
import { getSignIdForQuestion } from "@/lib/signImages";
import { useLocalizedExam } from "@/hooks/useLocalizedExam";
import { useCommunityAvailable, useExamCommunityStats } from "@/hooks/useCommunityStats";
import { CommunityWrongQuestionsList } from "@/components/CommunityWrongQuestions";

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

const FREE_QUESTION_LIMIT = 5;
const FREE_QUESTION_LIMIT_MOBILE = 2;

export function ExamStatsPage({ exam }: { exam: ExamConfig }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <ExamStatsContent exam={exam} />
    </Suspense>
  );
}

function ExamStatsContent({ exam: source }: { exam: ExamConfig }) {
  const { exam, routes, ui, lang } = useLocalizedExam(source);
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useHydration();
  const { t } = useTranslation();
  const { user } = useAuth();
  usePurchaseReturn();

  const isGuest = useStore((state) => state.isGuest);
  const getQuestionPerformance = useStore((state) => state.getQuestionPerformance);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);

  const [sortField, setSortField] = useState<SortField>("wrong");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const searchParams = useSearchParams();
  const communityOn = useCommunityAvailable(source.id);
  const [activeTab, setActiveTab] = useState<"yours" | "community">(
    searchParams.get("tab") === "community" ? "community" : "yours"
  );
  const showCommunity = communityOn && activeTab === "community";
  const [inClass, setInClass] = useState(false);
  useEffect(() => setInClass(isClassStudent(source.id) || (!!source.variantOf && isClassStudent(source.variantOf))), [source.id, source.variantOf]);
  const usExam = regionOfTest(source.variantOf ?? source.id) === "US";
  // Other countries' exams are never priced, so they never flash a lock while the store loads.
  const isPremium = !usExam || (hydrated && (hasPremiumAccess() || inClass));

  // Paywall hits and checkouts are keyed "<examId>_stats" (the family id for a
  // state version, since the analytics keys allow no hyphens).
  const paywallLocation = `${source.variantOf ?? source.id}_stats`;

  const handleUpgrade = async () => {
    if (!user?.email || !user?.uid) {
      router.push(routes.signup);
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
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({
          email: user.email,
          returnUrl: window.location.origin,
          returnPath: pathname,
          paywallVariant: paywallVariantForCheckout(),
          location: paywallLocation,
        }),
      });
      const data = await response.json();
      if (data.error) {
        console.error("Checkout error:", data.error);
        alert(`Error: ${data.error}`);
        return;
      }
      if (data.checkoutUrl) {
        trackBeginCheckout(paywallLocation);
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

  // Redirect guests to signup (Common Mistakes is open to them)
  const wantsCommunity = activeTab === "community";
  useEffect(() => {
    if (hydrated && isGuest && !wantsCommunity) router.push(routes.signup);
  }, [hydrated, isGuest, wantsCommunity, router]);

  const examQuestions = useMemo(() => getExamQuestions(exam.id, lang), [exam.id, lang]);

  const { data: communityRaw, loading: communityLoading } = useExamCommunityStats(source.id, communityOn);
  const communityData = useMemo(() => {
    if (!communityRaw) return null;
    const byId = new Map(examQuestions.map((q) => [q.questionId, q]));
    const questions = communityRaw.questions.flatMap((c) => {
      const q = byId.get(c.questionId);
      if (!q) return [];
      return [{
        ...c,
        question: q.question,
        options: [q.optionA, q.optionB, q.optionC, q.optionD].filter(Boolean),
        correctAnswer: optionText(q, q.correctAnswer),
        explanation: q.explanation ?? "",
      }];
    });
    return { questions, totalUsers: communityRaw.totalUsers, updatedAt: null };
  }, [communityRaw, examQuestions]);

  const questionsWithPerformance = useMemo((): QuestionWithPerformance[] => {
    if (!hydrated) return [];
    const performanceMap = new Map(
      getQuestionPerformance(exam.stateCode).map((p) => [p.questionId, p])
    );
    return examQuestions.map((question) => {
      const perf = performanceMap.get(question.questionId);
      return {
        question,
        timesAnswered: perf?.timesAnswered || 0,
        correct: perf?.timesCorrect || 0,
        wrong: perf?.timesWrong || 0,
        accuracy: perf?.accuracy || 0,
      };
    });
  }, [examQuestions, exam.stateCode, getQuestionPerformance, hydrated]);

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
      return { value: `${item.wrong}`, label: t("stats.wrongLabel"), color: item.wrong > 0 ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400" };
    }
    if (sortField === "correct") {
      return { value: `${item.correct}`, label: t("stats.correctLabel"), color: item.correct > 0 ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400" };
    }
    if (sortField === "timesAnswered") {
      return { value: `${item.timesAnswered}`, label: t("stats.answered"), color: item.timesAnswered > 0 ? "text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400" };
    }
    if (item.timesAnswered === 0) {
      return { value: "–", label: t("stats.accuracy"), color: "text-gray-500 dark:text-gray-400" };
    }
    return {
      value: `${item.accuracy}%`,
      label: t("stats.accuracy"),
      color: item.accuracy === 100 ? "text-green-600 dark:text-green-400" : item.accuracy >= 50 ? "text-yellow-600 dark:text-yellow-400" : "text-red-500 dark:text-red-400",
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
        media={getSignIdForQuestion(item.question.questionId) ? <QuestionImage questionId={item.question.questionId} /> : undefined}
        subtitle={exam.categoryLabels[item.question.category] ?? item.question.category}
        options={[item.question.optionA, item.question.optionB, item.question.optionC, item.question.optionD].filter(Boolean)}
        correctAnswer={optionText(item.question, item.question.correctAnswer)}
        onAnswer={(correct) => trackDailyQuizAnswer(correct, `stats_${exam.copy.analyticsKey}`)}
        renderFooter={({ answered }) => (
          <div className="pt-1 px-1 space-y-1.5">
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>
                {t("stats.answered")}: <span className="font-semibold text-gray-700 dark:text-gray-200">{item.timesAnswered}</span>
              </span>
              <span>
                {t("stats.correctLabel")}: <span className="font-semibold text-green-600 dark:text-green-400">{item.correct}</span>
              </span>
              <span>
                {t("stats.wrongLabel")}: <span className="font-semibold text-red-600 dark:text-red-400">{item.wrong}</span>
              </span>
            </div>
            {answered && item.question.explanation && (
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed animate-in fade-in duration-300">
                {item.question.explanation}
              </p>
            )}
          </div>
        )}
      />
    );
  };

  if (!hydrated || (isGuest && !wantsCommunity)) return null;

  const answeredCount = questionsWithPerformance.filter((q) => q.timesAnswered > 0).length;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 py-6 max-w-3xl">
          <PaywallModal
            open={paywallOpen}
            onOpenChange={(open) => {
              if (open) trackPaywallHit("full_stats", "Full Stats", paywallLocation);
              if (!open && paywallOpen) trackPaywallDismissed(paywallLocation);
              setPaywallOpen(open);
            }}
            feature="full_stats"
            onUpgrade={handleUpgrade}
            benefits={[
              `See your accuracy on all ${examQuestions.length} ${exam.shortName} questions`,
              "See what you keep getting wrong, worst first",
              "Full stats on every US exam, the DMV included",
              "One payment, yours forever",
            ]}
            isGuest={isGuest}
            onSignUp={() => router.push(routes.signup)}
          />

          <Link
            href={routes.dashboard}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> {t("common.back")}
          </Link>

          {communityOn && (
            <div className="flex gap-1.5 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1.5 shadow-sm">
              {([
                { tab: "yours" as const, icon: BarChart3, label: t("stats.yourStats") },
                { tab: "community" as const, icon: Users, label: t("stats.commonMistakes") },
              ]).map(({ tab, icon: Icon, label }) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={activeTab === tab}
                  className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all ${
                    activeTab === tab
                      ? "bg-brand text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          )}

          {showCommunity && (
            <CommunityWrongQuestionsList
              isPremium={isPremium}
              data={communityData}
              loading={communityLoading}
              analyticsKey={`stats_community_${exam.copy.analyticsKey}`}
              onUpgradeClick={() => {
                trackPaywallHit("community_wrong_questions", "Community Wrong Questions", paywallLocation);
                trackViewItem(paywallLocation);
                setPaywallOpen(true);
              }}
            />
          )}

          {!showCommunity && (<>
          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 mb-6">
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">{t("stats.yourStats")}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {ui.statsSeen(answeredCount, examQuestions.length, exam.shortName)}
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
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                {label}
                {sortField === field && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {sortedQuestions.length} {t("stats.questions")}
            </span>
          </div>

          <div className="space-y-2">
            {isPremium
              ? sortedQuestions.map(statsRow)
              : sortedQuestions.slice(0, FREE_QUESTION_LIMIT).map((item, idx) => (
                  <div key={item.question.questionId} className={idx >= FREE_QUESTION_LIMIT_MOBILE ? "hidden md:block" : undefined}>
                    {statsRow(item)}
                  </div>
                ))}

            {!isPremium && sortedQuestions.length > FREE_QUESTION_LIMIT && (
              <div className="relative">
                {/* Faded preview of the locked rows, with the unlock CTA overlaid */}
                <div
                  className="space-y-2 overflow-hidden h-60 blur-[2px] opacity-40 pointer-events-none select-none [mask-image:linear-gradient(to_bottom,black,transparent)]"
                  aria-hidden="true"
                >
                  {sortedQuestions.slice(FREE_QUESTION_LIMIT, FREE_QUESTION_LIMIT + 4).map((item) => {
                    const chip = chipFor(item);
                    return (
                      <div
                        key={item.question.questionId}
                        className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-4"
                      >
                        <div className="shrink-0 text-center min-w-[3rem]">
                          <div className={`text-base font-bold tabular-nums leading-none ${chip.color}`}>{chip.value}</div>
                          <div className="text-[9px] uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-0.5">{chip.label}</div>
                        </div>
                        <p className="flex-1 min-w-0 text-sm leading-snug font-medium text-gray-900 dark:text-gray-50 line-clamp-2">
                          {item.question.question}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-4 flex flex-col items-center shadow-sm border border-gray-200 dark:border-gray-800">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-light mb-2">
                      <Lock className="h-4 w-4 text-brand-dark" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-1">
                      {sortedQuestions.length - FREE_QUESTION_LIMIT} {t("stats.moreQuestions")}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2.5">{t("stats.unlockPremiumStats")}</p>
                    <button
                      onClick={() => { trackPaywallHit("stats_question_list", "Stats Question List", paywallLocation); trackViewItem(paywallLocation); setPaywallOpen(true); }}
                      className="inline-flex items-center px-4 py-2 bg-brand text-white text-sm font-medium rounded-full hover:bg-brand-hover transition-colors shadow-lg"
                    >
                      Unlock Premium for $9.99
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          </>)}
        </div>
      </div>
    </div>
  );
}
