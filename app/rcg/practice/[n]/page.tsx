"use client";

import "@/lib/banks/aurcg";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AurcgTrainingPage() {
  return <ExamTrainingPage exam={getExamById("aurcg")!} />;
}
