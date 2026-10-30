"use client";

import "@/lib/banks/nasm";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function NasmTestPage() {
  return <ExamTestPage exam={getExamById("nasm")!} />;
}
