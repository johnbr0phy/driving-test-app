"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function JelecResultsPage() {
  return <ExamResultsPage exam={getExamById("jelec")!} />;
}
