"use client";

import "@/lib/banks/cet";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CetTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cet")!} />;
}
