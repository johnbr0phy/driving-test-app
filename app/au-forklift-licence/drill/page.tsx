"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AuForkliftDrillPage() {
  return <ExamDrillPage exam={getExamById("auforklift")!} />;
}
