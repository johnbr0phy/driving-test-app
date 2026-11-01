"use client";

import "@/lib/banks/cdcfib";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CdcfibTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cdcfib")!} />;
}
