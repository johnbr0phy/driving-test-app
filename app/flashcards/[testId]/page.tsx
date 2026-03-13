"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Lock, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { Question } from "@/types";

const FREE_FLASHCARD_LIMIT = 3;

interface Flashcard {
  question: Question;
  userAnswer: string;
  index: number;
}

function FlipCard({
  card,
  cardNumber,
  total,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: {
  card: Flashcard;
  cardNumber: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  // Reset flip when card changes
  useEffect(() => {
    setFlipped(false);
  }, [cardNumber]);

  const optionMap: { [key: string]: string } = {
    A: card.question.optionA,
    B: card.question.optionB,
    C: card.question.optionC,
    D: card.question.optionD,
  };

  const correctText = optionMap[card.question.correctAnswer] || card.question.correctAnswer;
  const userText = optionMap[card.userAnswer] || card.userAnswer;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress */}
      <div className="w-full max-w-lg">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Card {cardNumber} of {total}</span>
          <span className="text-gray-400">{flipped ? "Answer shown" : "Tap to reveal"}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-brand h-2 rounded-full transition-all duration-300"
            style={{ width: `${(cardNumber / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Flip Card */}
      <div
        className="w-full max-w-lg cursor-pointer"
        style={{ perspective: "1200px", height: "320px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front — Question */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 flex flex-col justify-between p-8"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                ✗
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Question</div>
                <p className="text-gray-900 font-medium text-lg leading-snug">{card.question.question}</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="text-xs text-red-500 font-semibold mb-1">Your answer</div>
              <div className="text-red-700 font-medium">{userText}</div>
            </div>

            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-2 text-sm text-gray-400 bg-gray-50 rounded-full px-4 py-2">
                <RotateCcw className="h-3.5 w-3.5" />
                Tap to see correct answer
              </div>
            </div>
          </div>

          {/* Back — Answer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-green-200 flex flex-col justify-between p-8"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-green-500 uppercase tracking-wider mb-2">Correct Answer</div>
                <p className="text-green-900 font-bold text-xl leading-snug">{correctText}</p>
              </div>
            </div>

            {card.question.explanation && (
              <div className="mt-4 p-4 bg-white/70 rounded-xl border border-green-100">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Why?</div>
                <p className="text-gray-700 text-sm leading-relaxed">{card.question.explanation}</p>
              </div>
            )}

            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-2 text-sm text-gray-400 bg-white/60 rounded-full px-4 py-2">
                <RotateCcw className="h-3.5 w-3.5" />
                Tap to flip back
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={isLast}
          className="bg-brand text-white hover:bg-brand-hover flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function PremiumGate({ testId, wrongCount }: { testId: number; wrongCount: number }) {
  const router = useRouter();
  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <div className="bg-gradient-to-br from-brand-light to-brand-gradient-to rounded-2xl border-2 border-brand-border-light p-8 shadow-lg">
        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-brand" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {wrongCount - FREE_FLASHCARD_LIMIT} more flashcards locked
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          You got <strong>{wrongCount} questions wrong</strong> on this test. Free users preview {FREE_FLASHCARD_LIMIT} flashcards. Upgrade to drill every missed question until it sticks.
        </p>

        <div className="space-y-3 text-left mb-8">
          {[
            "Unlimited flashcard practice for all wrong answers",
            "Full access to all 4 practice tests",
            "Personalised weak-area study plans",
            "Detailed performance analytics",
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              {benefit}
            </div>
          ))}
        </div>

        <Button
          className="w-full h-12 bg-brand text-white hover:bg-brand-hover font-bold text-base mb-3"
          onClick={() => router.push("/dashboard")}
        >
          <Zap className="h-4 w-4 mr-2" />
          Unlock Premium — $9.99
        </Button>
        <p className="text-xs text-gray-400">One-time payment. No subscription.</p>
      </div>
    </div>
  );
}

function CompletionCard({ wrongCount, testId }: { wrongCount: number; testId: number }) {
  const router = useRouter();
  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <div className="bg-white rounded-2xl border-2 border-green-200 p-8 shadow-lg">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">All done!</h2>
        <p className="text-gray-600 mb-6">
          You reviewed all {wrongCount} wrong answers. Ready to take the test again?
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push(`/test/${testId}/results`)}
          >
            Back to Results
          </Button>
          <Button
            className="flex-1 bg-brand text-white hover:bg-brand-hover font-bold"
            onClick={() => router.push(`/test/${testId}`)}
          >
            Retake Test
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function FlashcardsPage() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params.testId as string);
  const hydrated = useHydration();

  const getTestSession = useStore((state) => state.getTestSession);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    const session = getTestSession(testId);
    if (!session) {
      router.push(`/test/${testId}`);
      return;
    }

    const wrong: Flashcard[] = [];
    session.answers.forEach((answer, index) => {
      if (!answer.isCorrect) {
        wrong.push({
          question: session.questions[index],
          userAnswer: answer.userAnswer,
          index,
        });
      }
    });

    setFlashcards(wrong);
    setIsPremium(hasPremiumAccess());
    setLoading(false);
  }, [hydrated, testId, getTestSession, hasPremiumAccess, router]);

  const visibleCards = isPremium ? flashcards : flashcards.slice(0, FREE_FLASHCARD_LIMIT);
  const showPaywall = !isPremium && currentIndex >= FREE_FLASHCARD_LIMIT;
  const showCompletion = currentIndex >= visibleCards.length && !showPaywall;

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading flashcards...</div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Perfect score!</h2>
          <p className="text-gray-600 mb-6">No wrong answers to review. You nailed it.</p>
          <Button
            className="bg-brand text-white hover:bg-brand-hover"
            onClick={() => router.push(`/test/${testId}/results`)}
          >
            Back to Results
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={`/test/${testId}/results`}>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Results
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <span className="font-semibold text-gray-800">Wrong Answer Flashcards</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            Test {testId}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Intro badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 border border-red-100 rounded-full px-4 py-2 text-sm font-medium">
            <span>🃏</span>
            <span>
              {flashcards.length} wrong answer{flashcards.length !== 1 ? "s" : ""} to review
              {!isPremium && flashcards.length > FREE_FLASHCARD_LIMIT && (
                <span className="text-red-400"> · {FREE_FLASHCARD_LIMIT} free</span>
              )}
            </span>
          </div>
        </div>

        {showPaywall ? (
          <PremiumGate testId={testId} wrongCount={flashcards.length} />
        ) : showCompletion ? (
          <CompletionCard wrongCount={flashcards.length} testId={testId} />
        ) : (
          <FlipCard
            card={visibleCards[currentIndex]}
            cardNumber={currentIndex + 1}
            total={visibleCards.length}
            isFirst={currentIndex === 0}
            isLast={currentIndex === visibleCards.length - 1}
            onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            onNext={() => setCurrentIndex((i) => i + 1)}
          />
        )}

        {/* Tease locked cards for free users */}
        {!isPremium && !showPaywall && !showCompletion && flashcards.length > FREE_FLASHCARD_LIMIT && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              {flashcards.length - FREE_FLASHCARD_LIMIT} more flashcard{flashcards.length - FREE_FLASHCARD_LIMIT !== 1 ? "s" : ""} locked behind premium
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
