"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkaplhDrillPage() {
  return <ExamDrillPage exam={getExamById("ukaplh")!} />;
}
