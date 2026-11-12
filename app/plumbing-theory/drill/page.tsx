"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkplumbDrillPage() {
  return <ExamDrillPage exam={getExamById("ukplumb")!} />;
}
