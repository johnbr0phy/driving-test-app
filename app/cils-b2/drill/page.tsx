"use client";

import "@/lib/banks/itcilsb2";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Itcilsb2DrillPage() {
  return <ExamDrillPage exam={getExamById("itcilsb2")!} />;
}
