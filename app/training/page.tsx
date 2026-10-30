"use client";

import { useState, useEffect, Suspense, useRef, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { TrainingCard } from "@/components/TrainingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShareButton } from "@/components/ShareButton";
import { useStore } from "@/store/useStore";
import { getTrainingQuestion, getNextTrainingSetQuestion, shuffleQuestionOptions } from "@/lib/testGenerator";
import { Question } from "@/types";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { Fireworks } from "@/components/Fireworks";
import { AchievementCelebration } from "@/components/AchievementCelebration";
import { AccessibleOverlay } from "@/components/AccessibleOverlay";
import { DMV_ROUTES } from "@/lib/examRoutes";
import { TestPageHeader } from "@/components/TestPageHeader";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { states } from "@/data/states";
import { en, es, vi, ko, zh } from "@/i18n";
import { PaywallModal } from "@/components/PaywallModal";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { trackBeginCheckout, trackStatsEntry } from "@/lib/analytics";
import { DMV_EXAM_ID } from "@/lib/classes";
import { recordClassAnswer } from "@/lib/classProgress";
import { useClassMissRecovery } from "@/components/exam/ClassMissRecovery";
import { paywallVariantForCheckout } from "@/lib/paywallTest";

function TrainingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  useClassMissRecovery(DMV_EXAM_ID);
  const { playCorrectSound, playIncorrectSound } = useSound();
  const { t, language } = useTranslation();

  const selectedState = useStore((state) => state.selectedState);
  const isGuest = useStore((state) => state.isGuest);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const { user } = useAuth();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [ctaIndex] = useState(() => Math.floor(Math.random() * en.testCtas.length));
  const ctaText = (language === "es" ? es.testCtas : language === "vi" ? vi.testCtas : language === "ko" ? ko.testCtas : language === "zh" ? zh.testCtas : en.testCtas)[ctaIndex];
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
          paywallVariant: paywallVariantForCheckout(),
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
  const retryButtonRef = useRef<HTMLButtonElement>(null);
  const [earnedCompletion, setEarnedCompletion] = useState(false);
  const pendingCompletion = useRef(false);

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

  const handleFireworksComplete = useCallback(() => setShowFireworks(false), []);

  // Load first question on mount
  useEffect(() => {
    if (hydrated && selectedState && !currentQuestion && !accessLocked) {
      loadNextQuestion();
    }
  }, [hydrated, selectedState, currentQuestion, accessLocked]); // eslint-disable-line react-hooks/exhaustive-deps

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

      // Restore the completion screen without replaying an earned moment.
      if (!question) {
        const earned = pendingCompletion.current;
        pendingCompletion.current = false;
        setEarnedCompletion(earned);
        setShowSetComplete(true);
        setShowFireworks(earned);
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

    recordClassAnswer(DMV_EXAM_ID, currentQuestion, isCorrect, answer);

    // Track progress
    if (isSetMode) {
      const wasComplete = useStore.getState().getTrainingSetProgress(setNumber).complete;
      answerTrainingSetQuestion(setNumber, currentQuestion.questionId, isCorrect);
      pendingCompletion.current = isCorrect && !wasComplete && useStore.getState().getTrainingSetProgress(setNumber).complete;
    } else {
      const before = useStore.getState().training.totalCorrectAllTime;
      answerTrainingQuestion(currentQuestion.questionId, isCorrect);
      // Hydration and synced counters never trigger this milestone.
      if (isCorrect && before < 10 && useStore.getState().training.totalCorrectAllTime >= 10) {
        setShowCelebration(true);
        setShowFireworks(true);
      }
    }
  };

  const handleNext = () => {
    loadNextQuestion();
  };

  const handlePracticeAgain = () => {
    if (setNumber) {
      resetTrainingSet(setNumber);
      setShowSetComplete(false);
      setShowResetConfirm(false);
      setShowFireworks(false);
      setEarnedCompletion(false);
      pendingCompletion.current = false;
      // Load the first question after reset
      setTimeout(() => loadNextQuestion(), 0);
    }
  };

  if (!hydrated || !selectedState) {
    return null;
  }

  const dashboardHref = `${DMV_ROUTES.dashboard}?completed=training:${setNumber}`;
  const celebrationCopy = {
    en: { title: "You turned this step green!", set: "Training complete", progress: "See your progress", description: "Your practice paid off. This training set is now green on your dashboard." },
    es: { title: "¡Este paso ya está en verde!", set: "Entrenamiento completado", progress: "Ver tu progreso", description: "Tu práctica dio resultado. Este grupo ya está en verde en tu panel." },
    vi: { title: "Bước này đã chuyển sang màu xanh!", set: "Hoàn thành luyện tập", progress: "Xem tiến độ của bạn", description: "Việc luyện tập đã mang lại kết quả. Bộ luyện tập này giờ đã có màu xanh trên bảng tiến độ." },
    ko: { title: "이 단계가 초록색이 되었어요!", set: "학습 완료", progress: "내 진행 상황 보기", description: "연습의 결실이에요. 대시보드에서 이 학습 세트가 초록색으로 바뀌었어요." },
    zh: { title: "这一步变绿了！", set: "练习已完成", progress: "查看你的进度", description: "你的练习有了成果。面板上的这组练习现在变绿了。" },
  }[language];

  return (
    <div className="flex-1 bg-gradient-to-br from-brand-light to-brand-gradient-to">
      {/* Fireworks Animation */}
      {showFireworks && (
        <Fireworks duration={3000} onComplete={handleFireworksComplete} />
      )}

      {showCelebration && (
        <AccessibleOverlay
          aria-label={t("trainingPage.youUnlocked")}
          onClose={() => { setShowCelebration(false); setShowFireworks(false); }}
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/50 px-4 py-6 backdrop-blur-sm sm:py-10"
        >
          <div className="flex min-h-full items-center">
            <AchievementCelebration
              eyebrow={t("trainingPage.congratulations")}
              title={t("trainingPage.youUnlocked")}
              description={t("trainingPage.answeredTenCorrectly")}
              earned
            >
              <Button asChild className="h-auto min-h-12 w-full whitespace-normal bg-green-700 px-5 py-3 text-base font-bold text-white hover:bg-green-800">
                <Link href={DMV_ROUTES.dashboard}>{celebrationCopy.progress}</Link>
              </Button>
              <Button variant="ghost" onClick={() => { setShowCelebration(false); setShowFireworks(false); }}>{t("trainingPage.keepGoing")}</Button>
            </AchievementCelebration>
          </div>
        </AccessibleOverlay>
      )}

      {showSetComplete && isSetMode && (
        <AccessibleOverlay
          aria-label={celebrationCopy.set}
          onClose={() => router.push(dashboardHref)}
          onOpenAutoFocus={earnedCompletion ? (event) => event.preventDefault() : undefined}
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/50 px-4 py-6 backdrop-blur-sm sm:py-10"
        >
          <div className="flex min-h-full items-center">
            <AchievementCelebration
              eyebrow={celebrationCopy.set}
              title={celebrationCopy.title}
              description={celebrationCopy.description}
              detail={<><span className="block">{t(`trainingSets.${setNumber}`)}</span><span className="mt-1 block font-normal">{setProgress?.correct}/{setProgress?.total} {t("trainingPage.questionsCorrect")}</span><span className="mt-1 block font-normal">{states.find((s) => s.code === selectedState)?.name || selectedState}</span></>}
              earned={earnedCompletion}
            >
              <Button asChild className="h-auto min-h-12 w-full whitespace-normal bg-green-700 px-5 py-3 text-base font-bold text-white hover:bg-green-800">
                <Link href={dashboardHref}>{celebrationCopy.progress}</Link>
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {selectedState && setNumber && setProgress && (
                  <ShareButton
                    score={setProgress.total}
                    totalQuestions={setProgress.total}
                    percentage={100}
                    passed={true}
                    setId={setNumber}
                    stateCode={selectedState}
                    className="h-auto min-h-11 whitespace-normal border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  />
                )}
                {!isGuest && <Button asChild variant="ghost"><Link href={DMV_ROUTES.stats}>{t("results.viewStats")}</Link></Button>}
                <Button ref={retryButtonRef} variant="ghost" onClick={() => setShowResetConfirm(true)}>{t("results.tryAgain")}</Button>
              </div>
              {!isGuest && (
                <Link href="/stats?tab=community" onClick={() => trackStatsEntry("training_complete", "community")} className="mt-1 rounded-md px-2 py-2 text-sm font-medium text-green-800 hover:underline dark:text-green-200">
                  {t("trainingPage.beatMostMissed")} →
                </Link>
              )}
              {showResetConfirm && (
                <div role="group" aria-label={t("trainingPage.resetConfirm")} className="mt-2 rounded-xl border border-gray-200 bg-white p-4 text-left dark:border-gray-700 dark:bg-gray-900">
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{t("trainingPage.resetConfirm")}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handlePracticeAgain}>{t("trainingPage.resetYes")}</Button>
                    <Button variant="ghost" className="flex-1" onClick={() => { setShowResetConfirm(false); retryButtonRef.current?.focus(); }}>{t("common.cancel")}</Button>
                  </div>
                </div>
              )}
            </AchievementCelebration>
          </div>
        </AccessibleOverlay>
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
