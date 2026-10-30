"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzroadDrillPage() {
  return <ExamDrillPage exam={getExamById("nzroad")!} />;
}
