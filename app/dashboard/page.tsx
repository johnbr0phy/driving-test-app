"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TestCard } from "@/components/TestCard";
import { TrainingSetCard, TrainingSet } from "@/components/TrainingSetCard";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, BarChart3, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { states } from "@/data/states";

// Training set definitions
const TRAINING_SET_NAMES: { [key: number]: string } = {
  1: "Signs & Signals",
  2: "Rules of the Road",
  3: "Safety & Emergencies",
  4: "State Laws",
};

export default function DashboardPage() {
  const router = useRouter();
  const hydrated = useHydration();
  useAuth();
  const isGuest = useStore((state) => state.isGuest);
  const selectedState = useStore((state) => state.selectedState);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const isTestUnlocked = useStore((state) => state.isTestUnlocked);
  const training = useStore((state) => state.training);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const getPassProbability = useStore((state) => state.getPassProbability);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);

  const passProbability = hydrated ? getPassProbability() : 0;
  const onboardingComplete = hydrated ? isOnboardingComplete() : true;
  const onboardingProgress = training.totalCorrectAllTime;

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

  // Build training sets from store
  const getTrainingSets = (): TrainingSet[] => {
    return [1, 2, 3, 4].map((id) => {
      const progress = getTrainingSetProgress(id);
      return {
        id,
        name: TRAINING_SET_NAMES[id],
        correctCount: progress.correct,
        targetCount: progress.total,
      };
    });
  };

  // Get tiger face image based on pass probability (100% only for happiest)
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

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  // Get status for each test
  const getTestStatus = (testNumber: number): "not-started" | "in-progress" | "completed" => {
    const currentTest = getCurrentTest(testNumber);
    if (currentTest && currentTest.questions.length > 0) return "in-progress";
    const session = getTestSession(testNumber);
    if (session) return "completed";
    return "not-started";
  };

  const getTestProgress = (testNumber: number): number => {
    const currentTest = getCurrentTest(testNumber);
    if (currentTest) {
      const answeredCount = Object.keys(currentTest.answers).length;
      const totalQuestions = currentTest.questions.length;
      return totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
    }
    return 0;
  };

  const trainingSets = hydrated ? getTrainingSets() : [1, 2, 3, 4].map((id) => ({
    id,
    name: TRAINING_SET_NAMES[id],
    correctCount: 0,
    targetCount: 50,
  }));

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">

        {/* Onboarding Card - shown during onboarding */}
        {!onboardingComplete && (
          <Link href="/training" className="block">
            <Card className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Zap className="h-12 w-12 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-orange-900">
                      {onboardingProgress}/10
                    </p>
                    <p className="text-sm text-orange-700 mt-1">
                      {10 - onboardingProgress} more to unlock training & tests
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Pass Probability / Stats Card - shown after onboarding when there's data */}
        {onboardingComplete && isGuest && (
          <Card className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📊</div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700">
                    <span className="font-bold">Sign up</span> to track your pass probability and detailed statistics
                  </p>
                  <Link href="/signup" className="text-sm text-orange-600 hover:text-orange-800 font-medium mt-1 inline-block">
                    Create free account →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {onboardingComplete && !isGuest && passProbability > 0 && (
          <Link href="/stats" className="block">
            <Card className={`mb-6 cursor-pointer transition-shadow hover:shadow-lg ${
              passProbability >= 80
                ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
                : passProbability >= 60
                  ? "bg-gradient-to-r from-lime-50 to-green-50 border-lime-200"
                  : passProbability >= 40
                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
                    : passProbability >= 20
                      ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                      : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
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
                    <p className="text-lg text-gray-700">
                      {passProbability > 50
                        ? <>You have a <span className="font-bold text-xl">{passProbability}%</span> pass rate for the {stateName} driving knowledge test.</>
                        : <>There is a <span className="font-bold text-xl">{100 - passProbability}%</span> chance that you will fail the {stateName} driving knowledge test.</>
                      }
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Tap to see detailed stats</p>
                  </div>
                  <ChevronRight className={`h-6 w-6 ${
                    passProbability >= 80
                      ? "text-emerald-400"
                      : passProbability >= 60
                        ? "text-lime-400"
                        : passProbability >= 40
                          ? "text-amber-400"
                          : passProbability >= 20
                            ? "text-orange-400"
                            : "text-red-400"
                  }`} />
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Training Sets - only shown after onboarding */}
        {onboardingComplete && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">Training</h2>
            <p className="text-sm text-gray-500 mb-4">Get all 50 questions correct to complete each set</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trainingSets.map((set) => (
                <TrainingSetCard
                  key={set.id}
                  set={set}
                />
              ))}
            </div>
          </div>
        )}

        {/* Practice Tests */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Practice Tests</h2>
          <p className="text-sm text-gray-500 mb-4">
            {onboardingComplete ? "Simulate the real exam experience" : "Complete onboarding to unlock"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((testNumber) => {
              const status = getTestStatus(testNumber);
              const session = getTestSession(testNumber);
              const attemptStats = getTestAttemptStats(testNumber);
              const locked = !onboardingComplete || !isTestUnlocked(testNumber);
              return (
                <TestCard
                  key={testNumber}
                  testNumber={testNumber}
                  status={locked ? "not-started" : status}
                  score={session?.score}
                  progress={getTestProgress(testNumber)}
                  totalQuestions={50}
                  bestScore={attemptStats?.bestScore}
                  locked={locked}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
