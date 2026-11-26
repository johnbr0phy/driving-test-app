"use client";

// Stats for the v2 exams (SAT, ACT, NCLEX...), the same page as the v1 exams
// (components/exam/ExamStatsPage.tsx): every question as a re-answerable row,
// sortable by wrong, correct, answered and accuracy. Locked the same way on
// the exams that sell Premium (ExamV2Config.premium): the first
// STATS_FREE_ROWS rows free, the rest behind the paywall; class students
// see everything. Free exams (school and children's tests) are never locked.
// Questions from a held-out practice test are listed only once answered.
// Common Mistakes (?tab=community) appears once the nightly cron has enough
// answers for the exam.

import { Suspense, useMemo, useState } from "react";
import { useStatsView } from "@/lib/statsViews";
import { DailyRankPanel, useRankReturnHref } from "@/components/DailyRank";
import { useRouter, useSearchParams } from "next/navigation";
import { ExamV2Config, QuestionV2 } from "@/lib/v2/types";
import { getBank } from "@/lib/v2/bank";
import { v2Routes } from "@/lib/v2/registry";
import { V2_PAYWALL_PREFIX } from "@/lib/v2/premium";
import { heldOutTests } from "@/lib/v2/training";
import { v2QuestionPerformance } from "@/lib/v2/questionStats";
import { useV2Store } from "@/store/useV2Store";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useIsPremium } from "@/hooks/useIsPremium";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { usePurchaseReturn } from "@/hooks/usePurchaseReturn";
import { useCommunityAvailable, useExamCommunityStats } from "@/hooks/useCommunityStats";
import { inClassFor, useClassMemberships } from "@/hooks/useClassMemberships";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackDailyQuizAnswer } from "@/lib/analytics";
import { showsTestTakerCount } from "@/lib/communityStats";
import { examPaywallCopy } from "@/lib/examPaywallCopy";
import { PaywallModal } from "@/components/PaywallModal";
import { CommonMistakesSoon, GatedStatsList, STATS_FREE_ROWS, StatsPageShell, StatsSortBar, StatsTab, StatsTabs, accuracyChipColor } from "@/components/stats/StatsParts";
import { V2StatsRow, plainStem } from "./V2StatsRow";
import { usePremiumPrice } from "@/hooks/usePremiumPrice";
import { useV2Language, useV2Ui } from "@/lib/v2/ui";

type SortField = "timesAnswered" | "correct" | "wrong" | "accuracy";
type SortDirection = "asc" | "desc";

interface Row {
  question: QuestionV2;
  timesAnswered: number;
  correct: number;
  wrong: number;
  accuracy: number;
}

export function StatsV2({ exam }: { exam: ExamV2Config }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <StatsV2Content exam={exam} />
    </Suspense>
  );
}

