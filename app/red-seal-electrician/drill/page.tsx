"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CaelecDrillPage() {
  return <ExamDrillPage exam={getExamById("caelec")!} />;
}
