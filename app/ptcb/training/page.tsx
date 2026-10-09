"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PtcbTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ptcb")!} />;
}
