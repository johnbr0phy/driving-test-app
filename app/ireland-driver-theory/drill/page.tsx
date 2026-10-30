"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function IedttDrillPage() {
  return <ExamDrillPage exam={getExamById("iedtt")!} />;
}
