"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CaautoDrillPage() {
  return <ExamDrillPage exam={getExamById("caauto")!} />;
}
