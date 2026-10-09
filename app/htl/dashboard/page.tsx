"use client";

// HTL dashboard — the DMV dashboard's step list (training sets, then
// practice tests, each with stamps and a per-test attempt drop-down with the
// score chart and miss drill), mapped onto the HTL exam: five content-area
// training sets and four blueprint-weighted tests, all free.

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import { ProgressCard, Collapse } from "@/components/dashboard/ProgressCard";
import { AttemptChart, sessionsToAttemptPoints } from "@/components/AttemptChart";
import { computeMissSummary } from "@/lib/missedQuestions";
import { HTL_ROUTES } from "@/lib/examRoutes";
import {
  HTL_PASS_PERCENTAGE,
  HTL_QUESTIONS_PER_TEST,
  HTL_STATE_CODE,
  HTL_TRAINING_SETS,
} from "@/lib/htlConfig";

const PASS_SCORE = Math.ceil((HTL_PASS_PERCENTAGE / 100) * HTL_QUESTIONS_PER_TEST); // 35/50

const AREA_WEIGHT: Record<string, string> = {
  fixation: "15–25% of the exam",
  processing: "10–20% of the exam",
  embeddingMicrotomy: "15–25% of the exam",
  staining: "30–40% of the exam",
  laboratoryOperations: "10–15% of the exam",
};

// Hero copy per completed-step count (0..9). HTL is English-only, so this
// lives here instead of i18n.
const HERO_TITLES = [
  "Complete all 9 steps",
  "Good start. 1 of 9 done",
  "2 of 9 done",
  "3 of 9 done",
  "Nearly halfway there",
  "More than halfway",
  "6 of 9, keep going",
  "7 of 9, almost there",
  "One left",
  "You're ready",
];
const HERO_SUBS = [
  "Five content areas, four full tests. Work the outline the way ASCP weights it.",
  "Mastery first, then test. The sets mirror the ASCP content guideline.",
  "You're building the foundation. Staining is the biggest section, don't skip it.",
  "Every set you master is a slice of the real exam you've already seen.",
  "Halfway through the outline. The practice tests will show where you stand.",
  "Most of the material is behind you. Now prove it under test conditions.",
  "Fix the misses, then retake. That's how the pass line gets closer.",
  "Two steps left. Each test is a fresh 50 weighted like the real thing.",
  "One more and you've worked the whole blueprint.",
  "Full prep done. Go book your exam window with ASCP.",
];

function getTigerFace(complete: number, total: number): string {
  const pct = Math.round((complete / total) * 100);
  if (pct >= 100) return "/tiger_face_01.png";
  if (pct >= 75) return "/tiger_face_02.png";
  if (pct >= 50) return "/tiger_face_04.png";
  if (pct >= 25) return "/tiger_face_06.png";
  return "/tiger_face_08.png";
}

