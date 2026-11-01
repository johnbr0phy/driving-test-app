"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function EsdgtDrillPage() {
  return <ExamDrillPage exam={getExamById("esdgt")!} />;
}
