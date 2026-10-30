"use client";

// Shared dashboard for registry exams: the DMV dashboard's step list, driven
// by an ExamConfig. Exams with DMV-style test sets alternate Set 1, Test 1,
// Set 2, Test 2...; the rest list content-area sets, then practice tests.
// Tests carry stamps and a per-test attempt drop-down with the score chart
// and miss drill. All registry exams are free.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, ChevronRight, Users } from "lucide-react";
import { useStore } from "@/store/useStore";
import { GuestSaveCard, v1GuestCounts } from "@/components/GuestSaveCard";
import { useAuth } from "@/contexts/AuthContext";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import { ProgressCard, Collapse } from "@/components/dashboard/ProgressCard";
import { AttemptChart, sessionsToAttemptPoints } from "@/components/AttemptChart";
import { computeMissSummary } from "@/lib/missedQuestions";
import { ExamConfig, TrainingPart, examFamilyId, examLandingPath, getExamById, examTrainingParts, getExamVariant, hasTestSets, trainingPartName, trainingPartOf } from "@/lib/exams";
import { useTestSetMigration } from "@/hooks/useTestSetMigration";
import { ExamStateLine, ExamStatePrompt } from "@/components/exam/ExamStatePicker";
import { ClassBanner } from "@/components/exam/ClassBanner";
import { ClassMissRecovery } from "@/components/exam/ClassMissRecovery";
import { TeachNudge } from "@/components/TeachNudge";
import { getTigerAsset } from "@/lib/tigerAssets";
import { SuperAmazingCard } from "@/components/SuperAmazingCard";
import { useLocalizedExam } from "@/hooks/useLocalizedExam";
import { useCommunityAvailable } from "@/hooks/useCommunityStats";

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

