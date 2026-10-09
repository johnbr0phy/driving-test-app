"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CSTTestPage() {
  return <ExamTestPage exam={getExamById("cst")!} />;
}
