"use client";

import "@/lib/banks/ukfaw";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UkfawTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ukfaw")!} />;
}
