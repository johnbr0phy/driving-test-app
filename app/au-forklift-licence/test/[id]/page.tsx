"use client";

import "@/lib/banks/auforklift";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AuForkliftTestPage() {
  return <ExamTestPage exam={getExamById("auforklift")!} />;
}
