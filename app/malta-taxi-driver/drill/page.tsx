"use client";

import "@/lib/banks/mttaxi";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function MttaxiDrillPage() {
  return <ExamDrillPage exam={getExamById("mttaxi")!} />;
}
