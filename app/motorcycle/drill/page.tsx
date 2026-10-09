"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function MotorcycleDrillPage() {
  return <ExamDrillPage exam={getExamById("moto")!} />;
}
