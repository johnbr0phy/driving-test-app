"use client";

import "@/lib/banks/detheorie";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function DetheorieTrainingPage() {
  return <ExamTrainingPage exam={getExamById("detheorie")!} />;
}
