"use client";

import "@/lib/banks/series7";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function Series7TestPage() {
  return <ExamTestPage exam={getExamById("series7")!} />;
}
