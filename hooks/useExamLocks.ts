"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useIsPremium } from "@/hooks/useIsPremium";
import { inClassFor, useClassMemberships } from "@/hooks/useClassMemberships";
import { ExamConfig, TrainingPart, trainingPartOf } from "@/lib/exams";
import { useEffect } from "react";
import { lockedTestIds, lockedTrainingParts } from "@/lib/examLocks";
import { lockShare, recordLockExposure } from "@/lib/lockTest";

/**
 * Premium locks on a v1 exam for this person (lib/examLocks.ts). Open for
 * Premium accounts, for students in a teacher's class for the exam, and for
 * any step the person already has work in: a lock is for starting fresh,
 * never for taking progress away.
 *
 * `settled` turns true once the account (and its progress) has loaded; until
 * then nothing reads as locked, so pages that gate entry must wait for it.
 *
 * How much is locked depends on this browser's arm of the lock share test
 * (lib/lockTest.ts); a settled visit by someone who is not Premium or in a
 * class counts as one exposure to it.
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
  // Read only once settled (after hydration), so the server render and the
  // first client render agree.
  const share = settled ? lockShare() : undefined;
  const premiumTests = lockedTestIds(source, share);
  const premiumParts = lockedTrainingParts(source, share);
  const familyId = source.variantOf ?? source.id;

  useEffect(() => {
    if (settled && !paid) void recordLockExposure(familyId);
  }, [settled, paid, familyId]);

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
