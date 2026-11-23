"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function TasFirearmsDrillPage() {
  return <ExamDrillPage exam={getExamById("aufatas")!} />;
}
