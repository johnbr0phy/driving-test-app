"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function RbtResultsPage() {
  return <ExamResultsPage exam={getExamById("rbt")!} />;
}
