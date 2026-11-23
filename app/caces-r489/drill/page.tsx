"use client";

import "@/lib/banks/frcaces";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FrcacesDrillPage() {
  return <ExamDrillPage exam={getExamById("frcaces")!} />;
}
