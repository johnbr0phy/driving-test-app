"use client";

import "@/lib/banks/auwhite";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function WhiteCardTrainingPage() {
  return <ExamTrainingPage exam={getExamById("auwhite")!} />;
}
