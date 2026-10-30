"use client";

import "@/lib/banks/nasm";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function NasmTrainingPage() {
  return <ExamTrainingPage exam={getExamById("nasm")!} />;
}
