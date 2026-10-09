"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CnaTestPage() {
  return <ExamTestPage exam={getExamById("cna")!} />;
}
