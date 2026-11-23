"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SaFirearmsDrillPage() {
  return <ExamDrillPage exam={getExamById("aufasa")!} />;
}
