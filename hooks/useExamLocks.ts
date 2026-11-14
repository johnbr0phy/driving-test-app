"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useIsPremium } from "@/hooks/useIsPremium";
import { inClassFor, useClassMemberships } from "@/hooks/useClassMemberships";
import { ExamConfig, TrainingPart, trainingPartOf } from "@/lib/exams";
import { lockedTestIds, lockedTrainingParts } from "@/lib/examLocks";

/**
 * Premium locks on a v1 exam for this person (lib/examLocks.ts). Open for
 * Premium accounts, for students in a teacher's class for the exam, and for
 * any step the person already has work in: a lock is for starting fresh,
 * never for taking progress away.
 *
 * `settled` turns true once the account (and its progress) has loaded; until
 * then nothing reads as locked, so pages that gate entry must wait for it.
 */
export function useExamLocks(source: ExamConfig) {
  const hydrated = useHydration();
  const { user } = useAuth();
  const { isPremium, ready } = useIsPremium();
  const firestoreLoaded = useStore((s) => s.firestoreLoaded);
  const trainingSets = useStore((s) => s.trainingSets);
  const completedTests = useStore((s) => s.completedTests);
  const getCurrentTest = useStore((s) => s.getCurrentTest);
  const inClass = inClassFor(useClassMemberships(), source.id, source.variantOf);

  const settled = hydrated && ready && (!user || firestoreLoaded);
  const paid = isPremium || inClass;
  const premiumTests = lockedTestIds(source);
  const premiumParts = lockedTrainingParts(source);

  const testLocked = (testId: number): boolean => {
    if (!settled || paid || !premiumTests.includes(testId)) return false;
    const current = getCurrentTest(testId);
    if (current && current.questions.length > 0) return false;
    return !completedTests.some((s) => s.state === source.stateCode && s.testNumber === testId);
  };

  const partLocked = (p: Pick<TrainingPart, "set" | "part">): boolean => {
    if (!settled || paid) return false;
    if (!premiumParts.some((l) => l.set.id === p.set.id && l.part === p.part)) return false;
    const data = trainingSets[p.set.id];
    const touched = [...(data?.masteredIds ?? []), ...(data?.wrongQueue ?? [])];
    return !touched.some((id) => trainingPartOf(p.set.id, id) === p.part);
  };

  return { settled, paid, testLocked, partLocked };
}
