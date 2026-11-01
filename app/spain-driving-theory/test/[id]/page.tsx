"use client";

import "@/lib/banks/esdgt";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function EsdgtTestPage() {
  return <ExamTestPage exam={getExamById("esdgt")!} />;
}
