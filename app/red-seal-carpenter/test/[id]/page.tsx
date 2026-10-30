"use client";

import "@/lib/banks/cacarp";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function RedSealCarpenterTestPage() {
  return <ExamTestPage exam={getExamById("cacarp")!} />;
}
