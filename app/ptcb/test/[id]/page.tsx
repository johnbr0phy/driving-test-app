"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function PtcbTestPage() {
  return <ExamTestPage exam={getExamById("ptcb")!} />;
}
