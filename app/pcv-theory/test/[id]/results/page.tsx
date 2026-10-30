"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UkpcvResultsPage() {
  return <ExamResultsPage exam={getExamById("ukpcv")!} />;
}
