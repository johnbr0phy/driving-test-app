"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RorezidDrillPage() {
  return <ExamDrillPage exam={getExamById("rorezid")!} />;
}
