"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function OntarioAirBrakeDrillPage() {
  return <ExamDrillPage exam={getExamById("caairbrake")!} />;
}
