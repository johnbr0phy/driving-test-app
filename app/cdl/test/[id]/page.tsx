"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { generateCDLTest } from "@/lib/cdlTestGenerator";
import { shuffleQuestionOptions } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";


function CDLTestPageContent() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params.id as string);
  const hydrated = useHydration();
  const initialized = useRef(false);
  const { t } = useTranslation();

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
    if (!hydrated || initialized.current) {
      return; // Wait for hydration or already initialized
    }

    // Validate test ID range (101-112)
    if (testId < 101 || testId > 112) {
      router.push("/cdl/dashboard");
      return;
    }

    try {
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
        // Generate new test - convert testId to actual CDL test number (101->1, 102->2, etc.)
        const cdlTestNumber = testId - 100;
        const testQuestions = generateCDLTest(cdlTestNumber).map(shuffleQuestionOptions);
        setQuestions(testQuestions);
        startTest(testId, testQuestions);
      }

      initialized.current = true;
      setLoading(false);
    } catch (error) {
      console.error("Error loading CDL questions:", error);
      setLoading(false);
    }
  }, [hydrated, testId, getCurrentTest, startTest, router]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerChange = (answer: string) => {
    // Don't allow changing previous answers
    if (answers[currentQuestionIndex]) {
      return;
    }

    const updatedAnswers = { ...answers, [currentQuestionIndex]: answer };
    setAnswers(updatedAnswers);
    // Save to store
    setAnswer(testId, currentQuestionIndex, answer);

    // Auto-advance to next question after brief delay
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Last question answered — auto-submit
        let correctCount = 0;
        questions.forEach((question, index) => {
          if (updatedAnswers[index] === question.correctAnswer) {
            correctCount++;
          }
        });
        completeTest(testId, correctCount, questions, updatedAnswers);
        router.push(`/cdl/test/${testId}/results`);
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
    router.push(`/cdl/test/${testId}/results`);
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
            <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push("/cdl/dashboard")}>
              Back to CDL Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header: back button + test number */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/cdl/dashboard">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to CDL Dashboard
            </Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold">CDL Test {testId}</h1>
        </div>

        {/* Question Card */}
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
          <div className="text-sm font-semibold mb-3">{t("testPage.progressOverview")}</div>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-lg border-2 text-sm font-semibold transition-colors flex items-center justify-center
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
export default function CDLTestPage() {
  return (
    
      <CDLTestPageContent />
    
  );
}
