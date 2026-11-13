"use client";

import "@/lib/banks/aafcs";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AafcsHnfsDrillPage() {
  return <ExamDrillPage exam={getExamById("aafcs")!} />;
}
