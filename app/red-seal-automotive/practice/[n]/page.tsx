"use client";

import "@/lib/banks/caauto";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CaautoTrainingPage() {
  return <ExamTrainingPage exam={getExamById("caauto")!} />;
}
