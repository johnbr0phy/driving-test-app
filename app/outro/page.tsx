"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, XCircle, PartyPopper, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { Fireworks } from "@/components/Fireworks";
import { useTranslation } from "@/contexts/LanguageContext";

interface OutroQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const outroQuestions: OutroQuestion[] = [
  {
    question: "You just mastered 200 practice questions. What's the technical term for that?",
    options: ["Overachiever", "Road scholar", "DMV's worst nightmare", "All of the above"],
    correctIndex: 3,
    explanation: "All of the above, obviously. You're a certified road scholar and the DMV should be nervous.",
  },
  {
    question: "What should you do the night before your DMV test?",
    options: ["Cram for 12 hours straight", "Get a good night's sleep — you already studied", "Panic and question all your life choices", "Build a time machine to skip to the results"],
    correctIndex: 1,
    explanation: "You've already put in the work. Sleep well and trust your preparation!",
  },
  {
    question: "When you pass your driving test, what's the correct celebration?",
    options: ["A subtle fist pump", "Tell literally everyone you know", "Update your social media bio to 'Licensed Driver'", "All celebrations are valid"],
    correctIndex: 3,
    explanation: "You earned it. Celebrate however feels right — you put in serious effort to get here!",
  },
  {
    question: "How many questions did you practice across all training sets?",
    options: ["50", "100", "150", "200"],
    correctIndex: 3,
    explanation: "200 questions across 4 training sets! That's dedication that pays off at the DMV.",
  },
  {
    question: "What's the most important thing to bring to the DMV on test day?",
    options: ["Your lucky socks", "Required ID and documents", "A four-leaf clover", "Snacks for the wait"],
    correctIndex: 1,
    explanation: "Bring your valid ID and any required documents. The lucky socks are optional but encouraged.",
  },
  {
    question: "After passing, what will your friends ask you for?",
    options: ["Rides. Lots of rides.", "Driving tips", "To borrow your car", "All of the above, immediately"],
    correctIndex: 3,
    explanation: "Congratulations — you're about to become everyone's favorite taxi service.",
  },
  {
    question: "You scored 80%+ on all 4 practice tests. That makes you…",
    options: ["Statistically very likely to pass the real test", "More prepared than most people at the DMV", "Someone who takes things seriously", "All of the above"],
    correctIndex: 3,
    explanation: "Studies show that students who consistently score 80%+ on practice tests have a very high pass rate. You're ready!",
  },
  {
    question: "What's the biggest mistake people make at the DMV?",
    options: ["Not studying at all", "Only studying the night before", "Overthinking easy questions", "Showing up without the right documents"],
    correctIndex: 0,
    explanation: "The #1 reason people fail is not studying enough. That's clearly NOT your problem!",
  },
  {
    question: "Quick — what does a red octagonal sign mean?",
    options: ["Speed up", "Stop", "Yield", "You should know this by now!"],
    correctIndex: 1,
    explanation: "Stop! You knew that instantly. See? All that practice is locked in your brain.",
  },
  {
    question: "Final question: Are you ready to pass your driving test?",
    options: ["Absolutely, let's do this!", "Born ready", "The DMV is not ready for ME", "All of the above — let's go!"],
    correctIndex: 3,
    explanation: "That's the spirit! You've completed every training set, passed every practice test, and now you're finishing the victory lap. Go ace that test! 🎉",
  },
];

function OutroContent() {
  const router = useRouter();
  const hydrated = useHydration();
  const { playCorrectSound, playIncorrectSound } = useSound();
  const { t } = useTranslation();

  const selectedState = useStore((s) => s.selectedState);
  const isOutroUnlocked = useStore((s) => s.isOutroUnlocked);
  const outroComplete = useStore((s) => s.outroComplete);
  const completeOutro = useStore((s) => s.completeOutro);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
      return;
    }
    if (hydrated && !isOutroUnlocked()) {
      router.push("/dashboard");
      return;
    }
  }, [hydrated, selectedState, isOutroUnlocked, router]);

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
  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question?.correctIndex;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    if (index === question.correctIndex) {
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
            style={{ width: `${((currentIndex + (answered ? 1 : 0)) / outroQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <p className="text-base font-semibold text-gray-900 leading-relaxed">
              {question.question}
            </p>
          </CardContent>
        </Card>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {question.options.map((option, index) => {
            let classes = "border-gray-300";
            if (answered) {
              if (index === question.correctIndex) {
                classes = "border-green-500 bg-green-50";
              } else if (index === selectedAnswer) {
                classes = "border-red-400 bg-red-50";
              } else {
                classes = "border-gray-200 opacity-50";
              }
            } else {
              classes = "border-gray-300 [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:bg-brand-light active:border-brand active:bg-brand-light cursor-pointer";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${classes}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    answered && index === question.correctIndex
                      ? "bg-green-500 text-white"
                      : answered && index === selectedAnswer
                        ? "bg-red-400 text-white"
                        : "bg-gray-100 text-gray-500"
                  }`}>
                    {answered && index === question.correctIndex ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : answered && index === selectedAnswer && index !== question.correctIndex ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={`text-sm ${answered && index !== question.correctIndex && index !== selectedAnswer ? "text-gray-400" : "text-gray-800"}`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation + Next */}
        {answered && (
          <div className="space-y-3">
            <Card className={isCorrect ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm ${isCorrect ? "text-green-800" : "text-amber-800"}`}>
                    {question.explanation}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button
              onClick={handleNext}
              className="w-full bg-brand hover:bg-brand-dark text-white"
            >
              {currentIndex < outroQuestions.length - 1
                ? t("trainingCard.nextQuestion")
                : t("outro.finishButton")}
            </Button>
          </div>
        )}
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