export function ExamDashboard({ exam: source }: { exam: ExamConfig }) {
  const { exam, routes, ui, lang } = useLocalizedExam(source);
  // Common Mistakes card, once this exam has enough answers (lib/communityStats.ts).
  const communityOn = useCommunityAvailable(source.id);
  const router = useRouter();
  const hydrated = useHydration();
  const firestoreLoaded = useStore((state) => state.firestoreLoaded);
  const [highlightedStep, setHighlightedStep] = useState<string | null>(null);
  const { t } = useTranslation();
  const isGuest = useStore((state) => state.isGuest);
  const startGuestSession = useStore((state) => state.startGuestSession);
  const { user, loading: authLoading } = useAuth();
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const trainingSets = useStore((state) => state.trainingSets);
  const completeTest = useStore((state) => state.completeTest);
  const completedTests = useStore((state) => state.completedTests);
  const trainingAnswerHistory = useStore((state) => state.trainingAnswerHistory);

  useTestSetMigration(source);

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

  // Opening this dashboard makes it the current test (the logo's home and the
  // emails' subject) until another dashboard is opened.
  const setPrimaryExam = useStore((state) => state.setPrimaryExam);
  const markExamStarted = useStore((state) => state.markExamStarted);
  useEffect(() => {
    if (!hydrated) return;
    setPrimaryExam(examFamilyId(exam));
    markExamStarted(examFamilyId(exam));
  }, [hydrated, exam, setPrimaryExam, markExamStarted]);

  // State variants: opening a state's dashboard makes it the remembered
  // choice, and the family dashboard forwards to the remembered state.
  const familyId = examFamilyId(exam);
  const chosenState = useStore((state) => state.examStates[familyId]);
  const setExamState = useStore((state) => state.setExamState);
  const forwardTo = !exam.variantOf ? getExamVariant(familyId, chosenState) : undefined;
  useEffect(() => {
    if (!hydrated) return;
    if (exam.variantOf && exam.jurisdiction) setExamState(familyId, exam.jurisdiction.code);
    else if (forwardTo) router.replace(`${forwardTo.slug}/dashboard`);
  }, [hydrated, exam, familyId, forwardTo, setExamState, router]);

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

  // Big sets show as parts of about 50 (see trainingParts); progress is still
  // stored per set, so a part counts the set's mastered questions that fall in it.
  const parts = examTrainingParts(exam);
  const partProgress = (p: TrainingPart) => {
    if (!hydrated) return { correct: 0, total: p.size, complete: false };
    if (p.partCount === 1) return getTrainingSetProgress(p.set.id);
    const mastered = trainingSets[p.set.id]?.masteredIds ?? [];
    const correct = Math.min(p.size, mastered.filter((id) => trainingPartOf(p.set.id, id) === p.part).length);
    return { correct, total: p.size, complete: correct >= p.size };
  };
  // The completion CTA points at a genuinely green row. A split part never
  // claims its whole set. Consume the marker so Back/refresh does not replay it.
  useEffect(() => {
    if (!hydrated || authLoading || (user && !firestoreLoaded) || forwardTo) return;
    const url = new URL(window.location.href);
    const marker = url.searchParams.get("completed");
    if (!marker) return;
    const match = /^(training|test):([1-9]\d*)$/.exec(marker);
    let rowId: string | undefined;
    if (match?.[1] === "training") {
      const requestedPart = url.searchParams.get("part");
      const completedPart = parts.find((p) =>
        p.set.setNumber === Number(match[2]) &&
        (requestedPart ? p.part === Number(requestedPart) : p.partCount === 1)
      );
      if (completedPart && partProgress(completedPart).complete) {
        rowId = `training-${completedPart.set.setNumber}-${completedPart.part}`;
      }
    } else if (match?.[1] === "test") {
      const testId = routes.testIds.find((id) => routes.displayTestNumber(id) === Number(match[2]));
      if (testId && (getTestAttemptStats(testId)?.bestScore ?? -1) >= PASS_SCORE) {
        rowId = `test-${Number(match[2])}`;
      }
    }
    const row = rowId ? document.getElementById(rowId) : null;
    if (row && rowId) {
      setHighlightedStep(rowId);
      row.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
      row.scrollIntoView({ block: "center", behavior: "instant" });
    }
    url.searchParams.delete("completed");
    if (match?.[1] === "training") url.searchParams.delete("part");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, [hydrated, authLoading, user, firestoreLoaded, forwardTo, trainingSets, completedTests, exam.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const testComplete = (testId: number) => {
    if (!hydrated) return false;
    const stats = getTestAttemptStats(testId);
    return stats ? stats.bestScore >= PASS_SCORE : false;
  };

  const completedSteps = [
    ...parts.map((p) => partProgress(p).complete),
    ...routes.testIds.map(testComplete),
  ].filter(Boolean).length;
  const totalSteps = parts.length + routes.testIds.length;
  const anyProgress =
    completedSteps > 0 ||
    exam.trainingSets.some((s) => hydrated && getTrainingSetProgress(s.id).correct > 0);

  // DMV-style exams alternate Set 1, Test 1, Set 2, Test 2...
  const interleaved = hasTestSets(exam) && parts.length === routes.testIds.length;

  // One card per training step and per practice test; the list below puts
  // them in order.
  const renderPart = (p: TrainingPart, stepNumber: number) => {
    const def = p.set;
    const progress = partProgress(p);
    const isStartHere = stepNumber === 1 && !anyProgress;
    const rowId = `training-${def.setNumber}-${p.part}`;
    return (
      <div id={rowId} className={`scroll-mt-24 rounded-lg ${highlightedStep === rowId ? "ring-2 ring-green-500 ring-offset-4 ring-offset-white dark:ring-offset-gray-950" : ""}`}>
        <ProgressCard
          title={trainingPartName(p, lang)}
          subtitle={def.weightLabel ? `${progress.correct}/${progress.total} · ${def.weightLabel}` : `${progress.correct}/${progress.total}`}
          completed={progress.complete}
          stepNumber={stepNumber}
          stamp={
            progress.complete
              ? { label: t("dashboard.stampComplete"), color: "green" as const }
              : isStartHere
                ? { label: t("dashboard.stampStartHere"), color: "amber" as const }
                : progress.correct > 0
                  ? { label: t("dashboard.stampContinue"), color: "amber" as const }
                  : undefined
          }
          href={routes.training(def.setNumber, p.partCount > 1 ? p.part : undefined)}
        />
      </div>
    );
  };

  const renderTest = (testId: number, stepNumber: number) => {
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
    const attemptPoints = sessionsToAttemptPoints(testSessions, ui.dateLocale, exam.passPct);
    const isExpanded = expandedTest === testId;
    const stillMissed = testMisses?.stillMissed ?? 0;

    // The translated string only covers 50-question tests (ham has 35, CA real estate 150).
    let subtitle = exam.questionsPerTest === 50 ? t("testCard.fiftyQuestions") : ui.questionsCount(exam.questionsPerTest);
    if (activelyInProgress) {
      subtitle = `${answeredCount}/${exam.questionsPerTest} ${t("testCard.answered")}`;
    } else if (completed && bestPct !== null) {
      subtitle = `${t("dashboard.bestScore")}: ${bestPct}%`;
    } else if (bestPct !== null) {
      subtitle = `${t("dashboard.bestScore")}: ${bestPct}%. ${ui.needToPass(exam.passPct)}`;
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
      <div id={`test-${n}`} className={`scroll-mt-24 rounded-lg ${highlightedStep === `test-${n}` ? "ring-2 ring-green-500 ring-offset-4 ring-offset-white dark:ring-offset-gray-950" : ""}`}>
        <ProgressCard
          title={exam.testCount === 1 ? ui.fullLengthExam : ui.testN(n)}
          subtitle={subtitle}
          completed={completed}
          stepNumber={stepNumber}
          stamp={stamp}
          href={hasAttempts ? undefined : routes.test(testId)}
          onClick={hasAttempts ? () => setExpandedTest(isExpanded ? null : testId) : undefined}
          attachedBottom={isExpanded && hasAttempts}
          expanded={hasAttempts ? isExpanded : undefined}
        >
          {hasAttempts && testMisses && (
            <p className="text-xs mt-1 flex items-center gap-1.5">
              {stillMissed === 0 && (
                <>
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {testMisses.everMissed > 0
                      ? t("dashboard.allMissesFixed")
                      : t("dashboard.perfectRecord")}
                  </span>
                  <span className={completed ? "text-green-300" : "text-gray-300"}>·</span>
                </>
              )}
              <span className={completed ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                {testMisses.attempts === 1
                  ? t("dashboard.attemptsOne")
                  : t("dashboard.attemptsCount").replace("{{n}}", String(testMisses.attempts))}{" "}
                <span aria-hidden="true">{isExpanded ? "▴" : "▾"}</span>
              </span>
            </p>
          )}
        </ProgressCard>

        {hasAttempts && attemptPoints.length > 0 && (
          <Collapse open={isExpanded}>
            <div
              className={`rounded-b-xl border border-t-0 px-4 pb-4 ${
                completed
                  ? "bg-gradient-to-r from-green-50 dark:from-green-950 to-emerald-50 dark:to-emerald-950 border-green-200 dark:border-green-800"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
              }`}
            >
              <AttemptChart
                attempts={attemptPoints}
                passPct={exam.passPct}
                passLabel={ui.pctToPass(exam.passPct)}
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
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 font-bold text-sm px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {activelyInProgress
                    ? t("dashboard.continueTest").replace("{{n}}", String(answeredCount))
                    : t("dashboard.retakeTest")}
                  <ChevronRight className="h-4 w-4" />
                </button>
                {stillMissed > 0 && (
                  <p className="text-center text-[11px] text-gray-500 dark:text-gray-400">
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
  };

  // Forwarding to the remembered state: skip a flash of the general dashboard.
  if (hydrated && forwardTo) return null;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
      <div className="relative container mx-auto px-4 sm:px-6 py-6 pb-10 max-w-lg md:max-w-2xl lg:max-w-4xl">

        {/* Sign-up prompt for guests */}
        {isGuest && (
          <GuestSaveCard
            className="mb-4"
            signupHref={routes.signup}
            {...v1GuestCounts(exam.stateCode, completedTests, trainingAnswerHistory)}
          />
        )}

        <ClassBanner examId={exam.id} className="mb-4" />
        <ClassMissRecovery examId={exam.id} />

        <ExamStatePrompt exam={exam} />

        {/* Hero card with progress */}
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src={getTigerFace(completedSteps, totalSteps, exam.id)}
              alt="Tiger mascot"
              width={48}
              height={48}
              className="w-12 h-12 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">{ui.heroTitle(completedSteps, totalSteps)}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{heroSub(exam, completedSteps, totalSteps)}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold tabular-nums text-gray-900 dark:text-gray-50">{completedSteps}/{totalSteps}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t("dashboard.stampComplete").toLowerCase()}</div>
            </div>
          </div>
          <ExamStateLine exam={exam} />
          <TeachNudge dashboardKey={exam.id} examId={exam.variantOf ?? exam.id} done={completedSteps} />
        </div>

        {interleaved ? (
          // DMV-style: each set holds its test's questions, so train, then test.
          <div className="mb-6 space-y-2">
            {routes.testIds.map((testId, i) => (
              <div key={testId}>
                {renderPart(parts[i], i * 2 + 1)}
                <div className="mt-1.5">{renderTest(testId, i * 2 + 2)}</div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Training sets, one per content area */}
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              {exam.copy.trainingHeading}
            </p>
            <div className="mb-6 space-y-1.5">
              {parts.map((p, index) => <div key={`${p.set.id}-${p.part}`}>{renderPart(p, index + 1)}</div>)}
            </div>

            {/* Practice tests */}
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              {exam.copy.testsHeading}
            </p>
            <div className="mb-6 space-y-1.5">
              {routes.testIds.map((testId, index) => (
                <div key={testId}>{renderTest(testId, parts.length + index + 1)}</div>
              ))}
            </div>
          </>
        )}

        {/* Stats entry */}
        {!isGuest && (
          <Link href={routes.stats} className="block">
            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-4 w-4 text-brand-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-50">{ui.yourStats}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ui.yourStatsSub}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0" />
            </div>
          </Link>
        )}

        {communityOn && (
          <Link href={`${routes.stats}?tab=community`} className="block mt-1.5">
            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 text-brand-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-50">{t("stats.commonMistakes")}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t("dashboard.urgencyTitle")}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0" />
            </div>
          </Link>
        )}

        <div className="mt-6">
          <SuperAmazingCard dashboardKey={exam.id} allComplete={completedSteps === totalSteps} totalSteps={totalSteps} />
        </div>

        <p className="mt-6 text-center text-[11px] text-gray-500 dark:text-gray-400">
          {exam.copy.sourceLine}{" "}
          <Link href={examLandingPath(getExamById(examFamilyId(exam)) ?? exam)} className="underline hover:text-gray-600 dark:hover:text-gray-300">{ui.aboutThisTest}</Link>
        </p>
      </div>
      </div>
    </div>
  );
}
