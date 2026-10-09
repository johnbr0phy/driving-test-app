"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function FoodhandlerTrainingPage() {
  return <ExamTrainingPage exam={getExamById("foodhandler")!} />;
}
