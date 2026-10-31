"use client";

// Stats for the v2 exams (SAT, ACT, NCLEX...). Not a question table: these
// exams never repeat a question, so the page answers "what would I score
// today, and where are my next points?" (lib/v2/scoreEstimate.ts):
//
//   1. Score today: an estimate on the exam's own scale against the goal.
//   2. Your fastest points: every topic (drill) ranked by the points it is
//      worth at 90%, with the skills missed in it and a Practice button.
//   3. Practice test scores.
//   4. Mistake notebook: every question got wrong, to retry in place.
//
// Premium (US exams, like the v1 stats; class students and other countries'
// exams see everything): the estimate, the #1 topic and the tests are free,
// which is the hook; the rest of the plan and the notebook past two rows are
// locked, with the points the locked topics are worth shown on the lock.
// Common Mistakes (?tab=community) appears once the nightly cron has enough
// answers for the exam.

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Target, TrendingUp, Users } from "lucide-react";
import { ExamV2Config, QuestionV2 } from "@/lib/v2/types";
import { getBank } from "@/lib/v2/bank";
import { getSectionV2, v2Routes } from "@/lib/v2/registry";
import { goalFor } from "@/lib/v2/goals";
import { V2_PAYWALL_PREFIX } from "@/lib/v2/premium";
import { v2QuestionPerformance } from "@/lib/v2/questionStats";
import { MIN_SECTION_ANSWERS, TARGET_ACCURACY, TopicEstimate, estimateScore } from "@/lib/v2/scoreEstimate";
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
import { GatedStatsList, LockedPreview, STATS_FREE_ROWS, StatsPageShell, StatsTab, StatsTabs } from "@/components/stats/StatsParts";
import { V2StatsRow, plainStem } from "./V2StatsRow";

