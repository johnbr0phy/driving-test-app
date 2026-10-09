"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HTLDrillPage() {
  return <ExamDrillPage exam={getExamById("htl")!} />;
}
