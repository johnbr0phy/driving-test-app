"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function FoodmgrTestPage() {
  return <ExamTestPage exam={getExamById("foodmgr")!} />;
}
