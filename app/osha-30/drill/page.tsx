"use client";

import "@/lib/banks/osha30";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Osha30DrillPage() {
  return <ExamDrillPage exam={getExamById("osha30")!} />;
}
