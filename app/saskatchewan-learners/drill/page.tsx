"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CaskDrillPage() {
  return <ExamDrillPage exam={getExamById("cask")!} />;
}