function StatsV2Content({ exam }: { exam: ExamV2Config }) {
  const price = usePremiumPrice();
  const ui = useV2Ui();
  const t = ui.results;
  const { t: tr } = useTranslation();
  const lang = useV2Language();
  const routes = v2Routes(exam);
  // From the trophy chip in a drill: back to that question, not the dashboard.
  const returnHref = useRankReturnHref(routes.dashboard);
  const router = useRouter();
  const hydrated = useHydration();
  usePurchaseReturn();
  const results = useV2Store((s) => s.results);
  const drills = useV2Store((s) => s.drills);
  const questionStats = useV2Store((s) => s.questionStats);
  const isGuest = useStore((s) => s.isGuest || !s.userId);

  const { isPremium: paid, ready: premiumReady } = useIsPremium();
  const inClass = inClassFor(useClassMemberships(), exam.id);
  const unlocked = !exam.premium || paid || inClass;
  const upgrade = useUpgradeFlow(`${exam.id}_stats`, routes.stats);
  const openPaywall = (item: string, label: string) =>
    upgrade.openPaywall("full_stats", `${V2_PAYWALL_PREFIX}${exam.id}_${item}`, `${exam.shortName} ${label}`);

  const searchParams = useSearchParams();
  const communityOn = useCommunityAvailable(exam.id);
  const [tab, setTab] = useState<StatsTab>(searchParams.get("tab") === "community" ? "community" : "yours");
  const showCommunity = communityOn && tab === "community";
  const { data: communityRaw, loading: communityLoading } = useExamCommunityStats(exam.id, communityOn);

  const [sortField, setSortField] = useState<SortField>("wrong");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const bank = useMemo(() => getBank(exam.id).questions, [exam.id]);
  const byId = useMemo(() => new Map(bank.map((q) => [q.id, q])), [bank]);
  const perf = useMemo(() => v2QuestionPerformance({ results, drills, questionStats }, exam.id), [results, drills, questionStats, exam.id]);

  const rows = useMemo((): Row[] => {
    const heldOut = new Set(heldOutTests(exam));
    return bank
      .filter((q) => !heldOut.has(q.test) || perf.has(q.id))
      .map((question) => {
        const p = perf.get(question.id);
        const answered = p?.answered ?? 0;
        return {
          question,
          timesAnswered: answered,
          correct: p?.correct ?? 0,
          wrong: p?.wrong ?? 0,
          accuracy: answered ? Math.round(((p?.correct ?? 0) / answered) * 100) : 0,
        };
      });
  }, [bank, perf, exam]);

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      let c = 0;
      switch (sortField) {
        case "timesAnswered": c = a.timesAnswered - b.timesAnswered; break;
        case "correct": c = a.correct - b.correct; break;
        case "wrong": c = a.wrong - b.wrong; break;
        case "accuracy": c = a.accuracy - b.accuracy; break;
      }
      return sortDirection === "asc" ? c : -c;
    });
  }, [rows, sortField, sortDirection]);

  const communityRows = useMemo(
    () => (communityRaw?.questions ?? []).flatMap((c) => (byId.get(c.questionId) ? [{ ...c, question: byId.get(c.questionId)! }] : [])),
    [communityRaw, byId],
  );

  // Stats page traffic (lib/statsViews.ts): one view once the page really shows.
  useStatsView(exam.id, hydrated);
  if (!hydrated) return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  const subtitle = (q: QuestionV2) => `${exam.domainLabels[q.domain] ?? q.domain}${q.skill ? ` · ${q.skill}` : ""}`;

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const gray = "text-gray-500 dark:text-gray-400";
  const chipFor = (item: Row) => {
    if (sortField === "wrong") return { value: `${item.wrong}`, label: tr("stats.wrongLabel"), color: item.wrong > 0 ? "text-red-600 dark:text-red-400" : gray };
    if (sortField === "correct") return { value: `${item.correct}`, label: tr("stats.correctLabel"), color: item.correct > 0 ? "text-green-600 dark:text-green-400" : gray };
    if (sortField === "timesAnswered") return { value: `${item.timesAnswered}`, label: tr("stats.answered"), color: item.timesAnswered > 0 ? "text-gray-700 dark:text-gray-200" : gray };
    if (item.timesAnswered === 0) return { value: "–", label: tr("stats.accuracy"), color: gray };
    return { value: `${item.accuracy}%`, label: tr("stats.accuracy"), color: accuracyChipColor(item.accuracy) };
  };


  return (
    <StatsPageShell backHref={returnHref} backLabel={ui.common.back}>
      <PaywallModal
        examId={exam.id}
        open={upgrade.paywallOpen}
        onOpenChange={upgrade.onOpenChange}
        feature="full_stats"
        onUpgrade={upgrade.handleUpgrade}
        benefits={examPaywallCopy(lang).stats(rows.length, exam.shortName)}
        isGuest={isGuest}
        onSignUp={() => router.push(`/signup?redirect=${encodeURIComponent(routes.stats)}`)}
        headline={exam.composite.max === 100 ? undefined : t.paywallHeadline}
        badge={exam.composite.max === 100 ? undefined : null}
        hideSocialProof
      />

      {/* Today's rank, explained (lib/dailyRank.ts). */}
      <DailyRankPanel continueHref={returnHref} />

      <StatsTabs active={tab} onChange={setTab} yoursLabel={t.tabYours} communityLabel={t.tabCommunity} />

      {tab === "community" && !communityOn ? (
        /* No Common Mistakes data for this exam yet: say it is coming. */
        <CommonMistakesSoon text={tr("stats.commonMistakesSoon")} />
      ) : showCommunity ? (
        <CommunityList
          exam={exam}
          loading={communityLoading || !premiumReady}
          rows={communityRows}
          totalUsers={communityRaw?.totalUsers ?? 0}
          unlocked={unlocked}
          subtitle={subtitle}
          onUnlock={() => openPaywall("community_wrong_questions", "Common Mistakes")}
        />
      ) : (
        <>
          <StatsSortBar
            fields={[
              { field: "wrong" as SortField, label: tr("stats.wrongLabel") },
              { field: "correct" as SortField, label: tr("stats.correctLabel") },
              { field: "timesAnswered" as SortField, label: tr("stats.answered") },
              { field: "accuracy" as SortField, label: tr("stats.accuracy") },
            ]}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            count={<>{sorted.length} {tr("stats.questions")}</>}
          />
          {premiumReady ? (
            <GatedStatsList
              items={sorted}
              isPremium={unlocked}
              keyOf={(item) => item.question.id}
              renderRow={(item) => {
                const chip = chipFor(item);
                return (
                  <V2StatsRow
                    examId={exam.id}
                    question={item.question}
                    chip={chip}
                    subtitle={subtitle(item.question)}
                    footer={
                      <div className={`flex items-center gap-4 text-xs ${gray}`}>
                        <span>{tr("stats.answered")}: <span className="font-semibold text-gray-700 dark:text-gray-200">{item.timesAnswered}</span></span>
                        <span>{tr("stats.correctLabel")}: <span className="font-semibold text-green-600 dark:text-green-400">{item.correct}</span></span>
                        <span>{tr("stats.wrongLabel")}: <span className="font-semibold text-red-600 dark:text-red-400">{item.wrong}</span></span>
                      </div>
                    }
                    onAnswer={(ok) => trackDailyQuizAnswer(ok, `stats_${exam.id}`)}
                  />
                );
              }}
              previewOf={(item) => ({ chip: chipFor(item), text: plainStem(item.question) })}
              lockTitle={`${sorted.length - STATS_FREE_ROWS} ${tr("stats.moreQuestions")}`}
              lockSubtitle={tr("stats.unlockPremiumStats")}
              lockCta={t.unlockPremiumFor(price)}
              onUnlock={() => openPaywall("stats_question_list", "Stats Question List")}
            />
          ) : (
            <div className="h-28 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          )}
        </>
      )}
    </StatsPageShell>
  );
}

function CommunityList({ exam, loading, rows, totalUsers, unlocked, subtitle, onUnlock }: {
  exam: ExamV2Config;
  loading: boolean;
  rows: { questionId: string; question: QuestionV2; wrong: number; total: number; errorRate: number }[];
  totalUsers: number;
  unlocked: boolean;
  subtitle: (q: QuestionV2) => string;
  onUnlock: () => void;
}) {
  const t = useV2Ui().results;
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}
      </div>
    );
  }
  if (rows.length === 0) return <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">{t.notEnoughData}</p>;
  const chip = (r: { errorRate: number }) => ({ value: `${r.errorRate}%`, label: t.getThisWrong, color: "text-red-500 dark:text-red-400" });
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t.communityIntro(exam.shortName)}
        {showsTestTakerCount(totalUsers) && (
          <>
            {t.basedOnAnswersFrom}{" "}
            <span className="font-medium text-gray-700 dark:text-gray-200">{t.realTestTakers(totalUsers.toLocaleString())}</span>
          </>
        )}
      </p>
      <GatedStatsList
        items={rows}
        isPremium={unlocked}
        keyOf={(r) => r.questionId}
        renderRow={(r) => (
          <V2StatsRow
            examId={exam.id}
            question={r.question}
            chip={chip(r)}
            subtitle={subtitle(r.question)}
            footer={<p className="text-xs text-gray-500 dark:text-gray-400">{t.peopleGotWrong(r.wrong, r.total)}</p>}
            onAnswer={(ok) => trackDailyQuizAnswer(ok, `stats_community_${exam.id}`)}
          />
        )}
        previewOf={(r) => ({ chip: chip(r), text: plainStem(r.question) })}
        lockTitle={t.moreLocked(rows.length - STATS_FREE_ROWS)}
        lockSubtitle={t.upgradeFullList}
        lockCta={t.unlockWithPremium}
        onUnlock={onUnlock}
      />
    </div>
  );
}
