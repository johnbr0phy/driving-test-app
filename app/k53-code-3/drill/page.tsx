"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Zak53c3DrillPage() {
  return <ExamDrillPage exam={getExamById("zak53c3")!} />;
}
