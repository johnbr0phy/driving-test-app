"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function EmtTestPage() {
  return <ExamTestPage exam={getExamById("emt")!} />;
}
