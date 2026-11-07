"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function EsguardiaDrillPage() {
  return <ExamDrillPage exam={getExamById("esguardia")!} />;
}
