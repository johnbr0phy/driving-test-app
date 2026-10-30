"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function Uk18edResultsPage() {
  return <ExamResultsPage exam={getExamById("uk18ed")!} />;
}
