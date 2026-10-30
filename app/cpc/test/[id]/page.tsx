"use client";

import "@/lib/banks/cpc";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CpcTestPage() {
  return <ExamTestPage exam={getExamById("cpc")!} />;
}
