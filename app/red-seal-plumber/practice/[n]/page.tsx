"use client";

import "@/lib/banks/caplumb";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function RedSealPlumberTrainingPage() {
  return <ExamTrainingPage exam={getExamById("caplumb")!} />;
}
