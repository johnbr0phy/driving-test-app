"use client";

import "@/lib/banks/ffi";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function FfiTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ffi")!} />;
}
