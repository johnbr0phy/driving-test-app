"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function WhiteCardResultsPage() {
  return <ExamResultsPage exam={getExamById("auwhite")!} />;
}
