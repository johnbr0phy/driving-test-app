"use client";

import "@/lib/banks/nzroad";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function NzroadTrainingPage() {
  return <ExamTrainingPage exam={getExamById("nzroad")!} />;
}
