"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function TeasDrillPage() {
  return <ExamDrillPage exam={getExamById("teas")!} />;
}
