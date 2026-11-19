"use client";

import "@/lib/banks/pesticide";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PesticideDrillPage() {
  return <ExamDrillPage exam={getExamById("pesticide")!} />;
}
