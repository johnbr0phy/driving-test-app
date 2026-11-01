"use client";

import "@/lib/banks/cdcfib";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CdcfibTestPage() {
  return <ExamTestPage exam={getExamById("cdcfib")!} />;
}
