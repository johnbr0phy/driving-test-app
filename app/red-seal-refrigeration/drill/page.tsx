"use client";

import "@/lib/banks/carsrefrig";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CarsrefrigDrillPage() {
  return <ExamDrillPage exam={getExamById("carsrefrig")!} />;
}
