"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CitizenshipTrainingPage() {
  return <ExamTrainingPage exam={getExamById("civics")!} />;
}
