"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CdmDrillPage() {
  return <ExamDrillPage exam={getExamById("cdm")!} />;
}
