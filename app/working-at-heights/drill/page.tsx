"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AuwahDrillPage() {
  return <ExamDrillPage exam={getExamById("auwah")!} />;
}
