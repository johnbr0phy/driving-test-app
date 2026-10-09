"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function FoodmgrTrainingPage() {
  return <ExamTrainingPage exam={getExamById("foodmgr")!} />;
}
