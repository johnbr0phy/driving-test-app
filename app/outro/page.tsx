"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { Fireworks } from "@/components/Fireworks";
import { TrainingCard } from "@/components/TrainingCard";
import { useTranslation } from "@/contexts/LanguageContext";
import { Question } from "@/types";

const outroQuestions: Question[] = [
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-1",
    category: "general",
    question: "You just mastered 200 practice questions. What's the technical term for that?",
    optionA: "Overachiever",
    optionB: "Road scholar",
    optionC: "DMV's worst nightmare",
    optionD: "All of the above",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "All of the above, obviously. You're a certified road scholar and the DMV should be nervous.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-2",
    category: "general",
    question: "What should you do the night before your DMV test?",
    optionA: "Cram for 12 hours straight",
    optionB: "Get a good night's sleep — you already studied",
    optionC: "Panic and question all your life choices",
    optionD: "Build a time machine to skip to the results",
    correctAnswer: "B",
    correctIndex: 1,
    explanation: "You've already put in the work. Sleep well and trust your preparation!",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-3",
    category: "general",
    question: "When you pass your driving test, what's the correct celebration?",
    optionA: "A subtle fist pump",
    optionB: "Tell literally everyone you know",
    optionC: "Update your social media bio to 'Licensed Driver'",
    optionD: "All celebrations are valid",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "You earned it. Celebrate however feels right — you put in serious effort to get here!",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-4",
    category: "general",
    question: "How many questions did you practice across all training sets?",
    optionA: "50",
    optionB: "100",
    optionC: "150",
    optionD: "200",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "200 questions across 4 training sets! That's dedication that pays off at the DMV.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-5",
    category: "general",
    question: "What's the most important thing to bring to the DMV on test day?",
    optionA: "Your lucky socks",
    optionB: "Required ID and documents",
    optionC: "A four-leaf clover",
    optionD: "Snacks for the wait",
    correctAnswer: "B",
    correctIndex: 1,
    explanation: "Bring your valid ID and any required documents. The lucky socks are optional but encouraged.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-6",
    category: "general",
    question: "After passing, what will your friends ask you for?",
    optionA: "Rides. Lots of rides.",
    optionB: "Driving tips",
    optionC: "To borrow your car",
    optionD: "All of the above, immediately",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "Congratulations — you're about to become everyone's favorite taxi service.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-7",
    category: "general",
    question: "You scored 80%+ on all 4 practice tests. That makes you…",
    optionA: "Statistically very likely to pass the real test",
    optionB: "More prepared than most people at the DMV",
    optionC: "Someone who takes things seriously",
    optionD: "All of the above",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "Studies show that students who consistently score 80%+ on practice tests have a very high pass rate. You're ready!",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-8",
    category: "general",
    question: "What's the biggest mistake people make at the DMV?",
    optionA: "Not studying at all",
    optionB: "Only studying the night before",
    optionC: "Overthinking easy questions",
    optionD: "Showing up without the right documents",
    correctAnswer: "A",
    correctIndex: 0,
    explanation: "The #1 reason people fail is not studying enough. That's clearly NOT your problem!",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-9",
    category: "general",
    question: "Quick — what does a red octagonal sign mean?",
    optionA: "Speed up",
    optionB: "Stop",
    optionC: "Yield",
    optionD: "You should know this by now!",
    correctAnswer: "B",
    correctIndex: 1,
    explanation: "Stop! You knew that instantly. See? All that practice is locked in your brain.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-10",
    category: "general",
    question: "Final question: Are you ready to pass your driving test?",
    optionA: "Absolutely, let's do this!",
    optionB: "Born ready",
    optionC: "The DMV is not ready for ME",
    optionD: "All of the above — let's go!",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "That's the spirit! You've completed every training set, passed every practice test, and now you're finishing the victory lap. Go ace that test!",
  },
];

function OutroContent() {
  const router = useRouter();
  const hydrated = useHydration();
  const { playCorrectSound, playIncorrectSound } = useSound();
  const { t } = useTranslation();

  const selectedState = useStore((s) => s.selectedState);
  const outroComplete = useStore((s) => s.outroComplete);
  const completeOutro = useStore((s) => s.completeOutro);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  // If already complete, show the celebration screen directly
  useEffect(() => {
    if (hydrated && outroComplete) {
      setFinished(true);
      setScore(10);
    }
  }, [hydrated, outroComplete]);

  if (!hydrated || !selectedState) {
    return <div className="flex-1 bg-gray-50" />;
  }

  const question = outroQuestions[currentIndex];

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === question.correctAnswer) {
      setScore((s) => s + 1);
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < outroQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
      setShowFireworks(true);
      if (!outroComplete) {
        completeOutro();
      }
    }
  };

  if (finished) {
    return (
      <div className="flex-1 bg-gray-50 relative">
        {showFireworks && <Fireworks />}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-green-50 to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 py-6 max-w-lg">
          <div className="text-center py-8">
            <Image
              src="/tiger_face_01.png"
              alt="Tiger mascot celebrating"
              width={96}
              height={96}
              className="w-24 h-24 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t("outro.congratsTitle")}
            </h1>
            <p className="text-gray-600 mb-6">
              {t("outro.congratsDesc")}
            </p>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 mb-6">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-700 mb-1">10/10</div>
                <p className="text-sm text-green-600">{t("outro.allComplete")}</p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Link href="/dashboard" className="block">
                <Button className="w-full bg-brand hover:bg-brand-dark text-white">
                  {t("common.goToDashboard")}
                </Button>
              </Link>
              <Link href="/stats" className="block">
                <Button variant="outline" className="w-full">
                  {t("results.viewStats")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
      <div className="relative container mx-auto px-4 py-6 max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-gray-900">{t("outro.title")}</h1>
            <p className="text-xs text-gray-500">
              {currentIndex + 1} / {outroQuestions.length}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold tabular-nums text-gray-700">{score}/{outroQuestions.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${((currentIndex + (selectedAnswer ? 1 : 0)) / outroQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question Card — same TrainingCard used in training mode */}
        <TrainingCard
          key={question.questionId}
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

export default function OutroPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50" />}>
      <OutroContent />
    </Suspense>
  );
}
