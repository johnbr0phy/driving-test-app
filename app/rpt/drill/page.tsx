"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RptDrillPage() {
  return <ExamDrillPage exam={getExamById("rpt")!} />;
}
