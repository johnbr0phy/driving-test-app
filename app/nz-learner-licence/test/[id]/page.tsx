"use client";

import "@/lib/banks/nzroad";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function NzroadTestPage() {
  return <ExamTestPage exam={getExamById("nzroad")!} />;
}
