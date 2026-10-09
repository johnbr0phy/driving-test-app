"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function NotaryResultsPage() {
  return <ExamResultsPage exam={getExamById("notary")!} />;
}
