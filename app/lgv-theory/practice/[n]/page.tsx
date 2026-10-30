"use client";

import "@/lib/banks/uklgv";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UklgvTrainingPage() {
  return <ExamTrainingPage exam={getExamById("uklgv")!} />;
}
