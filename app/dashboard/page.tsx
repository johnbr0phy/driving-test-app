"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TestCard } from "@/components/TestCard";
import { TrainingSetCard, TrainingSet } from "@/components/TrainingSetCard";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { states } from "@/data/states";

// Training set definitions
const TRAINING_SETS: Omit<TrainingSet, 'correctCount'>[] = [
  { id: 1, name: "Signs & Signals", icon: "signs", targetCount: 50 },
  { id: 2, name: "Rules of the Road", icon: "rules", targetCount: 50 },
  { id: 3, name: "Safety & Emergencies", icon: "safety", targetCount: 50 },
  { id: 4, name: "State Laws", icon: "state", targetCount: 50 },
];

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
  const getPassProbability = useStore((state) => state.getPassProbability);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);

  const passProbability = hydrated ? getPassProbability() : 0;
  const onboardingComplete = hydrated ? isOnboardingComplete() : true;
  const trainingProgress = training.totalCorrectAllTime;

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

  // Calculate training set progress (distribute evenly for now)
  // TODO: Track per-set progress in the store
  const getTrainingSets = (): TrainingSet[] => {
    const perSet = Math.floor(trainingProgress / 4);
    const remainder = trainingProgress % 4;

    return TRAINING_SETS.map((set, index) => ({
      ...set,
      correctCount: Math.min(set.targetCount, perSet + (index < remainder ? 1 : 0)),
    }));
  };

  // Get tiger face image based on pass probability
  const getTigerFace = (probability: number): string => {
    if (probability >= 100) return "/tiger_face_01.png";
    if (probability >= 90) return "/tiger_face_02.png";
    if (probability >= 80) return "/tiger_face_03.png";
    if (probability >= 70) return "/tiger_face_04.png";
    if (probability >= 60) return "/tiger_face_05.png";
    if (probability >= 50) return "/tiger_face_06.png";
    if (probability >= 40) return "/tiger_face_07.png";
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

  const trainingSets = hydrated ? getTrainingSets() : TRAINING_SETS.map(s => ({ ...s, correctCount: 0 }));

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-2xl">
        {/* Pass Probability / Stats Card */}
        {!onboardingComplete ? (
          <Card className="mb-6 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 opacity-75">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <BarChart3 className="h-12 w-12 text-gray-300" />
                  <div className="absolute -bottom-1 -right-1 bg-gray-200 rounded-full p-1">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-500">
                    Pass Probability
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Complete training to unlock your personalized stats
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : isGuest ? (
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
        ) : (
          <Link href="/stats" className="block">
            <Card className={`mb-6 cursor-pointer transition-shadow hover:shadow-lg ${
              passProbability === 0
                ? "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
                : passProbability >= 80
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                  : passProbability >= 60
                    ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                    : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {passProbability === 0 ? (
                    <div className="text-4xl">❓</div>
                  ) : (
                    <Image
                      src={getTigerFace(passProbability)}
                      alt="Tiger mascot"
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-lg text-gray-700">
                      {passProbability === 0
                        ? "Complete a practice test to see your fail probability"
                        : passProbability >= 80
                          ? <>There is a <span className="font-bold text-xl">{passProbability}%</span> chance that you will pass the {stateName} driving knowledge test.</>
                          : <>There is a <span className="font-bold text-xl">{100 - passProbability}%</span> chance that you will fail the {stateName} driving knowledge test.</>
                      }
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Tap to see detailed stats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Training Sets */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">Training</h2>
          <p className="text-sm text-gray-500 mb-4">Master each topic to prepare for the exam</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {trainingSets.map((set) => (
              <TrainingSetCard
                key={set.id}
                set={set}
                locked={!onboardingComplete && set.id > 1}
              />
            ))}
          </div>
        </div>

        {/* Practice Tests */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Practice Tests</h2>
          <p className="text-sm text-gray-500 mb-4">Simulate the real exam experience</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
