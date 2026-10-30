"use client";

import "@/lib/banks/ukseru";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UkseruTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ukseru")!} />;
}
