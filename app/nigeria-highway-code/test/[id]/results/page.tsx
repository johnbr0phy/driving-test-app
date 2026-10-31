"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function NgfrscResultsPage() {
  return <ExamResultsPage exam={getExamById("ngfrsc")!} />;
}
