"use client";

import "@/lib/banks/trcnpqe";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function TrcnpqeTestPage() {
  return <ExamTestPage exam={getExamById("trcnpqe")!} />;
}
