"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NgfrscDrillPage() {
  return <ExamDrillPage exam={getExamById("ngfrsc")!} />;
}
