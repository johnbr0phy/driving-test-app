"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function FoodhandlerTestPage() {
  return <ExamTestPage exam={getExamById("foodhandler")!} />;
}
