"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaywallModal } from "@/components/PaywallModal";
import { SuperAmazingCard } from "@/components/SuperAmazingCard";
import { GuestSaveCard, v1GuestCounts } from "@/components/GuestSaveCard";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { states } from "@/data/states";
import { AttemptChart, sessionsToAttemptPoints } from "@/components/AttemptChart";
import { computeMissSummary, isDrillFree } from "@/lib/missedQuestions";
import { ProgressCard, Collapse } from "@/components/dashboard/ProgressCard";
import { DmvStatePrompt, DmvStateLine } from "@/components/dashboard/DmvStatePicker";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackBeginCheckout, trackPaywallDismissed, trackPaywallHit, trackPurchase, trackViewItem } from "@/lib/analytics";
import { ClassBanner } from "@/components/exam/ClassBanner";
import { ClassMissRecovery } from "@/components/exam/ClassMissRecovery";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  const { user, loading: authLoading } = useAuth();
  const { t, language } = useTranslation();
  const isGuest = useStore((state) => state.isGuest);
  const selectedState = useStore((state) => state.selectedState);
  const firestoreLoaded = useStore((state) => state.firestoreLoaded);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const setPremiumStatus = useStore((state) => state.setPremiumStatus);
  const training = useStore((state) => state.training);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);
  const completeTest = useStore((state) => state.completeTest);
  const completedTests = useStore((state) => state.completedTests);
  const trainingAnswerHistory = useStore((state) => state.trainingAnswerHistory);

  // Per-question miss aggregation across all attempts (for the test drop-downs)
  const missSummary = computeMissSummary(hydrated ? completedTests : [], selectedState);
  // Which test card's attempt panel is dropped down
  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  // Hero subtitle variants (5 per progress state, picked randomly on mount)
  const heroSubVariants: string[][] = [
    [t("dashboard.heroSub0_0"), t("dashboard.heroSub0_1"), t("dashboard.heroSub0_2"), t("dashboard.heroSub0_3"), t("dashboard.heroSub0_4")],
    [t("dashboard.heroSub1_0"), t("dashboard.heroSub1_1"), t("dashboard.heroSub1_2"), t("dashboard.heroSub1_3"), t("dashboard.heroSub1_4")],
    [t("dashboard.heroSub2_0"), t("dashboard.heroSub2_1"), t("dashboard.heroSub2_2"), t("dashboard.heroSub2_3"), t("dashboard.heroSub2_4")],
    [t("dashboard.heroSub3_0"), t("dashboard.heroSub3_1"), t("dashboard.heroSub3_2"), t("dashboard.heroSub3_3"), t("dashboard.heroSub3_4")],
    [t("dashboard.heroSub4_0"), t("dashboard.heroSub4_1"), t("dashboard.heroSub4_2"), t("dashboard.heroSub4_3"), t("dashboard.heroSub4_4")],
    [t("dashboard.heroSub5_0"), t("dashboard.heroSub5_1"), t("dashboard.heroSub5_2"), t("dashboard.heroSub5_3"), t("dashboard.heroSub5_4")],
    [t("dashboard.heroSub6_0"), t("dashboard.heroSub6_1"), t("dashboard.heroSub6_2"), t("dashboard.heroSub6_3"), t("dashboard.heroSub6_4")],
    [t("dashboard.heroSub7_0"), t("dashboard.heroSub7_1"), t("dashboard.heroSub7_2"), t("dashboard.heroSub7_3"), t("dashboard.heroSub7_4")],
    [t("dashboard.heroSub8_0"), t("dashboard.heroSub8_1"), t("dashboard.heroSub8_2"), t("dashboard.heroSub8_3"), t("dashboard.heroSub8_4")],
  ];

  const trainingNudgeVariants: string[] = [
    t("dashboard.trainingNudge0"), t("dashboard.trainingNudge1"), t("dashboard.trainingNudge2"),
    t("dashboard.trainingNudge3"), t("dashboard.trainingNudge4"),
  ];

  const [heroVariantIndex] = useState(() => Math.floor(Math.random() * 5));

  // Paywall state
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState<"training_set_4" | "practice_test_4" | "full_stats">("training_set_4");
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const schoolJoinedSlug = searchParams.get("school_joined");
  const [showSchoolJoined, setShowSchoolJoined] = useState(!!schoolJoinedSlug);

  const onboardingComplete = hydrated ? isOnboardingComplete() : true;
  const onboardingProgress = training.totalCorrectAllTime;
  const isPremium = hydrated ? hasPremiumAccess() : false;

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

  // Anyone who reaches the dashboard without an account is a guest, like the
  // exam dashboards: that is what shows "Sign up to save" and protects their
  // progress if they later sign in to an existing account.
  const startGuestSession = useStore((state) => state.startGuestSession);
  useEffect(() => {
    if (hydrated && !authLoading && !user && !isGuest) startGuestSession();
  }, [hydrated, authLoading, user, isGuest, startGuestSession]);

  // A state landing page links here with ?state=OH. Taken only while no state
  // is chosen: switching states deletes progress, which a link never should.
  const stateParam = searchParams.get("state");
  const setSelectedState = useStore((state) => state.setSelectedState);
  useEffect(() => {
    if (!hydrated || selectedState || (user && !firestoreLoaded)) return;
    if (stateParam && states.some((s) => s.code === stateParam)) setSelectedState(stateParam);
  }, [hydrated, selectedState, user, firestoreLoaded, stateParam, setSelectedState]);

  // No state yet: the state picker sits at the top and the steps wait under
  // it. A signed-in account on a new device has its state in flight from
  // Firestore, so the picker only shows once that load is done.
  const noState = hydrated && !selectedState;
  const needsState = noState && (!user || firestoreLoaded);

  // Opening this dashboard makes the DMV the current test (the logo's home
  // and the emails' subject), state chosen or not.
  const setPrimaryExam = useStore((state) => state.setPrimaryExam);
  useEffect(() => {
    if (hydrated) setPrimaryExam("dmv");
  }, [hydrated, setPrimaryExam]);

  // Auto-complete any test where all questions are answered (handles stuck state)
  useEffect(() => {
    if (!hydrated) return;
    [1, 2, 3, 4].forEach((testId) => {
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

  // Handle post-purchase verification
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (sessionId && success === "true" && user?.uid) {
      const sendVerification = async () => {
        const idToken = await auth.currentUser?.getIdToken();
        if (!idToken) return;
        return fetch("/api/stripe/verify-purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ sessionId }),
        });
      };
      sendVerification()
        .then((res) => res?.json())
        .then((data) => {
          if (!data) return;
          if (data.isPremium) {
            trackPurchase(sessionId);
            setPremiumStatus({
              isPremium: true,
              purchasedAt: data.purchasedAt || new Date().toISOString(),
              stripeCustomerId: "",
              stripePaymentId: sessionId,
            });
            setShowPurchaseSuccess(true);
            router.replace("/dmv/dashboard");
          }
        })
        .catch((err) => console.error("Failed to verify purchase:", err));
    }

    if (canceled === "true") {
      router.replace("/dmv/dashboard");
    }
  }, [searchParams, user?.uid, setPremiumStatus, router]);

  // Handle paywall click
  const handlePremiumClick = (feature: "training_set_4" | "practice_test_4", cardId: string, cardLabel: string) => {
    trackViewItem(feature);
    trackPaywallHit(cardId, cardLabel);
    setPaywallFeature(feature);
    setPaywallOpen(true);
  };

  // Handle upgrade (redirect to Stripe)
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
          location: paywallFeature,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Checkout error:", data.error);
        alert(`Error: ${data.error}`);
        return;
      }

      if (data.checkoutUrl) {
        trackBeginCheckout(paywallFeature);
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

  // Compute completion states
  const trainingSetComplete = (id: number) => {
    if (!hydrated) return false;
    return getTrainingSetProgress(id).complete;
  };

  const testComplete = (testNumber: number) => {
    if (!hydrated) return false;
    const stats = getTestAttemptStats(testNumber);
    return stats ? stats.bestScore >= 40 : false; // 40/50 = 80%
  };

  const getTestBestPercent = (testNumber: number): number | null => {
    if (!hydrated) return null;
    const stats = getTestAttemptStats(testNumber);
    return stats ? Math.round((stats.bestScore / 50) * 100) : null;
  };

  const isTestInProgress = (testNumber: number): boolean => {
    if (!hydrated) return false;
    const currentTest = getCurrentTest(testNumber);
    return !!(currentTest && currentTest.questions.length > 0);
  };

  // Count completed steps (training sets + practice tests)
  const completedSteps = [
    ...[1, 2, 3, 4].map(trainingSetComplete),
    ...[1, 2, 3, 4].map(testComplete),
  ].filter(Boolean).length;

  const totalSteps = 8;
  const allComplete = completedSteps === totalSteps;

  // Training-heavy nudge: 2+ training sets done, no completed tests, <10 test questions answered
  const trainingSetsCompleted = hydrated ? [1, 2, 3, 4].filter(trainingSetComplete).length : 0;
  const anyTestCompleted = hydrated ? [1, 2, 3, 4].some((id) => !!getTestAttemptStats(id)) : false;
  const totalTestQuestionsAnswered = hydrated
    ? [1, 2, 3, 4].reduce((sum, id) => {
        if (getTestAttemptStats(id)) return sum + 50;
        const current = getCurrentTest(id);
        return sum + (current ? Object.keys(current.answers).length : 0);
      }, 0)
    : 0;
  const isTrainingHeavy =
    hydrated && trainingSetsCompleted >= 2 && !anyTestCompleted && totalTestQuestionsAnswered < 10;

  const heroSub = isTrainingHeavy
    ? trainingNudgeVariants[heroVariantIndex]
    : (heroSubVariants[completedSteps] ?? heroSubVariants[0])[heroVariantIndex];

  // Get tiger face image based on completion
  const getTigerFace = (complete: number, total: number): string => {
    const pct = Math.round((complete / total) * 100);
    if (pct >= 100) return "/tiger_face_01.png";
    if (pct >= 75) return "/tiger_face_02.png";
    if (pct >= 50) return "/tiger_face_04.png";
    if (pct >= 25) return "/tiger_face_06.png";
    return "/tiger_face_08.png";
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
      <div className="relative container mx-auto px-4 sm:px-6 py-6 pb-10 max-w-lg md:max-w-2xl lg:max-w-4xl">

        {/* Paywall Modal */}
        <PaywallModal
          open={paywallOpen}
          onOpenChange={(open) => {
            if (!open && paywallOpen) trackPaywallDismissed();
            setPaywallOpen(open);
          }}
          feature={paywallFeature}
          onUpgrade={handleUpgrade}
          isGuest={isGuest}
          onSignUp={() => router.push("/signup")}
        />

        {/* Purchase Success Message */}
        {showPurchaseSuccess && (
          <Card className="mb-4 bg-gradient-to-r from-green-50 dark:from-green-950 to-emerald-50 dark:to-emerald-950 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
                <div className="flex-1">
                  <p className="text-base font-bold text-green-900 dark:text-green-200">
                    {t("dashboard.welcomePremium")}
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-0.5">
                    {t("dashboard.premiumUnlocked")}
                  </p>
                </div>
                <button
                  onClick={() => setShowPurchaseSuccess(false)}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                >
                  &times;
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* School joined banner */}
        {showSchoolJoined && schoolJoinedSlug && (
          <Card className="mb-4 bg-gradient-to-r from-blue-50 dark:from-blue-950 to-sky-50 dark:to-sky-950 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏫</span>
                <div className="flex-1">
                  <p className="text-base font-bold text-blue-900 dark:text-blue-200">
                    You&apos;ve joined {schoolJoinedSlug}!
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                    Your instructor can now track your progress. Good luck on your test!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSchoolJoined(false);
                    router.replace("/dmv/dashboard");
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  &times;
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        <ClassBanner examId="dmv" className="mb-4" />
        <ClassMissRecovery examId="dmv" />

        {/* Sign-up prompt for guests */}
        {isGuest && (
          <GuestSaveCard
            className="mb-4"
            signupHref="/signup"
            {...v1GuestCounts(selectedState, completedTests, trainingAnswerHistory)}
          />
        )}

        {needsState && <DmvStatePrompt />}

        {/* Hero section - card with progress */}
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src={getTigerFace(completedSteps, totalSteps)}
              alt="Tiger mascot"
              width={48}
              height={48}
              className="w-12 h-12 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                {t(`dashboard.heroTitle${completedSteps}`)}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {heroSub}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold tabular-nums text-gray-900 dark:text-gray-50">{completedSteps}/{totalSteps}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t("dashboard.stampComplete").toLowerCase()}</div>
            </div>
          </div>
          <DmvStateLine />
        </div>

        {/* Interleaved Training + Tests */}
        <div
          className={`mb-6 space-y-2 ${noState ? "opacity-50 pointer-events-none select-none" : ""}`}
          aria-hidden={noState || undefined}
        >
          {[1, 2, 3, 4].map((id) => {
            const trainingProgress = hydrated ? getTrainingSetProgress(id) : { correct: 0, total: 50, complete: false };
            const trainingComplete = trainingProgress.complete;
            const trainingLocked = id >= 3 && !isPremium;
            const isStartHere = id === 1 && !trainingComplete && trainingProgress.correct === 0;

            const testCompleted = testComplete(id);
            const bestPct = getTestBestPercent(id);
            const bestRaw = hydrated ? getTestAttemptStats(id)?.bestScore ?? null : null;
            const inProgress = isTestInProgress(id);
            const answeredCount = hydrated
              ? Object.keys(getCurrentTest(id)?.answers ?? {}).length
              : 0;
            // A session with zero answers (opened the test and backed out)
            // shouldn't present as "in progress"
            const activelyInProgress = inProgress && answeredCount > 0;
            const testLocked = id >= 3 && !isPremium;
            // Drilling tests 1 and 2 is free — only the premium-only tests
            // put their miss drill behind the paywall.
            const drillLocked = !isPremium && !isDrillFree(id);

            // Miss/attempt aggregation for this test's card line + drop-down
            const testMisses = missSummary.perTest.get(id);
            const hasAttempts = !!testMisses && testMisses.attempts > 0;
            const testSessions = hydrated
              ? completedTests.filter(
                  (s) => s.state === (selectedState || "CA") && s.testNumber === id
                )
              : [];
            const attemptPoints = sessionsToAttemptPoints(
              testSessions,
              language === "es"
                ? "es-ES"
                : language === "vi"
                  ? "vi-VN"
                  : language === "ko"
                    ? "ko-KR"
                    : language === "zh"
                      ? "zh-CN"
                      : "en-US"
            );
            const isExpanded = expandedTest === id;
            const stillMissed = testMisses?.stillMissed ?? 0;

            let testSubtitle = t("testCard.fiftyQuestions");
            if (activelyInProgress) {
              testSubtitle = `${answeredCount}/50 ${t("testCard.answered")}`;
            } else if (testCompleted && bestPct !== null) {
              testSubtitle = `${t("dashboard.bestScore")}: ${bestPct}%`;
            } else if (bestPct !== null) {
              testSubtitle = `${t("dashboard.bestScore")}: ${bestPct}%. ${t("dashboard.need80")}`;
            }

            let testStamp: { label: string; color: "green" | "amber" | "red" } | undefined;
            if (!testLocked) {
              if (activelyInProgress) {
                testStamp = { label: t("dashboard.stampContinue"), color: "amber" };
              } else if (bestRaw !== null) {
                if (bestRaw === 50) {
                  testStamp = { label: t("dashboard.stampMastered"), color: "green" };
                } else if (bestRaw >= 40) {
                  testStamp = { label: t("dashboard.stampPassed"), color: "green" };
                } else {
                  testStamp = { label: t("dashboard.stampKeepGoing"), color: "amber" };
                }
              }
            }

            return (
              <div key={id}>
                {/* Training card */}
                <ProgressCard
                  key={`training-${id}`}
                  title={t(`trainingSets.${id}`)}
                  subtitle={`${trainingLocked ? 0 : trainingProgress.correct}/${trainingProgress.total}`}
                  completed={trainingComplete}
                  stepNumber={(id - 1) * 2 + 1}
                  stamp={
                    trainingComplete
                      ? { label: t("dashboard.stampComplete"), color: "green" as const }
                      : isStartHere
                        ? { label: t("dashboard.stampStartHere"), color: "amber" as const }
                        : trainingProgress.correct > 0
                          ? { label: t("dashboard.stampContinue"), color: "amber" as const }
                          : undefined
                  }
                  isPremiumLocked={trainingLocked}
                  href={trainingLocked ? undefined : `/practice/${id}`}
                  onClick={
                    trainingLocked
                      ? () => handlePremiumClick("training_set_4", `set_${id}`, `Training Set ${id}`)
                      : undefined
                  }
                />

                {/* Practice test card */}
                <div className="mt-1.5">
                  <ProgressCard
                    key={`test-${id}`}
                    title={`🎯 ${t(`practiceTests.${id}`)}`}
                    subtitle={testSubtitle}
                    completed={testCompleted}
                    stepNumber={(id - 1) * 2 + 2}
                    stamp={testStamp}
                    isPremiumLocked={testLocked}
                    href={testLocked || hasAttempts ? undefined : `/test/${id}`}
                    onClick={
                      testLocked
                        ? () => handlePremiumClick("practice_test_4", `test_${id}`, `Practice Test ${id}`)
                        : hasAttempts
                          ? () => setExpandedTest(isExpanded ? null : id)
                          : undefined
                    }
                    attachedBottom={isExpanded && hasAttempts}
                    expanded={hasAttempts && !testLocked ? isExpanded : undefined}
                  >
                    {hasAttempts && !testLocked && testMisses && (
                      <p className="text-xs mt-1 flex items-center gap-1.5">
                        {stillMissed === 0 && (
                          <>
                            <span className="text-green-600 dark:text-green-400 font-semibold">
                              {testMisses.everMissed > 0
                                ? t("dashboard.allMissesFixed")
                                : t("dashboard.perfectRecord")}
                            </span>
                            <span className={testCompleted ? "text-green-300" : "text-gray-300"}>
                              ·
                            </span>
                          </>
                        )}
                        <span className={testCompleted ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                          {testMisses.attempts === 1
                            ? t("dashboard.attemptsOne")
                            : t("dashboard.attemptsCount").replace(
                                "{{n}}",
                                String(testMisses.attempts)
                              )}{" "}
                          <span aria-hidden="true">{isExpanded ? "▴" : "▾"}</span>
                        </span>
                      </p>
                    )}
                  </ProgressCard>

                  {/* Drop-down attempt panel, attached flush to the card above.
                      Stays mounted; Collapse animates the unfurl both ways. */}
                  {hasAttempts && !testLocked && attemptPoints.length > 0 && (
                    <Collapse open={isExpanded}>
                      <div
                        className={`rounded-b-xl border border-t-0 px-4 pb-4 ${
                          testCompleted
                            ? "bg-gradient-to-r from-green-50 dark:from-green-950 to-emerald-50 dark:to-emerald-950 border-green-200 dark:border-green-800"
                            : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
                        }`}
                      >
                      <AttemptChart attempts={attemptPoints} />
                      <div className="mt-2 space-y-2">
                        {stillMissed > 0 && (
                          <button
                            onClick={() => {
                              if (drillLocked) {
                                trackViewItem("full_stats");
                                trackPaywallHit(`drill_test_${id}`, `Test ${id} Miss Drill`);
                                setPaywallFeature("full_stats");
                                setPaywallOpen(true);
                              } else {
                                router.push(`/drill?test=${id}`);
                              }
                            }}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand text-white font-bold text-sm px-4 py-3 hover:bg-brand-hover transition-colors"
                          >
                            {drillLocked && <Lock className="h-4 w-4" />}
                            {t("dashboard.drillWrongCta").replace("{{n}}", String(stillMissed))}
                            {drillLocked ? (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 rounded-full px-2 py-0.5">
                                {t("common.premium")}
                              </span>
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => router.push(`/test/${id}`)}
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
                              .replace(
                                "{{pct}}",
                                String(Math.max(...attemptPoints.map((p) => p.pct)))
                              )}
                          </p>
                        )}
                      </div>
                      </div>
                    </Collapse>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <SuperAmazingCard dashboardKey="dmv" allComplete={allComplete} totalSteps={totalSteps} />

      </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <DashboardContent />
    </Suspense>
  );
}
