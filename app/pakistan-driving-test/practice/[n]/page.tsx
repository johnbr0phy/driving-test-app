"use client";

import "@/lib/banks/pkdrive";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PkdriveTrainingPage() {
  return <ExamTrainingPage exam={getExamById("pkdrive")!} />;
}
