"use client";

// Shared dashboard for registry exams (HTL, CST, CRCST): the DMV dashboard's
// step list (content-area training sets, then practice tests, each with
// stamps and a per-test attempt drop-down with the score chart and miss
// drill), driven by an ExamConfig. All registry exams are free.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/contexts/AuthContext";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import { ProgressCard, Collapse } from "@/components/dashboard/ProgressCard";
import { AttemptChart, sessionsToAttemptPoints } from "@/components/AttemptChart";
import { computeMissSummary } from "@/lib/missedQuestions";
import { getExamRoutes } from "@/lib/examRoutes";
import { ExamConfig } from "@/lib/exams";
import { getTigerAsset } from "@/lib/tigerAssets";

function heroTitle(done: number, total: number): string {
  if (done === 0) return `Complete all ${total} steps`;
  if (done === total) return "You're ready";
  if (done === total - 1) return "One left";
  if (done === 1) return `Good start. 1 of ${total} done`;
  const frac = done / total;
  if (frac < 0.45) return `${done} of ${total} done`;
  if (frac < 0.55) return "Halfway there";
  if (frac < 0.8) return "More than halfway";
  return `${done} of ${total}, almost there`;
}

function heroSub(exam: ExamConfig, done: number, total: number): string {
  const frac = total > 0 ? done / total : 0;
  const subs = exam.copy.heroSubs;
  if (done === 0) return subs[0];
  if (frac >= 1) return subs[4];
  if (frac < 0.4) return subs[1];
  if (frac < 0.7) return subs[2];
  return subs[3];
}

function getTigerFace(complete: number, total: number, examId: string): string {
  const pct = Math.round((complete / total) * 100);
  if (pct >= 100) return getTigerAsset(examId, 1);
  if (pct >= 75) return getTigerAsset(examId, 2);
  if (pct >= 50) return getTigerAsset(examId, 4);
  if (pct >= 25) return getTigerAsset(examId, 6);
  return getTigerAsset(examId, 8);
}

