"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CRCSTTestPage() {
  return <ExamTestPage exam={getExamById("crcst")!} />;
}
