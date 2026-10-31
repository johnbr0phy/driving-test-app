"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function MykppResultsPage() {
  return <ExamResultsPage exam={getExamById("mykpp")!} />;
}
