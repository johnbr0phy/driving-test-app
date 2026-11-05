"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhpharmDrillPage() {
  return <ExamDrillPage exam={getExamById("phpharm")!} />;
}
