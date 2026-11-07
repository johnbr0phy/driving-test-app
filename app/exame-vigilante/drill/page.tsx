"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PtvigilDrillPage() {
  return <ExamDrillPage exam={getExamById("ptvigil")!} />;
}
