"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkcarDrillPage() {
  return <ExamDrillPage exam={getExamById("ukcar")!} />;
}
