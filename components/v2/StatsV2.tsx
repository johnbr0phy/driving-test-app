"use client";

// Stats page for the v2 exams, built from the same pieces as the registry
// exam stats (components/stats/StatsParts): Your Stats / Common Mistakes tabs,
// the header card, then a summary (tiles, topics weakest first, practice test
// scores) and every question as a re-answerable row sortable by what you keep
// missing. Like ExamStatsPage, US exams show the first rows free and lock the
// rest behind Premium (students in a class on the exam and other countries'
// exams see everything). Progress comes from useV2Store (lib/v2/questionStats),
// so guests see their own local progress too. Common Mistakes appears once the
// nightly cron finds enough answers (lib/communityStats.ts); ?tab=community
// opens it.

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ExamV2Config, QuestionV2 } from "@/lib/v2/types";
import { getBank } from "@/lib/v2/bank";
import { getSectionV2, v2Routes } from "@/lib/v2/registry";
import { drillQuestions, drillStateFor, heldOutTests } from "@/lib/v2/training";
import { goalFor } from "@/lib/v2/goals";
import { V2_PAYWALL_PREFIX } from "@/lib/v2/premium";
import { v2QuestionPerformance } from "@/lib/v2/questionStats";
import { useV2Store, resultsForExam } from "@/store/useV2Store";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useIsPremium } from "@/hooks/useIsPremium";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { usePurchaseReturn } from "@/hooks/usePurchaseReturn";
import { useCommunityAvailable, useExamCommunityStats } from "@/hooks/useCommunityStats";
import { isClassStudent } from "@/lib/classProgress";
import { regionOfTest } from "@/lib/region";
import { trackDailyQuizAnswer } from "@/lib/analytics";
import { PaywallModal } from "@/components/PaywallModal";
import {
  GatedStatsList,
  STATS_FREE_ROWS,
  StatsChip,
  StatsHeaderCard,
  StatsPageShell,
  StatsSortBar,
  StatsTab,
  StatsTabs,
  StatsTile,
  accuracyChipColor,
} from "@/components/stats/StatsParts";
import { V2StatsRow, plainStem } from "./V2StatsRow";

type SortField = "wrong" | "correct" | "answered" | "accuracy";

interface Row {
  question: QuestionV2;
  answered: number;
  correct: number;
  wrong: number;
  accuracy: number;
  mastered: boolean;
}

const GREY = "text-gray-500 dark:text-gray-400";

export function StatsV2({ exam }: { exam: ExamV2Config }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <StatsV2Content exam={exam} />
    </Suspense>
  );
}

