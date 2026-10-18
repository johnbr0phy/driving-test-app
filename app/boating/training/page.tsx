"use client";

import "@/lib/banks/boating";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function BoatingTrainingPage() {
  return <ExamTrainingPage exam={getExamById("boating")!} />;
}
