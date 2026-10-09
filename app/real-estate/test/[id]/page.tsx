"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function RealestateTestPage() {
  return <ExamTestPage exam={getExamById("realestate")!} />;
}
