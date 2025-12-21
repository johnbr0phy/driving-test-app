"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TrainingCard } from "@/components/TrainingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Trophy, Target, ArrowLeft } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getTrainingQuestion } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useHydration } from "@/hooks/useHydration";
import Link from "next/link";

export default function TrainingPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const selectedState = useStore((state) => state.selectedState);
  const training = useStore((state) => state.training);
  const answerTrainingQuestion = useStore((state) => state.answerTrainingQuestion);
  const resetTrainingSession = useStore((state) => state.resetTrainingSession);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  // Load first question on mount or after session reset
  useEffect(() => {
    if (hydrated && selectedState && !currentQuestion) {
      loadNextQuestion();
    }
  }, [hydrated, selectedState, currentQuestion]);

  const loadNextQuestion = () => {
    if (!selectedState) return;

    // Get last 20 questions to avoid repetition
    const recentQuestions = training.questionsAnswered.slice(-20);
    const question = getTrainingQuestion(selectedState, recentQuestions);

    if (question) {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
    } else {
      // No more questions available (unlikely with 2650 questions)
      setCurrentQuestion(null);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion || selectedAnswer) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    answerTrainingQuestion(currentQuestion.questionId, isCorrect);
  };

  const handleNext = () => {
    loadNextQuestion();
  };

  const handleEndTraining = () => {
    if (confirm("Are you sure you want to end this training session?")) {
      resetTrainingSession();
      router.push("/dashboard");
    }
  };

  const totalAnswered = training.correctCount + training.incorrectCount;
  const accuracy = totalAnswered > 0
    ? Math.round((training.correctCount / totalAnswered) * 100)
    : 0;

  if (!hydrated || !selectedState) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Training Mode</h1>
          <p className="text-gray-600">
            Practice questions with instant feedback
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">Questions</div>
                <div className="text-2xl font-bold">{totalAnswered}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Trophy className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-sm text-gray-600">Accuracy</div>
                <div className="text-2xl font-bold">{accuracy}%</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Flame className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-sm text-gray-600">Current Streak</div>
                <div className="text-2xl font-bold">{training.currentStreak}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Flame className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-sm text-gray-600">Best Streak</div>
                <div className="text-2xl font-bold">{training.bestStreak}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Card */}
        {currentQuestion ? (
          <TrainingCard
            key={currentQuestion.questionId}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
            questionNumber={totalAnswered + 1}
          />
        ) : (
          <Card className="w-full max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-4">No more questions available</p>
              <Button onClick={() => router.push("/dashboard")}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}

        {/* End Training Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={handleEndTraining}>
            End Training Session
          </Button>
        </div>
      </div>
    </div>
  );
}
