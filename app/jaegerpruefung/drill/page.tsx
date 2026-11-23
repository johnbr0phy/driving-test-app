"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DejagdDrillPage() {
  return <ExamDrillPage exam={getExamById("dejagd")!} />;
}
