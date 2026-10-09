"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CitizenshipResultsPage() {
  return <ExamResultsPage exam={getExamById("civics")!} />;
}
