"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function HkdriveResultsPage() {
  return <ExamResultsPage exam={getExamById("hkdrive")!} />;
}
