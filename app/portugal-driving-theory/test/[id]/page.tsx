"use client";

import "@/lib/banks/ptimt";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function PtimtTestPage() {
  return <ExamTestPage exam={getExamById("ptimt")!} />;
}
