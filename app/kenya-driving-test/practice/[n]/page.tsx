"use client";

import "@/lib/banks/kentsa";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function KentsaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("kentsa")!} />;
}
