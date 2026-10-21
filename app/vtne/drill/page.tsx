"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function VtneDrillPage() {
  return <ExamDrillPage exam={getExamById("vtne")!} />;
}
