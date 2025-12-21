"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Target, Award, BookOpen, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { Progress } from "@/components/ui/progress";
import { states } from "@/data/states";

export default function StatsPage() {
  const router = useRouter();
  const hydrated = useHydration();

  const selectedState = useStore((state) => state.selectedState);
  const getProgress = useStore((state) => state.getProgress);
  const getPassProbability = useStore((state) => state.getPassProbability);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const training = useStore((state) => state.training);

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

  const passProbability = hydrated ? getPassProbability() : 0;
  const totalTraining = training.correctCount + training.incorrectCount;
  const trainingAccuracy = totalTraining > 0 ? Math.round((training.correctCount / totalTraining) * 100) : 0;

  // Get individual test stats
  const testStats = [1, 2, 3, 4].map(testNum => ({
    testNumber: testNum,
    stats: getTestAttemptStats(testNum),
  }));

  // Calculate tests attempted (any test with at least one attempt)
  const testsAttempted = testStats.filter(t => t.stats && t.stats.attemptCount > 0).length;

  // Calculate overall mastery
  const totalBestScore = testStats.reduce((sum, t) => sum + (t.stats?.bestScore || 0), 0);
  const totalPossible = 4 * 50;
  const masteryPercentage = totalPossible > 0 ? Math.round((totalBestScore / totalPossible) * 100) : 0;

  // Determine recommendations
  const getRecommendations = () => {
    const recommendations = [];

    if (stats.testsCompleted === 0) {
      recommendations.push({
        type: "critical",
        title: "Take Your First Practice Test",
        description: "Complete at least one full practice test to get an accurate assessment of your readiness.",
      });
    }

    if (stats.averageScore < 40) {
      recommendations.push({
        type: "critical",
        title: "Focus on Training Mode",
        description: "Your average score is below passing. Use Training Mode to learn individual topics with instant feedback.",
      });
    }

    if (stats.accuracy < 80 && stats.testsCompleted > 0) {
      recommendations.push({
        type: "warning",
        title: "Improve Your Accuracy",
        description: `Your current accuracy is ${stats.accuracy}%. Aim for 80%+ to pass consistently. Review questions you got wrong.`,
      });
    }

    if (stats.testsCompleted < 3 && stats.testsCompleted > 0) {
      recommendations.push({
        type: "info",
        title: "Practice More Tests",
        description: "Complete more practice tests to improve consistency and unlock all test levels.",
      });
    }

    if (stats.averageScore >= 40 && stats.testsCompleted >= 2) {
      recommendations.push({
        type: "success",
        title: "You're Ready!",
        description: "Great job! Your scores indicate you're well-prepared for the actual test. Keep practicing to maintain your skills.",
      });
    }

    if (training.bestStreak < 10 && totalTraining > 0) {
      recommendations.push({
        type: "info",
        title: "Build Your Streak",
        description: "Work on getting 10+ correct answers in a row in Training Mode to build confidence.",
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  if (!hydrated || !selectedState) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Your Statistics</h1>
          <p className="text-gray-600">Detailed performance analysis and recommendations</p>
        </div>

        {/* Pass Probability Card */}
        <Card className={`mb-6 ${
          passProbability === 0
            ? "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
            : passProbability >= 80
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
              : passProbability >= 60
                ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
        }`}>
          <CardContent className="p-8">
            <div className="text-center">
              <TrendingUp className={`h-16 w-16 mx-auto mb-4 ${
                passProbability === 0
                  ? "text-gray-600"
                  : passProbability >= 80
                    ? "text-green-600"
                    : passProbability >= 60
                      ? "text-orange-600"
                      : "text-red-600"
              }`} />
              <h2 className="text-3xl font-bold mb-2">
                {passProbability === 0 ? "No Data Yet" : `${passProbability}%`}
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                {passProbability === 0
                  ? "Complete practice tests to see your pass probability"
                  : `Estimated chance of passing the ${stateName} driving knowledge test`
                }
              </p>
              {passProbability > 0 && passProbability < 80 && (
                <p className="text-sm text-gray-600">
                  Don&apos;t worry if this is low!{" "}
                  <a
                    href="#recommendations"
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Check your personalized recommendations below
                  </a>
                  {" "}to improve.
                </p>
              )}
              {passProbability > 0 && (
                <Progress value={passProbability} className="h-3 mt-4" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 mb-1">{masteryPercentage}%</div>
              <div className="text-sm text-gray-600">Overall Mastery</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">{testsAttempted}</div>
              <div className="text-sm text-gray-600">Tests Attempted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.accuracy}%</div>
              <div className="text-sm text-gray-600">Test Accuracy</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 mb-1">{stats.questionsAnswered}</div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </CardContent>
          </Card>
        </div>

        {/* Individual Test Performance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Practice Test Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testStats.map(({ testNumber, stats }) => (
                <div key={testNumber} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Test {testNumber}</h3>
                    <div className="flex gap-4 text-sm">
                      {stats ? (
                        <>
                          <span className="text-gray-600">
                            First: <span className="font-bold text-blue-600">{stats.firstScore}/50</span>
                          </span>
                          <span className="text-gray-600">
                            Best: <span className="font-bold text-green-600">{stats.bestScore}/50</span>
                          </span>
                          <span className="text-gray-600">
                            Attempts: <span className="font-bold">{stats.attemptCount}</span>
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400 italic">Not started</span>
                      )}
                    </div>
                  </div>
                  {stats && (
                    <Progress value={(stats.bestScore / 50) * 100} className="h-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training Mode Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Training Mode Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalTraining}</div>
                <div className="text-sm text-gray-600">Questions Practiced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{trainingAccuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{training.currentStreak}</div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{training.bestStreak}</div>
                <div className="text-sm text-gray-600">Best Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card id="recommendations" className="mb-6 scroll-mt-8">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  Keep up the great work! Continue practicing to maintain your skills.
                </p>
              ) : (
                recommendations.map((rec, index) => {
                  const Icon = rec.type === "critical" ? XCircle :
                              rec.type === "warning" ? AlertCircle :
                              rec.type === "success" ? CheckCircle : Target;
                  const colorClass = rec.type === "critical" ? "text-red-600" :
                                   rec.type === "warning" ? "text-yellow-600" :
                                   rec.type === "success" ? "text-green-600" : "text-blue-600";

                  return (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <Icon className={`h-6 w-6 ${colorClass} flex-shrink-0 mt-1`} />
                      <div>
                        <h4 className="font-semibold mb-1">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-4 justify-center">
          <Link href="/training">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Start Training Mode
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">
              Take Practice Test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
