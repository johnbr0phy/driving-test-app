"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function IedttResultsPage() {
  return <ExamResultsPage exam={getExamById("iedtt")!} />;
}
