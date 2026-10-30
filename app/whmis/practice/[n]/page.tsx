"use client";

import "@/lib/banks/cawhmis";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CawhmisTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cawhmis")!} />;
}
