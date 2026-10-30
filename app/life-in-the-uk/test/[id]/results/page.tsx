"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UklituResultsPage() {
  return <ExamResultsPage exam={getExamById("uklitu")!} />;
}
