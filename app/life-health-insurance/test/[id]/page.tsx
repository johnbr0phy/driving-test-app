"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function InsuranceTestPage() {
  return <ExamTestPage exam={getExamById("insurance")!} />;
}
