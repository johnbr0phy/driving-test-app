"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AurcgResultsPage() {
  return <ExamResultsPage exam={getExamById("aurcg")!} />;
}
