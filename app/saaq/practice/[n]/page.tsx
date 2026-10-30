"use client";

import "@/lib/banks/caqc";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CaqcTrainingPage() {
  return <ExamTrainingPage exam={getExamById("caqc")!} />;
}
