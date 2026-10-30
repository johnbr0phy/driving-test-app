"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function InrtoResultsPage() {
  return <ExamResultsPage exam={getExamById("inrto")!} />;
}
