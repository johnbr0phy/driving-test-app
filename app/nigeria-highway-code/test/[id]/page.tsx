"use client";

import "@/lib/banks/ngfrsc";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function NgfrscTestPage() {
  return <ExamTestPage exam={getExamById("ngfrsc")!} />;
}
