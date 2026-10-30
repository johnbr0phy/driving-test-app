"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CasfaResultsPage() {
  return <ExamResultsPage exam={getExamById("casfa")!} />;
}
