"use client";

import "@/lib/banks/phleb";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PhlebTrainingPage() {
  return <ExamTrainingPage exam={getExamById("phleb")!} />;
}
