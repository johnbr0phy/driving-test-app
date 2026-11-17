"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AppraiserDrillPage() {
  return <ExamDrillPage exam={getExamById("appraiser")!} />;
}
