"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Target, Award, BookOpen, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { Progress } from "@/components/ui/progress";
import { states } from "@/data/states";

export default function StatsPage() {
  const router = useRouter();
  const hydrated = useHydration();

  const selectedState = useStore((state) => state.selectedState);
  const isGuest = useStore((state) => state.isGuest);
  const getProgress = useStore((state) => state.getProgress);
  const getPassProbability = useStore((state) => state.getPassProbability);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const training = useStore((state) => state.training);

  // Get state name from code
  const stateName = states.find((s) => s.code === selectedState)?.name || selectedState;

  // Get tiger face image based on percentage (100% only for happiest)
  const getTigerFace = (percentage: number): string => {
    if (percentage >= 100) return "/tiger_face_01.png";
    if (percentage >= 85) return "/tiger_face_02.png";
    if (percentage >= 70) return "/tiger_face_03.png";
    if (percentage >= 55) return "/tiger_face_04.png";
    if (percentage >= 40) return "/tiger_face_05.png";
    if (percentage >= 25) return "/tiger_face_06.png";
    if (percentage >= 10) return "/tiger_face_07.png";
    return "/tiger_face_08.png";
  };

  // Redirect guests to signup (stats require an account)
  useEffect(() => {
    if (hydrated && isGuest) {
      router.push("/signup");
    }
  }, [hydrated, isGuest, router]);

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

  // Calculate total test attempts across all tests
  const testsAttempted = testStats.reduce((sum, t) => sum + (t.stats?.attemptCount || 0), 0);

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

  if (!hydrated || !selectedState || isGuest) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-50 to-white pointer-events-none" />
      <div className="relative container mx-auto px-4 py-8 max-w-6xl">
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

        {/* Fail Probability Card */}
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
              <div className="mb-4 flex justify-center">
                {passProbability === 0 ? (
                  <span className="text-6xl">❓</span>
                ) : (
                  <Image
                    src={getTigerFace(passProbability)}
                    alt="Tiger mascot"
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {passProbability === 0
                  ? "No Data Yet"
                  : passProbability >= 80
                    ? <><span className="text-4xl">{passProbability}%</span> chance of passing</>
                    : <><span className="text-4xl">{100 - passProbability}%</span> chance of failing</>
                }
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                {passProbability === 0
                  ? "Complete practice tests to see your probability"
                  : passProbability >= 80
                    ? `Estimated chance of passing the ${stateName} driving knowledge test`
                    : `Estimated chance of failing the ${stateName} driving knowledge test`
                }
              </p>
              {passProbability > 0 && passProbability < 80 && (
                <p className="text-sm text-gray-600">
                  Want to lower this?{" "}
                  <a
                    href="#recommendations"
                    className="text-orange-600 hover:text-orange-700 underline font-medium"
                  >
                    Check your personalized recommendations below
                  </a>
                  {" "}to improve.
                </p>
              )}
              {passProbability > 0 && (
                <Progress
                  value={passProbability >= 80 ? passProbability : 100 - passProbability}
                  className={`h-3 mt-4 ${passProbability >= 80 ? '[&>div]:bg-green-500' : '[&>div]:bg-orange-600'}`}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 mb-1">{masteryPercentage}%</div>
              <div className="text-sm text-gray-600">Overall Mastery</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 mb-1">{testsAttempted}</div>
              <div className="text-sm text-gray-600">Tests Attempted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 mb-1">{stats.accuracy}%</div>
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
              {testStats.map(({ testNumber, stats }) => {
                const percentage = stats ? Math.round((stats.bestScore / 50) * 100) : 0;

                return (
                  <div key={testNumber} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {!stats ? (
                          <span className="text-2xl">⭕</span>
                        ) : (
                          <Image
                            src={getTigerFace(percentage)}
                            alt="Tiger mascot"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                          />
                        )}
                        <h3 className="font-semibold">Test {testNumber}</h3>
                      </div>
                      <div className="flex gap-4 text-sm">
                        {stats ? (
                          <>
                            <span className="text-gray-600">
                              First: <span className="font-bold text-orange-600">{stats.firstScore}/50</span>
                            </span>
                            <span className="text-gray-600">
                              Best: <span className="font-bold text-orange-600">{stats.bestScore}/50</span>
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
                      <Progress value={percentage} className="h-2 [&>div]:bg-orange-600" />
                    )}
                  </div>
                );
              })}
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
                <div className="text-2xl font-bold text-orange-600">{totalTraining}</div>
                <div className="text-sm text-gray-600">Questions Practiced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{trainingAccuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{training.currentStreak}</div>
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
            <Button className="bg-black text-white hover:bg-gray-800">
              Start Training Mode
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-white text-black hover:bg-gray-100 border-2 border-gray-300">
              Take Practice Test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
