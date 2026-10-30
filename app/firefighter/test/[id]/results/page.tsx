"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function FfiResultsPage() {
  return <ExamResultsPage exam={getExamById("ffi")!} />;
}
