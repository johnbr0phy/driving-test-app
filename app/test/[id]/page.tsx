"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generateTest } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params.id as string);
  const hydrated = useHydration();

  const selectedState = useStore((state) => state.selectedState);
  const currentTest = useStore((state) => state.currentTest);
  const startTest = useStore((state) => state.startTest);
  const setAnswer = useStore((state) => state.setAnswer);
  const completeTest = useStore((state) => state.completeTest);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);

  // Load questions on mount (wait for hydration)
  useEffect(() => {
    if (!hydrated) {
      return; // Wait for hydration to complete
    }

    try {
      const state = selectedState || "CA";
      const testQuestions = generateTest(testId, state);
      setQuestions(testQuestions);

      // Check if we have a saved test session for this test
      if (currentTest.testId === testId && currentTest.questions.length > 0) {
        // Resume from saved state
        setAnswers(currentTest.answers);
      } else {
        // Start new test
        startTest(testId, testQuestions);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading questions:", error);
      setLoading(false);
    }
  }, [testId, selectedState, currentTest, startTest, hydrated]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
    // Save to store
    setAnswer(currentQuestionIndex, answer);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    // Save completed test to store
    completeTest(testId, correctCount, questions, answers);

    // Navigate to results page with score
    router.push(`/test/${testId}/results`);
  };

  const canSubmit = answeredCount === totalQuestions;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold mb-2">Loading test...</div>
          <div className="text-gray-600">Preparing your questions</div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="text-xl font-semibold mb-2">No questions available</div>
            <div className="text-gray-600 mb-4">Unable to load test questions.</div>
            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Test {testId}</h1>
            <div className="text-sm text-gray-600">
              {answeredCount} of {totalQuestions} answered
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress: {Math.round(progress)}%</span>
              <span>
                {canSubmit ? "Ready to submit!" : `${totalQuestions - answeredCount} questions remaining`}
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="mb-6">
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerChange={handleAnswerChange}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Test
            </Button>
          )}
        </div>

        {/* Question Grid (for quick navigation) */}
        <div className="mt-8">
          <div className="text-sm font-semibold mb-3">Quick Navigation</div>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`
                  aspect-square rounded-lg border-2 text-sm font-semibold transition-colors
                  ${currentQuestionIndex === index
                    ? "border-blue-500 bg-blue-500 text-white"
                    : answers[index]
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
