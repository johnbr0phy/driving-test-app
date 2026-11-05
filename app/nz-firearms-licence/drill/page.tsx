"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzFirearmsDrillPage() {
  return <ExamDrillPage exam={getExamById("nzfirearms")!} />;
}
