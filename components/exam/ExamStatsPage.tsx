"use client";

// Shared stats page for registry exams: the DMV "Your Stats" tab, every
// question in the bank as a re-answerable QuizRow sortable by what you keep
// missing. On US exams it is Premium-gated like the DMV page (the first few
// rows free, the rest behind the paywall), except for students in a class on
// this exam; other countries' exams stay free (checkout is US dollars). A
// Common Mistakes tab joins it once the exam has enough answers
// (lib/communityStats.ts); ?tab=community opens it, guests included.

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import {
  GatedStatsList,
  STATS_FREE_ROWS,
  StatsHeaderCard,
  StatsPageShell,
  StatsSortBar,
  StatsTabs,
  accuracyChipColor,
} from "@/components/stats/StatsParts";

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
      color: accuracyChipColor(item.accuracy),
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
    <StatsPageShell backHref={routes.dashboard} backLabel={t("common.back")}>
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

          {communityOn && (
            <StatsTabs
              active={activeTab}
              onChange={setActiveTab}
              yoursLabel={t("stats.yourStats")}
              communityLabel={t("stats.commonMistakes")}
            />
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
          <StatsHeaderCard
            title={t("stats.yourStats")}
            subtitle={ui.statsSeen(answeredCount, examQuestions.length, exam.shortName)}
          />

          <StatsSortBar
            fields={[
              { field: "wrong" as SortField, label: t("stats.wrongLabel") },
              { field: "correct" as SortField, label: t("stats.correctLabel") },
              { field: "timesAnswered" as SortField, label: t("stats.answered") },
              { field: "accuracy" as SortField, label: t("stats.accuracy") },
            ]}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            count={<>{sortedQuestions.length} {t("stats.questions")}</>}
          />

          <GatedStatsList
            items={sortedQuestions}
            isPremium={isPremium}
            keyOf={(item) => item.question.questionId}
            renderRow={statsRow}
            previewOf={(item) => ({ chip: chipFor(item), text: item.question.question })}
            lockTitle={`${sortedQuestions.length - STATS_FREE_ROWS} ${t("stats.moreQuestions")}`}
            lockSubtitle={t("stats.unlockPremiumStats")}
            lockCta="Unlock Premium for $9.99"
            onUnlock={() => { trackPaywallHit("stats_question_list", "Stats Question List", paywallLocation); trackViewItem(paywallLocation); setPaywallOpen(true); }}
          />
          </>)}
    </StatsPageShell>
  );
}
