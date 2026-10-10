"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AsvabTestPage() {
  return <ExamTestPage exam={getExamById("asvab")!} />;
}
