"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CaelecResultsPage() {
  return <ExamResultsPage exam={getExamById("caelec")!} />;
}
