"use client";

import { TestCard } from "@/components/TestCard";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, Trophy, BookOpen, MapPin } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";

export default function DashboardPage() {
  const hydrated = useHydration();
  const selectedState = useStore((state) => state.selectedState);
  const getProgress = useStore((state) => state.getProgress);
  const getTestSession = useStore((state) => state.getTestSession);
  const currentTest = useStore((state) => state.currentTest);

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
                <span>Practicing for: {selectedState || "Select a state"}</span>
                <Link href="/select-state">
                  <Button variant="link" size="sm" className="px-2">
                    {selectedState ? "Change State" : "Select State"}
                  </Button>
                </Link>
              </div>
            </div>
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
              return (
                <TestCard
                  key={testNumber}
                  testNumber={testNumber}
                  status={status}
                  score={session?.score}
                  progress={getTestProgress(testNumber)}
                  totalQuestions={50}
                />
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Continue your practice or review past tests</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {currentTest.testId && (
              <Link href={`/test/${currentTest.testId}`}>
                <Button>Continue Test {currentTest.testId}</Button>
              </Link>
            )}
            {!selectedState && (
              <Link href="/select-state">
                <Button>Select Your State</Button>
              </Link>
            )}
            {selectedState && !currentTest.testId && (
              <Link href="/test/1">
                <Button>Start Test 1</Button>
              </Link>
            )}
            <Link href="/progress">
              <Button variant="outline">View Detailed Progress</Button>
            </Link>
            <Link href="/review">
              <Button variant="outline">Review Questions</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
