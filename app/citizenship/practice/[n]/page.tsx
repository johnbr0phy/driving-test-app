"use client";

import "@/lib/banks/civics";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CitizenshipTrainingPage() {
  return <ExamTrainingPage exam={getExamById("civics")!} />;
}
