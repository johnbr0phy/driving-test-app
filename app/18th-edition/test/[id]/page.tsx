"use client";

import "@/lib/banks/uk18ed";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function Uk18edTestPage() {
  return <ExamTestPage exam={getExamById("uk18ed")!} />;
}
