"use client";

import "@/lib/banks/auforklift";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AuForkliftTrainingPage() {
  return <ExamTrainingPage exam={getExamById("auforklift")!} />;
}
