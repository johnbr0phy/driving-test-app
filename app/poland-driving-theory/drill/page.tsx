"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PlteoriaDrillPage() {
  return <ExamDrillPage exam={getExamById("plteoria")!} />;
}
