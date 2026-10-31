"use client";

import "@/lib/banks/hkdrive";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function HkdriveTestPage() {
  return <ExamTestPage exam={getExamById("hkdrive")!} />;
}
