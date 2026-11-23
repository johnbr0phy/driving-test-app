"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkSqe1DrillPage() {
  return <ExamDrillPage exam={getExamById("uksqe1")!} />;
}
