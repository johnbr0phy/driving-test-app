"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function PkdriveResultsPage() {
  return <ExamResultsPage exam={getExamById("pkdrive")!} />;
}
