"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SgrttDrillPage() {
  return <ExamDrillPage exam={getExamById("sgrtt")!} />;
}
