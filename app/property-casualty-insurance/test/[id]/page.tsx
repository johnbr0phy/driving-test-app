"use client";

import "@/lib/banks/pnc";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function PncTestPage() {
  return <ExamTestPage exam={getExamById("pnc")!} />;
}
