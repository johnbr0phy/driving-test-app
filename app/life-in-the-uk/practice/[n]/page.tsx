"use client";

import "@/lib/banks/uklitu";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UklituTrainingPage() {
  return <ExamTrainingPage exam={getExamById("uklitu")!} />;
}
