"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HunterDrillPage() {
  return <ExamDrillPage exam={getExamById("hunter")!} />;
}
