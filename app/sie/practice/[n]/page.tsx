"use client";

import "@/lib/banks/sie";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function SieTrainingPage() {
  return <ExamTrainingPage exam={getExamById("sie")!} />;
}
