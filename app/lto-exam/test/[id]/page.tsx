"use client";

import "@/lib/banks/phlto";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function PhltoTestPage() {
  return <ExamTestPage exam={getExamById("phlto")!} />;
}
