"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { TestPageHeader } from "@/components/TestPageHeader";
import { generateTest, shuffleQuestionOptions } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import { en, es } from "@/i18n";
import { PaywallModal } from "@/components/PaywallModal";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { trackBeginCheckout, trackStatsEntry } from "@/lib/analytics";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params.id as string);
  const hydrated = useHydration();
  const initialized = useRef(false);
  const { t, language } = useTranslation();
  const [paywallOpen, setPaywallOpen] = useState(false);

  // Pick a rotating CTA once per page load. Both en/es lists have the same
  // length and align by index, so we pick from the active language's array.
  const [ctaIndex] = useState(() => Math.floor(Math.random() * en.testCtas.length));
  const ctaText = (language === "es" ? es.testCtas : en.testCtas)[ctaIndex];

  const isGuest = useStore((state) => state.isGuest);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const isPremium = hydrated ? hasPremiumAccess() : false;
  const { user } = useAuth();

  const handleUpgrade = async () => {
    if (!user?.email || !user?.uid) {
      router.push("/signup");
      return;
    }
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        alert("Authentication error. Please sign in again.");
        return;
      }
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          email: user.email,
          returnUrl: window.location.origin,
          location: "practice_test_4",
        }),
      });
      const data = await response.json();
      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }
      if (data.checkoutUrl) {
        trackBeginCheckout("practice_test_4");
        window.location.href = data.checkoutUrl;
      }
    } catch {
      alert("Failed to start checkout. Please check your connection and try again.");
    }
  };

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
        const testQuestions = generateTest(testId, state, language).map(shuffleQuestionOptions);
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
        router.push(`/test/${testId}/results`);
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
            <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push("/dashboard")}>
              {t("common.backToDashboard")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <TestPageHeader
        backHref="/dashboard"
        right={
          isPremium ? (
            <Link
              href="/stats"
              className="text-sm font-medium text-brand hover:text-brand-dark transition-colors"
            >
              {t("dashboard.viewStats")}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (!isGuest) trackStatsEntry("test_header");
                setPaywallOpen(true);
              }}
              className="text-sm font-medium text-brand hover:text-brand-dark transition-colors"
            >
              {ctaText}
            </button>
          )
        }
      />
      <div className="container mx-auto px-4 py-8 max-w-lg md:max-w-2xl lg:max-w-4xl">

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
          <div className="text-sm font-semibold mb-3">
            🎯 {t("progressOverviewWithTest").replace("{test}", t(`practiceTests.${testId}`))}
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

      <PaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        feature="practice_test_4"
        onUpgrade={handleUpgrade}
        isGuest={isGuest}
        onSignUp={() => router.push("/signup")}
      />
    </div>
  );
}
