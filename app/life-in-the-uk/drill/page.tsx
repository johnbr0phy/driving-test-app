"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UklituDrillPage() {
  return <ExamDrillPage exam={getExamById("uklitu")!} />;
}