export function ExamDashboard({ exam }: { exam: ExamConfig }) {
  const routes = getExamRoutes(exam.id);
  const router = useRouter();
  const hydrated = useHydration();
  const { t } = useTranslation();
  const isGuest = useStore((state) => state.isGuest);
  const startGuestSession = useStore((state) => state.startGuestSession);
  const { user, loading: authLoading } = useAuth();
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const completeTest = useStore((state) => state.completeTest);
  const completedTests = useStore((state) => state.completedTests);

  const PASS_SCORE = Math.ceil((exam.passPct / 100) * exam.questionsPerTest);

  const missSummary = computeMissSummary(hydrated ? completedTests : [], exam.stateCode, routes.testIds);
  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  // Anyone who reaches an exam dashboard without an account is a guest: that
  // is what shows the "Sign up to save" prompt and protects their progress if
  // they later sign in to an existing account. The DMV flow does this in
  // onboarding; exams have no onboarding, so it happens here.
  useEffect(() => {
    if (hydrated && !authLoading && !user && !isGuest) startGuestSession();
  }, [hydrated, authLoading, user, isGuest, startGuestSession]);

  // This is the exam the person's emails should be about, until they open
  // another exam's dashboard.
  const setPrimaryExam = useStore((state) => state.setPrimaryExam);
  useEffect(() => {
    if (hydrated) setPrimaryExam(exam.id);
  }, [hydrated, exam.id, setPrimaryExam]);

  // Auto-complete any test where all questions are answered (handles stuck state)
  useEffect(() => {
    if (!hydrated) return;
    routes.testIds.forEach((testId) => {
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
    ...exam.trainingSets.map((s) => trainingSetComplete(s.id)),
    ...routes.testIds.map(testComplete),
  ].filter(Boolean).length;
  const totalSteps = exam.trainingSets.length + routes.testIds.length;
  const anyProgress =
    completedSteps > 0 ||
    exam.trainingSets.some((s) => hydrated && getTrainingSetProgress(s.id).correct > 0);

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
                    <span className="font-bold">{t("common.signUp")}</span> {exam.copy.guestPrompt}
                  </p>
                  <Link href={routes.signup} className="text-xs text-brand hover:text-brand-dark font-medium mt-1 inline-block">
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
              src={getTigerFace(completedSteps, totalSteps, exam.id)}
              alt="Tiger mascot"
              width={48}
              height={48}
              className="w-12 h-12 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900">{heroTitle(completedSteps, totalSteps)}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{heroSub(exam, completedSteps, totalSteps)}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold tabular-nums text-gray-900">{completedSteps}/{totalSteps}</div>
              <div className="text-xs text-gray-400">{t("dashboard.stampComplete").toLowerCase()}</div>
            </div>
          </div>
        </div>

        {/* Training sets, one per content area */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
          {exam.copy.trainingHeading}
        </p>
        <div className="mb-6 space-y-1.5">
          {exam.trainingSets.map((def, index) => {
            const progress = hydrated
              ? getTrainingSetProgress(def.id)
              : { correct: 0, total: def.size, complete: false };
            const isStartHere = index === 0 && !anyProgress;
            return (
              <ProgressCard
                key={def.id}
                title={def.name}
                subtitle={`${progress.correct}/${progress.total} · ${def.weightLabel}`}
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
                href={routes.training(def.setNumber)}
              />
            );
          })}
        </div>

        {/* Practice tests */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
          {exam.copy.testsHeading}
        </p>
        <div className="mb-6 space-y-1.5">
          {routes.testIds.map((testId, index) => {
            const n = routes.displayTestNumber(testId);
            const stats = hydrated ? getTestAttemptStats(testId) : undefined;
            const bestRaw = stats?.bestScore ?? null;
            const bestPct = bestRaw !== null ? Math.round((bestRaw / exam.questionsPerTest) * 100) : null;
            const completed = testComplete(testId);
            const current = hydrated ? getCurrentTest(testId) : undefined;
            const answeredCount = Object.keys(current?.answers ?? {}).length;
            const activelyInProgress = !!current && current.questions.length > 0 && answeredCount > 0;

            const testMisses = missSummary.perTest.get(testId);
            const hasAttempts = !!testMisses && testMisses.attempts > 0;
            const testSessions = hydrated
              ? completedTests.filter((s) => s.state === exam.stateCode && s.testNumber === testId)
              : [];
            const attemptPoints = sessionsToAttemptPoints(testSessions, "en-US", exam.passPct);
            const isExpanded = expandedTest === testId;
            const stillMissed = testMisses?.stillMissed ?? 0;

            let subtitle = t("testCard.fiftyQuestions");
            if (activelyInProgress) {
              subtitle = `${answeredCount}/${exam.questionsPerTest} ${t("testCard.answered")}`;
            } else if (completed && bestPct !== null) {
              subtitle = `${t("dashboard.bestScore")}: ${bestPct}%`;
            } else if (bestPct !== null) {
              subtitle = `${t("dashboard.bestScore")}: ${bestPct}%. Need ${exam.passPct}%+ to pass`;
            }

            let stamp: { label: string; color: "green" | "amber" | "red" } | undefined;
            if (activelyInProgress) {
              stamp = { label: t("dashboard.stampContinue"), color: "amber" };
            } else if (bestRaw !== null) {
              if (bestRaw === exam.questionsPerTest) stamp = { label: t("dashboard.stampMastered"), color: "green" };
              else if (bestRaw >= PASS_SCORE) stamp = { label: t("dashboard.stampPassed"), color: "green" };
              else stamp = { label: t("dashboard.stampKeepGoing"), color: "amber" };
            }

            return (
              <div key={testId}>
                <ProgressCard
                  title={`🎯 Test ${n}`}
                  subtitle={subtitle}
                  completed={completed}
                  stepNumber={exam.trainingSets.length + index + 1}
                  stamp={stamp}
                  href={hasAttempts ? undefined : routes.test(testId)}
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
                        passPct={exam.passPct}
                        passLabel={`${exam.passPct}% to pass`}
                      />
                      <div className="mt-2 space-y-2">
                        {stillMissed > 0 && (
                          <button
                            onClick={() => router.push(routes.drill(testId))}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand text-white font-bold text-sm px-4 py-3 hover:bg-brand-hover transition-colors"
                          >
                            {t("dashboard.drillWrongCta").replace("{{n}}", String(stillMissed))}
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => router.push(routes.test(testId))}
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
          <Link href={routes.stats} className="block">
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
          {exam.copy.sourceLine}{" "}
          <Link href={exam.slug} className="underline hover:text-gray-600">About this practice test</Link>
        </p>
      </div>
      </div>
    </div>
  );
}
