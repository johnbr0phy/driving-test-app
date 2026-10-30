"use client";

import "@/lib/banks/caweld";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CaweldTrainingPage() {
  return <ExamTrainingPage exam={getExamById("caweld")!} />;
}
