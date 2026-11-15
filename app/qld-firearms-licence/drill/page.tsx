"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function QldFirearmsDrillPage() {
  return <ExamDrillPage exam={getExamById("aufirearmsqld")!} />;
}
