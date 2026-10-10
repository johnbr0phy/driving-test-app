"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function SecurityGuardResultsPage() {
  return <ExamResultsPage exam={getExamById("security")!} />;
}
