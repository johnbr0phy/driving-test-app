"use client";

import "@/lib/banks/inrto";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function InrtoTrainingPage() {
  return <ExamTrainingPage exam={getExamById("inrto")!} />;
}
