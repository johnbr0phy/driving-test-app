"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AwsDrillPage() {
  return <ExamDrillPage exam={getExamById("aws")!} />;
}
