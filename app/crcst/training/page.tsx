"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CRCSTTrainingPage() {
  return <ExamTrainingPage exam={getExamById("crcst")!} />;
}
