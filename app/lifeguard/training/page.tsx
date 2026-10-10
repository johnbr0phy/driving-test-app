"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function LifeguardTrainingPage() {
  return <ExamTrainingPage exam={getExamById("lifeguard")!} />;
}
