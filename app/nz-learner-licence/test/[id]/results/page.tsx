"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function NzroadResultsPage() {
  return <ExamResultsPage exam={getExamById("nzroad")!} />;
}
