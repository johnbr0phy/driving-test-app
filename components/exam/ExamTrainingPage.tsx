"use client";

import { useState, useEffect, Suspense, useRef, useCallback } from "react";
import { usePathname, useRouter, useSearchParams, useParams } from "next/navigation";
import { TrainingCard } from "@/components/TrainingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShareButton } from "@/components/ShareButton";
import { useStore } from "@/store/useStore";
import { shuffleQuestionOptions } from "@/lib/shuffleOptions";
import { recordClassAnswer } from "@/lib/classProgress";
import { useClassMissRecovery } from "@/components/exam/ClassMissRecovery";
import { getExamTrainingSetQuestions, getNextExamTrainingSetQuestion } from "@/lib/examTestGenerator";
import { ExamConfig, examSetId, trainingPartName, trainingParts } from "@/lib/exams";
import { Question } from "@/types";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { Fireworks } from "@/components/Fireworks";
import { AchievementCelebration } from "@/components/AchievementCelebration";
import { AccessibleOverlay } from "@/components/AccessibleOverlay";
import { TestPageHeader } from "@/components/TestPageHeader";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useGuestPrompt } from "@/hooks/useGuestPrompt";
import { GuestPromptStep } from "@/components/GuestPromptStep";
import { v1GuestCounts } from "@/components/GuestSaveCard";
import { useLocalizedExam } from "@/hooks/useLocalizedExam";
import { useTestSetMigration } from "@/hooks/useTestSetMigration";

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
  useClassMissRecovery(exam.id);
  useTestSetMigration(exam);

  const training = useStore((state) => state.training);
  const trainingSets = useStore((state) => state.trainingSets);
  const answerTrainingQuestion = useStore((state) => state.answerTrainingQuestion);
  const answerTrainingSetQuestion = useStore((state) => state.answerTrainingSetQuestion);
  const getTrainingSetProgress = useStore((state) => state.getTrainingSetProgress);
  const resetTrainingSet = useStore((state) => state.resetTrainingSet);
  const isOnboardingComplete = useStore((state) => state.isOnboardingComplete);

  // Set number from /<exam>/practice/[n] (1.., one per content area)
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
  const [showSetComplete, setShowSetComplete] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const retryButtonRef = useRef<HTMLButtonElement>(null);
  const [earnedCompletion, setEarnedCompletion] = useState(false);
  const pendingCompletion = useRef(false);

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

  // Registry exams only have set mode. The DMV free-practice mode (no set) writes to the
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
    setEarnedCompletion(false);
    pendingCompletion.current = false;
    setShowFireworks(false);
    setShowResetConfirm(false);
    currentQuestionIdRef.current = null;
    setCurrentQuestion(null);
  }, [part, setNumber]);

  const handleFireworksComplete = useCallback(() => setShowFireworks(false), []);

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

      // Restored mastery can show the result, but only an answer in this visit
      // earns the animation. Opening a completed part must not replay fireworks.
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
    recordClassAnswer(exam.id, currentQuestion, isCorrect, answer);

    // Track progress
    if (isSetMode && setId) {
      const questionIds = getExamTrainingSetQuestions(exam, setNumber!, part, lang).map((q) => q.questionId);
      const before = useStore.getState().trainingSets[setId]?.masteredIds ?? [];
      const wasComplete = questionIds.length > 0 && questionIds.every((id) => before.includes(id));
      answerTrainingSetQuestion(setId, currentQuestion.questionId, isCorrect);
      const after = useStore.getState().trainingSets[setId]?.masteredIds ?? [];
      pendingCompletion.current = isCorrect && !wasComplete && questionIds.length > 0 && questionIds.every((id) => after.includes(id));
    } else {
      answerTrainingQuestion(currentQuestion.questionId, isCorrect);
    }
  };

  const handleNext = () => {
    // Let the earned result come before an optional sign-up step.
    if (!pendingCompletion.current && guestPrompt.takeStep()) return;
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
      setShowResetConfirm(false);
      setShowFireworks(false);
      setEarnedCompletion(false);
      pendingCompletion.current = false;
      // Load the first question after reset
      setTimeout(() => loadNextQuestion(), 0);
    }
  };

  if (!hydrated || !isSetMode || needsPart) {
    return null;
  }

  const setLabel = partInfo ? trainingPartName(partInfo, lang) : setDef?.name ?? ui.setN(setNumber ?? 0);
  const followingPart = part ? unfinishedPart(part) : undefined;
  const dashboardHref = `${routes.dashboard}?completed=training:${setNumber}${part ? `&part=${part}` : ""}`;
  const celebrationCopy = {
    en: { title: "You turned this step green!", part: "Part complete", set: "Training complete", progress: "See your progress", description: "Your practice paid off. This step is now green on your dashboard.", remaining: "You finished this part. Keep going to complete the rest of the set.", resetPart: "This will reset your progress in this part only. Are you sure?" },
    es: { title: "¡Este paso ya está en verde!", part: "Parte completada", set: "Entrenamiento completado", progress: "Ver tu progreso", description: "Tu práctica dio resultado. Este paso ya está en verde en tu panel.", remaining: "Terminaste esta parte. Sigue para completar el resto del grupo.", resetPart: "Esto reiniciará tu progreso solo en esta parte. ¿Estás seguro/a?" },
    vi: { title: "Bước này đã chuyển sang màu xanh!", part: "Hoàn thành phần", set: "Hoàn thành luyện tập", progress: "Xem tiến độ của bạn", description: "Việc luyện tập đã mang lại kết quả. Bước này giờ đã có màu xanh trên bảng tiến độ.", remaining: "Bạn đã hoàn thành phần này. Hãy tiếp tục để hoàn thành các phần còn lại.", resetPart: "Thao tác này chỉ đặt lại tiến độ của phần này. Bạn có chắc không?" },
    ko: { title: "이 단계가 초록색이 되었어요!", part: "파트 완료", set: "학습 완료", progress: "내 진행 상황 보기", description: "연습의 결실이에요. 대시보드에서 이 단계가 초록색으로 바뀌었어요.", remaining: "이 파트를 완료했어요. 세트의 나머지 파트도 계속해 보세요.", resetPart: "이 파트의 진행 상황만 초기화됩니다. 계속하시겠습니까?" },
    zh: { title: "这一步变绿了！", part: "部分已完成", set: "练习已完成", progress: "查看你的进度", description: "你的练习有了成果。面板上的这一步现在变绿了。", remaining: "你已完成这一部分。继续完成这组练习的其他部分吧。", resetPart: "这将仅重置这一部分的进度。确定吗？" },
  }[lang];
  const resetMessage = partInfo ? celebrationCopy.resetPart : t("trainingPage.resetConfirm");

  return (
    <div className="flex-1 bg-gradient-to-br from-brand-light to-brand-gradient-to">
      {/* Fireworks Animation */}
      {showFireworks && (
        <Fireworks duration={3000} onComplete={handleFireworksComplete} />
      )}

      {showSetComplete && isSetMode && (
        <AccessibleOverlay
          aria-label={partInfo ? celebrationCopy.part : celebrationCopy.set}
          onClose={() => router.push(dashboardHref)}
          onOpenAutoFocus={earnedCompletion ? (event) => event.preventDefault() : undefined}
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/50 px-4 py-6 backdrop-blur-sm sm:py-10"
        >
          <div className="flex min-h-full items-center">
            <AchievementCelebration
              examId={exam.id}
              eyebrow={partInfo ? celebrationCopy.part : celebrationCopy.set}
              title={celebrationCopy.title}
              description={followingPart ? celebrationCopy.remaining : celebrationCopy.description}
              detail={<><span className="block">{setLabel}</span><span className="block mt-1 font-normal">{progress?.correct}/{progress?.total} {t("trainingPage.questionsCorrect")}</span></>}
              earned={earnedCompletion}
            >
              <Button asChild className="h-auto min-h-12 w-full whitespace-normal bg-green-700 px-5 py-3 text-base font-bold text-white hover:bg-green-800">
                <Link href={dashboardHref}>{celebrationCopy.progress}</Link>
              </Button>
              {followingPart && setNumber && (
                <Button asChild variant="outline" className="h-auto min-h-11 w-full whitespace-normal py-3">
                  <Link href={routes.training(setNumber, followingPart.part)}>{ui.nextPart(trainingPartName(followingPart, lang))}</Link>
                </Button>
              )}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {/* A share image describes a whole set, so never claim it for just one part. */}
                {setNumber && setProgress?.complete && (
                  <ShareButton
                    score={setProgress.total}
                    totalQuestions={setProgress.total}
                    percentage={100}
                    passed={true}
                    setId={setNumber}
                    stateCode={exam.stateCode}
                    className="h-auto min-h-11 whitespace-normal border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  />
                )}
                {!isGuest && <Button asChild variant="ghost"><Link href={routes.stats}>{t("results.viewStats")}</Link></Button>}
                <Button ref={retryButtonRef} variant="ghost" onClick={() => setShowResetConfirm(true)}>{t("results.tryAgain")}</Button>
              </div>
              {showResetConfirm && (
                <div role="group" aria-label={resetMessage} className="mt-2 rounded-xl border border-gray-200 bg-white p-4 text-left dark:border-gray-700 dark:bg-gray-900">
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{resetMessage}</p>
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
            signupHref={`/signup?redirect=${encodeURIComponent(`${pathname}${searchParams.size ? `?${searchParams.toString()}` : ""}`)}`}
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
