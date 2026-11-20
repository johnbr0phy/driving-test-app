"use client";

import "@/lib/banks/waterop";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function WaterOpDrillPage() {
  return <ExamDrillPage exam={getExamById("waterop")!} />;
}
