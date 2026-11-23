"use client";

import "@/lib/banks/arrtct";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ArrtCtDrillPage() {
  return <ExamDrillPage exam={getExamById("arrtct")!} />;
}
