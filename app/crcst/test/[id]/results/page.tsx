"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CRCSTResultsPage() {
  return <ExamResultsPage exam={getExamById("crcst")!} />;
}
