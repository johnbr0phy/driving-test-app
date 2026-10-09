"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FoodhandlerDrillPage() {
  return <ExamDrillPage exam={getExamById("foodhandler")!} />;
}
