"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SixSigmaYellowBeltDrillPage() {
  return <ExamDrillPage exam={getExamById("cssyb")!} />;
}
