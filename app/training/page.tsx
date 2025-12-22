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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        {/* Minimal Header */}
        <div className="mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Question Card - Front and Center */}
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
          <Card className="w-full">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-4">No more questions available</p>
              <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push("/dashboard")}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats at Bottom - Compact */}
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white/80">
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-orange-600" />
                  <div className="text-xs text-gray-600">Questions</div>
                </div>
                <div className="text-xl font-bold">{totalAnswered}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80">
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Trophy className="h-4 w-4 text-orange-600" />
                  <div className="text-xs text-gray-600">Accuracy</div>
                </div>
                <div className="text-xl font-bold">{accuracy}%</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80">
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Flame className="h-4 w-4 text-orange-600" />
                  <div className="text-xs text-gray-600">Current</div>
                </div>
                <div className="text-xl font-bold">{training.currentStreak}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80">
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Flame className="h-4 w-4 text-yellow-600" />
                  <div className="text-xs text-gray-600">Best</div>
                </div>
                <div className="text-xl font-bold">{training.bestStreak}</div>
              </CardContent>
            </Card>
          </div>

          {/* End Training Button */}
          <div className="text-center">
            <Button onClick={handleEndTraining} className="w-full bg-white text-black hover:bg-gray-100 border-2 border-gray-300">
              End Training Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
