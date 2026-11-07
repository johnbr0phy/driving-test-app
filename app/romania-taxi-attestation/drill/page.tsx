"use client";

import "@/lib/banks/rotaxi";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RotaxiDrillPage() {
  return <ExamDrillPage exam={getExamById("rotaxi")!} />;
}
