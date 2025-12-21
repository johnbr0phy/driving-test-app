"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TestCard } from "@/components/TestCard";
import { StatsCard } from "@/components/StatsCard";
import { MasteryProgress } from "@/components/MasteryProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, Trophy, BookOpen, MapPin, Zap } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";

export default function DashboardPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const selectedState = useStore((state) => state.selectedState);
  const getProgress = useStore((state) => state.getProgress);
  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const currentTest = useStore((state) => state.currentTest);

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
    const session = getTestSession(testNumber);
    if (session) return "completed";
    if (currentTest.testId === testNumber) return "in-progress";
    return "not-started";
  };

  const getTestProgress = (testNumber: number): number => {
    if (currentTest.testId === testNumber) {
      const answeredCount = Object.keys(currentTest.answers).length;
      const totalQuestions = currentTest.questions.length;
      return totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
    }
    return 0;
  };

  // Calculate overall mastery (sum of best scores)
  const totalBestScore = hydrated
    ? [1, 2, 3, 4].reduce((sum, testNum) => {
        const attemptStats = getTestAttemptStats(testNum);
        return sum + (attemptStats?.bestScore || 0);
      }, 0)
    : 0;
  const totalPossible = 4 * 50; // 4 tests × 50 questions each

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Practicing for: {selectedState}</span>
              </div>
            </div>
          </div>

          {/* Mastery Progress */}
          <div className="mb-8">
            <MasteryProgress totalBestScore={totalBestScore} totalPossible={totalPossible} />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Tests Completed"
              value={`${stats.testsCompleted}/4`}
              description={`${(stats.testsCompleted / 4) * 100}% of all tests`}
              icon={CheckCircle2}
              iconColor="text-green-600"
            />
            <StatsCard
              title="Questions Answered"
              value={stats.questionsAnswered}
              description="Total questions attempted"
              icon={BookOpen}
              iconColor="text-blue-600"
            />
            <StatsCard
              title="Accuracy"
              value={`${stats.accuracy}%`}
              description="Overall correct answers"
              icon={Target}
              iconColor="text-purple-600"
            />
            <StatsCard
              title="Average Score"
              value={`${stats.averageScore}/50`}
              description="Average test score"
              icon={Trophy}
              iconColor="text-yellow-600"
            />
          </div>
        </div>

        {/* Tests Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Practice Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((testNumber) => {
              const status = getTestStatus(testNumber);
              const session = getTestSession(testNumber);
              const attemptStats = getTestAttemptStats(testNumber);
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
                />
              );
            })}
          </div>
        </div>

        {/* Training Mode CTA */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-purple-600" />
              <div>
                <CardTitle className="text-purple-900">Training Mode</CardTitle>
                <CardDescription>Practice specific categories with instant feedback</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Master individual question categories at your own pace. Get instant feedback and explanations after each question.
            </p>
            <Link href="/training">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Start Training
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
