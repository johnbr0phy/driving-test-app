"use client";

import "@/lib/banks/ukpcv";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UkpcvTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ukpcv")!} />;
}
