"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TestCard } from "@/components/TestCard";
import { TrainingSetCard, TrainingSet } from "@/components/TrainingSetCard";
import { PaywallModal } from "@/components/PaywallModal";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ChevronRight, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";

import { useTranslation } from "@/contexts/LanguageContext";
import { trackBeginCheckout, trackPurchase, trackViewItem } from "@/lib/analytics";

const CDL_TRAINING_SET_NAMES: { [key: number]: string } = {
  1: "Vehicle Inspection",
  2: "Safe Driving I",
  3: "Safe Driving II",
  4: "Vehicle Control",
  5: "Cargo Handling",
  6: "Emergency Procedures",
  7: "Alcohol, Drugs & Night Driving",
  8: "Weather & Night Driving",
  9: "Mountain & Railroad Crossings",
  10: "Hazard Perception",
  11: "Braking Systems",
  12: "Vehicle Systems",
};

function CDLDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  const { user } = useAuth();
  const { t } = useTranslation();
  const isGuest = useStore((state) => state.isGuest);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const setPremiumStatus = useStore((state) => state.setPremiumStatus);
  const training = useStore((state) => state.training);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const getCDLPassProbability = useStore((state) => state.getCDLPassProbability);
  const getCDLProgress = useStore((state) => state.getCDLProgress);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);

  // CDL helper functions for ID mapping
  const cdlTestId = (testNumber: number) => 100 + testNumber; // 1->101, 2->102, etc.
  const cdlSetId = (setNumber: number) => 100 + setNumber; // 1->101, 2->102, etc.

  // Paywall state (keeping for future premium features)
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState<"training_set_4" | "practice_test_4">("training_set_4");
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);

  const passProbability = hydrated ? getCDLPassProbability() : 0;
  const onboardingComplete = hydrated ? isOnboardingComplete() : true;
  const onboardingProgress = training.totalCorrectAllTime;
  const isPremium = hydrated ? hasPremiumAccess() : false;

  // Build CDL training sets from store (12 sets)
  const getCDLTrainingSets = (): TrainingSet[] => {
    return Array.from({ length: 12 }, (_, i) => {
      const id = i + 1;
      const cdlId = cdlSetId(id);
      const progress = getTrainingSetProgress(cdlId);
      return {
        id: cdlId,
        name: CDL_TRAINING_SET_NAMES[id] || `CDL Training Set ${id}`,
        correctCount: progress.correct,
        targetCount: progress.total || 50, // 50 questions per set
      };
    });
  };

  // Get tiger face image based on CDL pass probability (80% threshold)
  const getTigerFace = (probability: number): string => {
    if (probability >= 100) return "/tiger_face_01.png";
    if (probability >= 85) return "/tiger_face_02.png";
    if (probability >= 70) return "/tiger_face_03.png";
    if (probability >= 55) return "/tiger_face_04.png";
    if (probability >= 40) return "/tiger_face_05.png";
    if (probability >= 25) return "/tiger_face_06.png";
    if (probability >= 10) return "/tiger_face_07.png";
    return "/tiger_face_08.png";
  };

  // Handle post-purchase verification (for future premium features)
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (sessionId && success === "true" && user?.uid) {
      // Verify purchase with backend
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
            // Clean up URL
            router.replace("/cdl/dashboard");
          }
        })
        .catch((err) => console.error("Failed to verify purchase:", err));
    }

    if (canceled === "true") {
      // Clean up URL
      router.replace("/cdl/dashboard");
    }
  }, [searchParams, user?.uid, setPremiumStatus, router]);

  // Handle paywall click (for future premium features)
  const handlePremiumClick = (feature: "training_set_4" | "practice_test_4") => {
    trackViewItem();
    setPaywallFeature(feature);
    setPaywallOpen(true);
  };

  // Handle upgrade (for future premium features)
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
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Checkout error:", data.error);
        alert(`Error: ${data.error}`);
        return;
      }

      if (data.checkoutUrl) {
        trackBeginCheckout();
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

  // Get status for each CDL test
  const getCDLTestStatus = (testNumber: number): "not-started" | "in-progress" | "completed" => {
    const cdlId = cdlTestId(testNumber);
    const currentTest = getCurrentTest(cdlId);
    if (currentTest && currentTest.questions.length > 0) return "in-progress";
    const session = getTestSession(cdlId);
    if (session) return "completed";
    return "not-started";
  };

  const getCDLTestProgress = (testNumber: number): number => {
    const cdlId = cdlTestId(testNumber);
    const currentTest = getCurrentTest(cdlId);
    if (currentTest) {
      const answeredCount = Object.keys(currentTest.answers).length;
      const totalQuestions = currentTest.questions.length;
      return totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
    }
    return 0;
  };

  const cdlTrainingSets = hydrated ? getCDLTrainingSets() : Array.from({ length: 12 }, (_, i) => ({
    id: 101 + i,
    name: CDL_TRAINING_SET_NAMES[i + 1] || `CDL Training Set ${i + 1}`,
    correctCount: 0,
    targetCount: 50,
  }));

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white dark:from-brand-light/20 dark:to-gray-900 pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">

        {/* Back to CDL Landing Page */}
        <div className="mb-6">
          <Link
            href="/cdl-practice-test"
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to CDL Practice Test
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            CDL Practice Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Master your Commercial Driver&apos;s License test with 600 practice questions and 12 comprehensive tests
          </p>
        </div>

        {/* Paywall Modal (for future premium features) */}
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
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/20 dark:to-emerald-500/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <div className="flex-1">
                  <p className="text-xl font-bold text-green-900 dark:text-green-100">
                    Welcome to Premium CDL!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    All premium CDL features are now unlocked
                  </p>
                </div>
                <button
                  onClick={() => setShowPurchaseSuccess(false)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  &times;
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Onboarding Card - shown during onboarding */}
        {!onboardingComplete && (
          <Link href="/cdl/training?set=1" className="block">
            <Card className="mb-6 bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Zap className="h-12 w-12 text-brand" />
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-brand-darker">
                      {onboardingProgress}/10
                    </p>
                    <p className="text-sm text-brand-dark mt-1">
                      {10 - onboardingProgress} more correct to unlock CDL tests
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-brand-muted" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Pass Probability / Stats Card - shown after onboarding when there's data */}
        {onboardingComplete && isGuest && (
          <Card className="mb-6 bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📊</div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Sign Up</span> to track your CDL progress and view detailed statistics
                  </p>
                  <Link href="/signup" className="text-sm text-brand hover:text-brand-dark font-medium mt-1 inline-block">
                    Create Free Account
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {onboardingComplete && !isGuest && passProbability > 0 && (
          <Link href="/cdl/stats" className="block">
            <Card className={`mb-6 cursor-pointer transition-shadow hover:shadow-lg ${
              passProbability >= 80
                ? "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-500/20 dark:to-green-500/20 border-emerald-200 dark:border-emerald-800"
                : passProbability >= 60
                  ? "bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-500/20 dark:to-green-500/20 border-lime-200 dark:border-lime-800"
                  : passProbability >= 40
                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-500/20 dark:to-yellow-500/20 border-amber-200 dark:border-amber-800"
                    : passProbability >= 20
                      ? "bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light"
                      : "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-500/20 dark:to-rose-500/20 border-red-200 dark:border-red-800"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={getTigerFace(passProbability)}
                    alt="Tiger mascot"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <div className="flex-1">
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {passProbability > 50
                        ? <>{passProbability}% chance of passing CDL test</>
                        : <>{100 - passProbability}% chance of failing CDL test</>
                      }
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:hidden">Learn how to improve</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:inline">View Stats</span>
                    <ChevronRight className={`h-6 w-6 ${
                    passProbability >= 80
                      ? "text-emerald-400"
                      : passProbability >= 60
                        ? "text-lime-400"
                        : passProbability >= 40
                          ? "text-amber-400"
                          : passProbability >= 20
                            ? "text-brand-muted"
                            : "text-red-400"
                  }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* CDL Training Sets - only shown after onboarding */}
        {onboardingComplete && (
          <div className="mb-8">
            <div className="mb-3">
              <h2 className="text-xl font-bold">CDL Training</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Master CDL topics with instant feedback and spaced repetition</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cdlTrainingSets.map((set, index) => {
                const setNumber = index + 1;
                // All CDL training sets are free for now
                return (
                  <TrainingSetCard
                    key={set.id}
                    set={set}
                    isPremiumLocked={false}
                    onPremiumClick={() => {}}
                    href={`/cdl/training?set=${setNumber}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* CDL Practice Tests */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">CDL Practice Tests</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {onboardingComplete ? "Simulate the real CDL exam with 50-question tests (80% to pass)" : "Complete onboarding to unlock practice tests"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((testNumber) => {
              const status = getCDLTestStatus(testNumber);
              const cdlId = cdlTestId(testNumber);
              const session = getTestSession(cdlId);
              const attemptStats = getTestAttemptStats(cdlId);
              const locked = !onboardingComplete;
              // All CDL tests are free for now
              return (
                <TestCard
                  key={testNumber}
                  testNumber={testNumber}
                  status={locked ? "not-started" : status}
                  score={session?.score}
                  progress={getCDLTestProgress(testNumber)}
                  totalQuestions={50}
                  bestScore={attemptStats?.bestScore}
                  locked={locked}
                  isPremiumLocked={false}
                  onPremiumClick={() => {}}
                  href={`/cdl/test/${cdlId}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CDLDashboardPage() {
  return (
    
      <Suspense fallback={<div className="flex-1 bg-white dark:bg-gray-900" />}>
        <CDLDashboardContent />
      </Suspense>
    
  );
}