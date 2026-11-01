"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function DkteoriResultsPage() {
  return <ExamResultsPage exam={getExamById("dkteori")!} />;
}
