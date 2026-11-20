"use client";

import "@/lib/banks/lmrt";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function LmrtDrillPage() {
  return <ExamDrillPage exam={getExamById("lmrt")!} />;
}
