"use client";

import "@/lib/banks/osha";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function OshaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("osha")!} />;
}
