"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function HamTestPage() {
  return <ExamTestPage exam={getExamById("ham")!} />;
}
