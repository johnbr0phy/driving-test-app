"use client";

import "@/lib/banks/hklesfi7";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HksiPaper7DrillPage() {
  return <ExamDrillPage exam={getExamById("hklesfi7")!} />;
}
