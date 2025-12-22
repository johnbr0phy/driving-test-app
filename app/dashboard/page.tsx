"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TestCard } from "@/components/TestCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useAuth } from "@/contexts/AuthContext";
import { states } from "@/data/states";

export default function DashboardPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { user } = useAuth();
  const isGuest = useStore((state) => state.isGuest);
  const selectedState = useStore((state) => state.selectedState);
  const getProgress = useStore((state) => state.getProgress);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getTestAverageScore = useStore((state) => state.getTestAverageScore);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const isTestUnlocked = useStore((state) => state.isTestUnlocked);
  const training = useStore((state) => state.training);
  const getPassProbability = useStore((state) => state.getPassProbability);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);

  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  const passProbability = hydrated ? getPassProbability() : 0;
  const onboardingComplete = hydrated ? isOnboardingComplete() : true; // Default true to avoid flash
  const trainingProgress = training.totalCorrectAllTime;

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  // Auto-expand the next available test on mobile
  useEffect(() => {
    if (!hydrated) return;

    // Find the next test to expand (first test that is in-progress or not started and unlocked)
    for (let testNumber = 1; testNumber <= 4; testNumber++) {
      const currentTest = getCurrentTest(testNumber);
      const session = getTestSession(testNumber);
      const unlocked = isTestUnlocked(testNumber);

      // If test is in progress, expand it
      if (currentTest && currentTest.questions.length > 0) {
        setExpandedTest(testNumber);
        return;
      }

      // If test is unlocked and not completed yet, expand it
      if (unlocked && !session) {
        setExpandedTest(testNumber);
        return;
      }

      // If test is unlocked and completed, continue to next test
      // If test is locked, continue to next (shouldn't happen)
    }

    // If all tests are completed, expand the last one
    setExpandedTest(4);
  }, [hydrated, getCurrentTest, getTestSession, isTestUnlocked]);

  const stats = hydrated ? getProgress() : {
    testsCompleted: 0,
    questionsAnswered: 0,
    totalCorrect: 0,
    accuracy: 0,
    averageScore: 0,
  };

  // Get status for each test
  const getTestStatus = (testNumber: number): "not-started" | "in-progress" | "completed" => {
    const currentTest = getCurrentTest(testNumber);
    // If there's a test in progress (even if previously completed), show in-progress
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

  const getLockMessage = (testNumber: number): string => {
    if (testNumber === 1) return ""; // Test 1 is never locked
    // Tests 2-4 unlock after onboarding
    return "Complete 10 correct answers in Training Mode to unlock";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Fail Probability - Only show when onboarding is complete */}
        {onboardingComplete && (
          isGuest ? (
            // Guest users see a prompt to sign up for stats
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">📊</div>
                  <div className="flex-1">
                    <p className="text-lg text-gray-700">
                      <span className="font-bold">Sign up</span> to track your pass probability and detailed statistics
                    </p>
                    <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-1 inline-block">
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
                    <div className="text-4xl">
                      {passProbability === 0
                        ? "❓"
                        : passProbability >= 90
                          ? "🎉"
                          : passProbability >= 80
                            ? "😄"
                            : passProbability >= 70
                              ? "🙂"
                              : passProbability >= 60
                                ? "😐"
                                : passProbability >= 40
                                  ? "😕"
                                  : "😰"
                      }
                    </div>
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
          )
        )}

        {/* Onboarding CTA - Show when onboarding is not complete */}
        {!onboardingComplete && (
          <Card className="mb-6 bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300">
            <CardContent className="p-6 md:p-8">
              <div className="text-center">
                <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-orange-900 mb-2">
                  Get Started with Training Mode
                </h2>
                <p className="text-orange-800 mb-4 max-w-lg mx-auto">
                  Answer 10 questions correctly in Training Mode to unlock Practice Tests and track your pass probability.
                </p>
                <div className="mb-4">
                  <div className="text-sm text-orange-700 mb-2">
                    Progress: {trainingProgress}/10 correct answers
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-3 max-w-xs mx-auto">
                    <div
                      className="bg-orange-600 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (trainingProgress / 10) * 100)}%` }}
                    />
                  </div>
                </div>
                <Link href="/training">
                  <Button size="lg" className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6">
                    Start Training
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Training Mode */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Training Mode</h2>
          <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Zap className="h-10 w-10 text-orange-600" />
                  <div>
                    <h3 className="font-bold text-lg text-orange-900">
                      {trainingProgress}/200 questions answered correctly
                    </h3>
                    <div className="w-full bg-orange-200 rounded-full h-2 mt-2 max-w-xs">
                      <div
                        className="bg-orange-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (trainingProgress / 200) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
                <Link href="/training" className="w-full sm:w-auto">
                  <Button className="bg-black text-white hover:bg-gray-800 w-full">
                    {onboardingComplete ? "Continue Training" : "Start Training"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Practice Tests - Only show when onboarding is complete */}
        {onboardingComplete && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Simulate the real exam</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((testNumber) => {
                const status = getTestStatus(testNumber);
                const session = getTestSession(testNumber);
                const attemptStats = getTestAttemptStats(testNumber);
                const averageScore = getTestAverageScore(testNumber);
                const locked = !isTestUnlocked(testNumber);
                return (
                  <TestCard
                    key={testNumber}
                    testNumber={testNumber}
                    status={status}
                    score={session?.score}
                    progress={getTestProgress(testNumber)}
                    totalQuestions={50}
                    firstScore={attemptStats?.firstScore}
                    bestScore={attemptStats?.bestScore}
                    attemptCount={attemptStats?.attemptCount}
                    averageScore={averageScore}
                    locked={locked}
                    lockMessage={getLockMessage(testNumber)}
                    expanded={expandedTest === testNumber}
                    onToggle={() => setExpandedTest(expandedTest === testNumber ? null : testNumber)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
