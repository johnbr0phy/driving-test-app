"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzlcqDrillPage() {
  return <ExamDrillPage exam={getExamById("nzlcq")!} />;
}
