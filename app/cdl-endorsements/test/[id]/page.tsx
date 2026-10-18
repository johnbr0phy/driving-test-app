"use client";

import "@/lib/banks/cdlx";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CDLEndorsementsTestPage() {
  return <ExamTestPage exam={getExamById("cdlx")!} />;
}
