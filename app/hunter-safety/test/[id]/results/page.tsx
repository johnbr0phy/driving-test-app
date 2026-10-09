"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function HunterResultsPage() {
  return <ExamResultsPage exam={getExamById("hunter")!} />;
}
