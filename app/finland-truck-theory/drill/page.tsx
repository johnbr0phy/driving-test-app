"use client";

import "@/lib/banks/fitruck";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FitruckDrillPage() {
  return <ExamDrillPage exam={getExamById("fitruck")!} />;
}
