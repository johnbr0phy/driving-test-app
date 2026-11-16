"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BcCoreDrillPage() {
  return <ExamDrillPage exam={getExamById("cacore")!} />;
}
