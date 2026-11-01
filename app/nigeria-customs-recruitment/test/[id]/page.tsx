"use client";

import "@/lib/banks/ngcustoms";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function NgcustomsTestPage() {
  return <ExamTestPage exam={getExamById("ngcustoms")!} />;
}
