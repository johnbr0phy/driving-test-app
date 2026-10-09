"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AwsTrainingPage() {
  return <ExamTrainingPage exam={getExamById("aws")!} />;
}
