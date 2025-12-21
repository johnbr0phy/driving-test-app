"use client";

import { TestCard } from "@/components/TestCard";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, Trophy, BookOpen, MapPin } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const selectedState = searchParams.get("state") || "CA";

  // Mock data - will be replaced with real data later
  const stats = {
    testsCompleted: 2,
    questionsAnswered: 100,
    accuracy: 85,
    averageScore: 42.5,
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
                <span>Practicing for: {selectedState}</span>
                <Link href="/select-state">
                  <Button variant="link" size="sm" className="px-2">
                    Change State
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
            <TestCard testNumber={1} status="completed" score={45} totalQuestions={50} />
            <TestCard testNumber={2} status="in-progress" progress={60} totalQuestions={50} />
            <TestCard testNumber={3} status="not-started" totalQuestions={50} />
            <TestCard testNumber={4} status="not-started" totalQuestions={50} />
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Continue your practice or review past tests</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link href="/test/2">
              <Button>Continue Test 2</Button>
            </Link>
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
