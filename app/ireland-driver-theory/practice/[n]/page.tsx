"use client";

import "@/lib/banks/iedtt";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function IedttTrainingPage() {
  return <ExamTrainingPage exam={getExamById("iedtt")!} />;
}
