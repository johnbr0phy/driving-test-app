"use client";

import "@/lib/banks/ukfood";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UkfoodTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ukfood")!} />;
}
