"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CpaRegDrillPage() {
  return <ExamDrillPage exam={getExamById("cpareg")!} />;
}
