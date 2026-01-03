"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, XCircle, ChevronDown, ChevronUp, TrendingUp, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { Cloud } from "lucide-react";
import { Fireworks } from "@/components/Fireworks";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params.id as string);
  const hydrated = useHydration();

  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const isGuest = useStore((state) => state.isGuest);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);

  const testSession = hydrated ? getTestSession(testId) : null;
  const attemptStats = hydrated ? getTestAttemptStats(testId) : null;

  useEffect(() => {
    if (!hydrated) {
      return; // Wait for hydration
    }

    if (!testSession) {
      // No test session found, redirect to test
      router.push(`/test/${testId}`);
    } else {
      setLoading(false);
      // Show fireworks if passed (70% or higher)
      const score = testSession.score || 0;
      const total = testSession.questions.length;
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
      if (percentage >= 70) {
        setShowFireworks(true);
      }
    }
  }, [testSession, testId, router, hydrated]);

  if (!testSession) {
    return null;
  }

  const questions = testSession.questions;
  const score = testSession.score || 0;
  const answers: { [key: number]: string } = {};
  testSession.answers.forEach((answer, index) => {
    answers[index] = answer.userAnswer;
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= 70;

  // Calculate improvement metrics
  const firstScore = attemptStats?.firstScore || score;
  const bestScore = attemptStats?.bestScore || score;
  const firstPercentage = Math.round((firstScore / totalQuestions) * 100);
  const bestPercentage = Math.round((bestScore / totalQuestions) * 100);
  const improvement = percentage - firstPercentage;
  const isNewBest = score === bestScore && attemptStats && attemptStats.attemptCount > 1;
  const attemptNumber = attemptStats?.attemptCount || 1;

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const expandAll = () => {
    setExpandedQuestions(new Set(questions.map((_, index) => index)));
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold mb-2">Loading results...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fireworks Animation */}
      {showFireworks && (
        <Fireworks duration={3000} onComplete={() => setShowFireworks(false)} />
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Results Header - Main Score */}
        <Card className={`mb-6 ${passed ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-300"}`}>
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                passed ? "bg-green-100 border-4 border-green-300" : "bg-orange-100 border-4 border-orange-300"
              }`}>
                {passed ? (
                  <Trophy className="w-12 h-12 text-green-600" />
                ) : (
                  <XCircle className="w-12 h-12 text-orange-600" />
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {passed ? "Congratulations!" : "Keep Practicing!"}
              </h1>

              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                {passed
                  ? "You passed the test with flying colors!"
                  : "You need 70% to pass. Review the questions below and try again."}
              </p>

              {/* Main Score Display */}
              <div className="mb-6">
                <div className={`text-7xl md:text-8xl font-bold mb-3 ${passed ? "text-green-600" : "text-orange-600"}`}>
                  {percentage}%
                </div>
                <div className="text-2xl text-gray-700 mb-4">
                  {score} out of {totalQuestions} correct
                </div>
                <Badge
                  className={`text-lg px-6 py-2 ${
                    passed ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  {passed ? "PASSED" : "FAILED"}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8 max-w-2xl mx-auto">
                <Button className="bg-black text-white hover:bg-gray-800 flex-1 sm:flex-initial" onClick={() => router.push("/dashboard")}>
                  Back to Dashboard
                </Button>
                <Button
                  className="bg-white text-black hover:bg-gray-100 border-2 border-gray-300 flex-1 sm:flex-initial"
                  onClick={() => router.push(`/test/${testId}`)}
                >
                  Retake Test
                </Button>
                {!isGuest && (
                  <Button
                    className="bg-white text-black hover:bg-gray-100 border-2 border-gray-300 flex-1 sm:flex-initial"
                    onClick={() => router.push("/stats")}
                  >
                    View Stats
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest Signup Prompt */}
        {isGuest && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Save Your Progress</h3>
                  <p className="text-gray-600">
                    Your score is only saved on this device. Create a free account to save your progress to the cloud and track your improvement over time.
                  </p>
                </div>
                <Link href="/signup">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Improvement Stats */}
        {attemptStats && attemptStats.attemptCount > 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">Your Progress</CardTitle>
              <p className="text-center text-sm text-gray-600">Attempt #{attemptNumber}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* First Attempt */}
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">First Attempt</div>
                    <div className="text-4xl font-bold text-gray-700 mb-1">
                      {firstPercentage}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {firstScore}/{totalQuestions} correct
                    </div>
                  </CardContent>
                </Card>

                {/* This Attempt */}
                <Card className="bg-orange-50 border-orange-200 border-2">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm font-medium text-orange-700 mb-2">This Attempt</div>
                    <div className="text-4xl font-bold text-orange-600 mb-1">
                      {percentage}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {score}/{totalQuestions} correct
                    </div>
                    {isNewBest && (
                      <div className="flex items-center justify-center gap-1 text-yellow-600 font-semibold mt-2">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm">NEW BEST!</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Best Score */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm font-medium text-green-700 mb-2">Best Score</div>
                    <div className="text-4xl font-bold text-green-600 mb-1">
                      {bestPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {bestScore}/{totalQuestions} correct
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Improvement Message */}
              {improvement > 0 && (
                <div className="flex items-center justify-center gap-2 bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <span className="text-lg font-semibold text-green-700">
                    Improved by {improvement}% since first attempt! 🚀
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Question Review */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Review Questions</h2>
          <div className="flex gap-2">
            <Button size="sm" className="bg-white text-black hover:bg-gray-100 border-2 border-gray-300" onClick={expandAll}>
              Expand All
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100 border-2 border-gray-300" onClick={collapseAll}>
              Collapse All
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const isExpanded = expandedQuestions.has(index);

            return (
              <Card key={index}>
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{question.question}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Your answer: <span className="font-semibold">{userAnswer || "Not answered"}</span>
                          {!isCorrect && (
                            <span className="ml-2">
                              • Correct: <span className="font-semibold text-green-600">{question.correctAnswer}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={isCorrect ? "bg-green-500" : "bg-red-500"}>
                        {isCorrect ? "Correct" : "Wrong"}
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent>
                    <QuestionCard
                      question={question}
                      questionNumber={index + 1}
                      totalQuestions={totalQuestions}
                      selectedAnswer={userAnswer}
                      onAnswerChange={() => {}}
                      showResult={true}
                    />
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
