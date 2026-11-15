"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function WaFirearmsDrillPage() {
  return <ExamDrillPage exam={getExamById("aufirearmswa")!} />;
}
