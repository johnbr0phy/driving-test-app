"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CDLTestPage() {
  return <ExamTestPage exam={getExamById("cdl")!} />;
}
