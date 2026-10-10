"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function OshaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("osha")!} />;
}
