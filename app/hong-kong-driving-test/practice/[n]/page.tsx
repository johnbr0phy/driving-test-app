"use client";

import "@/lib/banks/hkdrive";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function HkdriveTrainingPage() {
  return <ExamTrainingPage exam={getExamById("hkdrive")!} />;
}
