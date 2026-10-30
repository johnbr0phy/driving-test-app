"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function JelecDrillPage() {
  return <ExamDrillPage exam={getExamById("jelec")!} />;
}
