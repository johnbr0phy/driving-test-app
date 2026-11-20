"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Cemap2DrillPage() {
  return <ExamDrillPage exam={getExamById("ukcemap2")!} />;
}
