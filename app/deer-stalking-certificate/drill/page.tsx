"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Ukdsc1DrillPage() {
  return <ExamDrillPage exam={getExamById("ukdsc1")!} />;
}
