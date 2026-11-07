"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function GrmotoDrillPage() {
  return <ExamDrillPage exam={getExamById("grmoto")!} />;
}
