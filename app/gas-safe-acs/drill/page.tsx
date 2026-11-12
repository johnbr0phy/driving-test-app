"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkgasDrillPage() {
  return <ExamDrillPage exam={getExamById("ukgas")!} />;
}
