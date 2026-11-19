"use client";

import "@/lib/banks/cpaisc";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CpaIscDrillPage() {
  return <ExamDrillPage exam={getExamById("cpaisc")!} />;
}
