"use client";

import "@/lib/banks/ase";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AseDrillPage() {
  return <ExamDrillPage exam={getExamById("ase")!} />;
}
