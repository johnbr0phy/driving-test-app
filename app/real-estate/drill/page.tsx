"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RealestateDrillPage() {
  return <ExamDrillPage exam={getExamById("realestate")!} />;
}
