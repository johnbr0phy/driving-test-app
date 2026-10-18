"use client";

import "@/lib/banks/cdl";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CDLTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cdl")!} />;
}
