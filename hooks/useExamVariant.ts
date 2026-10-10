"use client";

import { notFound, useParams } from "next/navigation";
import { ExamConfig, getExamVariant } from "@/lib/exams";

/** State variant named by the [state] route segment; 404 for any other value. */
export function useExamVariant(familyId: string): ExamConfig {
  const { state } = useParams<{ state: string }>();
  const exam = getExamVariant(familyId, state);
  // Lowercase only, so /real-estate/CA/... is not a second URL for the same page.
  if (!exam || state !== state.toLowerCase()) notFound();
  return exam;
}
