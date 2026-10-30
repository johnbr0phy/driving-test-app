"use client";

import "@/lib/banks/camb";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CambTestPage() {
  return <ExamTestPage exam={getExamById("camb")!} />;
}
