import type { Metadata } from "next";
import { getExamById } from "./exams";

/**
 * Metadata for an exam's app routes (dashboard, test, training, stats, drill).
 * These are client-rendered sessions, not pages we want ranked, so they are
 * noindex (follow stays on so link equity passes back to the landing). Without
 * this they inherit the DMV title and description from the root layout.
 * The landing page under `landingPath` sets its own metadata.
 */
export function examAppMetadata(examId: string): Metadata {
  const exam = getExamById(examId);
  if (!exam) return { robots: { index: false, follow: true } };
  return {
    title: exam.name,
    description: `Free ${exam.fullName} practice tests and training sets with instant feedback. Progress saves automatically.`,
    robots: { index: false, follow: true },
  };
}
