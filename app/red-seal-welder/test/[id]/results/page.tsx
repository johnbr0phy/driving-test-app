"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CaweldResultsPage() {
  return <ExamResultsPage exam={getExamById("caweld")!} />;
}