function HTLDashboardContent() {
  const router = useRouter();
  const hydrated = useHydration();
  const { t } = useTranslation();
  const isGuest = useStore((state) => state.isGuest);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const completeTest = useStore((state) => state.completeTest);
  const completedTests = useStore((state) => state.completedTests);

  const missSummary = computeMissSummary(
    hydrated ? completedTests : [],
    HTL_STATE_CODE,
    HTL_ROUTES.testIds
  );
  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  // Auto-complete any test where all questions are answered (handles stuck state)
  useEffect(() => {
    if (!hydrated) return;
    HTL_ROUTES.testIds.forEach((testId) => {
      const test = getCurrentTest(testId);
      if (!test || test.questions.length === 0) return;
      const answeredCount = Object.keys(test.answers).length;
      if (answeredCount === test.questions.length) {
        let correctCount = 0;
        test.questions.forEach((q, i) => {
          if (test.answers[i] === q.correctAnswer) correctCount++;
        });
        completeTest(testId, correctCount, test.questions, test.answers);
      }
    });
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  const trainingSetComplete = (id: number) => hydrated && getTrainingSetProgress(id).complete;
  const testComplete = (testId: number) => {
    if (!hydrated) return false;
    const stats = getTestAttemptStats(testId);
    return stats ? stats.bestScore >= PASS_SCORE : false;
  };

  const completedSteps = [
    ...HTL_TRAINING_SETS.map((s) => trainingSetComplete(s.id)),
    ...HTL_ROUTES.testIds.map(testComplete),
  ].filter(Boolean).length;
  const totalSteps = HTL_TRAINING_SETS.length + HTL_ROUTES.testIds.length;
  const anyProgress = completedSteps > 0 || HTL_TRAINING_SETS.some((s) => hydrated && getTrainingSetProgress(s.id).correct > 0);

  return (
    <div className="flex-1 bg-gray-50">
      <div className="relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
      <div className="relative container mx-auto px-4 sm:px-6 py-6 pb-10 max-w-lg md:max-w-2xl lg:max-w-4xl">

        {/* Sign-up prompt for guests */}
        {isGuest && (
          <Card className="mb-4 bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📊</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">{t("common.signUp")}</span> to save your HTL progress and track every question you miss
                  </p>
                  <Link href={HTL_ROUTES.signup} className="text-xs text-brand hover:text-brand-dark font-medium mt-1 inline-block">
                    {t("dashboard.createFreeAccount")}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hero card with progress */}
        <div className="rounded-xl bg-white border border-gray-100 p-4 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src={getTigerFace(completedSteps, totalSteps)}
              alt="Tiger mascot"
              width={48}
              height={48}
              className="w-12 h-12 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900">{HERO_TITLES[completedSteps]}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{HERO_SUBS[completedSteps]}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold tabular-nums text-gray-900">{completedSteps}/{totalSteps}</div>
              <div className="text-xs text-gray-400">{t("dashboard.stampComplete").toLowerCase()}</div>
            </div>
          </div>
        </div>

        {/* Training sets, one per ASCP content area */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
          Train by content area
        </p>
        <div className="mb-6 space-y-1.5">
          {HTL_TRAINING_SETS.map((def, index) => {
            const progress = hydrated
              ? getTrainingSetProgress(def.id)
              : { correct: 0, total: def.size, complete: false };
            const isStartHere = index === 0 && !anyProgress;
            return (
              <ProgressCard
                key={def.id}
                title={def.name}
                subtitle={`${progress.correct}/${progress.total} · ${AREA_WEIGHT[def.category]}`}
                completed={progress.complete}
                stepNumber={index + 1}
                stamp={
                  progress.complete
                    ? { label: t("dashboard.stampComplete"), color: "green" as const }
                    : isStartHere
                      ? { label: t("dashboard.stampStartHere"), color: "amber" as const }
                      : progress.correct > 0
                        ? { label: t("dashboard.stampContinue"), color: "amber" as const }
                        : undefined
                }
                href={HTL_ROUTES.training(def.setNumber)}
              />
            );
          })}
        </div>

        {/* Practice tests */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
          Practice tests · 50 questions weighted like the real exam
        </p>
        <div className="mb-6 space-y-1.5">
          {HTL_ROUTES.testIds.map((testId, index) => {
            const n = HTL_ROUTES.displayTestNumber(testId);
            const stats = hydrated ? getTestAttemptStats(testId) : undefined;
            const bestRaw = stats?.bestScore ?? null;
            const bestPct = bestRaw !== null ? Math.round((bestRaw / HTL_QUESTIONS_PER_TEST) * 100) : null;
            const completed = testComplete(testId);
            const current = hydrated ? getCurrentTest(testId) : undefined;
            const answeredCount = Object.keys(current?.answers ?? {}).length;
            const activelyInProgress = !!current && current.questions.length > 0 && answeredCount > 0;

            const testMisses = missSummary.perTest.get(testId);
            const hasAttempts = !!testMisses && testMisses.attempts > 0;
            const testSessions = hydrated
              ? completedTests.filter((s) => s.state === HTL_STATE_CODE && s.testNumber === testId)
              : [];
            const attemptPoints = sessionsToAttemptPoints(testSessions, "en-US", HTL_PASS_PERCENTAGE);
            const isExpanded = expandedTest === testId;
            const stillMissed = testMisses?.stillMissed ?? 0;

            let subtitle = t("testCard.fiftyQuestions");
            if (activelyInProgress) {
              subtitle = `${answeredCount}/${HTL_QUESTIONS_PER_TEST} ${t("testCard.answered")}`;
            } else if (completed && bestPct !== null) {
              subtitle = `${t("dashboard.bestScore")}: ${bestPct}%`;
            } else if (bestPct !== null) {
              subtitle = `${t("dashboard.bestScore")}: ${bestPct}%. Need ${HTL_PASS_PERCENTAGE}%+ to pass`;
            }

            let stamp: { label: string; color: "green" | "amber" | "red" } | undefined;
            if (activelyInProgress) {
              stamp = { label: t("dashboard.stampContinue"), color: "amber" };
            } else if (bestRaw !== null) {
              if (bestRaw === HTL_QUESTIONS_PER_TEST) stamp = { label: t("dashboard.stampMastered"), color: "green" };
              else if (bestRaw >= PASS_SCORE) stamp = { label: t("dashboard.stampPassed"), color: "green" };
              else stamp = { label: t("dashboard.stampKeepGoing"), color: "amber" };
            }

            return (
              <div key={testId}>
                <ProgressCard
                  title={`🎯 Test ${n}`}
                  subtitle={subtitle}
                  completed={completed}
                  stepNumber={HTL_TRAINING_SETS.length + index + 1}
                  stamp={stamp}
                  href={hasAttempts ? undefined : HTL_ROUTES.test(testId)}
                  onClick={hasAttempts ? () => setExpandedTest(isExpanded ? null : testId) : undefined}
                  attachedBottom={isExpanded && hasAttempts}
                >
                  {hasAttempts && testMisses && (
                    <p className="text-xs mt-1 flex items-center gap-1.5">
                      {stillMissed === 0 && (
                        <>
                          <span className="text-green-600 font-semibold">
                            {testMisses.everMissed > 0
                              ? t("dashboard.allMissesFixed")
                              : t("dashboard.perfectRecord")}
                          </span>
                          <span className={completed ? "text-green-300" : "text-gray-300"}>·</span>
                        </>
                      )}
                      <span className={completed ? "text-green-600" : "text-gray-400"}>
                        {testMisses.attempts === 1
                          ? t("dashboard.attemptsOne")
                          : t("dashboard.attemptsCount").replace("{{n}}", String(testMisses.attempts))}{" "}
                        {isExpanded ? "▴" : "▾"}
                      </span>
                    </p>
                  )}
                </ProgressCard>

                {hasAttempts && attemptPoints.length > 0 && (
                  <Collapse open={isExpanded}>
                    <div
                      className={`rounded-b-xl border border-t-0 px-4 pb-4 ${
                        completed
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                          : "bg-white border-gray-100"
                      }`}
                    >
                      <AttemptChart
                        attempts={attemptPoints}
                        passPct={HTL_PASS_PERCENTAGE}
                        passLabel={`${HTL_PASS_PERCENTAGE}% to pass`}
                      />
                      <div className="mt-2 space-y-2">
                        {stillMissed > 0 && (
                          <button
                            onClick={() => router.push(HTL_ROUTES.drill(testId))}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand text-white font-bold text-sm px-4 py-3 hover:bg-brand-hover transition-colors"
                          >
                            {t("dashboard.drillWrongCta").replace("{{n}}", String(stillMissed))}
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => router.push(HTL_ROUTES.test(testId))}
                          className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-white border border-gray-200 text-gray-800 font-bold text-sm px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          {activelyInProgress
                            ? t("dashboard.continueTest").replace("{{n}}", String(answeredCount))
                            : t("dashboard.retakeTest")}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        {stillMissed > 0 && (
                          <p className="text-center text-[11px] text-gray-400">
                            {t("dashboard.drillTip")
                              .replace("{{n}}", String(stillMissed))
                              .replace("{{pct}}", String(Math.max(...attemptPoints.map((p) => p.pct))))}
                          </p>
                        )}
                      </div>
                    </div>
                  </Collapse>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats entry */}
        {!isGuest && (
          <Link href={HTL_ROUTES.stats} className="block">
            <div className="rounded-xl bg-white border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-4 w-4 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900">Your stats</h3>
                <p className="text-xs text-gray-500 mt-0.5">Every question you&apos;ve seen, sorted by what you keep missing</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0" />
            </div>
          </Link>
        )}

        <p className="mt-6 text-center text-[11px] text-gray-400">
          Weighted to the ASCP BOC HT/HTL content guideline (rev. Sept 2025).{" "}
          <Link href="/htl" className="underline hover:text-gray-600">About this practice test</Link>
        </p>
      </div>
      </div>
    </div>
  );
}

export default function HTLDashboardPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50" />}>
      <HTLDashboardContent />
    </Suspense>
  );
}
