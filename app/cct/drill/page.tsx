"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CctDrillPage() {
  return <ExamDrillPage exam={getExamById("cct")!} />;
}
