"use client";

import "@/lib/banks/cacit";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CacitTestPage() {
  return <ExamTestPage exam={getExamById("cacit")!} />;
}
