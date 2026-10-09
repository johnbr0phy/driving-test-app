"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function HesiTestPage() {
  return <ExamTestPage exam={getExamById("hesi")!} />;
}
