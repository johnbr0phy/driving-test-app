"use client";

// HTL practice test — the DMV test page without the premium gate, routed
// through the HTL exam config.

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TestPageHeader } from "@/components/TestPageHeader";
import { generateHTLTest } from "@/lib/htlTestGenerator";
import { shuffleQuestionOptions } from "@/lib/testGenerator";
import { HTL_ROUTES } from "@/lib/examRoutes";
import { isHTLTestId } from "@/lib/htlConfig";
import { Question } from "@/types";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";

export default function HTLTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params.id as string);
  const testNumber = HTL_ROUTES.displayTestNumber(testId);
  const hydrated = useHydration();
  const initialized = useRef(false);
  const { t } = useTranslation();

  const isGuest = useStore((state) => state.isGuest);
  const getCurrentTest = useStore((state) => state.getCurrentTest);
  const startTest = useStore((state) => state.startTest);
  const setAnswer = useStore((state) => state.setAnswer);
  const completeTest = useStore((state) => state.completeTest);

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
    if (!hydrated || initialized.current) return;

    if (!isHTLTestId(testId)) {
      router.push(HTL_ROUTES.dashboard);
      return;
    }

    try {
      const savedTest = getCurrentTest(testId);
      if (savedTest && savedTest.questions.length > 0) {
        // Resume from saved state at the first unanswered question
        setQuestions(savedTest.questions);
        setAnswers(savedTest.answers);
        const firstUnansweredIndex = savedTest.questions.findIndex(
          (_, index) => !savedTest.answers[index]
        );
        setCurrentQuestionIndex(
          firstUnansweredIndex !== -1 ? firstUnansweredIndex : savedTest.questions.length - 1
        );
      } else {
        const testQuestions = generateHTLTest(testNumber).map(shuffleQuestionOptions);
        setQuestions(testQuestions);
        startTest(testId, testQuestions);
      }

      initialized.current = true;
      setLoading(false);
    } catch (error) {
      console.error("Error loading HTL questions:", error);
      setLoading(false);
    }
  }, [hydrated, testId, testNumber, getCurrentTest, startTest, router]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerChange = (answer: string) => {
    // Don't allow changing previous answers
    if (answers[currentQuestionIndex]) return;

    const updatedAnswers = { ...answers, [currentQuestionIndex]: answer };
    setAnswers(updatedAnswers);
    setAnswer(testId, currentQuestionIndex, answer);

    // Auto-advance; the last answer auto-submits
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        let correctCount = 0;
        questions.forEach((question, index) => {
          if (updatedAnswers[index] === question.correctAnswer) correctCount++;
        });
        completeTest(testId, correctCount, questions, updatedAnswers);
        router.push(HTL_ROUTES.results(testId));
      }
    }, 300);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold mb-2">{t("testPage.loadingTest")}</div>
          <div className="text-gray-600">{t("testPage.preparingQuestions")}</div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="text-xl font-semibold mb-2">{t("testPage.noQuestionsAvailable")}</div>
            <div className="text-gray-600 mb-4">{t("testPage.unableToLoad")}</div>
            <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push(HTL_ROUTES.dashboard)}>
              {t("common.back")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <TestPageHeader
        backHref={HTL_ROUTES.dashboard}
        right={
          !isGuest ? (
            <Link
              href={HTL_ROUTES.stats}
              className="text-sm font-medium text-brand hover:text-brand-dark transition-colors"
            >
              {t("dashboard.viewStats")}
            </Link>
          ) : undefined
        }
      />
      <div className="relative container mx-auto px-4 py-8 max-w-lg md:max-w-2xl lg:max-w-4xl">
        <div className="mb-6">
          <QuestionCard
            key={currentQuestion.questionId}
            question={currentQuestion}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerChange={handleAnswerChange}
          />
        </div>

        {/* Progress Overview - View Only */}
        <div className="mt-8">
          <div className="text-sm font-semibold mb-3">
            🎯 {t("progressOverviewWithTest").replace("{test}", `HTL Test ${testNumber}`)}
          </div>
          <div className="grid grid-cols-10 gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`
                  h-7 rounded border text-xs font-semibold transition-colors flex items-center justify-center
                  ${currentQuestionIndex === index
                    ? "border-brand bg-brand text-white"
                    : answers[index]
                    ? "border-brand bg-brand-light text-brand-dark"
                    : "border-gray-300 bg-white text-gray-400"
                  }
                `}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            {t("testPage.selectAnswerToAdvance")}
          </div>
        </div>
      </div>
    </div>
  );
}
