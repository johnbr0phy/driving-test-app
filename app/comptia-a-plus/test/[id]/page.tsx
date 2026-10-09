"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AplusTestPage() {
  return <ExamTestPage exam={getExamById("aplus")!} />;
}
