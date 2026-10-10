"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function ForkliftTestPage() {
  return <ExamTestPage exam={getExamById("forklift")!} />;
}
