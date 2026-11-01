"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhletDrillPage() {
  return <ExamDrillPage exam={getExamById("phlet")!} />;
}
