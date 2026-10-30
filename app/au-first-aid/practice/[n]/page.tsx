"use client";

import "@/lib/banks/aufirstaid";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AuFirstAidTrainingPage() {
  return <ExamTrainingPage exam={getExamById("aufirstaid")!} />;
}
