"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AwsResultsPage() {
  return <ExamResultsPage exam={getExamById("aws")!} />;
}
