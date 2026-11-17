"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ZaFirearmDrillPage() {
  return <ExamDrillPage exam={getExamById("zafirearm")!} />;
}
