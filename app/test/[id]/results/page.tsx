"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params.id as string);
  const hydrated = useHydration();

  const getTestSession = useStore((state) => state.getTestSession);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  const testSession = hydrated ? getTestSession(testId) : null;

  useEffect(() => {
    if (!hydrated) {
      return; // Wait for hydration
    }

    if (!testSession) {
      // No test session found, redirect to test
      router.push(`/test/${testId}`);
    } else {
      setLoading(false);
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
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}>
                {passed ? (
                  <Trophy className="w-10 h-10 text-green-600" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-600" />
                )}
              </div>
              <CardTitle className="text-3xl mb-2">
                {passed ? "Congratulations!" : "Keep Practicing!"}
              </CardTitle>
              <p className="text-gray-600 mb-4">
                {passed
                  ? "You passed the test with flying colors!"
                  : "You need 70% to pass. Review the questions below and try again."}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {score}/{totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div>
                <div className={`text-4xl font-bold mb-1 ${
                  passed ? "text-green-600" : "text-red-600"
                }`}>
                  {percentage}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div>
                <Badge
                  className={`text-lg px-4 py-2 ${
                    passed ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {passed ? "PASSED" : "FAILED"}
                </Badge>
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-6">
              <Button onClick={() => router.push("/dashboard")}>
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(`/test/${testId}`)}
              >
                Retake Test
              </Button>
              {testId < 4 && (
                <Button
                  variant="outline"
                  onClick={() => router.push(`/test/${testId + 1}`)}
                >
                  Next Test
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Review Questions</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={expandAll}>
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll}>
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
