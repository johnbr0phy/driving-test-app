"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CnaResultsPage() {
  return <ExamResultsPage exam={getExamById("cna")!} />;
}
