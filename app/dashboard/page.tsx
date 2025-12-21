"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TestCard } from "@/components/TestCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { states } from "@/data/states";

export default function DashboardPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const selectedState = useStore((state) => state.selectedState);
  const getProgress = useStore((state) => state.getProgress);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const getTestAverageScore = useStore((state) => state.getTestAverageScore);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const isTestUnlocked = useStore((state) => state.isTestUnlocked);
  const training = useStore((state) => state.training);
  const getPassProbability = useStore((state) => state.getPassProbability);

  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  const passProbability = hydrated ? getPassProbability() : 0;

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

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
    if (testNumber === 2) return "Score 40/50 on Test 1.";
    if (testNumber === 3) return "Score 40/50 on Test 1 and 2.";
    if (testNumber === 4) return "Score 40/50 on Test 1, 2 and 3.";
    return "Score 40+ on previous tests to unlock";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Pass Probability */}
        <Card className={`mb-6 ${
          passProbability === 0
            ? "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
            : passProbability >= 80
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
              : passProbability >= 60
                ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TrendingUp className={`h-10 w-10 ${
                  passProbability === 0
                    ? "text-gray-600"
                    : passProbability >= 80
                      ? "text-green-600"
                      : passProbability >= 60
                        ? "text-orange-600"
                        : "text-red-600"
                }`} />
                <div>
                  <p className="text-lg text-gray-700">
                    {passProbability === 0
                      ? "Complete a practice test to see your pass probability"
                      : `There is a ${passProbability}% chance that you will pass the ${stateName} driving knowledge test.`
                    }
                  </p>
                </div>
              </div>
              <Link href="/stats">
                <Button variant="outline" className="bg-white hover:bg-gray-50">
                  More Stats
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Training Mode */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Training Mode</h2>
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Zap className="h-10 w-10 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-lg text-purple-900">Learn at your own pace.</h3>
                  </div>
                </div>
                <Link href="/training">
                  <Button>
                    Start Training
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Practice Tests */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Simulate the real exam.</h2>
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
      </div>
    </div>
  );
}
