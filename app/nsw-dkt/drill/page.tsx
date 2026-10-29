"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AunswDrillPage() {
  return <ExamDrillPage exam={getExamById("aunsw")!} />;
}
