"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function LifeguardResultsPage() {
  return <ExamResultsPage exam={getExamById("lifeguard")!} />;
}
