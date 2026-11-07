"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FimotoDrillPage() {
  return <ExamDrillPage exam={getExamById("fimoto")!} />;
}
