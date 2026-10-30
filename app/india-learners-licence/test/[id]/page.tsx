"use client";

import "@/lib/banks/inrto";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function InrtoTestPage() {
  return <ExamTestPage exam={getExamById("inrto")!} />;
}
