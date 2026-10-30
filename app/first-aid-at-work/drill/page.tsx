"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkfawDrillPage() {
  return <ExamDrillPage exam={getExamById("ukfaw")!} />;
}
