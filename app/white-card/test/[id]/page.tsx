"use client";

import "@/lib/banks/auwhite";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function WhiteCardTestPage() {
  return <ExamTestPage exam={getExamById("auwhite")!} />;
}
