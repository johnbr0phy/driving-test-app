"use client";

import { useIsPremium } from "@/hooks/useIsPremium";
import { inClassFor, useClassMemberships } from "@/hooks/useClassMemberships";

/**
 * Whether this person has a v2 exam's Premium steps open: a Premium account,
 * or a student in a teacher's class for the exam (never locked, like v1).
 */
export function useV2Premium(examId: string): { isPremium: boolean; ready: boolean } {
  const { isPremium, ready } = useIsPremium();
  const inClass = inClassFor(useClassMemberships(), examId);
  return { isPremium: isPremium || inClass, ready };
}
