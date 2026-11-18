"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SgSecurityDrillPage() {
  return <ExamDrillPage exam={getExamById("sgsecurity")!} />;
}
