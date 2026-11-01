"use client";

import "@/lib/banks/ngcustoms";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function NgcustomsTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ngcustoms")!} />;
}
