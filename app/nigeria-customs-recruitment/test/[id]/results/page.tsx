"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function NgcustomsResultsPage() {
  return <ExamResultsPage exam={getExamById("ngcustoms")!} />;
}
