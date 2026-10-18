"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TrainingCard } from "@/components/TrainingCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { ShareButton } from "@/components/ShareButton";
import { useStore } from "@/store/useStore";
import { shuffleQuestionOptions } from "@/lib/shuffleOptions";
import { recordClassAnswer } from "@/lib/classProgress";
import { getExamTrainingSetQuestions, getNextExamTrainingSetQuestion } from "@/lib/examTestGenerator";
import { ExamConfig, examSetId, trainingPartName, trainingParts } from "@/lib/exams";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Question } from "@/types";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { Fireworks } from "@/components/Fireworks";
import { TestPageHeader } from "@/components/TestPageHeader";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useGuestPrompt } from "@/hooks/useGuestPrompt";
import { GuestPromptStep } from "@/components/GuestPromptStep";
import { v1GuestCounts } from "@/components/GuestSaveCard";
import { useLocalizedExam } from "@/hooks/useLocalizedExam";

// Shared training page for registry exams: the DMV training page (set mode
// with mastery + wrong-answer queue, set-complete share card) on the exam's
// content-area sets. Set mode only, no state selection, no premium gate.
function ExamTrainingContent({ exam: source }: { exam: ExamConfig }) {
  const { exam, routes, ui, lang } = useLocalizedExam(source);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  const { playCorrectSound, playIncorrectSound } = useSound();
  const { t } = useTranslation();

  const isGuest = useStore((state) => state.isGuest);
  const completedTests = useStore((state) => state.completedTests);
  const trainingAnswerHistory = useStore((state) => state.trainingAnswerHistory);
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  // Signed-out visitors get the sign-up prompt in place of a question now and then.
  const guestPrompt = useGuestPrompt(!authLoading && !user, "training");

  const training = useStore((state) => state.training);
  const trainingSets = useStore((state) => state.trainingSets);
  const answerTrainingQuestion = useStore((state) => state.answerTrainingQuestion);
  const answerTrainingSetQuestion = useStore((state) => state.answerTrainingSetQuestion);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const resetTrainingSet = useStore((state) => state.resetTrainingSet);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);

  // Get set number from URL if present (1-5, one per ASCP content area)
  const setParam = searchParams.get('set');
  const setNumber = setParam ? parseInt(setParam) : null;
  const isSetMode = setNumber !== null && setNumber >= 1 && setNumber <= exam.trainingSets.length;
  const setDef = isSetMode && setNumber ? exam.trainingSets.find((s) => s.setNumber === setNumber) : undefined;
  // Store IDs are namespaced per exam (see examSetId)
  const setId = isSetMode && setNumber ? examSetId(exam, setNumber) : null;
  // Sets over about 60 questions run in parts (?part=N); progress stays on the set.
  const setParts = setDef ? trainingParts(setDef) : [];
  const isSplit = setParts.length > 1;
  const partParam = parseInt(searchParams.get('part') ?? '');
  const partInfo = isSplit ? setParts.find((p) => p.part === partParam) : undefined;
  const part = partInfo?.part;
  const partQuestionIds = isSplit && setNumber && part
    ? getExamTrainingSetQuestions(exam, setNumber, part, lang).map((q) => q.questionId)
    : null;

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
  const setProgress = isSetMode && setId ? getTrainingSetProgress(setId) : null;
  const setData = isSetMode && setId ? (trainingSets[setId] || { masteredIds: [], wrongQueue: [] }) : null;
  // In a part, show that part's progress rather than the whole set's.
  const partProgress = partQuestionIds && setData
    ? (() => {
        const correct = setData.masteredIds.filter((id) => partQuestionIds.includes(id)).length;
        return { correct, total: partQuestionIds.length, complete: correct >= partQuestionIds.length };
      })()
    : null;
  const progress = partProgress ?? setProgress;
  // First unfinished part of the set, preferring the ones after this part.
  const unfinishedPart = (after: number) => {
    if (!setNumber) return undefined;
    const mastered = setData?.masteredIds ?? [];
    const open = setParts.filter((p) =>
      getExamTrainingSetQuestions(exam, setNumber, p.part, lang).some((q) => !mastered.includes(q.questionId))
    );
    return open.find((p) => p.part > after) ?? open.find((p) => p.part !== after);
  };

  // Nothing on registry exams is locked.
  const accessLocked = false;

  // Registry exams only have set mode. The DMV free-practice mode (no ?set=) writes to the
  // shared onboarding counters that DMV Set 1 falls back on, so a visit
  // without a valid set goes back to the dashboard instead of answering there.
  useEffect(() => {
    if (hydrated && !isSetMode) router.replace(routes.dashboard);
  }, [hydrated, isSetMode, router, routes.dashboard]);

  // A split set opened without a valid part (the results plan links to the
  // set) goes to its first unfinished part.
  const needsPart = hydrated && isSplit && !part;
  useEffect(() => {
    if (needsPart && setNumber) router.replace(routes.training(setNumber, unfinishedPart(0)?.part ?? 1));
  }, [needsPart]); // eslint-disable-line react-hooks/exhaustive-deps

  // Moving on to the next part keeps this page mounted: start it fresh.
  const firstPartRender = useRef(true);
  useEffect(() => {
    if (firstPartRender.current) {
      firstPartRender.current = false;
      return;
    }
    setShowSetComplete(false);
    setShowFireworks(false);
    setShowResetConfirm(false);
    currentQuestionIdRef.current = null;
    setCurrentQuestion(null);
  }, [part]);

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
    if (hydrated && isSetMode && !needsPart && !currentQuestion && !accessLocked) {
      loadNextQuestion();
    }
  }, [hydrated, isSetMode, needsPart, currentQuestion, accessLocked]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadNextQuestion = () => {
    let question: Question | null = null;

    if (isSetMode && setNumber && setId) {
      // Set-based training: get next unmastered question from the set
      // Wrong questions are pushed to the back via wrongQueue
      // IMPORTANT: Get fresh state from store to ensure we have the latest wrongQueue
      // (the captured trainingSets variable may be stale after answering a question)
      const freshTrainingSets = useStore.getState().trainingSets;
      const currentSetData = freshTrainingSets[setId] || { masteredIds: [], wrongQueue: [] };
      question = getNextExamTrainingSetQuestion(
        exam,
        setNumber,
        currentSetData.masteredIds,
        currentSetData.wrongQueue,
        currentQuestionIdRef.current,  // Use ref for reliable current question ID
        part,
        lang
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
      const freshWrongQueue = freshTrainingSets[setId]?.wrongQueue || [];
      if (freshWrongQueue.includes(question.questionId)) {
        question = shuffleQuestionOptions(question);
      }
    } else {
      // Free-practice mode is disabled for registry exams (see the redirect
      // above); nothing to load.
      question = null;
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

    guestPrompt.record(isCorrect);
    recordClassAnswer(exam.id, currentQuestion, isCorrect);

    // Track progress
    if (isSetMode && setId) {
      answerTrainingSetQuestion(setId, currentQuestion.questionId, isCorrect);
    } else {
      answerTrainingQuestion(currentQuestion.questionId, isCorrect);
    }
  };

  const handleNext = () => {
    if (guestPrompt.takeStep()) return;
    loadNextQuestion();
  };

  const handleSkipPrompt = () => {
    guestPrompt.skip();
    loadNextQuestion();
  };

  const handlePracticeAgain = () => {
    if (setId) {
      // In a part, only that part's questions start over.
      resetTrainingSet(setId, partQuestionIds ?? undefined);
      setShowSetComplete(false);
      // Load the first question after reset
      setTimeout(() => loadNextQuestion(), 0);
    }
  };

  if (!hydrated || !isSetMode || needsPart) {
    return null;
  }

  const setLabel = partInfo ? trainingPartName(partInfo, lang) : setDef?.name ?? ui.setN(setNumber ?? 0);
  const followingPart = part ? unfinishedPart(part) : undefined;

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
                src={getTigerAsset(exam.id, 2)}
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
                <Link href={routes.dashboard}>
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
                <Link href={routes.dashboard}>
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
                  {ui.trainingBadge(exam.shortName)}
                </div>
              </div>

              {/* Tiger face */}
              <div className="flex justify-center mb-5">
                <Image
                  src={getTigerAsset(exam.id, 1)}
                  alt="Tiger mascot"
                  width={160}
                  height={160}
                  className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
                />
              </div>

              {/* Tagline */}
              <div className="text-base md:text-lg font-extrabold uppercase tracking-widest mb-4 text-green-300">
                {ui.masteredMyTraining(exam.shortName)}
              </div>

              {/* Giant percentage */}
              <div className="text-7xl md:text-8xl font-black mb-3 leading-none text-green-500 dark:text-green-400">
                100%
              </div>

              {/* 50 out of 50 correct */}
              <div className="text-xl md:text-2xl text-gray-400 mb-5">
                {progress?.total ?? 50} {t("results.outOf")} {progress?.total ?? 50} {t("results.correctLabel")}
              </div>

              {/* MASTERED badge */}
              <Badge className="text-lg px-6 py-2 mb-5 bg-green-600 hover:bg-green-700">
                {ui.mastered}
              </Badge>

              {/* Exam + set name */}
              <div className="text-gray-400 text-base mb-2">
                {exam.examLabel} · {setLabel}
              </div>

              {/* Branding footer */}
              <div className="text-gray-400 text-sm tracking-wider mb-8">tigertest.io</div>

              {/* Split set: straight on to the next unfinished part */}
              {followingPart && setNumber && (
                <Button asChild className="w-full max-w-xs mx-auto mb-3 flex bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wide h-12 text-base">
                  <Link href={routes.training(setNumber, followingPart.part)}>
                    {ui.nextPart(trainingPartName(followingPart, lang))}
                  </Link>
                </Button>
              )}

              {/* SHARE + TRY AGAIN buttons */}
              <div className="flex gap-3 max-w-xs mx-auto">
                {setNumber && (
                  <ShareButton
                    score={progress?.total ?? 50}
                    totalQuestions={progress?.total ?? 50}
                    percentage={100}
                    passed={true}
                    setId={setNumber}
                    stateCode={exam.stateCode}
                    className="flex-1 bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase tracking-wide h-12 text-base"
                  />
                )}
                {!isGuest && (
                  <Button asChild
                      className="w-full bg-transparent text-white hover:bg-white/10 border border-white/30 font-bold uppercase tracking-wide h-12 text-base"
                    >
                    <Link href={routes.stats} className="flex-1">
                      {t("results.viewStats")}
                    </Link>
                  </Button>
                )}
              </div>


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
        backHref={routes.dashboard}
        right={
          !isGuest ? (
            <Link
              href={routes.stats}
              className="text-sm font-medium text-brand-dark hover:text-brand-darker transition-colors"
            >
              {t("dashboard.viewStats")}
            </Link>
          ) : undefined
        }
      />
      <div className="relative container mx-auto px-4 py-4 max-w-lg md:max-w-2xl lg:max-w-4xl">

        {/* Question Card */}
        {accessLocked ? null : guestPrompt.showing ? (
          <GuestPromptStep
            signupHref={`/signup?redirect=${encodeURIComponent(`${pathname}?${searchParams.toString()}`)}`}
            answered={v1GuestCounts(exam.stateCode, completedTests, trainingAnswerHistory).answered}
            where="training"
            onSkip={handleSkipPrompt}
          />
        ) : currentQuestion ? (
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
              <Button className="bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200" onClick={() => router.push(routes.dashboard)}>
                {t("common.back")}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        <div className="mt-4 md:mt-6 text-center">
          {accessLocked ? null : isSetMode && progress ? (
            // Set-based progress
            <>
              <div className="flex items-center justify-center gap-1 text-sm md:text-lg text-gray-700 dark:text-gray-200">
                <span className="font-bold text-xl md:text-2xl text-brand-dark">{progress.correct}</span>
                <span className="text-gray-500 dark:text-gray-400">/{progress.total}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs md:text-base ml-1">
                  {t("trainingPage.questionsCorrect")}
                </span>
              </div>
              <div className="w-full bg-brand-border-light rounded-full h-2 mt-2 max-w-md mx-auto">
                <div
                  className="bg-brand h-2 rounded-full transition-all"
                  style={{ width: `${(progress.correct / progress.total) * 100}%` }}
                />
              </div>
              {partInfo && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{trainingPartName(partInfo, lang)}</p>
              )}
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

    </div>
  );
}

export function ExamTrainingPage({ exam }: { exam: ExamConfig }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-gradient-to-br from-brand-light to-brand-gradient-to" />}>
      <ExamTrainingContent exam={exam} />
    </Suspense>
  );
}
