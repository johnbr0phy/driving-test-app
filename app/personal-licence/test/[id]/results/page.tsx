"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UkaplhResultsPage() {
  return <ExamResultsPage exam={getExamById("ukaplh")!} />;
}
