"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaywallModal } from "@/components/PaywallModal";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ChevronRight, CheckCircle, Check, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { states } from "@/data/states";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackBeginCheckout, trackPurchase, trackViewItem } from "@/lib/analytics";

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
  children?: React.ReactNode;
}) {
  const content = (
    <Card className={`transition-all ${
      completed
        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm"
        : "bg-white border-gray-100 hover:shadow-md cursor-pointer"
    }`}>
      <CardContent className="p-4 flex items-center gap-3">
        {/* Completion indicator */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          completed ? "bg-green-500 text-white" : "bg-gray-100 text-gray-300"
        }`}>
          {completed ? (
            <Check className="w-4 h-4" strokeWidth={3} />
          ) : stepNumber ? (
            <span className="text-xs font-bold text-gray-400">{stepNumber}</span>
          ) : (
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm flex items-center gap-1.5 ${completed ? "text-green-900" : "text-gray-900"}`}>
            {title}
            {isPremiumLocked && <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
          </h3>
          <p className={`text-xs mt-0.5 ${completed ? "text-green-600" : "text-gray-500"}`}>
            {subtitle}
          </p>
          {children}
        </div>

        {/* Stamp or chevron */}
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

function progressColor(): string {
  return "bg-red-400";
}

function ProgressBar({ value, max, hideLabel }: { value: number; max: number; hideLabel?: boolean }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${progressColor()}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {!hideLabel && <span className="text-xs text-gray-400 tabular-nums">{value}/{max}</span>}
    </div>
  );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  const { user } = useAuth();
  const { t } = useTranslation();
  const isGuest = useStore((state) => state.isGuest);
  const selectedState = useStore((state) => state.selectedState);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const setPremiumStatus = useStore((state) => state.setPremiumStatus);
  const training = useStore((state) => state.training);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);
  const completeTest = useStore((state) => state.completeTest);

  // Paywall state
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState<"training_set_4" | "practice_test_4">("training_set_4");
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);

  const onboardingComplete = hydrated ? isOnboardingComplete() : true;
  const onboardingProgress = training.totalCorrectAllTime;
  const isPremium = hydrated ? hasPremiumAccess() : false;

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

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
  const handlePremiumClick = (feature: "training_set_4" | "practice_test_4") => {
    trackViewItem(feature);
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
    <div className="flex-1 bg-gray-50 relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
      <div className="relative container mx-auto px-4 py-6 max-w-lg md:max-w-2xl lg:max-w-4xl">

        {/* Paywall Modal */}
        <PaywallModal
          open={paywallOpen}
          onOpenChange={setPaywallOpen}
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

        {/* Sign-up prompt for guests */}
        {onboardingComplete && isGuest && (
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

        {/* Hero section — card with progress */}
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
                {t(`dashboard.heroSub${completedSteps}`)}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold tabular-nums text-gray-900">{completedSteps}/{totalSteps}</div>
              <div className="text-xs text-gray-400">{t("dashboard.stampComplete").toLowerCase()}</div>
            </div>
          </div>
          <ProgressBar value={completedSteps} max={totalSteps} hideLabel />
        </div>

        {/* Getting Started — inline CTA when not yet complete */}
        {!onboardingComplete && (
          <Link href="/training" className="block mb-6">
            <Card className="bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-brand" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-brand-darker">{t("dashboard.gettingStarted")}</h3>
                    <p className="text-xs text-brand-dark mt-0.5">{t("dashboard.gettingStartedDesc")}</p>
                    <ProgressBar value={Math.min(10, onboardingProgress)} max={10} />
                  </div>
                  <ChevronRight className="h-5 w-5 text-brand-muted" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Training & Tests — side by side on desktop */}
        {onboardingComplete && (
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Training Sets */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 px-1">
              {t("dashboard.training")}
            </h2>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((id) => {
                const progress = hydrated ? getTrainingSetProgress(id) : { correct: 0, total: 50, complete: false };
                const completed = progress.complete;
                const isPremiumLocked = id === 4 && !isPremium;

                return (
                  <ProgressCard
                    key={`training-${id}`}
                    title={t(`trainingSets.${id}`)}
                    subtitle={`${isPremiumLocked ? 0 : progress.correct}/${progress.total}`}
                    completed={completed}
                    stepNumber={id}
                    stamp={completed ? { label: t("dashboard.stampComplete"), color: "green" as const } : undefined}
                    isPremiumLocked={isPremiumLocked}
                    href={isPremiumLocked ? undefined : `/training?set=${id}`}
                    onClick={isPremiumLocked ? () => handlePremiumClick("training_set_4") : undefined}
                  >
                    {!completed && !isPremiumLocked && progress.correct > 0 && (
                      <ProgressBar value={progress.correct} max={progress.total} />
                    )}
                  </ProgressCard>
                );
              })}
            </div>
          </div>

          {/* Practice Tests */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 px-1">
              {t("dashboard.practiceTests")}
            </h2>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((testNumber) => {
                const completed = testComplete(testNumber);
                const bestPct = getTestBestPercent(testNumber);
                const bestRaw = hydrated ? getTestAttemptStats(testNumber)?.bestScore ?? null : null;
                const inProgress = isTestInProgress(testNumber);
                const isPremiumLocked = testNumber === 4 && !isPremium;

                let subtitle = t("testCard.fiftyQuestions");
                if (completed && bestPct !== null) {
                  subtitle = `${t("dashboard.bestScore")}: ${bestPct}%`;
                } else if (bestPct !== null) {
                  subtitle = `${t("dashboard.bestScore")}: ${bestPct}% — ${t("dashboard.need80")}`;
                } else if (inProgress) {
                  const currentTest = getCurrentTest(testNumber);
                  const answeredCount = currentTest ? Object.keys(currentTest.answers).length : 0;
                  subtitle = `${answeredCount}/50 ${t("testCard.answered")}`;
                }

                // Test stamp: MASTERED (50/50), PASSED (80%+), KEEP GOING (<80% with attempts)
                let testStamp: { label: string; color: "green" | "amber" | "red" } | undefined;
                if (!isPremiumLocked && bestRaw !== null) {
                  if (bestRaw === 50) {
                    testStamp = { label: t("dashboard.stampMastered"), color: "green" };
                  } else if (bestRaw >= 40) {
                    testStamp = { label: t("dashboard.stampPassed"), color: "green" };
                  } else {
                    testStamp = { label: t("dashboard.stampKeepGoing"), color: "amber" };
                  }
                }

                return (
                  <ProgressCard
                    key={`test-${testNumber}`}
                    title={t(`practiceTests.${testNumber}`)}
                    subtitle={subtitle}
                    completed={completed}
                    stepNumber={testNumber + 4}
                    stamp={testStamp}
                    isPremiumLocked={isPremiumLocked}
                    href={isPremiumLocked ? undefined : `/test/${testNumber}`}
                    onClick={isPremiumLocked ? () => handlePremiumClick("practice_test_4") : undefined}
                  >
                    {!completed && bestPct !== null && !isPremiumLocked && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${progressColor()}`}
                            style={{ width: `${Math.min(100, (bestPct / 80) * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 tabular-nums">80%</span>
                      </div>
                    )}
                  </ProgressCard>
                );
              })}
            </div>
          </div>

          </div>
        )}

        {/* Bottom banner — urgency upsell for free users, thank-you for premium */}
        {onboardingComplete && !isGuest && !isPremium && (
          <div className="rounded-xl bg-white border border-gray-100 px-5 py-4">
            <p className="text-sm font-semibold text-gray-900">
              {t("dashboard.urgencyTitle")}
            </p>
            <p className="text-xs text-gray-500 mt-1 mb-3">
              {t("dashboard.urgencyDesc")}
            </p>
            <div className="flex gap-2">
              <Link
                href="/stats"
                className="flex-1 text-center rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {t("dashboard.freeBottomYourStats")}
              </Link>
              <Link
                href="/stats?tab=community"
                className="flex-1 text-center rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {t("dashboard.freeBottomCommonMistakes")}
              </Link>
            </div>
          </div>
        )}

        {onboardingComplete && isPremium && (
          <div className="rounded-xl bg-white border border-gray-100 px-5 py-4">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/tiger_face_01.png"
                alt="Tiger with crown"
                width={36}
                height={36}
                className="w-9 h-9 flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {t("dashboard.premiumBottomTitle")}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t("dashboard.premiumBottomDesc")}{" "}
                  <a href="https://www.johnbrophy.net/contact" className="underline font-medium hover:text-gray-700">
                    {t("dashboard.premiumBottomContact")}
                  </a>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/stats"
                className="flex-1 text-center rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {t("dashboard.premiumBottomYourStats")}
              </Link>
              <Link
                href="/stats?tab=community"
                className="flex-1 text-center rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {t("dashboard.premiumBottomCommonMistakes")}
              </Link>
            </div>
          </div>
        )}
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
