"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaywallModal } from "@/components/PaywallModal";
import { SUPER_AMAZING_EVENT, SUPER_AMAZING_KEY } from "@/components/SuperAmazingFireworks";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ChevronRight, CheckCircle, Check, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { states } from "@/data/states";
import { AttemptChart, sessionsToAttemptPoints } from "@/components/AttemptChart";
import { computeMissSummary, isDrillFree } from "@/lib/missedQuestions";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackBeginCheckout, trackPaywallDismissed, trackPaywallHit, trackPurchase, trackViewItem } from "@/lib/analytics";

function Stamp({ label, color }: { label: string; color: "green" | "amber" | "red" }) {
  const colors = {
    green: "border-green-500 text-green-600 bg-green-50",
    amber: "border-amber-500 text-amber-600 bg-amber-50",
    red: "border-red-400 text-red-500 bg-red-50",
  };
  return (
    <div className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${colors[color]} -rotate-3`}>
      {label}
    </div>
  );
}

function ProgressCard({
  title,
  subtitle,
  completed,
  stamp,
  href,
  onClick,
  isPremiumLocked,
  stepNumber,
  attachedBottom,
  children,
}: {
  title: string;
  subtitle: string;
  completed: boolean;
  stamp?: { label: string; color: "green" | "amber" | "red" };
  href?: string;
  onClick?: () => void;
  isPremiumLocked?: boolean;
  stepNumber?: number;
  // Squares off the bottom so an expansion panel can attach flush below
  attachedBottom?: boolean;
  children?: React.ReactNode;
}) {
  const content = (
    <Card className={`transition-all duration-300 ${
      completed
        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm"
        : "bg-white border-gray-100 hover:shadow-md cursor-pointer"
    } ${attachedBottom ? "rounded-b-none border-b-0 shadow-none hover:shadow-none" : ""}`}>
      <CardContent className="p-4 flex items-center gap-3">
        {/* Completion indicator */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center relative ${
          completed ? "bg-green-500 text-white" : "bg-white border-2 border-gray-300 text-gray-600"
        }`}>
          {completed ? (
            <>
              {stepNumber ? (
                <>
                  <span className="text-sm font-bold text-white">{stepNumber}</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-green-200 flex items-center justify-center leading-none">
                    <Check className="w-2.5 h-2.5 text-green-700" strokeWidth={3} />
                  </span>
                </>
              ) : (
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              )}
            </>
          ) : stepNumber ? (
            <span className="text-sm font-bold text-gray-600">{stepNumber}</span>
          ) : (
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-sm flex items-center gap-1.5 ${completed ? "text-green-800" : "text-gray-700"}`}>
            {title}
            {isPremiumLocked && <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
          </h3>
          <p className={`text-xs mt-0.5 ${completed ? "text-green-600" : "text-gray-500"}`}>
            {subtitle}
          </p>
          {children}
        </div>

        {stamp ? (
          <Stamp label={stamp.label} color={stamp.color} />
        ) : (
          <ChevronRight className={`h-5 w-5 flex-shrink-0 ${completed ? "text-green-400" : "text-gray-300"}`} />
        )}
      </CardContent>
    </Card>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left">
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

// Height-animated collapse for the test drop-downs. Measures its content and
// transitions a pixel height — grid-template-rows fr transitions are
// unreliable in Chrome, so this does it the dependable way.
function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => setContentHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      inert={!open}
      className={`overflow-hidden transition-[height,opacity] duration-300 ease-in-out ${
        open ? "opacity-100" : "opacity-0"
      }`}
      style={{ height: open ? contentHeight : 0 }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  const { user } = useAuth();
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

  // Per-question miss aggregation across all attempts (for the test drop-downs)
  const missSummary = computeMissSummary(hydrated ? completedTests : [], selectedState);
  // Which test card's attempt panel is dropped down
  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  // Super Amazing Mode — constant site-wide fireworks, rendered by
  // SuperAmazingFireworks in the root layout; this card owns the flag.
  // Unlocks only at 8/8 complete (free and premium alike earn it the same way).
  // The localStorage flag drives the fireworks; the store copy syncs the
  // toggle to Firestore so adoption is visible in the admin dashboard.
  const superAmazingSync = useStore((state) => state.superAmazing);
  const setSuperAmazingEnabled = useStore((state) => state.setSuperAmazingEnabled);
  const superAmazingUnlockedAt = useStore((state) => state.superAmazingUnlockedAt);
  const unlockSuperAmazing = useStore((state) => state.unlockSuperAmazing);
  const [superAmazing, setSuperAmazing] = useState(false);
  useEffect(() => {
    setSuperAmazing(localStorage.getItem(SUPER_AMAZING_KEY) === "1");
  }, []);
  const toggleSuperAmazing = () => {
    const next = !superAmazing;
    localStorage.setItem(SUPER_AMAZING_KEY, next ? "1" : "0");
    window.dispatchEvent(new Event(SUPER_AMAZING_EVENT));
    setSuperAmazingEnabled(next);
    setSuperAmazing(next);
  };

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

  // Redirect to onboarding if no state selected. For logged-in users, wait
  // for Firestore to load first — otherwise a fresh browsing context (e.g.
  // clicking the welcome email on a different device) bounces them back to
  // onboarding while their actual state is still in flight from Firestore.
  useEffect(() => {
    if (!hydrated) return;
    if (user && !firestoreLoaded) return;
    if (!selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, firestoreLoaded, user, selectedState, router]);

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
            router.replace("/dashboard");
          }
        })
        .catch((err) => console.error("Failed to verify purchase:", err));
    }

    if (canceled === "true") {
      router.replace("/dashboard");
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

  // Once earned, always earned. Current progress can dip below 8/8 when someone
  // retakes a test or retrains a set; the reward does not dip with it.
  const samUnlocked = hydrated && !!superAmazingUnlockedAt;

  // Reaching 8/8 latches the achievement in the store (and Firestore) and
  // switches the fireworks on so the reward is immediate. Wait for Firestore on
  // signed-in users so a not-yet-loaded remote doc can't hide an existing
  // latch or record one against stale local progress.
  useEffect(() => {
    if (!hydrated || !allComplete || superAmazingUnlockedAt) return;
    if (user && !firestoreLoaded) return;
    unlockSuperAmazing();
    localStorage.setItem(SUPER_AMAZING_KEY, "1");
    setSuperAmazing(true);
    window.dispatchEvent(new Event(SUPER_AMAZING_EVENT));
  }, [hydrated, allComplete, superAmazingUnlockedAt, user, firestoreLoaded, unlockSuperAmazing]);

  // Retire a stale local fireworks flag only for someone who has never earned
  // the achievement (e.g. leftover from a previous account on this device).
  useEffect(() => {
    if (!hydrated || samUnlocked) return;
    if (user && !firestoreLoaded) return;
    if (localStorage.getItem(SUPER_AMAZING_KEY) === "1") {
      localStorage.setItem(SUPER_AMAZING_KEY, "0");
      setSuperAmazing(false);
      window.dispatchEvent(new Event(SUPER_AMAZING_EVENT));
    }
    if (superAmazingSync.enabled) setSuperAmazingEnabled(false);
  }, [hydrated, samUnlocked, user, firestoreLoaded, superAmazingSync.enabled, setSuperAmazingEnabled]);

  // Reconcile the synced flag with this device once the achievement is known:
  // pull a remote-enabled toggle down to localStorage (cross-device), and push
  // a pre-sync local-only flag up once (only before any recorded toggle, so a
  // deliberate turn-off on another device isn't resurrected).
  useEffect(() => {
    if (!hydrated || !samUnlocked) return;
    if (user && !firestoreLoaded) return;
    const local = localStorage.getItem(SUPER_AMAZING_KEY) === "1";
    if (superAmazingSync.enabled && !local) {
      localStorage.setItem(SUPER_AMAZING_KEY, "1");
      setSuperAmazing(true);
      window.dispatchEvent(new Event(SUPER_AMAZING_EVENT));
    } else if (!superAmazingSync.enabled && local && superAmazingSync.lastToggledAt === null) {
      setSuperAmazingEnabled(true);
    }
  }, [hydrated, samUnlocked, user, firestoreLoaded, superAmazingSync, setSuperAmazingEnabled]);

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
    <div className="flex-1 bg-gray-50">
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
          <Card className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="flex-1">
                  <p className="text-base font-bold text-green-900">
                    {t("dashboard.welcomePremium")}
                  </p>
                  <p className="text-xs text-green-700 mt-0.5">
                    {t("dashboard.premiumUnlocked")}
                  </p>
                </div>
                <button
                  onClick={() => setShowPurchaseSuccess(false)}
                  className="text-green-600 hover:text-green-800"
                >
                  &times;
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* School joined banner */}
        {showSchoolJoined && schoolJoinedSlug && (
          <Card className="mb-4 bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏫</span>
                <div className="flex-1">
                  <p className="text-base font-bold text-blue-900">
                    You&apos;ve joined {schoolJoinedSlug}!
                  </p>
                  <p className="text-xs text-blue-700 mt-0.5">
                    Your instructor can now track your progress. Good luck on your test!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSchoolJoined(false);
                    router.replace("/dashboard");
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  &times;
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sign-up prompt for guests */}
        {isGuest && (
          <Card className="mb-4 bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📊</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">{t("common.signUp")}</span> {t("dashboard.signUpPrompt")}
                  </p>
                  <Link href="/signup" className="text-xs text-brand hover:text-brand-dark font-medium mt-1 inline-block">
                    {t("dashboard.createFreeAccount")}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hero section - card with progress */}
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
              <h1 className="text-lg font-bold text-gray-900">
                {t(`dashboard.heroTitle${completedSteps}`)}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {heroSub}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold tabular-nums text-gray-900">{completedSteps}/{totalSteps}</div>
              <div className="text-xs text-gray-400">{t("dashboard.stampComplete").toLowerCase()}</div>
            </div>
          </div>
        </div>

        {/* Interleaved Training + Tests */}
        <div className="mb-6 space-y-2">
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
                  href={trainingLocked ? undefined : `/training?set=${id}`}
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
                  >
                    {hasAttempts && !testLocked && testMisses && (
                      <p className="text-xs mt-1 flex items-center gap-1.5">
                        {stillMissed === 0 && (
                          <>
                            <span className="text-green-600 font-semibold">
                              {testMisses.everMissed > 0
                                ? t("dashboard.allMissesFixed")
                                : t("dashboard.perfectRecord")}
                            </span>
                            <span className={testCompleted ? "text-green-300" : "text-gray-300"}>
                              ·
                            </span>
                          </>
                        )}
                        <span className={testCompleted ? "text-green-600" : "text-gray-400"}>
                          {testMisses.attempts === 1
                            ? t("dashboard.attemptsOne")
                            : t("dashboard.attemptsCount").replace(
                                "{{n}}",
                                String(testMisses.attempts)
                              )}{" "}
                          {isExpanded ? "▴" : "▾"}
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
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                            : "bg-white border-gray-100"
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

        {/* Super Amazing Mode — earned at 8/8, free and premium alike. Gated on
            the latched achievement rather than current progress, so retaking a
            test never takes it away. */}
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            {samUnlocked ? t("dashboard.samUnlockedLabel") : t("dashboard.samUnlockLabel")}
          </p>
          <div className="rounded-xl bg-white border border-gray-100 p-4 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-sm flex items-center gap-1.5 ${
                  samUnlocked ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {t("dashboard.samTitle")}
                {!samUnlocked && <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
              </h3>
            </div>
            <button
              role="switch"
              aria-checked={superAmazing}
              aria-label={t("dashboard.samTitle")}
              disabled={!samUnlocked}
              onClick={toggleSuperAmazing}
              className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors ${
                superAmazing && samUnlocked
                  ? "bg-brand"
                  : samUnlocked
                    ? "bg-gray-200"
                    : "bg-gray-100 cursor-not-allowed"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  superAmazing && samUnlocked ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50" />}>
      <DashboardContent />
    </Suspense>
  );
}
