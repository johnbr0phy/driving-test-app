"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkseruDrillPage() {
  return <ExamDrillPage exam={getExamById("ukseru")!} />;
}
