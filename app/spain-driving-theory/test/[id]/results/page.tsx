"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function EsdgtResultsPage() {
  return <ExamResultsPage exam={getExamById("esdgt")!} />;
}
