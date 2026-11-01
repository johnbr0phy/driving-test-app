"use client";

import "@/lib/banks/pkdrive";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function PkdriveTestPage() {
  return <ExamTestPage exam={getExamById("pkdrive")!} />;
}
