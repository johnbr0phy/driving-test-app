"use client";

import "@/lib/banks/ausa";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AusaTestPage() {
  return <ExamTestPage exam={getExamById("ausa")!} />;
}
