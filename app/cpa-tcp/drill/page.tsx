"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CpaTcpDrillPage() {
  return <ExamDrillPage exam={getExamById("cpatcp")!} />;
}
