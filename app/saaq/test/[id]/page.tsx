"use client";

import "@/lib/banks/caqc";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CaqcTestPage() {
  return <ExamTestPage exam={getExamById("caqc")!} />;
}
