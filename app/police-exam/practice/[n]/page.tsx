"use client";

import "@/lib/banks/police";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PoliceTrainingPage() {
  return <ExamTrainingPage exam={getExamById("police")!} />;
}
