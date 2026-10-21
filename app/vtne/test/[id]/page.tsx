"use client";

import "@/lib/banks/vtne";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function VtneTestPage() {
  return <ExamTestPage exam={getExamById("vtne")!} />;
}
