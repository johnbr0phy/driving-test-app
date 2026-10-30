"use client";

import "@/lib/banks/cscs";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CscsTestPage() {
  return <ExamTestPage exam={getExamById("cscs")!} />;
}
