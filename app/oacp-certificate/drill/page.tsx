"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function OacpDrillPage() {
  return <ExamDrillPage exam={getExamById("oacp")!} />;
}
