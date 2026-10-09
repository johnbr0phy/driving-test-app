"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhlebDrillPage() {
  return <ExamDrillPage exam={getExamById("phleb")!} />;
}
