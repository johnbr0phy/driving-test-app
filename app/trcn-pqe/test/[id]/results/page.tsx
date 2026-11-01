"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function TrcnpqeResultsPage() {
  return <ExamResultsPage exam={getExamById("trcnpqe")!} />;
}
