"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CetTestPage() {
  return <ExamTestPage exam={getExamById("cet")!} />;
}
