"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BoatingDrillPage() {
  return <ExamDrillPage exam={getExamById("boating")!} />;
}
