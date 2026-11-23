"use client";

import "@/lib/banks/servingitright";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ServingItRightDrillPage() {
  return <ExamDrillPage exam={getExamById("servingitright")!} />;
}
