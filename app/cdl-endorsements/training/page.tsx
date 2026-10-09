"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CDLEndorsementsTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cdlx")!} />;
}