/** Topics shown before the lock (the #1 move is the free taste of the plan). */
const FREE_TOPICS = 1;
/** Mistakes shown before the lock. */
const FREE_MISTAKES = 2;

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

  // Premium gate: the same rule as the v1 stats page.
  const { isPremium: paid, ready: premiumReady } = useIsPremium();
  const [inClass, setInClass] = useState(false);
  useEffect(() => setInClass(isClassStudent(exam.id)), [exam.id]);
  const unlocked = regionOfTest(exam.id) !== "US" || paid || inClass;
  const upgrade = useUpgradeFlow(`${exam.id}_stats`, routes.stats);
  const openPaywall = (item: string, label: string) =>
    upgrade.openPaywall("full_stats", `${V2_PAYWALL_PREFIX}${exam.id}_${item}`, `${exam.shortName} ${label}`);

  const searchParams = useSearchParams();
  const communityOn = useCommunityAvailable(exam.id);
  const [tab, setTab] = useState<StatsTab>(searchParams.get("tab") === "community" ? "community" : "yours");
  const showCommunity = communityOn && tab === "community";
  const { data: communityRaw, loading: communityLoading } = useExamCommunityStats(exam.id, communityOn);

  const bank = useMemo(() => getBank(exam.id).questions, [exam.id]);
  const byId = useMemo(() => new Map(bank.map((q) => [q.id, q])), [bank]);
  const history = useMemo(() => resultsForExam(results, exam.id), [results, exam.id]);
  const perf = useMemo(() => v2QuestionPerformance({ results, drills, questionStats }, exam.id), [results, drills, questionStats, exam.id]);
  const estimate = useMemo(() => estimateScore(exam, bank, perf), [exam, bank, perf]);

  const mistakes = useMemo(() => {
    const mastered = new Set(Object.entries(drills).filter(([k]) => k.startsWith(`${exam.id}:`)).flatMap(([, d]) => d.masteredIds));
    return [...perf.entries()]
      .filter(([id, p]) => p.wrong > 0 && byId.has(id))
      .map(([id, p]) => ({ question: byId.get(id)!, wrong: p.wrong, mastered: mastered.has(id) }))
      .sort((a, b) => Number(a.mastered) - Number(b.mastered) || b.wrong - a.wrong);
  }, [perf, drills, byId, exam.id]);

  const communityRows = useMemo(
    () => (communityRaw?.questions ?? []).flatMap((c) => (byId.get(c.questionId) ? [{ ...c, question: byId.get(c.questionId)! }] : [])),
    [communityRaw, byId],
  );

  if (!hydrated) return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  const pct = exam.composite.max === 100;
  const fmt = (n: number) => (pct ? `${n}%` : `${n}`);
  // Gains are estimates too, so they never read as a promise.
  const pts = (n: number) => (pct ? `about +${n}%` : `about +${n} pts`);
  // "Not affiliated with ACT, Inc." from the exam's own footer line.
  const affiliation = exam.copy.sourceLine.match(/not affiliated[^.]*\./i)?.[0];
  const notAffiliated = affiliation ? affiliation[0].toUpperCase() + affiliation.slice(1) : "";
  const subtitle = (q: QuestionV2) => `${exam.domainLabels[q.domain] ?? q.domain}${q.skill ? ` · ${q.skill}` : ""}`;

  const plan = estimate.topics.filter((t) => t.gain > 0 || t.answered > 0);
  const freePlan = unlocked ? plan : plan.slice(0, FREE_TOPICS);
  const lockedPlan = unlocked ? [] : plan.slice(FREE_TOPICS);
  // Topic gains overlap, so their sum is capped at the room left on the scale.
  const headroom = exam.composite.max - (estimate.composite ?? exam.composite.min);
  const lockedGain = Math.min(headroom, lockedPlan.reduce((a, t) => a + t.gain, 0));
  const lastTest = history[0];

  return (
    <StatsPageShell backHref={routes.dashboard} backLabel="Back">
      <PaywallModal
        open={upgrade.paywallOpen}
        onOpenChange={upgrade.onOpenChange}
        feature="full_stats"
        onUpgrade={upgrade.handleUpgrade}
        benefits={[
          `Your full ${exam.shortName} study plan, every topic ranked by the points it's worth`,
          "The exact skills you keep missing in each topic",
          "Every mistake saved, to retry until it sticks",
          "Full stats on every US exam, the DMV included",
          "One payment, yours forever",
        ]}
        isGuest={isGuest}
        onSignUp={() => router.push(`/signup?redirect=${encodeURIComponent(routes.stats)}`)}
      />

      {communityOn && <StatsTabs active={tab} onChange={setTab} yoursLabel="Your Stats" communityLabel="Common Mistakes" />}

      {showCommunity ? (
        <CommunityList
          exam={exam}
          loading={communityLoading || !premiumReady}
          rows={communityRows}
          totalUsers={communityRaw?.totalUsers ?? 0}
          unlocked={unlocked}
          subtitle={subtitle}
          onUnlock={() => openPaywall("community_wrong_questions", "Common Mistakes")}
        />
      ) : estimate.answered === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 text-center">
          <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-brand-light flex items-center justify-center">
            <Target className="h-5 w-5 text-brand-dark" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">Estimate your {exam.shortName} score</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Answer {estimate.sections.length > 1 ? `${MIN_SECTION_ANSWERS} questions in each section` : `${MIN_SECTION_ANSWERS} questions`} and we&apos;ll estimate your score and show you where your next points are.
          </p>
          <Link href={routes.dashboard} className="v2-tap mt-4 inline-flex items-center justify-center rounded-xl bg-brand px-5 text-sm font-bold text-white">
            Start a drill
          </Link>
        </div>
      ) : (
        <>
          {/* 1. Score today */}
          <section className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 mb-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Estimated {exam.shortName} score</p>
            {estimate.composite !== null ? (
              <>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-5xl font-black tabular-nums text-gray-900 dark:text-gray-50">{fmt(estimate.composite)}</span>
                  <span className={`text-sm font-semibold ${estimate.composite >= goal ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-300"}`}>
                    {estimate.composite >= goal ? `At your goal of ${fmt(goal)}` : `Goal ${fmt(goal)} · ${pct ? `${goal - estimate.composite} points` : goal - estimate.composite} to go`}
                  </span>
                </div>
                <ScoreBar min={exam.composite.min} max={exam.composite.max} value={estimate.composite} goal={goal} />
              </>
            ) : (
              <>
                <div className="mt-1 text-5xl font-black text-gray-300 dark:text-gray-700">–</div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {estimate.sections
                    .filter((s) => s.needed > 0)
                    .map((s) => `${s.needed} more ${estimate.sections.length > 1 ? `${s.section.shortName} ` : ""}question${s.needed === 1 ? "" : "s"}`)
                    .join(" and ")}{" "}
                  to see your score.
                </p>
              </>
            )}
            {estimate.sections.length > 1 && (
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {estimate.sections.map((s) => (
                  <div key={s.section.key} className="rounded-xl bg-gray-50 dark:bg-gray-800 px-3 py-2">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{s.section.shortName}</div>
                    <div className="text-lg font-bold tabular-nums text-gray-900 dark:text-gray-50">
                      {s.scaled === null ? "–" : s.section.scale.max === 100 ? `${s.scaled}%` : s.scaled}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-3 text-[11px] leading-snug text-gray-500 dark:text-gray-400">
              An estimate from the {estimate.answered} practice question{estimate.answered === 1 ? "" : "s"} you&apos;ve answered (first try), not an official score.
              {notAffiliated && <> {notAffiliated}</>}
              {lastTest && <> Your last practice test: <span className="font-semibold">{fmt(lastTest.composite)}</span>.</>}
            </p>
          </section>

          {/* 2. Your fastest points */}
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-50">Your fastest points</h2>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">estimated, if you get each topic to {Math.round(TARGET_ACCURACY * 100)}%</span>
          </div>
          {plan.length === 0 ? (
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Answer a few more questions and your plan shows up here.</p>
          ) : (
            <div className="space-y-2 mb-6">
              {premiumReady ? (
                <>
                  {freePlan.map((t, i) => (
                    <TopicCard key={t.drill.key} rank={i + 1} topic={t} pts={pts} href={routes.drill(t.drill.key)} open={i === 0} />
                  ))}
                  {lockedPlan.length > 0 && (
                    <LockedPreview
                      rows={lockedPlan.slice(0, 4).map((t) => ({
                        key: t.drill.key,
                        chip: { value: "+??", label: pct ? "points" : "pts", color: "text-brand-dark" },
                        text: t.drill.name,
                      }))}
                      title={lockedGain > 0 ? `${lockedPlan.length} more topics worth an estimated ${pct ? `+${lockedGain}%` : `+${lockedGain}\u00a0pts`}` : `${lockedPlan.length} more topics in your plan`}
                      subtitle="See every topic ranked by the points it's worth, and the exact skills you miss"
                      cta="Unlock your full plan · $9.99"
                      onUnlock={() => openPaywall("stats_plan", "Study Plan")}
                    />
                  )}
                </>
              ) : (
                <div className="h-28 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
              )}
            </div>
          )}

          {/* 3. Practice tests */}
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-50 mb-2">Practice tests</h2>
          {history.length === 0 ? (
            <Link href={routes.dashboard} className="mb-6 flex items-center gap-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
              <TrendingUp className="h-4 w-4 text-brand-dark shrink-0" />
              <span className="flex-1 text-sm text-gray-700 dark:text-gray-200">Take a full practice test for a real timed score.</span>
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </Link>
          ) : (
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
                  <span className={`text-lg font-black tabular-nums ${r.composite >= goal ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-gray-50"}`}>{fmt(r.composite)}</span>
                  <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          )}

          {/* 4. Mistake notebook */}
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-50">Mistake notebook</h2>
            {mistakes.length > 0 && <span className="text-[11px] text-gray-500 dark:text-gray-400">{mistakes.length} question{mistakes.length === 1 ? "" : "s"}</span>}
          </div>
          {mistakes.length === 0 ? (
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Nothing yet. Every question you miss lands here so you can retry it.</p>
          ) : (
            <>
              <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">Every question you&apos;ve missed. Tap one to try it again.</p>
              <div className="space-y-2 mb-6">
                {premiumReady &&
                  (unlocked ? mistakes : mistakes.slice(0, FREE_MISTAKES)).map((m) => (
                    <V2StatsRow
                      key={m.question.id}
                      examId={exam.id}
                      question={m.question}
                      chip={{ value: `${m.wrong}`, label: m.wrong === 1 ? "miss" : "misses", color: m.mastered ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400" }}
                      subtitle={
                        <>
                          {subtitle(m.question)}
                          {m.mastered && <span className="text-green-600 dark:text-green-400"> · mastered since</span>}
                        </>
                      }
                      onAnswer={(ok) => trackDailyQuizAnswer(ok, `stats_${exam.id}`)}
                    />
                  ))}
                {premiumReady && !unlocked && mistakes.length > FREE_MISTAKES && (
                  <LockedPreview
                    rows={mistakes.slice(FREE_MISTAKES, FREE_MISTAKES + 4).map((m) => ({
                      key: m.question.id,
                      chip: { value: `${m.wrong}`, label: m.wrong === 1 ? "miss" : "misses", color: "text-red-600 dark:text-red-400" },
                      text: plainStem(m.question),
                    }))}
                    title={`${mistakes.length - FREE_MISTAKES} more mistakes saved`}
                    subtitle="Retry every question you've missed until it sticks"
                    cta="Unlock Premium for $9.99"
                    onUnlock={() => openPaywall("stats_mistakes", "Mistake Notebook")}
                  />
                )}
              </div>
            </>
          )}

          {communityOn && (
            <button
              type="button"
              onClick={() => setTab("community")}
              className="w-full rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3 text-left hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 text-brand-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 dark:text-gray-50">Common Mistakes</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">The {exam.shortName} questions most students get wrong</div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0" />
            </button>
          )}
          <div className="h-6" />
        </>
      )}
    </StatsPageShell>
  );
}

function ScoreBar({ min, max, value, goal }: { min: number; max: number; value: number; goal: number }) {
  const at = (n: number) => `${Math.max(0, Math.min(100, ((n - min) / (max - min || 1)) * 100))}%`;
  return (
    <div className="mt-3">
      <div className="relative h-2.5 rounded-full bg-gray-100 dark:bg-gray-800">
        <div className={`absolute inset-y-0 left-0 rounded-full ${value >= goal ? "bg-green-500" : "bg-brand"}`} style={{ width: at(value) }} />
        <div className="absolute -top-1 w-0.5 rounded bg-gray-900 dark:bg-gray-50" style={{ left: at(goal), height: "18px" }} aria-hidden="true" />
      </div>
      <div className="mt-1 flex justify-between text-[10px] tabular-nums text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function TopicCard({ rank, topic, pts, href, open }: { rank: number; topic: TopicEstimate; pts: (n: number) => string; href: string; open: boolean }) {
  const [expanded, setExpanded] = useState(open);
  const acc = topic.accuracy === null ? null : Math.round(topic.accuracy * 100);
  const missedSkills = topic.skills.filter((s) => s.missed > 0).slice(0, 3);
  return (
    <div className={`rounded-xl border bg-white dark:bg-gray-900 ${rank === 1 ? "border-brand-border shadow-sm" : "border-gray-100 dark:border-gray-800"}`}>
      <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} className="w-full flex items-center gap-3 px-4 py-3 text-left">
        <span className={`shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${rank === 1 ? "bg-brand text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}>{rank}</span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-semibold text-gray-900 dark:text-gray-50 truncate">{topic.drill.name}</span>
          <span className="block text-[11px] text-gray-500 dark:text-gray-400">
            {acc === null ? "Not tried yet" : `${acc}% right first try · ${topic.answered} answered`}
          </span>
        </span>
        {topic.gain > 0 && (
          <span className="shrink-0 rounded-full bg-green-50 dark:bg-green-950 px-2.5 py-1 text-xs font-bold tabular-nums text-green-700 dark:text-green-300">{pts(topic.gain)}</span>
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-3 -mt-1">
          {acc !== null && (
            <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-3">
              <div className={`h-full rounded-full ${acc >= 80 ? "bg-green-500" : acc >= 60 ? "bg-yellow-400" : "bg-red-400"}`} style={{ width: `${acc}%` }} />
            </div>
          )}
          {missedSkills.length > 0 && (
            <ul className="mb-3 space-y-1">
              {missedSkills.map((s) => (
                <li key={s.skill} className="flex items-baseline justify-between gap-3 text-xs">
                  <span className="text-gray-700 dark:text-gray-200 truncate">{s.skill}</span>
                  <span className="shrink-0 tabular-nums text-red-600 dark:text-red-400">missed {s.missed} of {s.answered}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href={href} className="v2-tap inline-flex w-full items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
            Practice {topic.drill.name}
          </Link>
        </div>
      )}
    </div>
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
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}
      </div>
    );
  }
  if (rows.length === 0) return <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">Not enough data yet. Check back soon.</p>;
  const chip = (r: { errorRate: number }) => ({ value: `${r.errorRate}%`, label: "get this wrong", color: "text-red-500 dark:text-red-400" });
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        The {exam.shortName} questions students miss most, based on answers from{" "}
        <span className="font-medium text-gray-700 dark:text-gray-200">{totalUsers.toLocaleString()} real test takers</span>
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
            footer={<p className="text-xs text-gray-500 dark:text-gray-400">{r.wrong} out of {r.total} people got this wrong</p>}
            onAnswer={(ok) => trackDailyQuizAnswer(ok, `stats_community_${exam.id}`)}
          />
        )}
        previewOf={(r) => ({ chip: chip(r), text: plainStem(r.question) })}
        lockTitle={`${rows.length - STATS_FREE_ROWS} more questions locked`}
        lockSubtitle="Upgrade to see the full list"
        lockCta="Unlock with Premium"
        onUnlock={onUnlock}
      />
    </div>
  );
}
