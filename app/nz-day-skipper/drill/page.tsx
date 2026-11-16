"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzBoatDrillPage() {
  return <ExamDrillPage exam={getExamById("nzboat")!} />;
}
