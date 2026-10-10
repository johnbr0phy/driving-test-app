"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AccuplacerTestPage() {
  return <ExamTestPage exam={getExamById("accuplacer")!} />;
}
