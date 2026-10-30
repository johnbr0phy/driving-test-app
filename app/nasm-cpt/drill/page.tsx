"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NasmDrillPage() {
  return <ExamDrillPage exam={getExamById("nasm")!} />;
}
