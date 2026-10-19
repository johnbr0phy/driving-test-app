"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { TrainingCard } from "@/components/TrainingCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { ShareButton } from "@/components/ShareButton";
import { useStore } from "@/store/useStore";
import { getTrainingQuestion, getNextTrainingSetQuestion, shuffleQuestionOptions } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { Fireworks } from "@/components/Fireworks";
import { TestPageHeader } from "@/components/TestPageHeader";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { states } from "@/data/states";
import { en, es, vi, ko } from "@/i18n";
import { PaywallModal } from "@/components/PaywallModal";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { trackBeginCheckout, trackStatsEntry } from "@/lib/analytics";
import { DMV_EXAM_ID } from "@/lib/classes";
import { recordClassAnswer } from "@/lib/classProgress";

function TrainingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  const { playCorrectSound, playIncorrectSound } = useSound();
  const { t, language } = useTranslation();

  const selectedState = useStore((state) => state.selectedState);
  const isGuest = useStore((state) => state.isGuest);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const { user } = useAuth();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [ctaIndex] = useState(() => Math.floor(Math.random() * en.testCtas.length));
  const ctaText = (language === "es" ? es.testCtas : language === "vi" ? vi.testCtas : language === "ko" ? ko.testCtas : en.testCtas)[ctaIndex];
  const isPremium = hydrated ? hasPremiumAccess() : false;

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
          location: "training_set_4",
        }),
      });
      const data = await response.json();
      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }
      if (data.checkoutUrl) {
        trackBeginCheckout("training_set_4");
        window.location.href = data.checkoutUrl;
      }
    } catch {
      alert("Failed to start checkout. Please check your connection and try again.");
    }
  };
  const training = useStore((state) => state.training);
  const trainingSets = useStore((state) => state.trainingSets);
  const answerTrainingQuestion = useStore((state) => state.answerTrainingQuestion);
  const answerTrainingSetQuestion = useStore((state) => state.answerTrainingSetQuestion);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const resetMasteredQuestions = useStore((state) => state.resetMasteredQuestions);
  const resetTrainingSet = useStore((state) => state.resetTrainingSet);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);
  const isTrainingSetUnlocked = useStore((state) => state.isTrainingSetUnlocked);

  // Get set number from URL if present
  const params = useParams();
  const setParam = (params.n as string | undefined) ?? searchParams.get('set');
  // An old /training?set=n link redirects here with ?set= still on; drop it.
  useEffect(() => {
    if (!params.n || !searchParams.has('set')) return;
    const rest = new URLSearchParams(searchParams.toString());
    rest.delete('set');
    router.replace(`${window.location.pathname}${rest.size ? `?${rest}` : ''}`);
  }, [params.n, searchParams, router]);
  const setNumber = setParam ? parseInt(setParam) : null;
  const isSetMode = setNumber !== null && setNumber >= 1 && setNumber <= 4 && isOnboardingComplete();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Track current question ID in a ref for reliable access in loadNextQuestion
  // This avoids stale closure issues with the currentQuestion state
  const currentQuestionIdRef = useRef<string | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSetComplete, setShowSetComplete] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [prevCorrectCount, setPrevCorrectCount] = useState(training.totalCorrectAllTime);

  // Get current set progress
  const setProgress = isSetMode ? getTrainingSetProgress(setNumber) : null;
  const setData = isSetMode ? (trainingSets[setNumber] || { masteredIds: [], wrongQueue: [] }) : null;
  const setMasteredIds = setData?.masteredIds || [];
  const setWrongQueue = setData?.wrongQueue || [];

  const accessLocked =
    hydrated && isSetMode && setNumber !== null && !isTrainingSetUnlocked(setNumber);

  // Redirect to onboarding if no state selected, or gate locked sets
  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/dmv/dashboard");
      return;
    }
    if (!hydrated || setNumber === null) return;
    if (!isTrainingSetUnlocked(setNumber)) {
      router.push("/dmv/dashboard");
      return;
    }
  }, [hydrated, selectedState, setNumber, isTrainingSetUnlocked, router]);

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
      // Set complete overlay is already showing — just dismiss fireworks
      if (!showSetComplete) setShowSetComplete(true);
    } else {
      setShowCelebration(true);
    }
  };

  // Load first question on mount
  useEffect(() => {
    if (hydrated && selectedState && !currentQuestion && !accessLocked) {
      loadNextQuestion();
    }
  }, [hydrated, selectedState, currentQuestion, accessLocked]);

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
        currentQuestionIdRef.current,  // Use ref for reliable current question ID
        language
      );

      // If all questions are mastered, show completion overlay with fireworks on top
      if (!question) {
        setShowSetComplete(true);
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
        freshTraining.lastQuestionId,
        language
      );

      // If all questions are mastered, reset and start fresh
      if (!question) {
        resetMasteredQuestions();
        question = getTrainingQuestion(selectedState, [], freshTraining.lastQuestionId, language);
      }
    }

    if (question) {
      setCurrentQuestion(question);
      currentQuestionIdRef.current = question.questionId;  // Update ref for next loadNextQuestion call
      setSelectedAnswer(null);
    } else {
      setCurrentQuestion(null);
      currentQuestionIdRef.current = null;
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

    recordClassAnswer(DMV_EXAM_ID, currentQuestion, isCorrect);

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

  const handlePracticeAgain = () => {
    if (setNumber) {
      resetTrainingSet(setNumber);
      setShowSetComplete(false);
      // Load the first question after reset
      setTimeout(() => loadNextQuestion(), 0);
    }
  };

  if (!hydrated || !selectedState) {
    return null;
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-brand-light to-brand-gradient-to">
      {/* Fireworks Animation */}
      {showFireworks && (
        <Fireworks duration={3000} onComplete={handleFireworksComplete} />
      )}

      {/* Onboarding Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mb-4">
              <img
                src="/tiger_face_02.png"
                alt="Happy celebrating tiger"
                className="w-32 h-32 mx-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              {t("trainingPage.congratulations")}
            </h2>
            <p className="text-xl text-brand-dark font-semibold mb-4">
              {t("trainingPage.youUnlocked")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("trainingPage.answeredTenCorrectly")}
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 text-lg py-6">
                <Link href="/dmv/dashboard">
                  {t("trainingPage.chooseTrainingSet")}
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCelebration(false)}
              >
                {t("trainingPage.keepGoing")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Set Complete - Full-bleed Score Card */}
      {showSetComplete && isSetMode && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-300">
          <div className="min-h-screen bg-gradient-to-b from-gray-950 to-green-950">
            {/* Back button */}
            <div className="relative max-w-6xl mx-auto px-4 pt-4">
              <Button asChild variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 -ml-2">
                <Link href="/dmv/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t("common.back")}
                </Link>
              </Button>
            </div>

            <div className="relative text-center px-6 pt-4 pb-10 max-w-lg mx-auto">
              {/* Branding header */}
              <div className="mb-6">
                <div className="text-gray-300 text-lg font-bold tracking-widest">tigertest.io</div>
                <div className="text-gray-400 text-xs uppercase tracking-widest mt-1">
                  {language === "es" ? "ENTRENAMIENTO DMV" : language === "vi" ? "LUYỆN TẬP DMV" : language === "ko" ? "DMV 학습" : "DMV TRAINING"}
                </div>
              </div>

              {/* Tiger face */}
              <div className="flex justify-center mb-5">
                <Image
                  src="/tiger_face_01.png"
                  alt="Tiger mascot"
                  width={160}
                  height={160}
                  className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
                />
              </div>

              {/* Tagline */}
              <div className="text-base md:text-lg font-extrabold uppercase tracking-widest mb-4 text-green-300">
                {language === "es" ? "DOMINÉ MI ENTRENAMIENTO DEL DMV" : language === "vi" ? "ĐÃ THÀNH THẠO PHẦN LUYỆN TẬP DMV" : language === "ko" ? "DMV 학습을 완전히 정복했습니다" : "MASTERED MY DMV TRAINING"}
              </div>

              {/* Giant percentage */}
              <div className="text-7xl md:text-8xl font-black mb-3 leading-none text-green-500 dark:text-green-400">
                100%
              </div>

              {/* 50 out of 50 correct */}
              <div className="text-xl md:text-2xl text-gray-400 mb-5">
                50 {t("results.outOf")} 50 {t("results.correctLabel")}
              </div>

              {/* MASTERED badge */}
              <Badge className="text-lg px-6 py-2 mb-5 bg-green-600 hover:bg-green-700">
                {language === "es" ? "DOMINADO" : language === "vi" ? "THÀNH THẠO" : language === "ko" ? "정복 완료" : "MASTERED"}
              </Badge>

              {/* State + Set name */}
              <div className="text-gray-400 text-base mb-2">
                {states.find((s) => s.code === selectedState)?.name || selectedState} · {t(`trainingSets.${setNumber}`)}
              </div>

              {/* Branding footer */}
              <div className="text-gray-400 text-sm tracking-wider mb-8">tigertest.io</div>

              {/* SHARE + TRY AGAIN buttons */}
              <div className="flex gap-3 max-w-xs mx-auto">
                {selectedState && setNumber && (
                  <ShareButton
                    score={50}
                    totalQuestions={50}
                    percentage={100}
                    passed={true}
                    setId={setNumber}
                    stateCode={selectedState}
                    className="flex-1 bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase tracking-wide h-12 text-base"
                  />
                )}
                {!isGuest && (
                  <Button asChild
                      className="w-full bg-transparent text-white hover:bg-white/10 border border-white/30 font-bold uppercase tracking-wide h-12 text-base"
                    >
                    <Link href="/stats" className="flex-1">
                      {t("results.viewStats")}
                    </Link>
                  </Button>
                )}
              </div>

              {/* Community wrong-questions challenge */}
              {!isGuest && (
                <Link
                  href="/stats?tab=community"
                  onClick={() => trackStatsEntry("training_complete", "community")}
                  className="inline-block mt-5 text-sm font-medium text-green-200/80 hover:text-white transition-colors"
                >
                  {t("trainingPage.beatMostMissed")} →
                </Link>
              )}

              {/* Reset confirmation */}
              {showResetConfirm && (
                <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-xs mx-auto animate-in fade-in duration-200">
                  <p className="text-gray-200 text-sm mb-3">
                    {t("trainingPage.resetConfirm")}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold h-10 text-sm"
                      onClick={handlePracticeAgain}
                    >
                      {t("trainingPage.resetYes")}
                    </Button>
                    <Button
                      className="flex-1 bg-transparent text-white hover:bg-white/10 border border-white/30 font-semibold h-10 text-sm"
                      onClick={() => setShowResetConfirm(false)}
                    >
                      {t("common.cancel")}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Try Again link */}
            <div className="text-center py-5">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-gray-400 hover:text-gray-300 text-sm font-medium transition-colors"
              >
                {t("results.tryAgain")} →
              </button>
            </div>
          </div>
        </div>
      )}

      <TestPageHeader
        backHref="/dmv/dashboard"
        right={
          isPremium ? (
            <Link
              href="/stats"
              className="text-sm font-medium text-brand-dark hover:text-brand-darker transition-colors"
            >
              {t("dashboard.viewStats")}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (!isGuest) trackStatsEntry("training_header");
                setPaywallOpen(true);
              }}
              className="text-sm font-medium text-brand-dark hover:text-brand-darker transition-colors"
            >
              {ctaText}
            </button>
          )
        }
      />
      <div className="relative container mx-auto px-4 py-4 max-w-lg md:max-w-2xl lg:max-w-4xl">

        {/* Question Card */}
        {accessLocked ? null : currentQuestion ? (
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
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t("trainingPage.noMoreQuestions")}</p>
              <Button className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200" onClick={() => router.push("/dmv/dashboard")}>
                {t("common.back")}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        <div className="mt-4 md:mt-6 text-center">
          {accessLocked ? null : isSetMode && setProgress ? (
            // Set-based progress
            <>
              <div className="flex items-center justify-center gap-1 text-sm md:text-lg text-gray-700 dark:text-gray-200">
                <span className="font-bold text-xl md:text-2xl text-brand-dark">{setProgress.correct}</span>
                <span className="text-gray-500 dark:text-gray-400">/{setProgress.total}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs md:text-base ml-1">
                  {t("trainingPage.questionsCorrect")}
                </span>
              </div>
              <div className="w-full bg-brand-border-light rounded-full h-2 mt-2 max-w-md mx-auto">
                <div
                  className="bg-brand h-2 rounded-full transition-all"
                  style={{ width: `${(setProgress.correct / setProgress.total) * 100}%` }}
                />
              </div>
            </>
          ) : !isOnboardingComplete() ? (
            // Onboarding progress
            <>
              <div className="flex items-center justify-center gap-1 text-sm md:text-lg text-gray-700 dark:text-gray-200">
                <span className="font-bold text-xl md:text-2xl text-brand-dark">{training.totalCorrectAllTime}</span>
                <span className="text-gray-500 dark:text-gray-400">/10</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs md:text-base ml-1">
                  ({10 - training.totalCorrectAllTime} {t("trainingPage.moreToUnlock")})
                </span>
              </div>
              <div className="w-full bg-brand-border-light rounded-full h-2 mt-2 max-w-md mx-auto">
                <div
                  className="bg-brand h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (training.totalCorrectAllTime / 10) * 100)}%` }}
                />
              </div>
            </>
          ) : (
            // Post-onboarding without set - show current streak
            <div className="flex items-center justify-center gap-1 text-sm md:text-lg text-gray-700 dark:text-gray-200">
              <span className="font-bold text-xl md:text-2xl text-brand-dark">{training.currentStreak}</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs md:text-base ml-1">
                {t("trainingPage.streak")}
              </span>
            </div>
          )}
        </div>
      </div>

      <PaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        feature="training_set_4"
        onUpgrade={handleUpgrade}
        isGuest={isGuest}
        onSignUp={() => router.push("/signup")}
      />
    </div>
  );
}

export default function TrainingPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gradient-to-br from-brand-light to-brand-gradient-to" />}>
      <TrainingPageContent />
    </Suspense>
  );
}
