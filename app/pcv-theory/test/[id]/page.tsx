"use client";

import "@/lib/banks/ukpcv";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UkpcvTestPage() {
  return <ExamTestPage exam={getExamById("ukpcv")!} />;
}
