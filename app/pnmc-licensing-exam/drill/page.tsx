"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PkpnmcDrillPage() {
  return <ExamDrillPage exam={getExamById("pkpnmc")!} />;
}
