"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ShrmCpDrillPage() {
  return <ExamDrillPage exam={getExamById("shrmcp")!} />;
}
