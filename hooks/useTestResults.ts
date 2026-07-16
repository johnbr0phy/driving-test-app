"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import { states } from "@/data/states";
import { useCommunityStats } from "@/hooks/useCommunityStats";

// Shared data/derived-state for the test results page: the session, score,
// attempt history, weak categories, and premium/guest flags the results UI
// is built from.
export function useTestResults(testId: number) {
  const router = useRouter();
  const hydrated = useHydration();
  const { t, language } = useTranslation();

  const getTestSession = useStore((state) => state.getTestSession);
  const getTestAttemptStats = useStore((state) => state.getTestAttemptStats);
  const isGuest = useStore((state) => state.isGuest);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);

  const testSession = hydrated ? getTestSession(testId) : null;
  const attemptStats = hydrated ? getTestAttemptStats(testId) : null;

  const { data: communityData } = useCommunityStats();
  const communityMap = useMemo(
    () => new Map((communityData?.questions ?? []).map((q) => [q.questionId, q])),
    [communityData]
  );

  useEffect(() => {
    if (!hydrated) return;
    if (!testSession) router.push(`/test/${testId}`);
  }, [hydrated, testSession, testId, router]);

  const weakCategories = useMemo(() => {
    if (!testSession) return [];
    const categoryStats: { [cat: string]: { correct: number; wrong: number } } = {};
    testSession.answers.forEach((answer, index) => {
      const q = testSession.questions[index];
      if (!q) return;
      const cat = q.category;
      if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, wrong: 0 };
      if (answer.isCorrect) categoryStats[cat].correct++;
      else categoryStats[cat].wrong++;
    });
    return Object.entries(categoryStats)
      .filter(([, stats]) => stats.wrong > 0)
      .map(([category, stats]) => ({
        category,
        wrong: stats.wrong,
        total: stats.correct + stats.wrong,
        accuracy: Math.round((stats.correct / (stats.correct + stats.wrong)) * 100),
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [testSession]);

  if (!hydrated || !testSession) {
    return { ready: false as const, hydrated, t, language };
  }

  const questions = testSession.questions;
  const score = testSession.score || 0;
  const answers: { [key: number]: string } = {};
  testSession.answers.forEach((answer, index) => {
    answers[index] = answer.userAnswer;
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= 70;
  const stateName = states.find((s) => s.code === testSession.state)?.name || testSession.state;

  const firstScore = attemptStats?.firstScore ?? score;
  const bestScore = attemptStats?.bestScore ?? score;
  const firstPercentage = Math.round((firstScore / totalQuestions) * 100);
  const bestPercentage = Math.round((bestScore / totalQuestions) * 100);
  const improvement = percentage - firstPercentage;
  const isNewBest = score === bestScore && !!attemptStats && attemptStats.attemptCount > 1;
  const attemptNumber = attemptStats?.attemptCount ?? 1;

  const nextTestId = testId + 1;
  const hasNextTest = testId < 4;
  const isPremium = hasPremiumAccess();
  const nextTestIsLocked = nextTestId === 4 && !isPremium;

  // How many of the 4 tests have at least one attempt — a simple "journey"
  // progress signal for the milestone hero.
  const testsCompletedCount = [1, 2, 3, 4].filter(
    (id) => (id === testId ? true : !!getTestAttemptStats(id))
  ).length;

  return {
    ready: true as const,
    hydrated,
    t,
    language,
    testSession,
    questions,
    answers,
    score,
    totalQuestions,
    percentage,
    passed,
    stateName,
    attemptStats,
    firstScore,
    bestScore,
    firstPercentage,
    bestPercentage,
    improvement,
    isNewBest,
    attemptNumber,
    weakCategories,
    communityMap,
    isGuest,
    isPremium,
    nextTestId,
    hasNextTest,
    nextTestIsLocked,
    testsCompletedCount,
    testId,
  };
}

export type TestResults = ReturnType<typeof useTestResults>;
export type ReadyTestResults = Extract<TestResults, { ready: true }>;
