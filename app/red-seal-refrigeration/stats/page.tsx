"use client";

import "@/lib/banks/carsrefrig";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CarsrefrigStatsPage() {
  return <ExamStatsPage exam={getExamById("carsrefrig")!} />;
}
