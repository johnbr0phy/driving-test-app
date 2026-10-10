"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AccuplacerDrillPage() {
  return <ExamDrillPage exam={getExamById("accuplacer")!} />;
}
