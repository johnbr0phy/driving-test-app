"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AurcgDrillPage() {
  return <ExamDrillPage exam={getExamById("aurcg")!} />;
}
