"use client";

import "@/lib/banks/uk18ed";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function Uk18edTrainingPage() {
  return <ExamTrainingPage exam={getExamById("uk18ed")!} />;
}
