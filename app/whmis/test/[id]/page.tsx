"use client";

import "@/lib/banks/cawhmis";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CawhmisTestPage() {
  return <ExamTestPage exam={getExamById("cawhmis")!} />;
}
