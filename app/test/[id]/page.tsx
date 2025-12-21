"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { generateTest } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params.id as string);
  const hydrated = useHydration();
  const initialized = useRef(false);

  const selectedState = useStore((state) => state.selectedState);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const startTest = useStore((state) => state.startTest);
  const setAnswer = useStore((state) => state.setAnswer);
  const completeTest = useStore((state) => state.completeTest);
  const isTestUnlocked = useStore((state) => state.isTestUnlocked);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);

  // Reset when test changes
  useEffect(() => {
    initialized.current = false;
    setLoading(true);
    setCurrentQuestionIndex(0);
  }, [testId]);

  // Load questions on mount (wait for hydration)
  useEffect(() => {
    if (!hydrated || initialized.current) {
      return; // Wait for hydration or already initialized
    }

    // Check if test is unlocked
    if (!isTestUnlocked(testId)) {
      router.push("/dashboard");
      return;
    }

    try {
      const state = selectedState || "CA";

      // Check if we have a saved test session for this test
      const savedTest = getCurrentTest(testId);
      if (savedTest && savedTest.questions.length > 0) {
        // Resume from saved state
        setQuestions(savedTest.questions);
        setAnswers(savedTest.answers);

        // Find the first unanswered question and resume from there
        const firstUnansweredIndex = savedTest.questions.findIndex(
          (_, index) => !savedTest.answers[index]
        );

        // If we found an unanswered question, start there; otherwise start at the beginning
        if (firstUnansweredIndex !== -1) {
          setCurrentQuestionIndex(firstUnansweredIndex);
        } else {
          // All questions answered, stay at last question
          setCurrentQuestionIndex(savedTest.questions.length - 1);
        }
      } else {
        // Generate new test
        const testQuestions = generateTest(testId, state);
        setQuestions(testQuestions);
        startTest(testId, testQuestions);
      }

      initialized.current = true;
      setLoading(false);
    } catch (error) {
      console.error("Error loading questions:", error);
      setLoading(false);
    }
  }, [hydrated, testId, selectedState, getCurrentTest, startTest, isTestUnlocked, router]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const handleAnswerChange = (answer: string) => {
    // Don't allow changing previous answers
    if (answers[currentQuestionIndex]) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
    // Save to store
    setAnswer(testId, currentQuestionIndex, answer);

    // Auto-advance to next question after brief delay
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 300);
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
            <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            <Progress value={progress} className="h-2 [&>div]:bg-orange-600" />
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

        {/* Navigation - Forward Only */}
        <div className="flex items-center justify-center mt-6">
          {answeredCount === totalQuestions && (
            <Button
              onClick={handleSubmit}
              className="bg-black hover:bg-gray-800 text-white text-lg px-8 py-6"
            >
              Submit Test
            </Button>
          )}
        </div>

        {/* Progress Overview - View Only */}
        <div className="mt-8">
          <div className="text-sm font-semibold mb-3">Progress Overview</div>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-lg border-2 text-sm font-semibold transition-colors flex items-center justify-center
                  ${currentQuestionIndex === index
                    ? "border-orange-500 bg-orange-500 text-white"
                    : answers[index]
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-300 bg-white text-gray-400"
                  }
                `}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Select your answer to automatically advance to the next question
          </div>
        </div>
      </div>
    </div>
  );
}
