"use client";

import "@/lib/banks/uksia";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UksiaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("uksia")!} />;
}
