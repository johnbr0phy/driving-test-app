"use client";

import "@/lib/banks/ffi";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function FfiTestPage() {
  return <ExamTestPage exam={getExamById("ffi")!} />;
}
