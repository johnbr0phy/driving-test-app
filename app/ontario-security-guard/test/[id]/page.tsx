"use client";

import "@/lib/banks/caguard";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CaguardTestPage() {
  return <ExamTestPage exam={getExamById("caguard")!} />;
}
