"use client";

import "@/lib/banks/ita2";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Ita2DrillPage() {
  return <ExamDrillPage exam={getExamById("ita2")!} />;
}
