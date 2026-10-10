"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function OshaResultsPage() {
  return <ExamResultsPage exam={getExamById("osha")!} />;
}
