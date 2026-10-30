"use client";

import "@/lib/banks/aucit";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AucitTestPage() {
  return <ExamTestPage exam={getExamById("aucit")!} />;
}
