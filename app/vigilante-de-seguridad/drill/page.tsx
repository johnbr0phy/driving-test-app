"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function EsvigilanteDrillPage() {
  return <ExamDrillPage exam={getExamById("esvigilante")!} />;
}
