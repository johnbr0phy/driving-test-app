"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TrainingCard } from "@/components/TrainingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getTrainingQuestion, getNextTrainingSetQuestion, shuffleQuestionOptions } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { Fireworks } from "@/components/Fireworks";
import Link from "next/link";

// Training set names for display
const TRAINING_SET_NAMES: { [key: number]: string } = {
  1: "Signs & Signals",
  2: "Rules of the Road",
  3: "Safety & Emergencies",
  4: "State Laws",
};

function TrainingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  const { playCorrectSound, playIncorrectSound } = useSound();

  const selectedState = useStore((state) => state.selectedState);
  const training = useStore((state) => state.training);
  const trainingSets = useStore((state) => state.trainingSets);
  const answerTrainingQuestion = useStore((state) => state.answerTrainingQuestion);
  const answerTrainingSetQuestion = useStore((state) => state.answerTrainingSetQuestion);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const resetMasteredQuestions = useStore((state) => state.resetMasteredQuestions);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);

  // Get set number from URL if present
  const setParam = searchParams.get('set');
  const setNumber = setParam ? parseInt(setParam) : null;
  const isSetMode = setNumber !== null && setNumber >= 1 && setNumber <= 4 && isOnboardingComplete();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSetComplete, setShowSetComplete] = useState(false);
  const [prevCorrectCount, setPrevCorrectCount] = useState(training.totalCorrectAllTime);

  // Get current set progress
  const setProgress = isSetMode ? getTrainingSetProgress(setNumber) : null;
  const setData = isSetMode ? (trainingSets[setNumber] || { masteredIds: [], wrongQueue: [] }) : null;
  const setMasteredIds = setData?.masteredIds || [];
  const setWrongQueue = setData?.wrongQueue || [];

  // Redirect to onboarding if no state selected
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  // Detect when user unlocks practice tests (crosses 10 correct answers) - onboarding only
  useEffect(() => {
    if (!isSetMode && training.totalCorrectAllTime >= 10 && prevCorrectCount < 10) {
      setShowFireworks(true);
    }
    setPrevCorrectCount(training.totalCorrectAllTime);
  }, [training.totalCorrectAllTime, prevCorrectCount, isSetMode]);

  const handleFireworksComplete = () => {
    setShowFireworks(false);
    if (isSetMode) {
      setShowSetComplete(true);
    } else {
      setShowCelebration(true);
    }
  };

  // Load first question on mount
  useEffect(() => {
    if (hydrated && selectedState && !currentQuestion) {
      loadNextQuestion();
    }
  }, [hydrated, selectedState, currentQuestion]);

  const loadNextQuestion = () => {
    if (!selectedState) return;

    let question: Question | null = null;

    if (isSetMode) {
      // Set-based training: get next unmastered question from the set
      // Wrong questions are pushed to the back via wrongQueue
      // IMPORTANT: Get fresh state from store to ensure we have the latest wrongQueue
      // (the captured trainingSets variable may be stale after answering a question)
      const freshTrainingSets = useStore.getState().trainingSets;
      const currentSetData = freshTrainingSets[setNumber] || { masteredIds: [], wrongQueue: [] };
      question = getNextTrainingSetQuestion(
        setNumber,
        selectedState,
        currentSetData.masteredIds,
        currentSetData.wrongQueue,
        currentQuestion?.questionId || null  // Exclude current question to prevent immediate repeat
      );

      // If all questions are mastered, show fireworks then completion
      if (!question) {
        setShowFireworks(true);
        return;
      }

      // If this question was previously answered wrong, shuffle the options
      // so users can't just memorize the slot position
      // Note: Use freshTrainingSets here too for consistency
      const freshWrongQueue = freshTrainingSets[setNumber]?.wrongQueue || [];
      if (freshWrongQueue.includes(question.questionId)) {
        question = shuffleQuestionOptions(question);
      }
    } else {
      // Onboarding mode: random questions
      // IMPORTANT: Get fresh state from store to ensure we have the latest masteredQuestionIds
      const freshTraining = useStore.getState().training;
      question = getTrainingQuestion(
        selectedState,
        freshTraining.masteredQuestionIds,
        freshTraining.lastQuestionId
      );

      // If all questions are mastered, reset and start fresh
      if (!question) {
        resetMasteredQuestions();
        question = getTrainingQuestion(selectedState, [], freshTraining.lastQuestionId);
      }
    }

    if (question) {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
    } else {
      setCurrentQuestion(null);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion || selectedAnswer) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;

    // Play sound effect
    if (isCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }

    // Track progress
    if (isSetMode) {
      answerTrainingSetQuestion(setNumber, currentQuestion.questionId, isCorrect);
    } else {
      answerTrainingQuestion(currentQuestion.questionId, isCorrect);
    }
  };

  const handleNext = () => {
    loadNextQuestion();
  };

  if (!hydrated || !selectedState) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Fireworks Animation */}
      {showFireworks && (
        <Fireworks duration={3000} onComplete={handleFireworksComplete} />
      )}

      {/* Onboarding Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mb-4">
              <img
                src="/tiger_face_02.png"
                alt="Happy celebrating tiger"
                className="w-32 h-32 mx-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Congratulations!
            </h2>
            <p className="text-xl text-orange-600 font-semibold mb-4">
              You unlocked Training & Tests!
            </p>
            <p className="text-gray-600 mb-6">
              You&apos;ve answered 10 questions correctly. Now you can pick specific topics to master!
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard">
                <Button className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6">
                  Choose a Training Set
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCelebration(false)}
              >
                Keep Going
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Set Complete Modal */}
      {showSetComplete && isSetMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mb-4">
              <CheckCircle2 className="w-24 h-24 mx-auto text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Set Complete!
            </h2>
            <p className="text-xl text-green-600 font-semibold mb-4">
              {TRAINING_SET_NAMES[setNumber]} Mastered
            </p>
            <p className="text-gray-600 mb-6">
              You&apos;ve correctly answered all 50 questions in this training set!
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard">
                <Button className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 max-w-6xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          {isSetMode && (
            <span className="text-sm font-medium text-gray-600">
              {TRAINING_SET_NAMES[setNumber]}
            </span>
          )}
        </div>

        {/* Question Card */}
        {currentQuestion ? (
          <TrainingCard
            key={currentQuestion.questionId}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
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

        {/* Progress */}
        <div className="mt-4 md:mt-6 text-center">
          {isSetMode && setProgress ? (
            // Set-based progress
            <>
              <div className="flex items-center justify-center gap-1 text-sm md:text-lg text-gray-700">
                <span className="font-bold text-xl md:text-2xl text-orange-600">{setProgress.correct}</span>
                <span className="text-gray-500">/{setProgress.total}</span>
                <span className="text-gray-500 text-xs md:text-base ml-1">
                  questions correct
                </span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2 mt-2 max-w-md mx-auto">
                <div
                  className="bg-orange-600 h-2 rounded-full transition-all"
                  style={{ width: `${(setProgress.correct / setProgress.total) * 100}%` }}
                />
              </div>
            </>
          ) : (
            // Onboarding progress
            <>
              <div className="flex items-center justify-center gap-1 text-sm md:text-lg text-gray-700">
                <span className="font-bold text-xl md:text-2xl text-orange-600">{training.totalCorrectAllTime}</span>
                <span className="text-gray-500">/10</span>
                <span className="text-gray-500 text-xs md:text-base ml-1">
                  ({10 - training.totalCorrectAllTime} more to unlock)
                </span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2 mt-2 max-w-md mx-auto">
                <div
                  className="bg-orange-600 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (training.totalCorrectAllTime / 10) * 100)}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrainingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50" />}>
      <TrainingPageContent />
    </Suspense>
  );
}
