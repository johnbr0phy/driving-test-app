"use client";

import "@/lib/banks/coc";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CocDrillPage() {
  return <ExamDrillPage exam={getExamById("coc")!} />;
}
