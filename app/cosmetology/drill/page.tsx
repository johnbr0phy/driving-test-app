"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CosmetologyDrillPage() {
  return <ExamDrillPage exam={getExamById("cosmetology")!} />;
}
