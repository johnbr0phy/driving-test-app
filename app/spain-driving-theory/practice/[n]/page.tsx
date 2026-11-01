"use client";

import "@/lib/banks/esdgt";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function EsdgtTrainingPage() {
  return <ExamTrainingPage exam={getExamById("esdgt")!} />;
}
