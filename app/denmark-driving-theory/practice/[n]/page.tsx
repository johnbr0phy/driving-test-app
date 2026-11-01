"use client";

import "@/lib/banks/dkteori";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function DkteoriTrainingPage() {
  return <ExamTrainingPage exam={getExamById("dkteori")!} />;
}