function StatsV2Content({ exam }: { exam: ExamV2Config }) {
  const routes = v2Routes(exam);
  const router = useRouter();
  const hydrated = useHydration();
  usePurchaseReturn();
  const results = useV2Store((s) => s.results);
  const drills = useV2Store((s) => s.drills);
  const questionStats = useV2Store((s) => s.questionStats);
  const savedGoal = useV2Store((s) => s.goals[exam.id]);
  const goal = goalFor(exam, savedGoal);
  const isGuest = useStore((s) => s.isGuest || !s.userId);

  // Premium gate, the same rule as ExamStatsPage.
  const { isPremium: paid, ready: premiumReady } = useIsPremium();
  const [inClass, setInClass] = useState(false);
  useEffect(() => setInClass(isClassStudent(exam.id)), [exam.id]);
  const usExam = regionOfTest(exam.id) === "US";
  const unlocked = !usExam || paid || inClass;
  const upgrade = useUpgradeFlow(`${exam.id}_stats`, routes.stats);
  const openPaywall = (item: string, label: string) =>
    upgrade.openPaywall("full_stats", `${V2_PAYWALL_PREFIX}${exam.id}_${item}`, `${exam.shortName} ${label}`);

  const searchParams = useSearchParams();
  const communityOn = useCommunityAvailable(exam.id);
  const [tab, setTab] = useState<StatsTab>(searchParams.get("tab") === "community" ? "community" : "yours");
  const showCommunity = communityOn && tab === "community";
  const { data: communityRaw, loading: communityLoading } = useExamCommunityStats(exam.id, communityOn);

  const [sortField, setSortField] = useState<SortField>("wrong");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const bank = useMemo(() => getBank(exam.id).questions, [exam.id]);
  const byId = useMemo(() => new Map(bank.map((q) => [q.id, q])), [bank]);
  const history = useMemo(() => resultsForExam(results, exam.id), [results, exam.id]);
  const pct = exam.composite.max === 100 ? "%" : "";

  const perf = useMemo(
    () => v2QuestionPerformance({ results, drills, questionStats }, exam.id),
    [results, drills, questionStats, exam.id],
  );

  const topics = useMemo(() => {
    return exam.drills.map((drill) => {
      const questions = drillQuestions(bank, drill, exam);
      const state = drillStateFor(drills, exam.id, drill, questions);
      const inTopic = (section: string, domain: string) => section === drill.section && drill.domains.includes(domain);
      const items = history.flatMap((r) => r.items.filter((it) => inTopic(it.section, it.domain)));
      return {
        drill,
        correct: state.correct + items.filter((it) => it.correct).length,
        answered: state.seen + items.length,
        mastered: state.masteredIds.length,
        size: questions.length,
      };
    });
  }, [exam, bank, drills, history]);

  // Every question you could have met: the whole bank except a held-out test
  // you have not sat (it stays unseen), plus anything you have answered.
  const rows = useMemo((): Row[] => {
    const heldOut = new Set(heldOutTests(exam));
    const masteredIds = new Set(
      Object.entries(drills).filter(([k]) => k.startsWith(`${exam.id}:`)).flatMap(([, d]) => d.masteredIds),
    );
    return bank
      .filter((q) => !heldOut.has(q.test) || perf.has(q.id))
      .map((question) => {
        const p = perf.get(question.id);
        const answered = p?.answered ?? 0;
        return {
          question,
          answered,
          correct: p?.correct ?? 0,
          wrong: p?.wrong ?? 0,
          accuracy: answered ? Math.round(((p?.correct ?? 0) / answered) * 100) : 0,
          mastered: masteredIds.has(question.id),
        };
      });
  }, [bank, exam, drills, perf]);

  const sorted = useMemo(() => {
    const key = (r: Row) => (sortField === "answered" ? r.answered : r[sortField]);
    return [...rows].sort((a, b) => {
      const c = key(a) - key(b);
      return sortDirection === "asc" ? c : -c;
    });
  }, [rows, sortField, sortDirection]);

  const communityRows = useMemo(() => {
    if (!communityRaw) return [];
    return communityRaw.questions.flatMap((c) => {
      const question = byId.get(c.questionId);
      return question ? [{ ...c, question }] : [];
    });
  }, [communityRaw, byId]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const chipFor = (r: Row): StatsChip => {
    if (sortField === "wrong") return { value: `${r.wrong}`, label: "Wrong", color: r.wrong > 0 ? "text-red-600 dark:text-red-400" : GREY };
    if (sortField === "correct") return { value: `${r.correct}`, label: "Correct", color: r.correct > 0 ? "text-green-600 dark:text-green-400" : GREY };
    if (sortField === "answered") return { value: `${r.answered}`, label: "Answered", color: r.answered > 0 ? "text-gray-700 dark:text-gray-200" : GREY };
    if (r.answered === 0) return { value: "–", label: "Accuracy", color: GREY };
    return { value: `${r.accuracy}%`, label: "Accuracy", color: accuracyChipColor(r.accuracy) };
  };

  const subtitleFor = (q: QuestionV2) => (
    <>
      {exam.domainLabels[q.domain] ?? q.domain}
      {q.skill && ` · ${q.skill}`}
    </>
  );

  if (!hydrated) return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  const answeredCount = perf.size;
  const best = history.length ? Math.max(...history.map((r) => r.composite)) : null;
  const totalAnswered = topics.reduce((a, t) => a + t.answered, 0);
  const totalCorrect = topics.reduce((a, t) => a + t.correct, 0);
  const missedCount = rows.filter((r) => r.wrong > 0).length;
  const sortedTopics = [...topics].sort((a, b) => {
    if (!a.answered || !b.answered) return Number(!a.answered) - Number(!b.answered);
    return a.correct / a.answered - b.correct / b.answered;
  });
  const listReady = premiumReady;

  return (
    <StatsPageShell backHref={routes.dashboard} backLabel="Back">
      <PaywallModal
        open={upgrade.paywallOpen}
        onOpenChange={upgrade.onOpenChange}
        feature="full_stats"
        onUpgrade={upgrade.handleUpgrade}
        benefits={[
          `See your accuracy on all ${rows.length} ${exam.shortName} questions`,
          "See what you keep getting wrong, worst first, and retry each one",
          ...(communityOn ? [`The ${exam.shortName} questions most students miss`] : []),
          "Premium on every Tigertest exam, the DMV, SAT and ACT included",
          "One payment, yours forever",
        ]}
        isGuest={isGuest}
        onSignUp={() => router.push(`/signup?redirect=${encodeURIComponent(routes.stats)}`)}
      />

      {communityOn && <StatsTabs active={tab} onChange={setTab} yoursLabel="Your Stats" communityLabel="Common Mistakes" />}

      {showCommunity ? (
        communityLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}
          </div>
        ) : communityRows.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">Not enough data yet. Check back soon.</p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The {exam.shortName} questions students miss most, based on answers from{" "}
              <span className="font-medium text-gray-700 dark:text-gray-200">{(communityRaw?.totalUsers ?? 0).toLocaleString()} real test takers</span>
            </p>
            {listReady && (
              <GatedStatsList
                items={communityRows}
                isPremium={unlocked}
                keyOf={(c) => c.questionId}
                renderRow={(c) => (
                  <V2StatsRow
                    examId={exam.id}
                    question={c.question}
                    chip={{ value: `${c.errorRate}%`, label: "get this wrong", color: "text-red-500 dark:text-red-400" }}
                    subtitle={subtitleFor(c.question)}
                    footer={<p className="text-xs text-gray-500 dark:text-gray-400">{c.wrong} out of {c.total} people got this wrong</p>}
                    onAnswer={(ok) => trackDailyQuizAnswer(ok, `stats_community_${exam.id}`)}
                  />
                )}
                previewOf={(c) => ({ chip: { value: `${c.errorRate}%`, label: "get this wrong", color: "text-red-500 dark:text-red-400" }, text: plainStem(c.question) })}
                lockTitle={`${communityRows.length - STATS_FREE_ROWS} more questions locked`}
                lockSubtitle="Upgrade to see the full list"
                lockCta="Unlock with Premium"
                onUnlock={() => openPaywall("community_wrong_questions", "Common Mistakes")}
              />
            )}
          </div>
        )
      ) : (
        <>
          <StatsHeaderCard
            className="mb-4"
            title="Your Stats"
            subtitle={<>You&apos;ve answered {answeredCount} of {bank.length} {exam.shortName} questions.</>}
          />

          {answeredCount === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">Nothing here yet. Answer a few drill questions or take a practice test and your scores and misses show up here.</p>
              <Link href={routes.dashboard} className="v2-tap mt-4 inline-flex items-center justify-center rounded-xl bg-brand px-5 text-sm font-bold text-white">
                Go to your dashboard
              </Link>
            </div>
          )}

          {answeredCount > 0 && (
            <>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <StatsTile value={`${answeredCount}`} label="Questions seen" />
                <StatsTile value={totalAnswered ? `${Math.round((totalCorrect / totalAnswered) * 100)}%` : "–"} label="Accuracy" />
                <StatsTile value={best === null ? "–" : `${best}${pct}`} label={`Best test · goal ${goal}${pct}`} good={best !== null && best >= goal} />
              </div>

              <h2 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-2">By topic, weakest first</h2>
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 mb-6">
                {sortedTopics.map((t) => {
                  const acc = t.answered ? Math.round((t.correct / t.answered) * 100) : null;
                  return (
                    <Link key={t.drill.key} href={routes.drill(t.drill.key)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-50 truncate">{t.drill.name}</span>
                          <span className={`text-sm font-bold tabular-nums ${accColor(acc)}`}>{acc === null ? "–" : `${acc}%`}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <div className={`h-full rounded-full ${accBar(acc)}`} style={{ width: `${acc ?? 0}%` }} />
                        </div>
                        <div className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                          {t.answered ? `${t.correct} of ${t.answered} right` : "Not started"} · {t.mastered} of {t.size} mastered in the drill
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>

              {history.length > 0 && (
                <>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-2">Practice test scores</h2>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 mb-6">
                    {history.map((r) => (
                      <Link key={`${r.key}:${r.completedAt}`} href={routes.results(r.testNumber)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                            {exam.tests.find((t) => t.number === r.testNumber)?.name ?? `Practice Test ${r.testNumber}`}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">
                            {new Date(r.completedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                            {exam.sections.length > 1 && ` · ${r.sections.map((s) => `${getSectionV2(exam, s.section).shortName} ${s.scaled}`).join(" · ")}`}
                          </div>
                        </div>
                        <span className={`text-lg font-black tabular-nums ${r.composite >= goal ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-gray-50"}`}>
                          {r.composite}{pct}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-1">Every question</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {missedCount > 0
              ? `${missedCount} you've missed, worst first. Tap one to try it again.`
              : "Tap any question to try it. Your misses rise to the top."}
          </p>
          <StatsSortBar
            fields={[
              { field: "wrong" as SortField, label: "Wrong" },
              { field: "correct" as SortField, label: "Correct" },
              { field: "answered" as SortField, label: "Answered" },
              { field: "accuracy" as SortField, label: "Accuracy" },
            ]}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            count={`${sorted.length} questions`}
          />
          {listReady ? (
            <GatedStatsList
              items={sorted}
              isPremium={unlocked}
              keyOf={(r) => r.question.id}
              renderRow={(r) => {
                const chip = chipFor(r);
                return (
                  <V2StatsRow
                    examId={exam.id}
                    question={r.question}
                    chip={chip}
                    subtitle={
                      <>
                        {subtitleFor(r.question)}
                        {r.mastered && r.wrong > 0 && <span className="text-green-600 dark:text-green-400"> · mastered in the drill</span>}
                      </>
                    }
                    footer={
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Answered: <span className="font-semibold text-gray-700 dark:text-gray-200">{r.answered}</span></span>
                        <span>Correct: <span className="font-semibold text-green-600 dark:text-green-400">{r.correct}</span></span>
                        <span>Wrong: <span className="font-semibold text-red-600 dark:text-red-400">{r.wrong}</span></span>
                      </div>
                    }
                    onAnswer={(ok) => trackDailyQuizAnswer(ok, `stats_${exam.id}`)}
                  />
                );
              }}
              previewOf={(r) => ({ chip: chipFor(r), text: plainStem(r.question) })}
              lockTitle={`${sorted.length - STATS_FREE_ROWS} more questions`}
              lockSubtitle="Unlock Premium to see all your question stats"
              lockCta="Unlock Premium for $9.99"
              onUnlock={() => openPaywall("stats_question_list", "Stats Question List")}
            />
          ) : (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}
            </div>
          )}
          <div className="h-6" />
        </>
      )}
    </StatsPageShell>
  );
}

function accColor(acc: number | null) {
  if (acc === null) return "text-gray-400";
  return acc >= 80 ? "text-green-600 dark:text-green-400" : acc >= 60 ? "text-yellow-600 dark:text-yellow-400" : "text-red-500 dark:text-red-400";
}

function accBar(acc: number | null) {
  if (acc === null) return "";
  return acc >= 80 ? "bg-green-500" : acc >= 60 ? "bg-yellow-400" : "bg-red-400";
}
