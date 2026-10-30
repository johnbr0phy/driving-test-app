"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Uk18edDrillPage() {
  return <ExamDrillPage exam={getExamById("uk18ed")!} />;
}
