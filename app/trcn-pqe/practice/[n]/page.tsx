"use client";

import "@/lib/banks/trcnpqe";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function TrcnpqeTrainingPage() {
  return <ExamTrainingPage exam={getExamById("trcnpqe")!} />;
}
