"use client";

import "@/lib/banks/ausecurity";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AuSecurityDrillPage() {
  return <ExamDrillPage exam={getExamById("ausecurity")!} />;
}
