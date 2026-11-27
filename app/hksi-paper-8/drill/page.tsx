"use client";

import "@/lib/banks/hklesfi8";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HksiPaper8DrillPage() {
  return <ExamDrillPage exam={getExamById("hklesfi8")!} />;
}
