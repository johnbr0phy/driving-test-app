"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CpcResultsPage() {
  return <ExamResultsPage exam={getExamById("cpc")!} />;
}
