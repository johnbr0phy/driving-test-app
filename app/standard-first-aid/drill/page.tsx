"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CasfaDrillPage() {
  return <ExamDrillPage exam={getExamById("casfa")!} />;
}
